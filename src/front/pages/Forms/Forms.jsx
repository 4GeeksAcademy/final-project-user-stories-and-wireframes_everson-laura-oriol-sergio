import style from "./Forms.module.css";
import { Container, Col, Row, Card } from "react-bootstrap";
import { useRef, useEffect } from "react";
import Masonry from "react-masonry-css";

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

  const lorem = [
    "Formulario breve.",
    "Formulario con descripción más larga.",
    "Formulario con muchísimo contenido de prueba para ver el comportamiento masonry en serio.",
    "Texto corto.",
    "Más contenido aquí.",
    "Registro rápido.",
    "Tarjeta con más texto para test.",
    "Contacto básico.",
    "Formulario largo con párrafos.",
    "Formulario minimal.",
    "Altura distinta.",
    "Último ejemplo visual."
  ];

  const breakpoints = {
    default: 4,
    1200: 3,
    768: 2,
    576: 1,
  };

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

      <Masonry
        breakpointCols={breakpoints}
        className={style.masonryGrid}
        columnClassName={style.masonryColumn}
      >
        {lorem.map((text, i) => (
          <Card key={i} className={style.card}>
            <Card.Body>
              <Card.Title>Formulario {i + 1}</Card.Title>
              <Card.Text>{text}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Masonry>
    </Container>
  );
};