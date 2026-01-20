import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const handleNavLinkClick = () => {
    setExpanded(false);
  };

  return (
    <Navbar expand="lg" fixed="top" className="custom-navbar" expanded={expanded} onToggle={setExpanded}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand" onClick={handleNavLinkClick}>
          <i className="bi bi-flag-fill me-2"></i>
          Kabeba for MCA
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'active' : ''} onClick={handleNavLinkClick}>
              <i className="bi bi-house-fill me-1"></i>Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={handleNavLinkClick}>
              <i className="bi bi-person-fill me-1"></i>About
            </Nav.Link>
            <Nav.Link as={Link} to="/manifesto" className={location.pathname === '/manifesto' ? 'active' : ''} onClick={handleNavLinkClick}>
              <i className="bi bi-file-text-fill me-1"></i>Manifesto
            </Nav.Link>
           
            <Nav.Link as={Link} to="/volunteer" className={location.pathname === '/volunteer' ? 'active' : ''} onClick={handleNavLinkClick}>
              <i className="bi bi-people-fill me-1"></i>Volunteer
            </Nav.Link>
            <Nav.Link as={Link} to="/voter" className={location.pathname === '/voter' ? 'active' : ''} onClick={handleNavLinkClick}>
              <i className="bi bi-person-check-fill me-1"></i>Register to Vote
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={handleNavLinkClick}>
              <i className="bi bi-envelope-fill me-1"></i>Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;