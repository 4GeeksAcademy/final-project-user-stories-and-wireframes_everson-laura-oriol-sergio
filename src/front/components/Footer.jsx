import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

export const Footer = () => {

  return (
    <ul className="menu-list footer justify-content-center">
      <li style={{ '--i': '#6080b2', '--j': '#dddddd' }}>
        <span className="icon"><ion-icon name="home-outline"></ion-icon></span>
        <span className="title">Home</span>
      </li>
      <li style={{ '--i': '#dddddd', '--j': '#6080b2' }}>
        <span className="icon"><ion-icon name="information-circle-outline"></ion-icon></span>
        <span className="title">About us</span>
      </li>
      <li style={{ '--i': '#6080b2', '--j': '#dddddd' }}>
        <span className="icon"><ion-icon name="document-outline"></ion-icon></span>
        <span className="title uso">Condiciones de uso</span>
      </li>
      <li style={{ '--i': '#dddddd', '--j': '#6080b2' }}>
        <span className="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
        <span className="title">Política de privacidad</span>
      </li>
      <li style={{ '--i': '#6080b2', '--j': '#dddddd' }}>
        <span className="icon"><ion-icon name="call-outline"></ion-icon></span>
        <span className="title">+34 000000000</span>
      </li>
      <li style={{ '--i': '#dddddd', '--j': '#6080b2' }}>
        <span className="icon"><ion-icon name="at-outline"></ion-icon></span>
        <span className="title">contact@swipestories.com</span>
      </li>
      <li style={{ '--i': '#6080b2', '--j': '#dddddd' }}>
        <span className="icon"><ion-icon name="logo-instagram"></ion-icon></span>
        <span className="title">Instagram</span>
      </li>
      <li style={{ '--i': '#dddddd', '--j': '#6080b2' }}>
        <span className="icon"><ion-icon name="language-outline"></ion-icon></span>
        <span className="title">Idioma</span>
      </li>
      <li style={{ '--i': '#6080b2', '--j': '#dddddd' }}>
        <span className="icon"><ion-icon name="sunny-outline"></ion-icon></span>
        <span className="title">Modo claro</span>
      </li>
      <li style={{ '--i': '#dddddd', '--j': '#6080b2' }}>
        <span className="icon"><ion-icon name="moon-outline"></ion-icon></span>
        <span className="title">Modo oscuro</span>
      </li>
    </ul>
  );
};

{/*
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
};*/}