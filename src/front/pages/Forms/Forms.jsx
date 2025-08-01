import React, { useState, useRef } from "react";
import style from "./Forms.module.css";

const questions = [
  { text: "¿Te sientes con energía mental?", emoji: "🧠" },
  { text: "¿Prefieres algo que dure poco tiempo?", emoji: "⏰" },
  { text: "¿Te gusta usar tu imaginación?", emoji: "✨" },
  { text: "¿Quieres algo emocionante?", emoji: "🎬" },
  { text: "¿Te gusta aprender cosas nuevas?", emoji: "📚" },
];

export const Forms = () => {
  const [cards, setCards] = useState(questions);
  const [dragStyle, setDragStyle] = useState({});
  const [showYes, setShowYes] = useState(false);
  const [showNo, setShowNo] = useState(false);
  const startX = useRef(0);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const dx = e.touches[0].clientX - startX.current;
    setDragStyle({ transform: `translateX(${dx}px) rotate(${dx * 0.05}deg)` });
    setShowYes(dx > 50);
    setShowNo(dx < -50);
  };

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 100) setCards((prev) => prev.slice(0, -1));
    else if (dx < -100) setCards((prev) => prev.slice(0, -1));
    setDragStyle({});
    setShowYes(false);
    setShowNo(false);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    startX.current = e.clientX;

    const onMouseMove = (e) => {
      const dx = e.clientX - startX.current;
      setDragStyle({ transform: `translateX(${dx}px) rotate(${dx * 0.05}deg)` });
      setShowYes(dx > 50);
      setShowNo(dx < -50);
    };

    const onMouseUp = (e) => {
      const dx = e.clientX - startX.current;
      if (dx > 100 || dx < -100) setCards((prev) => prev.slice(0, -1));
      setDragStyle({});
      setShowYes(false);
      setShowNo(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className={style.container}>
      {cards.map((card, i) => {
        const isTop = i === cards.length - 1;
        return (
          <div
            key={i}
            className={style.card}
            style={isTop ? dragStyle : {}}
            onMouseDown={isTop ? handleMouseDown : undefined}
            onTouchStart={isTop ? handleTouchStart : undefined}
            onTouchMove={isTop ? handleTouchMove : undefined}
            onTouchEnd={isTop ? handleTouchEnd : undefined}
          >
            {isTop && showYes && <div className={`${style.indicator} ${style.yes}`}>YES</div>}
            {isTop && showNo && <div className={`${style.indicator} ${style.no}`}>NO</div>}
            <div className={style.emoji}>{card.emoji}</div>
            <div className={style.text}>{card.text}</div>
          </div>
        );
      })}
    </div>
  );
};
