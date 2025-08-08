import { useState, useRef, useEffect } from "react";
import style from "./Forms.module.css";
import { Container, Col, Row } from "react-bootstrap";

const cardsData = [
  { text: "¿Te sientes con energía mental?", emoji: "🧠" },
  { text: "¿Prefieres algo que dure poco tiempo?", emoji: "⏰" },
  { text: "¿Te gusta usar tu imaginación?", emoji: "✨" },
  { text: "¿Quieres algo emocionante?", emoji: "🎬" },
  { text: "¿Te gusta aprender cosas nuevas?", emoji: "📚" },
];

// Componente del formulario deslizable tipo Tinder, adaptado para que no desaparezca
const SwipeCard = () => {
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
      resetPosition();
    } else if (deltaX < -100) {
      resetPosition();
    } else {
      resetPosition();
    }
    startPos.current = null;
  };

  const resetPosition = () => {
    setDragStyle({ transform: "translateX(0px) rotate(0deg)", transition: "transform 0.3s ease" });
    setLabelOpacity({ yes: 0, no: 0 });
    setTimeout(() => {
      setDragStyle({});
    }, 300);
  };

  const card = cardsData[currentIndex];

  return (
    <div
      className={style.card}
      style={{
        transform: dragStyle.transform || "translateX(0px) rotate(0deg)",
        transition: dragStyle.transition || "transform 0.3s ease",
        cursor: "grab",
      }}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => startPos.current !== null && handleMove(e.clientX)}
      onMouseUp={(e) => handleEnd(e.clientX)}
      onMouseLeave={(e) => startPos.current !== null && handleEnd(e.clientX)}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
    >
      <div className={`${style.label} ${style.yes}`} style={{ opacity: labelOpacity.yes }}>
        YES
      </div>
      <div className={`${style.label} ${style.no}`} style={{ opacity: labelOpacity.no }}>
        NO
      </div>
      <span className={style.emoji}>{card.emoji}</span>
      <p className={style.text}>{card.text}</p>
    </div>
  );
};

export const Forms = () => {
  const lineRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const links = container.querySelectorAll("a");
    const line = lineRef.current;

    function handleHover(e) {
      const rect = e.target.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const left = rect.left - containerRect.left;
      line.style.transition = "all 0.4s ease";
      line.style.left = `${left}px`;
      line.style.width = `${rect.width}px`;
      line.style.opacity = "1";
      line.classList.add(style.animateBackground);
    }

    function handleLeave() {
      line.style.opacity = "0";
      line.classList.remove(style.animateBackground);
    }

    function stopZigzagAnimation() {
      line.classList.remove(style.animateBackground);
    }

    links.forEach((link) => {
      link.addEventListener("mouseenter", handleHover);
      link.addEventListener("mousemove", stopZigzagAnimation);
    });

    container.addEventListener("mouseleave", handleLeave);

    return () => {
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleHover);
        link.removeEventListener("mousemove", stopZigzagAnimation);
      });
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <Container className={`${style.container} container`}>
      <Row className={`${style.row} position-relative`} ref={containerRef}>
        <Col>
          <a href="#">Inicio</a>
        </Col>
        <Col>
          <a href="#">Películas</a>
        </Col>
        <Col>
          <a href="#">Series</a>
        </Col>
        <Col>
          <a href="#">Libros</a>
        </Col>
        <Col>
          <a href="#">Géneros</a>
        </Col>
        <div ref={lineRef} className={style.zigzagLine}></div>
      </Row>

      <div className={style.grid}>
        {[...Array(11)].map((_, i) => (
          <div
            key={i}
            className={style.item}
            style={{ height: `${150 + Math.random() * 150}px` }}
          >
            <SwipeCard />
          </div>
        ))}
      </div>
    </Container>
  );
};