import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/img/LOGO.png";

export const CustomNavbar = () => {
	return (
		<>
			<div class="container-fluid navbar-hori">
				<div class="navbar p-3">
					<div>
						<a href="/"><img class="logo" src={logo} /></a>
					</div>

					<div>
						<button id="button-2" class="rounded-3 btn me-2" data-bs-toggle="modal" data-bs-target="#logIn">Inicia sesión</button>
						<div class="modal fade" id="logIn" tabindex="-1" data-bs-backdrop="static" aria-labelledby="loginModalLabel" aria-hidden="true">
							<div class="modal-dialog modal-dialog-centered">
								<div class="modal-content p-4 rounded-5">
									<div class="modal-header border-0">
										<h4 class="modal-title w-100 text-center mb-3" id="loginModalLabel">Bienvenid@ a SwipeStories</h4>
										<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
									</div>
									<div class="modal-body">
										<form>
											<div class="mb-3">
												<input type="email" class="form-control form-control-lg rounded-pill" placeholder="Tu correo electrónico" />
											</div>
											<div class="password-wrapper mb-3">
												<input type="password" id="password" class="form-control form-control-lg rounded-pill" placeholder="Tu contraseña" />
												<button type="button" id="togglePassword" class="eye-btn" aria-label="Mostrar/Ocultar contraseña">
													<svg id="eyeOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
														<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
														<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
													</svg>
													<svg id="eyeClosed" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon hidden">
														<path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
													</svg>
												</button>
											</div>
											<div class="mb-3 text-center">
												<button id="button-3" type="submit" class="btn w-100 rounded-pill py-2">Inicia sesión</button>
											</div>
										</form>
										<div class="d-flex align-items-center my-3">
											<hr class="flex-grow-1" />
											<span class="px-2 text-muted">o</span>
											<hr class="flex-grow-1" />
										</div>
										<div class="mb-3">
											<button type="button"
												class="btn btn-light w-100 rounded-pill d-flex align-items-center justify-content-center gap-2 py-2">
												<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="20" />
												<span>Continua con Google</span>
											</button>
										</div>
										<div class="text-center mb-2 text-muted">
											¿No tienes cuenta? <a href="#" data-bs-toggle="modal" data-bs-target="#signUp" class="text-decoration-none">Regístrate</a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<button id="button-1" class="rounded-3 btn" data-bs-toggle="modal" data-bs-target="#signUp" > Regístrate </button>
						<div class="modal fade" data-bs-backdrop="static" id="signUp" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
							<div class="modal-dialog modal-dialog-centered">
								<div class="modal-content p-4 rounded-5">
									<div class="modal-header border-0">
										<h4 class="modal-title w-100 text-center mb-3" id="loginModalLabel">Bienvenid@ a SwipeStories</h4>
										<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
									</div>
									<div class="modal-body">
										<form>
											<div class="mb-3">
												<input type="text" class="form-control form-control-lg rounded-pill" placeholder="Tu nombre completo" />
											</div>
											<div class="mb-3">
												<input type="email" class="form-control form-control-lg rounded-pill" placeholder="Tu correo electrónico" />
											</div>
											<div class="mb-3">
												<input type="text" class="form-control form-control-lg rounded-pill" placeholder="Crea tu nombre de usuario" />
											</div>
											<div class="password-wrapper mb-3">
												<input type="password" id="signUpPassword" class="form-control form-control-lg rounded-pill" placeholder="Tu contraseña" />
												<button type="button" id="toggleSignupPassword" class="eye-btn" aria-label="Mostrar/Ocultar contraseña">
													<svg id="eyeSignupOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
														<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
														<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
													</svg>
													<svg id="eyeSignupClosed" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon hidden">
														<path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
													</svg>
												</button>
											</div>
											<div class="mb-3">
												<input type="date" class="form-control form-control-lg rounded-pill" placeholder="Fecha de nacimiento" />
											</div>
											<div class="d-flex form-check form-switch text-center mb-3 justify-content-center align-content-center">
												<input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
												<label class="form-check-label ms-2" for="flexSwitchCheckDefault">Recuérdame</label>
											</div>
											<div class="mb-3 text-center">
												<button type="submit" id="button-3" class="btn w-100 rounded-pill py-2">Regístrame</button>
											</div>
											<div class="text-center mb-3 text-muted">
												¿Ya tienes cuenta? <a href="#" data-bs-toggle="modal" data-bs-target="#logIn" class="text-decoration-none ">Inicia sesión</a>
											</div>
											<div class="text-center text-muted">
												<small>Al continuar, aceptas nuestras <a href="#" data-bs-toggle="modal" data-bs-target="#condicionesDeServicio" class="text-decoration-none"> Condiciones de servicio </a> y <a href="#" data-bs-toggle="modal" data-bs-target="#politicaPrivacidad" class="text-decoration-none"> Política de privacidad</a>.</small>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal fade" data-bs-backdrop="static" id="condicionesDeServicio" tabindex="-1" aria-labelledby="condicionesLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-scrollable modal-lg">
					<div class="modal-content p-4 rounded-5">
						<div class="modal-header">
							<h3 id="condicionesLabel">Condiciones de servicio</h3>
							<button type="button" class="btn-close" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#signUp" aria-label="Cerrar"></button>
						</div>
						<div class="modal-body">
							<div class="text-center mt-4 mb-4">
								<h5>¡Gracias por usar Swipe Stories!</h5>
								<small class="text-muted">Última actualización: 24 de julio de 2025</small>
							</div>
							<h4>1. Uso del sitio</h4>
							<p>Swipe Stories está diseñado para ayudarte a descubrir series, libros y películas según tus
								gustos. No debes utilizar esta página para actividades ilegales, fraudulentas o que interfieran
								con su correcto funcionamiento.</p>
							<h4>2. Cuenta de usuario</h4>
							<p>En caso de que decidas crear una cuenta, eres responsable de mantener la confidencialidad de tu
								contraseña y de toda actividad que ocurra bajo tu cuenta.</p>
							<h4>3. Contenido</h4>
							<p>Todo el contenido que aparece en Swipe Stories (textos, logos, recomendaciones, etc.) es
								propiedad del sitio o de terceros con los que colaboramos. No puedes copiar, reproducir o
								redistribuir nuestro contenido sin permiso.</p>
							<h4>4. Cambios en las condiciones</h4>
							<p>Podemos actualizar estas condiciones en cualquier momento. Te notificaremos si hay cambios
								importantes. El uso continuado del sitio después de cualquier modificación implica que aceptas
								los nuevos términos.</p>
						</div>
					</div>
				</div>
			</div>
		</>

	);
};