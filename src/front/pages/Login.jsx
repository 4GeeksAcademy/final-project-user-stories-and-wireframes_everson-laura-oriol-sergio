export const Login = () => {
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