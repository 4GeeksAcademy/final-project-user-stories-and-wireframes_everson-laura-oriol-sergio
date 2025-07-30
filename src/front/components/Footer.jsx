import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row className="text-center text-md-start">
          {/* Columna de contacto */}
          <Col md={4} className="mb-3">
            <h5>Contacto</h5>
            <p className="mb-1">📧 contacto@wireframes.com</p>
            <p className="mb-1">📞 +1 234 567 890</p>
            <p className="mb-0">🏠 Calle Falsa 123, Ciudad</p>
          </Col>

          {/* Columna central con redes sociales */}
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

          {/* Columna de enlaces */}
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
  );
};