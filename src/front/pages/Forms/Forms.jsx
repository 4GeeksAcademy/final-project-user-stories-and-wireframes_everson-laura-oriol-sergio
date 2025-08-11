import { useState, useRef, useEffect } from "react";
import style from "./Forms.module.css";
import { Container, Col, Row } from "react-bootstrap";

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
    <Container className={style.container}>
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

      <div className={style.columns}>
        <div className={style.firstColumn}>
          <div className={`${style.firstColumnFirstElement} card`}>
            a
          </div>
          <div className={`${style.firstColumnSecondElement} card`}>
            b
          </div>
          <div className={`${style.firstColumnThirdElement} card`}>
            c
          </div>
          <div className={`${style.firstColumnFourthElement} card`}>
            d
          </div>
        </div>
        <div className={`${style.secondColumn} card`}>
          <div className={`${style.secondColumnFirstElement} card`}>
            a
          </div>
          <div className={`${style.secondColumnSecondElement} card`}>
            b
          </div>
          <div className={`${style.secondColumnThirdElement} card`}>
            c
          </div>
        </div>
        <div className={`${style.thirdColumn} card`}>
          <div className={`${style.thirdColumnFirstElement} card`}>
            a
          </div>
          <div className={`${style.thirdColumnSecondElement} card`}>
            b
          </div>
          <div className={`${style.thirdColumnThirdElement} card`}>
            c
          </div>
          <div className={`${style.thirdColumnFourthElement} card`}>
            d
          </div>
        </div>
      </div>
    </Container>
  );
};