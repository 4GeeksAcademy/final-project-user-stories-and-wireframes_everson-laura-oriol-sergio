import style from "../pages/Perfil.module.css"

export const Perfil = () => {
    return (
        <div className={style.container}>
            <div className={`${style.left} rounded-5 p-5`}>
                <p>Foto</p>
                <p>Nombre y apellidos</p>
                <p>Correo electrónico</p>
            </div>
            <div className={`${style.right} rounded-5 p-5`}>
                <p>Respuestas registradas de la aplicación</p>
                <p>Sección para puntuar respuestas</p>
                <p>Enlace a tus redes sociales</p>
            </div>
        </div>
    );
};