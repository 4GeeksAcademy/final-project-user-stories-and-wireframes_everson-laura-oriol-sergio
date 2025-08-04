import style from "./Forms.module.css";
import { Container, Col, Row, Card } from "react-bootstrap";
import { useRef, useEffect } from "react";

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

    links.forEach(link => {
      link.addEventListener("mouseenter", handleHover);
      link.addEventListener("mousemove", stopZigzagAnimation);
    });
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      links.forEach(link => {
        link.removeEventListener("mouseenter", handleHover);
        link.removeEventListener("mousemove", stopZigzagAnimation);
      });
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <Container className={style.container} fluid>
      <Row className={`${style.row} position-relative`} ref={containerRef}>
        <Col><a href="#">Inicio</a></Col>
        <Col><a href="#">Películas</a></Col>
        <Col><a href="#">Series</a></Col>
        <Col><a href="#">Libros</a></Col>
        <Col><a href="#">Géneros</a></Col>
        <div ref={lineRef} className={style.zigzagLine}></div>
      </Row>

      <div className={`${style.cards} d-flex mt-5`}>
        <div className={`${style.card} card w-25`}>
          form
        </div>
        <div className={`${style.card} card w-50`}>
          form
        </div>
        <div className={`${style.card} card w-25`}>
          form
        </div>
      </div>

      <div className={`${style.cards} d-flex mt-5`}>
        <div className={`${style.card} card w-25`}>
          form
        </div>
        <div className={`${style.card} card w-25`}>
          form
        </div>
        <div className={`${style.card} card w-25`}>
          form
        </div>
        <div className={`${style.card} card w-25`}>
          form
        </div>
      </div>

      <div className={`${style.cards} d-flex mt-5`}>
        <div className={`${style.card} card w-50`}>
          form
        </div>
        <div className={`${style.card} card w-50`}>
          form
        </div>
      </div>

      <div className={`${style.cards} d-flex mt-5`}>
        <div className={`${style.card} card w-50`}>
          form
        </div>
        <div className={`${style.card} card w-25`}>
          form
        </div>
        <div className={`${style.card} card w-25`}>
          form
        </div>
      </div>

      <div className={`${style.cards} d-flex mt-5`}>
        <div className={`${style.card} card w-25`}>
          form
        </div>
        <div className={`${style.card} card w-25`}>
          form
        </div>
        <div className={`${style.card} card w-50`}>
          form
        </div>
      </div>

      <div className={`${style.cards} d-flex mt-5`}>
        <div className={`${style.card} card w-100`}>
          form
        </div>
      </div>

    </Container>
  );
};