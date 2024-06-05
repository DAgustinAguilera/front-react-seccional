import Container from 'react-bootstrap/Container';
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';


export const NavBar = () => {
  return (
    <Navbar  className='d-flex' bg="light" expand="lg">
    <Container >
      <Navbar.Brand as={Link} to="/"><Image className='logo' src="../public/img/logo1.png" rounded /></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/reportes">Reporte diario</Nav.Link>
          <Nav.Link as={Link} to="/informe">Informe</Nav.Link>
          <Nav.Link as={Link} to="/DashBoard">DashBoard</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
