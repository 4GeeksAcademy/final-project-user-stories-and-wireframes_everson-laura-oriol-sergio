export const Register = () => {
    const mensajeError = document.getElementsByClassName("error")[0];

    document.getElementById("register-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log(e.target.children.user.value)
        const res = await fetch("http://localhost:3001/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: e.target.children.user.value,
                email: e.target.children.email.value,
                password: e.target.children.password.value
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
                <h1>Crear cuenta</h1>
                <p>Creá tu cuenta para entrar al área de administración.</p>
                <form id="register-form">
                    <label for="user" class="sr-only">User</label>
                    <input type="text" name="user" id="user" placeholder="Nombre de usuario"></input>
                    <label for="email" class="sr-only">Email</label>
                    <input type="email" name="email" id="email" placeholder="Correo electrónico"></input>
                    <label for="password" class="sr-only">Password</label>
                    <input type="password" name="password" id="password" placeholder="Contraseña"></input>
                    <button type="submit">Iniciar sesión</button>
                    <p class="error escondido">Error al registrarse</p>
                </form>
                <p>¿Ya estás registrado? - <a href="/">Crear cuenta</a></p>
            </div>
        </main>
    )
};