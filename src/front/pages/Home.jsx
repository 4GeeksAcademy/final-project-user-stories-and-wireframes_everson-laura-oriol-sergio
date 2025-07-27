import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import backgroundImage from "../assets/img/biblioteca.jpg";


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
			className="d-flex justify-content-center align-items-center text-white text-center"
			style={{
				height: "100vh",
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				flexDirection: "column",
			}}
		>
			<h1 className="display-1 fw-bold" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}>
				WireFrames
			</h1>
			<p className="lead fs-4">Books,Movies,Podcast & a lot More</p>
			<div className="alert alert-info bg-opacity-75 mt-4">
				{store.message ? (
					<span>{store.message}</span>
				) : (
					<span className="text-danger">
						Loading message from backend...
					</span>
				)}
			</div>
		</div>
	);
};