import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Carousel, Badge } from 'react-bootstrap';
import '../styles/Home.css';

const Home = () => {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150); // ms per char

  const slogans = [
    "Let's Finish What We Started",
    'Build a Stronger Clay City—Together',
    'Junior Kabeba for MCA 2027'
  ];


  // Simple Typewriter Effect
  useEffect(() => {
    const handleType = () => {
      const current = slogans[currentSlogan];
      if (isDeleting) {
        setDisplayText(current.substring(0, displayText.length - 1));
      } else {
        setDisplayText(current.substring(0, displayText.length + 1));
      }
    };

    let timer;
    if (!isDeleting && displayText === slogans[currentSlogan]) {
      // Pause at end, then delete
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && displayText === '') {
      // Move to next slogan
      setIsDeleting(false);
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    } else {
      // Type or delete
      timer = setTimeout(handleType, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentSlogan, displayText, isDeleting, typingSpeed, slogans]);

  const testimonials = [
    { text: "Junior Kabeba is the visionary leader Clay City needs. His commitment to youth empowerment changed my life!", name: "Aisha M., Youth Leader", rating: 5 },
    { text: "From safer streets to family welfare—Junior's plans are real and actionable. Proud to support!", name: "David K., Resident", rating: 5 },
    { text: "In the last election, he fought hard. Now, let's finish what we started together!", name: "Fatuma N., Community Elder", rating: 5 },
    { text: "Empowering women through skills training—Junior gets it. Clay City will thrive!", name: "Sarah W., Women's Group", rating: 4 },
  ];

  const stats = [
    { label: 'Supporters Gained', value: 10000, suffix: '+', icon: 'people-fill' },
    { label: 'Projects Promised', value: 50, suffix: '', icon: 'clipboard-check' },
    { label: 'Voters Mobilized', value: 5000, suffix: '+', icon: 'ballot' },
  ];

  const pillars = [
    { icon: 'shield-check', title: 'Enhanced Security', desc: 'Community policing and street lighting for safer nights in Kasarani.', color: '#4CAF50' },
    { icon: 'heart-pulse', title: 'Family Welfare', desc: 'Affordable housing and health programs to uplift every home.', color: '#E91E63' },
    { icon: 'people', title: 'Youth Empowerment', desc: 'Job training, skills workshops, and startup grants for our future leaders.', color: '#2196F3' },
    { icon: 'handshake', title: 'Economic Growth', desc: 'Market linkages and SME support to boost local businesses.', color: '#FF9800' },
  ];

  const newsItems = [
    { title: 'Town Hall Recap: Security Wins', excerpt: 'Junior outlines plan for 24/7 patrols—community cheers!', img: '/images/news1-placeholder.jpg', date: 'Jan 15, 2024' },
    { title: 'Youth Forum Success', excerpt: 'Over 200 attended; skills bootcamp announced for Feb.', img: '/images/news2-placeholder.jpg', date: 'Jan 10, 2024' },
    { title: 'Welfare Update', excerpt: 'New family aid program launches—apply now!', img: '/images/news3-placeholder.jpg', date: 'Jan 5, 2024' },
  ];

  return (
    <>
      {/* Hero Section: Cinematic Entry */}
      <section className="home-hero">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={6}>
              <div className="hero-image-wrapper">
                <img 
                  src="/images/junior-hero.jpg" 
                  alt="Junior Kabeba" 
                  className="hero-image"
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-content">
                <div className="hero-badge mb-4">
                  <Badge bg="light" text="dark" className="px-4 py-2">2027 MCA </Badge>
                </div>
                <div className="typewriter-text typing">
                  {displayText}
                  <span className="cursor">|</span>
                </div>
                <p className="hero-subtitle">
                  A proven leader from Kasarani, finishing 2nd last election. Now, with your voice, we transform Clay City Ward into a beacon of security, welfare, and opportunity.
                </p>
                <div className="hero-cta">
                  <Button variant="light" size="lg" className="hero-btn-primary me-3" href="/volunteer">
                    Join the Movement
                  </Button>
                  <Button variant="outline-light" size="lg" className="hero-btn-secondary" href="/about">
                    Learn More
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Counters: Momentum Builder */}
      <section className="stats-section">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Our Impact</h2>
            <p className="section-subtitle">Building momentum for Clay City's future</p>
          </div>
          <Row className="g-4">
            {stats.map((stat, i) => (
              <Col key={i} md={4} className="mb-4">
                <Card className="stat-card h-100 text-center">
                  <Card.Body className="p-4">
                    <div className="stat-icon">
                      <i className={`bi bi-${stat.icon}`}></i>
                    </div>
                    <div className="stats-counter">{stat.value.toLocaleString()}{stat.suffix}</div>
                    <h5 className="stat-label">{stat.label}</h5>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* About Timeline: Personal Journey */}
      <section className="journey-section">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Junior's Journey</h2>
            <p className="section-subtitle">Rooted in Clay City, Committed to Progress</p>
          </div>
          <Row className="g-4 justify-content-center">
            <Col lg={10}>
              <div className="timeline">
                <div className="timeline-item timeline-item-left">
                  <div className="timeline-content">
                    <div className="timeline-image-wrapper">
                     <img src="/images/junior-hero.jpg" alt="Junior Kabeba campaigning" className="timeline-image" /> 
                    </div>
                    <div className="timeline-text">
                      <h4 className="timeline-title">Born & Raised in Kasarani</h4>
                      <p className="timeline-description">A lifelong resident, Junior knows our streets, struggles, and dreams—from youth hustles to family needs.</p>
                    </div>
                  </div>
                </div>
                <div className="timeline-item timeline-item-right">
                  <div className="timeline-content">
                    <div className="timeline-image-wrapper">
                      <img src="/images/kabeba-extra.jpg" alt="Junior Kabeba with community" className="timeline-image" />
                    </div>
                    <div className="timeline-text">
                      <h4 className="timeline-title">Last Election: 2nd Place Warrior</h4>
                      <p className="timeline-description">Secured over 10,000 votes with bold promises. Now, back stronger to deliver on security, welfare, and empowerment.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Vision Pillars: Interactive Grid */}
      <section className="pillars-section">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Our Vision</h2>
            <p className="section-subtitle">Four Pillars of Progress for Clay City</p>
          </div>
          <Row className="g-4">
            {pillars.map((pillar, i) => (
              <Col lg={3} md={6} key={i} className="mb-4">
                <Card className="pillar-card h-100">
                  <Card.Body className="p-4 text-center">
                    <div className="pillar-icon-wrapper" style={{ '--pillar-color': pillar.color }}>
                      <i className={`bi bi-${pillar.icon} pillar-icon`}></i>
                    </div>
                    <Card.Title className="pillar-title">{pillar.title}</Card.Title>
                    <Card.Text className="pillar-description">{pillar.desc}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials Carousel: Social Proof */}
      <section className="testimonials-section">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Voices from Clay City</h2>
            <p className="section-subtitle">What our community is saying</p>
          </div>
          <Row className="justify-content-center">
            <Col lg={10}>
              <Carousel interval={5000} indicators={true} controls={true} className="testimonial-carousel-wrapper">
                {testimonials.map((t, i) => (
                  <Carousel.Item key={i}>
                    <Card className="testimonial-card">
                      <Card.Body className="p-5">
                        <div className="testimonial-quote">
                          <i className="bi bi-quote fs-1 text-muted mb-3"></i>
                          <blockquote className="blockquote mb-4">
                            <p className="testimonial-text">"{t.text}"</p>
                          </blockquote>
                        </div>
                        <footer className="testimonial-footer">
                          <div className="testimonial-author">
                            <strong>{t.name}</strong>
                            <Badge bg="warning" className="ms-2">
                              {Array(t.rating).fill('★').join('')}
                            </Badge>
                          </div>
                        </footer>
                      </Card.Body>
                    </Card>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>

      {/* News Teaser: Engagement Hook */}
      <section className="news-section">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Latest from the Campaign</h2>
            <p className="section-subtitle">Stay updated with our progress</p>
          </div>
          <Row className="g-4">
            {newsItems.map((item, i) => (
              <Col lg={4} md={6} key={i}>
                <Card className="news-card h-100">
                  <div className="news-image-wrapper">
                    <Card.Img variant="top" src={item.img} alt={item.title} className="news-image" />
                    <div className="news-date-badge">{item.date}</div>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="news-title">{item.title}</Card.Title>
                    <Card.Text className="news-excerpt">{item.excerpt}</Card.Text>
                    <Button variant="primary" className="mt-auto news-btn" href="/news">
                      Read More <i className="bi bi-arrow-right ms-2"></i>
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Final CTA: Urgent Action */}
      <section className="cta-section">
        <Container>
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Clay City?</h2>
            <p className="cta-subtitle">Your support powers our vision. Donate via M-Pesa or join today.</p>
            <div className="cta-buttons">
              <Button variant="light" size="lg" className="cta-btn-primary me-3" href="https://kabebajush.co.ke/donate">
                <i className="bi bi-heart-fill me-2"></i>Donate Now
              </Button>
              <Button variant="outline-light" size="lg" className="cta-btn-secondary" href="/contact">
                <i className="bi bi-person-plus me-2"></i>Get Involved
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Home;