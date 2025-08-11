import style from "../pages/Perfil.module.css"

export const Perfil = () => {
    return (
        <div className={style.container}>
            <div className={`${style.left} rounded-5`}>
                <div className={`${style.leftContent} my-auto`}>
                    <div className={`${style.userPhoto} rounded-5`}>
                        <p>Foto</p>
                    </div>
                    <p>Nombre y apellidos</p>
                    <p>Correo electrónico</p>
                    <p>Cambia tu contraseña</p>
                </div>
            </div>
            <div className={`${style.right} rounded-5`}>
                <div className={`${style.rightContent} my-auto`}>
                    <p>Respuestas registradas de la aplicación</p>
                    <p>Sección para puntuar respuestas</p>
                    <p>Enlace a tus redes sociales</p>
                </div>
            </div>
        </div>
    );
};