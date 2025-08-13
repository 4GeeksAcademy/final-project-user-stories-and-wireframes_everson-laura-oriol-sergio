import { useState, useRef, useEffect } from "react";
import style from "../pages/Perfil.module.css";
import { Container, Col, Row } from "react-bootstrap";

export const Perfil = () => {
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
      <Row className={`${style.row} position-relative mx-auto mt-5`} ref={containerRef}>
        <Col>
          <a href="#">Mis datos de usuario</a>
        </Col>
        <Col>
          <a href="#">Mis respuestas registradas</a>
        </Col>
        <Col>
          <a href="#">Mis respuestas favoritas</a>
        </Col>
        <div ref={lineRef} className={style.zigzagLine}></div>
      </Row>

      <div className={style.columns}>
        <div className={style.firstColumn}>
          <div className={`${style.firstColumnFirstElement} card rounded-5`}>
            a
          </div>
          <div className={`${style.firstColumnSecondElement} card rounded-5`}>
            b
          </div>
          <div className={`${style.firstColumnThirdElement} card rounded-5`}>
            c
          </div>
          <div className={`${style.firstColumnFourthElement} card rounded-5`}>
            d
          </div>
        </div>
        <div className={style.secondColumn}>
          <div className={`${style.secondColumnFirstElement} card rounded-5`}>
            a
          </div>
          <div className={`${style.secondColumnSecondElement} card rounded-5`}>
            b
          </div>
          <div className={`${style.secondColumnThirdElement} card rounded-5`}>
            c
          </div>
        </div>
        <div className={style.thirdColumn}>
          <div className={`${style.thirdColumnFirstElement} card rounded-5`}>
            a
          </div>
          <div className={`${style.thirdColumnSecondElement} card rounded-5`}>
            b
          </div>
          <div className={`${style.thirdColumnThirdElement} card rounded-5`}>
            c
          </div>
          <div className={`${style.thirdColumnFourthElement} card rounded-5`}>
            d
          </div>
        </div>
      </div>
    </Container>
  );
};