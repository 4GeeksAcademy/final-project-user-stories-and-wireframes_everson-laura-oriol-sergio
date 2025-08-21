import React, { useState } from "react";
import { useParams } from "react-router-dom";

export const Resetpassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const backendUrl = import.meta.env.VITE_BACKEND_URL + "/";

    const handleSubmit = async (e) => {
        console.log("Token recibido:", token);
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Las contraseñas no coinciden.");
            return;
        }
        try {
            const res = await fetch(backendUrl + "api/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "password": password, "token": token })
            });
            const data = await res.json();
            if (res.ok) {
                setMessage("Contraseña restablecida correctamente.");
            } else {
                setMessage(data.msg || "Error al restablecer la contraseña.");
            }
        } catch (error) {
            setMessage("Error al conectar con el servidor.");
        }
    };
    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h2>Restablecer contraseña</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nueva contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirmar contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Restablecer
                </button>
            </form>
            {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
    );
};