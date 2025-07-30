import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

export const Footer = () => {
  
  return (
    <div>
    <footer className="footer text-white py-4">
      <Container className="gap text-center d-flex justify-content-center">
        <a href="/" className="text-white">HOME</a>
        <a href="#" data-bs-toggle="modal" data-bs-target="#about" className="text-white">ABOUT US</a>
        <a href="#" className="text-white"><i class="fa-solid fa-moon"></i></a>
        <a href="#" className="text-white">CONDICIONES DE USO</a>
        <a href="#" className="text-white">POLITICA DE PRIVACIDAD</a>
        <a href="#" className="text-white"><i class="fa-solid fa-hands"></i></a>
        <a href="#" data-bs-toggle="modal" data-bs-target="#phone" className="text-white">LLAMANOS</a>
        <a href="#" data-bs-toggle="modal" data-bs-target="#mail" className="text-white">ESCRIBENOS</a>
        <a href="https://www.instagram.com/" target="_blank" className="text-white"><i class="fa-brands fa-instagram"></i></a>
        <a href="/" className="text-white">SwipeStories © {new Date().getFullYear()}</a>
      </Container>

      <div className="modal fade" tabindex="-1" id="phone">
        <div class="modal-dialog modal-dialog-centered">
          <div className="modal-content w-auto rounded-5 m-auto">
            <div className="modal-body text-center">
              +00 000 000
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" tabindex="-1" id="mail">
        <div class="modal-dialog modal-dialog-centered">
          <div className="modal-content w-auto rounded-5 m-auto">
            <div className="modal-body text-center">
              contact@swipestories.com
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" tabindex="-1" id="location">
        <div class="modal-dialog modal-dialog-centered">
          <div className="modal-content w-auto rounded-5 m-auto">
            <div className="modal-body text-center">
              Ciudad 00000, País
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" tabindex="-1" id="about">
        <div class="modal-dialog modal-dialog-centered">
          <div className="modal-content w-auto rounded-5 p-4 m-auto">
            <div className="modal-body text-center">
              <h1><strong>About SwipeStories</strong></h1>
              <hr/>
              <p>
                Welcome to WireFrames, your personalized recommendation hub.
                Through a simple form where you share your tastes and current mood whether you
                are bored, happy, sad, or looking for self-improvement
                we will suggest the best music to listen to, series to watch, and books to read.
              </p>
              <p>
                Our mission is to help you discover content that resonates with your 
                current moment and make your day a little more special.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <footer className="footer text-white py-4 mt-auto">
      <Container>
        <Row className="text-center text-md-start">

          <Col md={4} className="mb-3">
            <h5>Contacto</h5>
            <p className="mb-1">📧 contacto@wireframes.com</p>
            <p className="mb-1">📞 +1 234 567 890</p>
            <p className="mb-0">🏠 Calle Falsa 123, Ciudad</p>
          </Col>

          <Col md={4} className="d-flex flex-column align-items-center mb-3">
            <div className="mb-2">
              <a href="#" className="text-white mx-2 fs-4">
                <FaFacebook />
              </a>
              <a href="#" className="text-white mx-2 fs-4">
                <FaInstagram />
              </a>
              <a href="#" className="text-white mx-2 fs-4">
                <FaGithub />
              </a>
            </div>
            <small>WireFrames © {new Date().getFullYear()}</small>
          </Col>

          <Col md={4} className="mb-3 text-md-end text-center">
            <h5>Enlaces</h5>
            <p className="mb-1">
              <a href="/" className="text-white text-decoration-none">
                Home
              </a>
            </p>
            <p className="mb-1">
              <a href="/about" className="text-white text-decoration-none">
                About
              </a>
            </p>
            <p className="mb-0">
              <a href="/formulary" className="text-warning text-decoration-none">
                Formulary
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
    </div>
  );
};