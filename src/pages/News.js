import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import '../styles/News.css';

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: 'Town Hall Recap: Security Wins',
      excerpt: 'Junior outlines comprehensive plan for 24/7 patrols and community policing—residents cheer the initiative!',
      date: 'January 15, 2024',
      category: 'Security',
      image: '/images/news1-placeholder.jpg',
      featured: true
    },
    {
      id: 2,
      title: 'Youth Forum Success',
      excerpt: 'Over 200 young people attended our youth empowerment forum. Skills bootcamp announced for February 2024.',
      date: 'January 10, 2024',
      category: 'Youth',
      image: '/images/news2-placeholder.jpg',
      featured: false
    },
    {
      id: 3,
      title: 'Welfare Update',
      excerpt: 'New family aid program launches this month—applications now open for eligible residents.',
      date: 'January 5, 2024',
      category: 'Welfare',
      image: '/images/news3-placeholder.jpg',
      featured: false
    },
    {
      id: 4,
      title: 'Community Cleanup Drive',
      excerpt: 'Join us this Saturday for a community cleanup initiative. Together we can make Clay City cleaner and greener.',
      date: 'December 28, 2023',
      category: 'Community',
      image: '/images/news4-placeholder.jpg',
      featured: false
    },
    {
      id: 5,
      title: 'Economic Growth Forum',
      excerpt: 'Local business owners gather to discuss opportunities for SME growth and market linkages.',
      date: 'December 20, 2023',
      category: 'Economy',
      image: '/images/news5-placeholder.jpg',
      featured: false
    },
    {
      id: 6,
      title: 'Campaign Launch Event',
      excerpt: 'Junior Kabeba officially launches his 2027 MCA campaign with a rally attended by thousands.',
      date: 'December 15, 2023',
      category: 'Campaign',
      image: '/images/news6-placeholder.jpg',
      featured: false
    }
  ];

  const featuredNews = newsItems.find(item => item.featured);
  const regularNews = newsItems.filter(item => !item.featured);

  const getCategoryColor = (category) => {
    const colors = {
      'Security': '#4CAF50',
      'Youth': '#2196F3',
      'Welfare': '#E91E63',
      'Community': '#FF9800',
      'Economy': '#9C27B0',
      'Campaign': '#F44336'
    };
    return colors[category] || '#0e1075';
  };

  return (
    <>
      {/* Hero Section */}
      <section className="news-hero">
        <Container>
          <div className="news-hero-content">
            <Badge bg="light" text="dark" className="news-badge mb-3">
              <i className="bi bi-newspaper me-2"></i>Stay Updated
            </Badge>
            <h1 className="news-title">News & Events</h1>
            <p className="news-subtitle">
              Stay informed about the latest campaign updates, community events, and progress in transforming Clay City.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured News */}
      {featuredNews && (
        <section className="featured-news-section">
          <Container>
            <Card className="featured-news-card">
              <Row className="g-0">
                <Col md={6}>
                  <div className="featured-image-wrapper">
                    <div className="featured-image-placeholder">
                      <i className="bi bi-image"></i>
                    </div>
                    <Badge 
                      className="featured-badge" 
                      style={{ backgroundColor: getCategoryColor(featuredNews.category) }}
                    >
                      {featuredNews.category}
                    </Badge>
                  </div>
                </Col>
                <Col md={6}>
                  <Card.Body className="p-4 p-md-5">
                    <div className="featured-date">{featuredNews.date}</div>
                    <h2 className="featured-title">{featuredNews.title}</h2>
                    <p className="featured-excerpt">{featuredNews.excerpt}</p>
                    <Button variant="primary" className="featured-btn">
                      Read Full Story <i className="bi bi-arrow-right ms-2"></i>
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Container>
        </section>
      )}

      {/* Regular News Grid */}
      <section className="news-grid-section">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Latest Updates</h2>
            <p className="section-subtitle">All the latest news from the campaign</p>
          </div>
          <Row className="g-4">
            {regularNews.map((item) => (
              <Col md={6} lg={4} key={item.id}>
                <Card className="news-card h-100">
                  <div className="news-image-wrapper">
                    <div className="news-image-placeholder">
                      <i className="bi bi-image"></i>
                    </div>
                    <Badge 
                      className="news-category-badge" 
                      style={{ backgroundColor: getCategoryColor(item.category) }}
                    >
                      {item.category}
                    </Badge>
                    <div className="news-date-badge">{item.date}</div>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="news-card-title">{item.title}</Card.Title>
                    <Card.Text className="news-card-excerpt">{item.excerpt}</Card.Text>
                    <Button variant="outline-primary" className="mt-auto news-read-btn">
                      Read More <i className="bi bi-arrow-right ms-2"></i>
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="newsletter-cta">
        <Container>
          <div className="cta-content text-center">
            <h3 className="cta-title">Stay Connected</h3>
            <p className="cta-text">
              Never miss an update. Join our WhatsApp group for real-time news and event notifications.
            </p>
            <Button variant="light" size="lg" className="cta-button" href="/volunteer">
              <i className="bi bi-whatsapp me-2"></i>Join Our Group
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default News;