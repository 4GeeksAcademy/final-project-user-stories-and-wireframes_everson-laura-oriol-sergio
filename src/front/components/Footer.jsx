import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

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
    </div>
  );
};