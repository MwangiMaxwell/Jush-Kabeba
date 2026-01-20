import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import '../styles/Manifesto.css';

const Manifesto = () => {
  const pillars = [
    {
      icon: 'shield-check-fill',
      title: 'Enhanced Security',
      color: '#4CAF50',
      points: [
        'Community policing programs with regular patrols',
        'Improved street lighting in all neighborhoods',
        '24/7 security hotline for rapid response',
        'Neighborhood watch programs',
        'Partnership with local security agencies'
      ]
    },
    {
      icon: 'heart-pulse-fill',
      title: 'Family Welfare',
      color: '#E91E63',
      points: [
        'Healthcare access programs',
        'Family support services',
        'Elderly care programs',
      ]
    },
    {
      icon: 'people-fill',
      title: 'Youth Empowerment',
      color: '#2196F3',
      points: [
        'Skills training and workshops',
        'Job placement and career guidance',
        'Sports and recreation facilities',
        'Education support programs'
      ]
    },
    {
      icon: 'handshake-fill',
      title: 'Economic Growth',
      color: '#FF9800',
      points: [
        'SME support and market linkages',
        'Local business development programs',
        'Infrastructure improvements',
        'Investment attraction initiatives',
        'Trade and commerce facilitation'
      ]
    }
  ];

  const commitments = [
    { icon: 'check-circle-fill', text: 'Transparent governance with regular community updates' },
    { icon: 'check-circle-fill', text: 'Accountability in all projects and initiatives' },
    { icon: 'check-circle-fill', text: 'Community participation in decision-making' },
    { icon: 'check-circle-fill', text: 'Sustainable development practices' },
    { icon: 'check-circle-fill', text: 'Equal opportunities for all residents' }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="manifesto-hero">
        <Container>
          <div className="manifesto-hero-content">
            <Badge bg="light" text="dark" className="manifesto-badge mb-3">
              <i className="bi bi-file-text-fill me-2"></i>Our Promise
            </Badge>
            <h1 className="manifesto-title">Manifesto 2027</h1>
            <p className="manifesto-subtitle">
              A comprehensive plan to transform Clay City Ward through security, welfare, youth empowerment, and economic growth. 
              These are not just promises, they are commitments backed by action.
            </p>
          </div>
        </Container>
      </section>

      {/* Pillars Section */}
      <section className="manifesto-pillars">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Four Pillars of Progress</h2>
            <p className="section-subtitle">The foundation of our vision for Clay City</p>
          </div>
          <Row className="g-4">
            {pillars.map((pillar, index) => (
              <Col lg={6} key={index}>
                <Card className="pillar-card h-100">
                  <Card.Body className="p-4">
                    <div className="pillar-header mb-4">
                      <div className="pillar-icon-wrapper" style={{ '--pillar-color': pillar.color }}>
                        <i className={`bi bi-${pillar.icon} pillar-icon`}></i>
                      </div>
                      <h3 className="pillar-title">{pillar.title}</h3>
                    </div>
                    <ul className="pillar-points">
                      {pillar.points.map((point, i) => (
                        <li key={i} className="pillar-point">
                          <i className="bi bi-check-circle-fill me-2"></i>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Commitments Section */}
      <section className="manifesto-commitments">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Our Commitments</h2>
            <p className="section-subtitle">Principles that guide our actions</p>
          </div>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="commitments-card">
                <Card.Body className="p-4">
                  <ul className="commitments-list">
                    {commitments.map((commitment, index) => (
                      <li key={index} className="commitment-item">
                        <i className={`bi ${commitment.icon} commitment-icon`}></i>
                        <span>{commitment.text}</span>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="manifesto-cta">
        <Container>
          <div className="cta-content text-center">
            <h3 className="cta-title">Join Us in Building a Better Clay City</h3>
            <p className="cta-text">
              This manifesto represents our shared vision. Together, we can make it a reality. 
              Join the movement and be part of the transformation.
            </p>
            <div className="cta-buttons">
              <a href="/volunteer" className="btn btn-light btn-lg me-3">
                <i className="bi bi-person-plus me-2"></i>Become a Volunteer
              </a>
              <a href="/contact" className="btn btn-outline-light btn-lg">
                <i className="bi bi-chat-dots me-2"></i>Get Involved
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Manifesto;