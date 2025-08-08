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
	const { store, dispatch } = useGlobalReducer();

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL;
			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

			const response = await fetch(backendUrl + "/api/hello");
			const data = await response.json();

			if (response.ok) dispatch({ type: "set_hello", payload: data.message });
			return data;
		} catch (error) {
			throw new Error(
				"Could not fetch the message from the backend. Please check if the backend is running."
			);
		}
	};

	useEffect(() => {
		loadMessage();
	}, []);

	return (
		<div className="justify-content-center align-items-center text-center main">
			<div className="wave-container d-flex w-50 m-auto pt-4">
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
			<div className="text-center mx-auto mt-5 start">¿Empezamos?</div>
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
				className="my-4 mx-5 rounded-5 mb-5">
				<div className="quote large-quote">Estás a un solo “swipe” de decir adiós al aburrimiento.</div>
				<div className="quote large-quote">Descubre géneros de los que jamás pensaste que formarías parte.</div>
				<div className="quote large-quote">Realiza cuestionarios interactivos y revisa tu historial de respuestas.</div>
				<div className="quote large-quote">Descubre qué ver. Qué leer. Qué vivir.</div>
				<div className="quote large-quote">Recomendaciones que enganchan, recomendaciones que te cambian.</div>
			</Carousel>
		</div>
	);
};