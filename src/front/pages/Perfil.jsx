import style from "../pages/Perfil.module.css"

export const Perfil = () => {
    return (
        <div className={style.container}>
            <div className={`${style.left} rounded-5`}>
                Tu perfil
            </div>
            <div className={`${style.right} rounded-5`}>
                Tu información
            </div>
        </div>
    );
};