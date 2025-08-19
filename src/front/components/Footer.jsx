import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

export const Footer = () => {
  useEffect(() => {
    const storageKey = 'theme-preference';

    const theme = {
      value: getColorPreference(),
    };

    function getColorPreference() {
      if (localStorage.getItem(storageKey)) {
        return localStorage.getItem(storageKey);
      } else {
        return window.matchMedia('(prefers-color-scwheme: dark)').matches
          ? 'dark'
          : 'light';
      }
    }

    function setPreference() {
      localStorage.setItem(storageKey, theme.value);
      reflectPreference();
    }

    function reflectPreference() {
      document.documentElement.setAttribute('data-theme', theme.value);
      const toggle = document.querySelector('#theme-toggle');
      if (toggle) {
        toggle.setAttribute('aria-label', theme.value);
      }
    }

    function onClick() {
      theme.value = theme.value === 'light' ? 'dark' : 'light';
      setPreference();
    }

    reflectPreference(); // apply on initial render

    const toggleButton = document.querySelector('#theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', onClick);
    }

    // Escuchar cambios del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const systemChangeHandler = ({ matches: isDark }) => {
      theme.value = isDark ? 'dark' : 'light';
      setPreference();
    };

    mediaQuery.addEventListener('change', systemChangeHandler);

    // Limpieza al desmontar
    return () => {
      if (toggleButton) {
        toggleButton.removeEventListener('click', onClick);
      }
      mediaQuery.removeEventListener('change', systemChangeHandler);
    };
  }, []);

  return (
    <footer className="footer pb-4 pt-5">
      <ul className="menu-list justify-content-center">
        <li style={{ '--i': '#ffffcc', '--j': '#ccccff' }}>
          <span className="icon"><ion-icon name="home-outline"></ion-icon></span>
          <span className="title"> <a href="/" className="text-decoration-none">Home</a></span>
        </li>
        <li style={{ '--i': '#ccccff', '--j': '#ffffcc' }}>
          <span className="icon"><ion-icon name="information-circle-outline"></ion-icon></span>
          <span className="title"> <a href="#" data-bs-toggle="modal" data-bs-target="#aboutUs" className="text-decoration-none"> About us </a></span>
        </li>
        <li style={{ '--i': '#ffffcc', '--j': '#ccccff' }}>
          <span className="icon"><ion-icon name="document-outline"></ion-icon></span>
          <span className="title uso"> <a href="#" data-bs-toggle="modal" data-bs-target="#condicionesDeServicio2" className="text-decoration-none"> Condiciones de uso </a> </span>
        </li>
        <li style={{ '--i': '#ccccff', '--j': '#ffffcc' }}>
          <span className="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
          <span className="title"> <a href="#" data-bs-toggle="modal" data-bs-target="#politicaPrivacidad2" className="text-decoration-none"> Política de privacidad</a> </span>
        </li>
        <li style={{ '--i': '#ffffcc', '--j': '#ccccff' }}>
          <span className="icon"><ion-icon name="at-outline"></ion-icon></span>
          <span className="title">contact@swipestories.com</span>
        </li>
        <p className="name my-auto">Swipe Stories © {new Date().getFullYear()}</p>
        <div className="btn-group dropup dropup-center">
          <button id="language" type="button" className="btn px-3 dropdown-toggle no-caret" data-bs-toggle="dropdown">
            <i className="fa-solid fa-globe"></i>
          </button>
          <ul className="dropdown-menu idiomas p-2">
            <li className="idioma mb-2"><a className="dropdown-item" href="#">Español</a></li>
            <li className="idioma"><a className="dropdown-item" href="#">Inglés</a></li>
          </ul>
        </div>
        <button
          className="theme-toggle btn"
          id="theme-toggle"
          title="Toggles light & dark"
          aria-label="auto"
          aria-live="polite"
        >
          <svg className="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
            <mask className="moon" id="moon-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <circle cx="24" cy="10" r="6" fill="black" />
            </mask>
            <circle className="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
            <g className="sun-beams" stroke="currentColor">
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </g>
          </svg>
        </button>
      </ul>

      <div class="modal fade" data-bs-backdrop="static" id="condicionesDeServicio2" tabindex="-1" aria-labelledby="condicionesLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
          <div class="modal-content p-4 rounded-5">
            <div class="modal-header">
              <h3 id="condicionesLabel">Condiciones de uso</h3>
              <button type="button" class="btn-close" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#" aria-label="Cerrar"></button>
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

      <div class="modal fade" data-bs-backdrop="static" id="politicaPrivacidad2" tabindex="-1" aria-labelledby="politicaLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
          <div class="modal-content p-4 rounded-5">
            <div class="modal-header">
              <h3 id="politicaLabel" class="text-center">Política de privacidad</h3>
              <button type="button" class="btn-close" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
              <div class="text-center mt-4 mb-4">
                <h5>¡Gracias por usar Swipe Stories!</h5>
                <small class="text-muted">Última actualización: 24 de julio de 2025</small>
              </div>
              <h4>1. Información que recopilamos</h4>
              <p>Podemos recopilar:</p>
              <ul>
                <li>Tu nombre, correo electrónico y datos de acceso (si decides registrarte).</li>
                <li>Preferencias de contenido (para ofrecerte mejores recomendaciones).</li>
                <li>Datos de uso del sitio (como páginas visitadas y tiempo de navegación).</li>
              </ul>
              <h4>2. Uso de tu información</h4>
              <p>Usamos tu información para:</p>
              <ul>
                <li>Mejorar tus recomendaciones personalizadas.</li>
                <li>Gestionar tu cuenta de usuario (si procede).</li>
                <li>Entender mejor cómo se utiliza la web para seguir mejorándola.</li>
              </ul>
              <h4>3. Cookies</h4>
              <p>Usamos cookies para analizar el tráfico y mejorar la experiencia del usuario. Puedes desactivarlas desde la configuración de tu navegador.</p>
              <h4>4. Compartir datos</h4>
              <p>No vendemos ni compartimos tus datos con terceros, salvo que sea estrictamente necesario para operar el servicio (por ejemplo, servicios de análisis como Google Analytics).</p>
              <h4>5. Tus derechos</h4>
              <p>Tienes derecho a acceder, rectificar o eliminar tus datos personales. Para ejercer estos derechos, puedes escribirnos a contact@swipestories.com.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade aboutUs" data-bs-backdrop="static" id="aboutUs" tabindex="-1" aria-labelledby="condicionesLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-lg aboutUs">
          <div class="modal-content p-4 rounded-5 aboutUs">
            <div class="modal-header">
              <h3 id="condicionesLabel">About us</h3>
              <button type="button" class="btn-close" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
              <div class="text-center mt-4 mb-4">
                <h5>¡Gracias por usar Swipe Stories!</h5>
                <small class="text-muted">Última actualización: 24 de julio de 2025</small>
              </div>
              <h4>¿Qué te ofrecemos?</h4>
              <p>Swipe Stories es una página web creada para que puedas dar fin a tu aburrimiento si te encanta ver series, películas y/o leer.
                Nuestro propósito es ayudarte a escoger cual de estas tres actividades hacer, y también cómo hacerla: ¿Empiezo algo nuevo?
                ¿Repito mi historia favorita? ¿Qué novedades hay este mes? ¿Me implico en una saga/serie larga o mejor algo corto?</p>
              <p>Puedes resolver todas estas dudas y más realizando nuestro formulario deslizable, el cual almacenará todas tus respuestas obtenidas
                para poder verlas siempre que quieras desde tu perfil de usuario.
              </p>
              <h4>¿De dónde nace este proyecto?</h4>
              <p>Swipe Stories nace como un proyecto de final de curso de Desarrollo Full-Stack, donde cuatro alumnos invierten su tiempo,
                creatividad y conocimientos aprendidos en crear esta página web para que cualquier persona como tú pueda disfrutarla.</p>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};