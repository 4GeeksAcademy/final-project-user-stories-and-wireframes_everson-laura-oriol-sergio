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
                <div className={`${style.perfil} tab-pane fade mt-5`} id="pills-perfil" role="tabpanel" aria-labelledby="perfil">
                    Perfil de usuario
                </div>
                <div className={`${style.historial} tab-pane fade show active`} id="pills-historial" role="tabpanel" aria-labelledby="historial">
                    <div className={style.columns}>
                        <div className={style.firstColumn}>
                            <div className={`${style.firstColumnFirstElement} card rounded-5`}>
                                Nombres y apellidos
                            </div>
                            <div className={`${style.firstColumnSecondElement} card rounded-5`}>
                                Descripción y biografía
                            </div>
                            <div className={`${style.firstColumnThirdElement} card rounded-5`}>
                                Género
                            </div>
                            <div className={`${style.firstColumnFourthElement} card rounded-5`}>
                                Nacionalidad
                            </div>
                        </div>
                        <div className={style.secondColumn}>
                            <div className={`${style.secondColumnFirstElement} card rounded-5`}>
                                Foto de usuario
                            </div>
                            <div className={`${style.secondColumnSecondElement} card rounded-5`}>
                                Fecha de nacimiento
                            </div>
                            <div className={`${style.secondColumnThirdElement} card rounded-5`}>
                                Enlaces a redes sociales
                            </div>
                        </div>
                        <div className={style.thirdColumn}>
                            <div className={`${style.thirdColumnFirstElement} card rounded-5`}>
                                Nombre de usuario
                            </div>
                            <div className={`${style.thirdColumnSecondElement} card rounded-5`}>
                                Correo electrónico
                            </div>
                            <div className={`${style.thirdColumnThirdElement} card rounded-5`}>
                                Gestionar contraseña
                            </div>
                            <div className={`${style.thirdColumnFourthElement} card rounded-5`}>
                                Cerrar sesión
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};