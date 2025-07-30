import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const CustomNavbar = () => {
	return (
		<Navbar expand="lg" bg="dark" variant="dark" sticky="top">
			<Container>
				<Navbar.Brand as={Link} to="/">WireFrames</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbar-nav" />
				<Navbar.Collapse id="navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/">Home</Nav.Link>
						<Nav.Link as={Link} to="/about">About</Nav.Link>
						<Nav.Link as={Link} to="/perfil">My Perfil</Nav.Link>
						<Nav.Link as={Link} to="/history">My History</Nav.Link>
					</Nav>
					<div className="d-flex gap-2">
						<Nav.Link as={Link} to= "/formulary">	
						<Button variant="warning">Begin Formulary</Button>
						</Nav.Link>
						<Button variant="outline-light">Close Section</Button>
					</div>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};