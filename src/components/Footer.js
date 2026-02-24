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
          <Col md={3}>
            <div className="footer-section">
              <h5 className="footer-title">
                 Kabeba (Jush)
              </h5>
              <p className="footer-text">
                Transforming Clay City Ward through security, welfare, youth empowerment, and economic growth.
                Join us in building a stronger community together.
              </p>
            </div>
          </Col>
          <Col md={3}>
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
          <Col md={3}>
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
                <Link to="/coming-soon" className="donate-btn">
                  <i className="bi bi-heart-fill me-2"></i>
                  Donate via M-Pesa
                </Link>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="footer-section">
              <h5 className="footer-title">Follow Us</h5>
              <div className="social-links-vertical">
                <a href="https://x.com/jeremiahkabeba?s=21" target="_blank" rel="noopener noreferrer" className="social-link-simple">
                  <i className="bi bi-twitter"></i>
                  <span>X (Twitter)</span>
                </a>
                <a href="https://whatsapp.com/channel/0029Va8We4EHrDZjn7ZqFC1T" target="_blank" rel="noopener noreferrer" className="social-link-simple">
                  <i className="bi bi-whatsapp"></i>
                  <span>WhatsApp</span>
                </a>
                <a href="https://www.instagram.com/kabebamweu?igsh=bnQ0NWFoeXBuNWN3" target="_blank" rel="noopener noreferrer" className="social-link-simple">
                  <i className="bi bi-instagram"></i>
                  <span>Instagram</span>
                </a>
                <a href="https://www.facebook.com/Kabebamweu/
" target="_blank" rel="noopener noreferrer" className="social-link-simple">
                  <i className="bi bi-facebook"></i>
                  <span>Facebook</span>
                </a>
                <a href="https://www.threads.com/@kabebamweu?igshid=NTc4MTIwNjQ2YQ==" target="_blank" rel="noopener noreferrer" className="social-link-simple">
                  <i className="bi bi-threads"></i>
                  <span>Threads</span>
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
                © {currentYear}  Kabeba for MCA Clay City Ward. All rights reserved.
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