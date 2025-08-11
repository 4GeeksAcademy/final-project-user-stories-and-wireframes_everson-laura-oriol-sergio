import { useState, useRef } from "react";
import style from "./Forms.module.css";
import { Container } from "react-bootstrap";

const cardsData = [
  { text: "¿Te sientes con energía mental?", emoji: "🧠" },
  { text: "¿Prefieres algo que dure poco tiempo?", emoji: "⏰" },
  { text: "¿Te gusta usar tu imaginación?", emoji: "✨" },
  { text: "¿Quieres algo emocionante?", emoji: "🎬" },
  { text: "¿Te gusta aprender cosas nuevas?", emoji: "📚" },
];

export const Forms = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStyle, setDragStyle] = useState({});
  const [labelOpacity, setLabelOpacity] = useState({ yes: 0, no: 0 });
  const startPos = useRef(null);

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

  const handleEnd = (x) => {
    const deltaX = x - startPos.current;
    if (deltaX > 100) {
      animateOut(1);
    } else if (deltaX < -100) {
      animateOut(-1);
    } else {
      setDragStyle({ transform: "translateX(0px) rotate(0deg)" });
      setLabelOpacity({ yes: 0, no: 0 });
    }
    startPos.current = null;
  };

  const animateOut = (direction) => {
    setDragStyle({
      transform: `translateX(${direction * 1000}px) rotate(${direction * 45}deg)`,
      transition: "transform 0.5s ease-out",
    });
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1 < cardsData.length ? prev + 1 : 0));
      setDragStyle({});
      setLabelOpacity({ yes: 0, no: 0 });
    }, 500);
  };

  return (
    <Container className={style.container}>
      {cardsData
        .slice(currentIndex, currentIndex + 3)
        .map((card, index) => {
          const isTop = index === 0;
          const zIndex = cardsData.length - index;
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
              onMouseUp={isTop ? (e) => handleEnd(e.clientX) : null}
              onMouseLeave={isTop ? (e) => startPos.current !== null && handleEnd(e.clientX) : null}
              onTouchStart={isTop ? (e) => handleStart(e.touches[0].clientX) : null}
              onTouchMove={isTop ? (e) => handleMove(e.touches[0].clientX) : null}
              onTouchEnd={isTop ? (e) => handleEnd(e.changedTouches[0].clientX) : null}
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
        })}

    </Container>
  );
};
