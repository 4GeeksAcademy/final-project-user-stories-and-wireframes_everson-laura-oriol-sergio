export const Login = () => {
    const mensajeError = document.getElementsByClassName("error")[0]

    document.getElementById("login-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const user = e.target.children.user.value;
        const password = e.target.children.password.value;
        const res = await fetch("http://localhost:3001/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user, password
            })
        });
        if (!res.ok) return mensajeError.classList.toggle("escondido", false);
        const resJson = await res.json();
        if (resJson.redirect) {
            window.location.href = resJson.redirect;
        }
    })
    return (
        <main>
            <div class="form-container">
                <h1>Iniciar sesión</h1>
                <p>Ingresá tus credenciales para acceder al área de administración.</p>
                <form id="login-form">
                    <label for="user" class="sr-only">User</label>
                    <input type="text" name="user" id="user" placeholder="Nombre de usuario"></input>
                    <label for="password" class="sr-only">Password</label>
                    <input type="password" name="password" id="password" placeholder="Contraseña"></input>
                    <button type="submit">Iniciar sesión</button>
                    <p class="error escondido">Error al iniciar sesión</p>
                </form>
                <p>¿Todavía no tenés una cuenta? - <a href="/register">Registrate</a></p>
            </div>
        </main>
    )
};