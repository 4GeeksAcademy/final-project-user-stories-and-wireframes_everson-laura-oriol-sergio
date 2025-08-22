import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
	superLargeDesktop: {
		breakpoint: { max: 4000, min: 3000 },
		items: 1,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 1,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 1,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};

export const Home = () => {
	useEffect(() => {
		const stickers = document.querySelectorAll(".sticker");

		stickers.forEach((sticker) => {
			let offsetX, offsetY;

			// Mover stickers en PC
			const mouseDownHandler = (e) => {
				offsetX = e.clientX - sticker.getBoundingClientRect().left;
				offsetY = e.clientY - sticker.getBoundingClientRect().top;

				document.addEventListener("mousemove", mouseMoveHandler);
				document.addEventListener("mouseup", mouseUpHandler);
			};

			const mouseMoveHandler = (e) => {
				sticker.style.left = `${e.clientX - offsetX}px`;
				sticker.style.top = `${e.clientY - offsetY}px`;
			};

			const mouseUpHandler = () => {
				document.removeEventListener("mousemove", mouseMoveHandler);
				document.removeEventListener("mouseup", mouseUpHandler);
			};

			//  Mover stickers en movil
			const touchStartHandler = (e) => {
				const touch = e.touches[0];
				offsetX = touch.clientX - sticker.getBoundingClientRect().left;
				offsetY = touch.clientY - sticker.getBoundingClientRect().top;

				document.addEventListener("touchmove", touchMoveHandler);
				document.addEventListener("touchend", touchEndHandler);
			};

			const touchMoveHandler = (e) => {
				const touch = e.touches[0];
				sticker.style.left = `${touch.clientX - offsetX}px`;
				sticker.style.top = `${touch.clientY - offsetY}px`;
			};

			const touchEndHandler = () => {
				document.removeEventListener("touchmove", touchMoveHandler);
				document.removeEventListener("touchend", touchEndHandler);
			};


			sticker.addEventListener("mousedown", mouseDownHandler);
			sticker.addEventListener("touchstart", touchStartHandler, { passive: false });
		});


		return () => {
			stickers.forEach((sticker) => {
				sticker.replaceWith(sticker.cloneNode(true));
			});
		};
	}, []);

	return (
		<div className="justify-content-center align-items-center text-center main">
			{ }
			<div className="sticker-container">
				<img
					src="src/front/assets/img/stickerEmojiBola.png"
					className="sticker"
					draggable="false"
					id="sticker1"
				/>
				<img
					src="src/front/assets/img/stickerEmojiCD.png"
					className="sticker"
					draggable="false"
					id="sticker2"
				/>
				<img
					src="src/front/assets/img/stickerEmojiBooks.png"
					className="sticker"
					draggable="false"
					id="sticker3"
				/>
				<img
					src="src/front/assets/img/stickerEmojiClaqueta.png"
					className="sticker"
					draggable="false"
					id="sticker4"
				/>
				<img
					src="src/front/assets/img/stickerEmojiPalomitas.png"
					className="sticker"
					draggable="false"
					id="sticker5"
				/>
			</div>

			<div className="wave-container d-flex w-50 m-auto pt-5">
				<p className="wave-text slogan text-center">
					<span>S</span>
					<span>w</span>
					<span>i</span>
					<span>p</span>
					<span>e</span>
				</p>
				<p className="wave-text slogan text-center">
					<span>S</span>
					<span>t</span>
					<span>o</span>
					<span>r</span>
					<span>i</span>
					<span>e</span>
					<span>s</span>
				</p>
			</div>

			<div className="slogan-2 text-center mb-5">Desliza, descubre</div>
			<div className="text-center mx-auto start">¿Empezamos?</div>
			<div className="text-center mx-auto mt-2 try">¡Pruébame!</div>
			<div className="d-flex text-center mx-auto justify-content-center pt-4">
				<div className="text-center">  
					<i className="fa-solid fa-angle-down"></i>
				</div>
			</div>       

			<Carousel
				responsive={responsive}
				swipeable={true}
				draggable={true}
				showDots={false}
				ssr={true}
				infinite={true}
				autoPlay={true}
				autoPlaySpeed={3000}
				keyBoardControl={true}
				customTransition="transform 1s ease"
				transitionDuration={1000}
				containerClass="carousel-container"
				removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
				itemClass="carousel-item-padding-40-px"
				className="mt-2 mb-5"
			>
				<div className="quote large-quote">
					Estás a un solo swipe de decir adiós al aburrimiento.
				</div>
				<div className="quote large-quote">
					Descubre géneros de los que jamás pensaste que formarías parte.
				</div>
				<div className="quote large-quote">
					Realiza formularios deslizables y almacena tus respuestas.
				</div>
				<div className="quote large-quote">
					Descubre qué ver, qué leer, qué vivir.
				</div>
				<div className="quote large-quote">
					Recomendaciones que te enganchan y te cambian.
				</div>
			</Carousel>

			<div className="d-flex text-center mx-auto justify-content-center pb-4">
				<div className="text-center">
					<i className="fa-solid fa-angle-up"></i>
				</div>
			</div>

			<div className="text-center slogan-3">       
				Deslízame y descubrirás todo lo que te ofrecemos.
			</div>
		</div>
	);
};
