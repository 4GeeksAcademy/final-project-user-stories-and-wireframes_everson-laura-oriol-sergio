import { useState, useRef, useEffect } from "react";
import style from "./Forms.module.css";
import { Container } from "react-bootstrap";


const initialCards = [
  { text: "¿Quieres ver una pelicula?", emoji: "🎬", value: "Pelicula" },
  { text: "¿Quieres leer un libro?", emoji: "📚", value: "Libro" },
  { text: "¿Quieres salir de casa?", emoji: "✈️", value: "Series" },
];

const specificCards = {
  Pelicula: [
    { text: "¿Te gustan las comedias?", emoji: "😂", value: "Comedia" },
    { text: "¿Prefieres películas de acción?", emoji: "💥", value: "Accion" },
    { text: "¿Te interesan los dramas?", emoji: "🎭", value: "Drama" },
    { text: "¿Te gustan los thrillers?", emoji: "🔍", value: "Thriller" },
    { text: "¿Prefieres ciencia ficción?", emoji: "🚀", value: "SciFi" },
  ],
  Libro: [
    { text: "¿Te gusta la ficción?", emoji: "📖", value: "Ficcion" },
    { text: "¿Prefieres biografías?", emoji: "👤", value: "Biografia" },
    { text: "¿Te interesan los libros de historia?", emoji: "🏛️", value: "Historia" },
    { text: "¿Te gustan los misterios?", emoji: "🕵️", value: "Misterio" },
    { text: "¿Prefieres autoayuda?", emoji: "💪", value: "Autoayuda" },
  ],
  Viaje: [
    { text: "¿Te gusta la playa?", emoji: "🏖️", value: "Playa" },
    { text: "¿Prefieres la montaña?", emoji: "🏔️", value: "Montana" },
    { text: "¿Te interesan las ciudades?", emoji: "🏙️", value: "Ciudad" },
    { text: "¿Te gusta la naturaleza?", emoji: "🌿", value: "Naturaleza" },
    { text: "¿Prefieres aventuras extremas?", emoji: "🎢", value: "Aventura" },
  ],
};

export const Forms = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStyle, setDragStyle] = useState({});
  const [labelOpacity, setLabelOpacity] = useState({ yes: 0, no: 0 });
  const startPos = useRef(null);
  const [answers, setAnswers] = useState([]);
  const [cards,setCards] = useState([]);
  const [loading, setLoading] = useState(true);

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
  
    useEffect(() => {
      fetchCards();
    }, []);

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

  return (
    <Container fluid className={style.container}>

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
            {specificCards[answers[0]]
              .slice(currentIndex, currentIndex + 3)
              .map((card, index) => {
                const isTop = index === 0;
                const zIndex = specificCards[answers[0]].length - index;
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
                    onMouseUp={isTop ? (e) => handleEnd(e.clientX, specificCards[answers[0]]) : null}
                    onMouseLeave={isTop ? (e) => startPos.current !== null && handleEnd(e.clientX, specificCards[answers[0]]) : null}
                    onTouchStart={isTop ? (e) => handleStart(e.touches[0].clientX) : null}
                    onTouchMove={isTop ? (e) => handleMove(e.touches[0].clientX) : null}
                    onTouchEnd={isTop ? (e) => handleEnd(e.changedTouches[0].clientX, specificCards[answers[0]]) : null}
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