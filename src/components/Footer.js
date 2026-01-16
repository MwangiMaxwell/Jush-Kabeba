import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/manifesto', label: 'Manifesto' },
    { path: '/news', label: 'News' },
  ];

  const getInvolved = [
    { path: '/volunteer', label: 'Volunteer' },
    { path: '/voter', label: 'Register to Vote' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="custom-footer">
      <Container>
        <Row className="g-4">
          <Col md={4}>
            <div className="footer-section">
              <h5 className="footer-title">
                <i className="bi bi-flag-fill me-2"></i>
                Junior Kabeba
              </h5>
              <p className="footer-text">
                Transforming Clay City Ward through security, welfare, youth empowerment, and economic growth. 
                Join us in building a stronger community together.
              </p>
              <div className="social-links">
                <a href="https://chat.whatsapp.com/KfpZy480pQ13LysidCKuBp" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="bi bi-whatsapp"></i>
                </a>
                <a href="https://kabebajush.co.ke/donate" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="bi bi-heart-fill"></i>
                </a>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="footer-section">
              <h5 className="footer-title">Quick Links</h5>
              <ul className="footer-links">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="footer-link">
                      <i className="bi bi-chevron-right me-2"></i>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col md={4}>
            <div className="footer-section">
              <h5 className="footer-title">Get Involved</h5>
              <ul className="footer-links">
                {getInvolved.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="footer-link">
                      <i className="bi bi-chevron-right me-2"></i>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="donate-section mt-3">
                <a href="https://kabebajush.co.ke/donate" className="donate-btn" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-heart-fill me-2"></i>
                  Donate via M-Pesa
                </a>
              </div>
            </div>
          </Col>
        </Row>
        <hr className="footer-divider" />
        <Row>
          <Col>
            <div className="footer-bottom">
              <p className="footer-copyright">
                © {currentYear} Junior Kabeba for MCA Clay City Ward. All rights reserved.
              </p>
              <p className="footer-powered">
                Powered by <a href="#" className="footer-link"> Kaizen solutions</a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;