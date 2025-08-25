import { useRef, useEffect, useState } from "react";
import style from "../pages/Perfil.module.css";
import { Container, Row } from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { SiStryker } from "react-icons/si";

export const Perfil = () => {

    const lineRef = useRef(null);
    const containerRef = useRef(null);
    const userLocalStorage = localStorage.getItem("user")
    const [user, setUser] = useState(null)
    useEffect(() => {
        if (userLocalStorage) {
            setUser(JSON.parse(userLocalStorage))
        }
    }, [])

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
            <Row className={`${style.row} position-relative mt-4 mb-5`} ref={containerRef}>
                <ul className={`${style.navs} nav nav-link d-flex mx-auto`} id="pills-tab" role="tablist">
                    <li className={`${style.links} nav-item`} role="presentation">
                        <a href="#" className={`${style.link} nav-link active`} id="perfil" role="tab" aria-controls="pills-perfil" aria-selected="true" data-bs-toggle="pill" data-bs-target="#pills-perfil"> Mi perfil </a>
                    </li>
                    <li className={`${style.links} nav-item`} role="presentation">
                        <a href="#" className={`${style.link} nav-link`} id="historial" role="tab" aria-controls="pills-historial" aria-selected="false" data-bs-toggle="pill" data-bs-target="#pills-historial"> Mi historial </a>
                    </li>
                </ul>
            </Row>
            <div className="tab-content" id="pills-tabContent">
                {
                    !user ? (
                        <span>Loading</span>
                    ) : (
                        <div className={`${style.perfil} tab-pane fade show active`} id="pills-perfil" role="tabpanel" aria-labelledby="perfil">
                            <div class="sticker-container">
                                <img src="src/front/assets/img/stickerEmojiBola.png" class="sticker" draggable="false" id="sticker1" />
                                <img src="src/front/assets/img/stickerEmojiCD.png" class="sticker" draggable="false" id="sticker2" />
                                <img src="src/front/assets/img/stickerEmojiBooks.png" class="sticker" draggable="false" id="sticker3" />
                                <img src="src/front/assets/img/stickerEmojiClaqueta.png" class="sticker" draggable="false" id="sticker4" />
                                <img src="src/front/assets/img/stickerEmojiPalomitas.png" class="sticker" draggable="false" id="sticker5" />
                                <img src="src/front/assets/img/stickerEmojiBombilla.png" class="sticker" draggable="false" id="sticker6" />
                            </div>
                            <div className={`${style.profile} rounded-5 w-25 mx-auto mt-5 d-flex justify-content-center`}>
                                <div className={`${style.info}`}>
                                    <label>Nombre</label>
                                    <div><input type="text" className="form-control text-center w-100" placeholder="Nombre" value={user.name} readOnly /></div>
                                    <br />
                                    <label>Username</label>
                                    <div><input type="text" className="form-control text-center w-100" placeholder="Username" value={user.username} readOnly /></div>
                                    <br />
                                    <label>Correo electrónico</label>
                                    <div><input type="email" className="form-control text-center w-100 mb-3" placeholder="Correo electrónico" value={user.email} readOnly /></div>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className={`${style.historial} tab-pane fade`} id="pills-historial" role="tabpanel" aria-labelledby="historial">
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                        gutterBreakPoints={{ 350: "12px", 750: "16px", 900: "24px" }}
                    >
                        <Masonry>
                            <div className={`${style.boxtest} rounded-5`}></div>
                            <div className={`${style.boxtest1} rounded-5`}></div>
                            <div className={`${style.boxtest2} rounded-5`}></div>
                            <div className={`${style.boxtest3} rounded-5`}></div>
                            <div className={`${style.boxtest4} rounded-5`}></div>
                            <div className={`${style.boxtest5} rounded-5`}></div>
                        </Masonry>
                    </ResponsiveMasonry>
                </div>
            </div>
        </Container>
    );
}