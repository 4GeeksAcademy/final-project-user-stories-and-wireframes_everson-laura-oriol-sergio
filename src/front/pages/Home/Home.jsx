import React, { useEffect } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";
import { Container } from "react-bootstrap";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
	superLargeDesktop: {
		breakpoint: { max: 4000, min: 3000 },
		items: 1
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 1
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 1
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1
	}
};

export const Home = () => {

	return (

		<div className="justify-content-center align-items-center text-center main">
			<div class="sticker-container">
				<img src="src/front/assets/img/pegatina1.png" class="sticker" draggable="false" id="sticker1" />
				<img src="src/front/assets/img/pegatina2.png" class="sticker" draggable="false" id="sticker2" />
				<img src="src/front/assets/img/pegatina3.png" class="sticker" draggable="false" id="sticker3" />
				<img src="src/front/assets/img/pegatina4.png" class="sticker" draggable="false" id="sticker4" />
				<img src="src/front/assets/img/pegatina5.png" class="sticker" draggable="false" id="sticker5" />
			</div>
			<div className="wave-container d-flex w-50 m-auto pt-5">
				<p className="wave-text slogan text-center swipestories">
					<span>S</span>
					<span>w</span>
					<span>i</span>
					<span>p</span>
					<span>e</span>
				</p>
				<p className="wave-text slogan text-center swipestories2">
					<span>S</span>
					<span>t</span>
					<span>o</span>
					<span>r</span>
					<span>i</span>
					<span>e</span>
					<span>s</span>
				</p>
			</div>
			<div className="slogan-2 text-center mb-5" id="desliza">Desliza, descubre</div>
			<div className="text-center mx-auto start">¿Empezamos?</div>
			<div className="text-center mx-auto mt-2 try">¡Pruébame!</div>
			<div className="d-flex text-center mx-auto justify-content-center pt-4">
				<div className="text-center"><i className="fa-solid fa-angle-down"></i></div>
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
				className="mt-2 mb-5">
				<div className="quote large-quote">Estás a un solo swipe de decir adiós al aburrimiento.</div>
				<div className="quote large-quote">Descubre géneros de los que jamás pensaste que formarías parte.</div>
				<div className="quote large-quote">Realiza formularios deslizables y almacena tus respuestas.</div>
				<div className="quote large-quote">Descubre qué ver, qué leer, qué vivir.</div>
				<div className="quote large-quote">Recomendaciones que te enganchan y te cambian.</div>
			</Carousel>

			<div className="d-flex text-center mx-auto justify-content-center pb-4">
				<div className="text-center"><i className="fa-solid fa-angle-up"></i></div>
			</div>

			<div className="text-center slogan-3">Deslízame y descubrirás todo lo que te ofrecemos.</div>
		</div>
	);
};