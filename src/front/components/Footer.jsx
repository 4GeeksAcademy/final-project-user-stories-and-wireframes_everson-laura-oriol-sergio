import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import "https://unpkg.com/open-props/easings.min.css";

export const Footer = () => {
  const storageKey = "theme-preference";

  const getColorPreference = () => {
    if (localStorage.getItem(storageKey))
      return localStorage.getItem(storageKey);
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState(getColorPreference());

  const reflectPreference = (currentTheme) => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    const toggle = document.querySelector("#theme-toggle");
    if (toggle) {
      toggle.setAttribute("aria-label", currentTheme);
    }
  };

  const setPreference = (newTheme) => {
    localStorage.setItem(storageKey, newTheme);
    reflectPreference(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setPreference(newTheme);
  };

  useEffect(() => {
    reflectPreference(theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      const isDark = e.matches;
      const systemTheme = isDark ? "dark" : "light";
      setTheme(systemTheme);
      setPreference(systemTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <footer className="footer p-2 pt-4">
      <hr className="mb-4"/>
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
        <li style={{ '--i': '#583722', '--j': '#bdd7de' }}>
          <span className="icon"><ion-icon name="logo-instagram"></ion-icon></span>
          <span className="title">Instagram</span>
        </li>
        <p className="name my-auto">Swipe Stories © {new Date().getFullYear()}</p>
        <li style={{ '--i': '#bdd7de', '--j': '#583722' }}>
          <span className="icon"><ion-icon name="language-outline"></ion-icon></span>
          <span className="title">Idioma</span>
        </li>
        <button className="theme-toggle" id="theme-toggle" title="Toggles light & dark" aria-label="auto" aria-live="polite">
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

/*
export const Footer = () => {
  
  return (
    <div>
    <footer className="footer text-white py-4">
      <Container className="gap text-center d-flex justify-content-center">
        <a href="/" className="text-white">Home</a>
        <a href="#" data-bs-toggle="modal" data-bs-target="#about" className="text-white">About us</a>
        <a href="#" className="text-white"><i class="fa-solid fa-moon"></i></a>
        <a href="#" className="text-white">Condiciones de uso</a>
        <a href="#" className="text-white">Política de privacidad</a>
        <a href="#" className="text-white"><i class="fa-solid fa-hands"></i></a>
        <a href="#" data-bs-toggle="modal" data-bs-target="#phone" className="text-white">Llámanos</a>
        <a href="#" data-bs-toggle="modal" data-bs-target="#mail" className="text-white">Escríbenos</a>
        <a href="https://www.instagram.com/" target="_blank" className="text-white"><i class="fa-brands fa-instagram"></i></a>
        <a href="/" className="text-white">Swipe Stories © {new Date().getFullYear()}</a>
      </Container>
  );
};*/