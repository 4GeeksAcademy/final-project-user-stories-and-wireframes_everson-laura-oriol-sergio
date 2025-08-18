import { useRef, useEffect } from "react";
import style from "../pages/Perfil.module.css";
import { Container, Row } from "react-bootstrap";

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
            <Row className={`${style.row} position-relative mt-4`} ref={containerRef}>
                <ul className={`${style.navs} nav nav-link d-flex mx-auto`} id="pills-tab" role="tablist">
                    <li className={`${style.links} nav-item`} role="presentation">
                        <a href="#" className={`${style.link} nav-link active`} id="perfil" role="tab" aria-controls="pills-perfil" aria-selected="true" data-bs-toggle="pill" data-bs-target="#pills-perfil"> Mi perfil </a>
                    </li>
                    <li className={`${style.links} nav-item`} role="presentation">
                        <a href="#" className={`${style.link} nav-link`} id="historial" role="tab" aria-controls="pills-historial" aria-selected="false" data-bs-toggle="pill" data-bs-target="#pills-historial"> Mi historial </a>
                    </li>
                    <div ref={lineRef} className={style.zigzagLine}></div>
                </ul>
            </Row>
            <div className="tab-content" id="pills-tabContent">
                <div className={`${style.perfil} tab-pane fade mt-5 show active`} id="pills-perfil" role="tabpanel" aria-labelledby="perfil">
                    <div className={`${style.profile} rounded-5 w-50 mx-auto d-flex justify-content-center mb-5`}>
                        <div className={`${style.info} justify-content-center`}>
                            <div><input type="text" placeholder="Foto"/></div>
                            <div><input type="text" placeholder="Nombre"/></div>
                            <div><input type="text" placeholder="Usuario"/></div>
                        </div>
                        <div className={style.info}>
                            <div><input type="text" placeholder="Género"/></div>
                            <div><input type="text" placeholder="Nacionalidad"/></div>
                            <div><input type="text" placeholder="Fecha de nacimiento"/></div>
                            <div><input type="text" placeholder="Correo electrónico"/></div>
                            <div><input type="text" placeholder="Gestionar contraseña"/></div>
                        </div>
                    </div>
                </div>
                <div className={`${style.historial} tab-pane fade`} id="pills-historial" role="tabpanel" aria-labelledby="historial">
                    x
                </div>
            </div>
        </Container>
    );
};