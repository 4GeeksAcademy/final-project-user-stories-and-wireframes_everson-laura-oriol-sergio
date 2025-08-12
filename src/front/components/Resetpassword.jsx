import React, { useState } from "react";

export const Resetpassword = () => {


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