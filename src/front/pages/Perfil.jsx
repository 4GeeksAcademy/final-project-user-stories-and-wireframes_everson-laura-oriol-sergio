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
                    <div className={`${style.profile} rounded-5 w-50 mx-auto d-flex justify-content-center mb-5 p-5`}>
                        <div className={`${style.info} justify-content-center pt-4`}>
                            <label>Nombre</label>
                            <div><input type="text" className="form-control text-center w-100" placeholder="Nombre"/></div>
                             <label>Username</label>
                            <div><input type="text" className="form-control text-center w-100" placeholder="Username"/></div>
                            <label>Correo electrónico</label>
                            <div><input type="email" className="form-control text-center w-100" placeholder="Correo electrónico"/></div>
                        </div>
                        <div className={`${style.info} justify-content-center pt-4`}>
                            <label>Género</label>
                            <div><input type="text" className="form-control text-center w-100" placeholder="Género"/></div>
                            <label>Fecha de nacimiento</label>
                            <div><input type="date" className="form-control text-center w-100" placeholder="Fecha de nacimiento"/></div>
                            <div className={style.password}>
                                <button className={`${style.passwordButton} btn w-100`} id="passwordButton">Gestionar contraseña</button>
                            </div>
                            <div className={style.close}>
                                <button className={`${style.closeButton} btn w-100`} id="closeButton">Cerrar sesión</button>

                            </div>
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