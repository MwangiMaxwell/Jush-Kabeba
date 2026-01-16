import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import '../styles/About.css';

const About = () => {
  const timeline = [
    {
      year: 'Born & Raised',
      title: 'Rooted in Kasarani',
      description: 'A lifelong resident of Clay City Ward, Junior grew up understanding the daily challenges and dreams of our community.',
      icon: 'house-heart-fill'
    },
    {
      year: 'Community Service',
      title: 'Dedicated to Service',
      description: 'Throughout his career, Junior has been committed to community service, working tirelessly to improve the lives of Clay City residents.',
      icon: 'heart-fill'
    },
    {
      year: 'Last Election',
      title: '2nd Place - 10,000+ Votes',
      description: 'In the previous election, Junior secured over 10,000 votes, finishing a close second and proving the trust of the community.',
      icon: 'trophy-fill'
    },
    {
      year: '2027 Vision',
      title: 'Finishing What We Started',
      description: 'Now, with renewed energy and community support, Junior is ready to finish what we started—transforming Clay City into a beacon of security, welfare, and opportunity.',
      icon: 'flag-fill'
    }
  ];

  const values = [
    { icon: 'people-fill', title: 'Community First', desc: 'Putting the needs of Clay City residents at the heart of every decision' },
    { icon: 'shield-check-fill', title: 'Transparency', desc: 'Open, honest communication and accountability in all actions' },
    { icon: 'lightbulb-fill', title: 'Innovation', desc: 'Creative solutions to address local challenges effectively' },
    { icon: 'handshake-fill', title: 'Collaboration', desc: 'Working together with residents, organizations, and stakeholders' }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="about-hero">
        <Container>
          <div className="about-hero-content">
            <Badge bg="light" text="dark" className="about-badge mb-3">
              <i className="bi bi-person-badge-fill me-2"></i>Meet the Leader
            </Badge>
            <h1 className="about-title">About Junior Kabeba</h1>
            <p className="about-subtitle">
              A proven leader with deep roots in Clay City Ward, dedicated to finishing what we started and transforming our community for the better.
            </p>
          </div>
        </Container>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={6}>
              <div className="story-content">
                <h2 className="section-title">A Leader Rooted in Community</h2>
                <p className="story-text">
                  Junior Kabeba is a lifelong resident of Clay City Ward, Kasarani. Born and raised in this community, 
                  he has witnessed firsthand the challenges and opportunities that define our area. His deep understanding 
                  of local needs comes from years of living, working, and serving within these neighborhoods.
                </p>
                <p className="story-text">
                  In the last election, Junior demonstrated his commitment and vision by securing over 10,000 votes, 
                  finishing a close second. This strong showing proved the trust and confidence that residents have in 
                  his ability to lead and deliver on promises.
                </p>
                <p className="story-text">
                  Now, with renewed determination and community support, Junior is ready to finish what we started—bringing 
                  transformative change to Clay City through enhanced security, improved welfare, and empowered youth.
                </p>
              </div>
            </Col>
            <Col lg={6}>
              <div className="story-image-wrapper">
                <img 
                  src="/images/junior-hero.jpg" 
                  alt="Junior Kabeba" 
                  className="story-image"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Timeline Section */}
      <section className="about-timeline">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Journey & Milestones</h2>
            <p className="section-subtitle">A timeline of commitment and service</p>
          </div>
          <div className="timeline-container">
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item-wrapper">
                <div className="timeline-item">
                  <div className="timeline-icon">
                    <i className={`bi bi-${item.icon}`}></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-year">{item.year}</div>
                    <h4 className="timeline-title">{item.title}</h4>
                    <p className="timeline-description">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Core Values</h2>
            <p className="section-subtitle">The principles that guide our mission</p>
          </div>
          <Row className="g-4">
            {values.map((value, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="value-card h-100 text-center">
                  <Card.Body className="p-4">
                    <div className="value-icon">
                      <i className={`bi bi-${value.icon}`}></i>
                    </div>
                    <h5 className="value-title">{value.title}</h5>
                    <p className="value-desc">{value.desc}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <Container>
          <div className="cta-content text-center">
            <h3 className="cta-title">Join Us in Transforming Clay City</h3>
            <p className="cta-text">
              Together, we can finish what we started and build a stronger, safer, and more prosperous community for everyone.
            </p>
            <div className="cta-buttons">
              <a href="/volunteer" className="btn btn-light btn-lg me-3">
                <i className="bi bi-person-plus me-2"></i>Become a Volunteer
              </a>
              <a href="/contact" className="btn btn-outline-light btn-lg">
                <i className="bi bi-envelope me-2"></i>Get in Touch
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default About;