import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import pegatina1 from "../assets/img/pegatina1.png";
import pegatina2 from "../assets/img/pegatina2.png";
import pegatina3 from "../assets/img/pegatina3.png";
import pegatina4 from "../assets/img/pegatina4.png";
import pegatina5 from "../assets/img/pegatina5.png";


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
		<div
			className="d-flex justify-content-center align-items-center text-white text-center main "
		>
			<div class="sticker-container">
				<img src={pegatina1} class="sticker" draggable="false" id="sticker1" />
				<img src={pegatina2} class="sticker" draggable="false" id="sticker2" />
				<img src={pegatina3} class="sticker" draggable="false" id="sticker3" />
				<img src={pegatina4} class="sticker" draggable="false" id="sticker4" />
				<img src={pegatina5} class="sticker" draggable="false" id="sticker5" />
			</div>
			<h1 className="title">Swipe Stories</h1>


		</div>

	);
};