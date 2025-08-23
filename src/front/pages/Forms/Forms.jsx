import { useState, useRef, useEffect } from "react";
import style from "./Forms.module.css";
import { Container } from "react-bootstrap";

const BASE = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/+$/, "");
const API = `${BASE}/api`;

const initialCards = [
  { text: "¿Quieres ver una pelicula?", emoji: "🎬", value: "Pelicula" },
  { text: "¿Quieres leer un libro?", emoji: "📚", value: "Libro" },
  { text: "¿Quieres salir de casa?", emoji: "✈️", value: "Series" },
];



export const Forms = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStyle, setDragStyle] = useState({});
  const [labelOpacity, setLabelOpacity] = useState({ yes: 0, no: 0 });
  const startPos = useRef(null);
  const [answers, setAnswers] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentCards, setCurrentCards] = useState([])

  const handleStart = (x) => {
    startPos.current = x;
  };

  const handleMove = (x) => {
    if (startPos.current !== null) {
      const deltaX = x - startPos.current;
      setDragStyle({
        transform: `translateX(${deltaX}px) rotate(${deltaX / 10}deg)`,
      });
      setLabelOpacity({
        yes: deltaX > 0 ? Math.min(deltaX / 100, 1) : 0,
        no: deltaX < 0 ? Math.min(-deltaX / 100, 1) : 0,
      });
    }
  };

  const handleEnd = (x, cards) => {
    const deltaX = x - startPos.current;
    let currentCard = cards[currentIndex]
    console.log(currentCard)
    if (deltaX > 100) {
      setAnswers([...answers, currentCard.value])
      animateOut(1, cards);
    } else if (deltaX < -100) {
      animateOut(-1, cards);
    } else {
      setDragStyle({ transform: "translateX(0px) rotate(0deg)" });
      setLabelOpacity({ yes: 0, no: 0 });
    }
    startPos.current = null;
  };

  const fetchCards = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/cards`);
      const data = await res.json();
      setCards(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };




  const animateOut = (direction, cards) => {
    setDragStyle({
      transform: `translateX(${direction * 1000}px) rotate(${direction * 45}deg)`,
      transition: "transform 0.5s ease-out",
    });
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1 < cards.length ? prev + 1 : 0));
      setDragStyle({});
      setLabelOpacity({ yes: 0, no: 0 });
    }, 500);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    setCurrentCards(cards.filter(c => c.relation === answers[answers.length - 1]))
  }, [answers])
  console.log(currentCards, "currentCards")
  console.log(answers)

  if (loading) {
    return <span>Loading</span>
  }
  
  return (
    <Container fluid className={style.container}>
      <div class="sticker-container">
				<img src="src/front/assets/img/stickerEmojiBola.png" class="sticker" draggable="false" id="sticker1" />
				<img src="src/front/assets/img/stickerEmojiCD.png" class="sticker" draggable="false" id="sticker2" />
				<img src="src/front/assets/img/stickerEmojiBooks.png" class="sticker" draggable="false" id="sticker3" />
				<img src="src/front/assets/img/stickerEmojiClaqueta.png" class="sticker" draggable="false" id="sticker4" />
				<img src="src/front/assets/img/stickerEmojiPalomitas.png" class="sticker" draggable="false" id="sticker5" />
				<img src="src/front/assets/img/stickerEmojiBombilla.png" class="sticker" draggable="false" id="sticker6" />
			</div>
      {
        answers.length === 0 ? (
          <>
            {
              initialCards
                .slice(currentIndex, currentIndex + 3)
                .map((card, index) => {
                  const isTop = index === 0;
                  const zIndex = initialCards.length - index;
                  const scale = 1 - index * 0.05;
                  const translateY = index * 10;

                  return (
                    <div
                      key={currentIndex + index}
                      className={style.card}
                      style={{
                        zIndex,
                        transform: isTop
                          ? dragStyle.transform || `scale(${scale}) translateY(${translateY}px)`
                          : `scale(${scale}) translateY(${translateY}px)`,
                        transition: isTop ? dragStyle.transition : "transform 0.3s ease",
                      }}
                      onMouseDown={isTop ? (e) => handleStart(e.clientX) : null}
                      onMouseMove={isTop ? (e) => startPos.current !== null && handleMove(e.clientX) : null}
                      onMouseUp={isTop ? (e) => handleEnd(e.clientX, initialCards) : null}
                      onMouseLeave={isTop ? (e) => startPos.current !== null && handleEnd(e.clientX, initialCards) : null}
                      onTouchStart={isTop ? (e) => handleStart(e.touches[0].clientX) : null}
                      onTouchMove={isTop ? (e) => handleMove(e.touches[0].clientX) : null}
                      onTouchEnd={isTop ? (e) => handleEnd(e.changedTouches[0].clientX, initialCards) : null}
                    >
                      {isTop && (
                        <>
                          <div
                            className={`${style.label} ${style.yes}`}
                            style={{ opacity: labelOpacity.yes }}
                          >
                            YES
                          </div>
                          <div
                            className={`${style.label} ${style.no}`}
                            style={{ opacity: labelOpacity.no }}
                          >
                            NO
                          </div>
                        </>
                      )}
                      <span className={style.emoji}>{card.emoji}</span>
                      <p className={style.text}>{card.text}</p>
                    </div>
                  );
                })
            }
          </>
        ) : (
          <>
            {currentCards
              .slice(currentIndex, currentIndex + 3)
              .map((card, index) => {
                const isTop = index === 0;
                const zIndex = currentCards.length - index;
                const scale = 1 - index * 0.05;
                const translateY = index * 10;

                return (

                  <div
                    key={currentIndex + index}
                    className={style.card}
                    style={{
                      zIndex,
                      transform: isTop
                        ? dragStyle.transform || `scale(${scale}) translateY(${translateY}px)`
                        : `scale(${scale}) translateY(${translateY}px)`,
                      transition: isTop ? dragStyle.transition : "transform 0.3s ease",
                    }}
                    onMouseDown={isTop ? (e) => handleStart(e.clientX) : null}
                    onMouseMove={isTop ? (e) => startPos.current !== null && handleMove(e.clientX) : null}
                    onMouseUp={isTop ? (e) => handleEnd(e.clientX, currentCards) : null}
                    onMouseLeave={isTop ? (e) => startPos.current !== null && handleEnd(e.clientX, currentCards) : null}
                    onTouchStart={isTop ? (e) => handleStart(e.touches[0].clientX) : null}
                    onTouchMove={isTop ? (e) => handleMove(e.touches[0].clientX) : null}
                    onTouchEnd={isTop ? (e) => handleEnd(e.changedTouches[0].clientX, currentCards) : null}
                  >
                    {isTop && (
                      <>
                        <div
                          className={`${style.label} ${style.yes}`}
                          style={{ opacity: labelOpacity.yes }}
                        >
                          YES
                        </div>
                        <div
                          className={`${style.label} ${style.no}`}
                          style={{ opacity: labelOpacity.no }}
                        >
                          NO
                        </div>
                      </>
                    )}
                    <span className={style.emoji}>{card.emoji}</span>
                    <p className={style.text}>{card.text}</p>
                  </div>
                );
              })
            }
          </>
        )
      }


    </Container>
  );
};