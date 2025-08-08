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
        return window.matchMedia('(prefers-color-scheme: dark)').matches
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
    <footer className="footer p-2 pt-4">
      <hr className="mb-4" />
      <ul className="menu-list justify-content-center">
        <li style={{ '--i': '#583722', '--j': '#bdd7de' }}>
          <span className="icon"><ion-icon name="home-outline"></ion-icon></span>
          <span className="title">Home</span>
        </li>
        <li style={{ '--i': '#bdd7de', '--j': '#583722' }}>
          <span className="icon"><ion-icon name="information-circle-outline"></ion-icon></span>
          <span className="title">About us</span>
        </li>
        <li style={{ '--i': '#583722', '--j': '#bdd7de' }}>
          <span className="icon"><ion-icon name="document-outline"></ion-icon></span>
          <span className="title uso">Condiciones de uso</span>
        </li>
        <li style={{ '--i': '#bdd7de', '--j': '#583722' }}>
          <span className="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
          <span className="title">Política de privacidad</span>
        </li>
        <li style={{ '--i': '#583722', '--j': '#bdd7de' }}>
          <span className="icon"><ion-icon name="call-outline"></ion-icon></span>
          <span className="title">+34 000000000</span>
        </li>
        <li style={{ '--i': '#bdd7de', '--j': '#583722' }}>
          <span className="icon"><ion-icon name="at-outline"></ion-icon></span>
          <span className="title">contact@swipestories.com</span>
        </li>
        <li className="me-5" style={{ '--i': '#583722', '--j': '#bdd7de' }}>
          <span className="icon"><ion-icon name="logo-instagram"></ion-icon></span>
          <span className="title">Instagram</span>
        </li>
        <p className="name my-auto ms-5">Swipe Stories © {new Date().getFullYear()}</p>
        <button id="language" className="btn rounded-5">LANG</button>
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
    </footer>
  );
};