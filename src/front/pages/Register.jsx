export const Register = () => {
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