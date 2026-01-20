import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import '../styles/Contact.css';

// Contact form configuration
const CONTACT_EMAIL = 'info@kabebajush.co.ke';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Create email content
    const subject = `Contact Form Message from ${data.name}`;
    const body = `Name: ${data.name}
Email: ${data.email}

Message:
${data.message}

---
This message was sent from the Kabeba Campaign website contact form.`;

    // Encode for URL
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    // Create mailto link
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;

    // Open email client
    window.open(mailtoLink, '_blank');

    // Show success message and reset form
    setSubmitted(true);
    reset();
  };

  const contactInfo = [
    {
      icon: 'telephone-fill',
      title: 'Phone',
      content: '+254 798 319 842',
      link: 'tel:+254798319842'
    },
    {
      icon: 'envelope-fill',
      title: 'Email',
      content: 'info@kabebajush.co.ke',
      link: 'mailto:info@kabebajush.co.ke'
    },
    {
      icon: 'geo-alt-fill',
      title: 'Location',
      content: 'Clay City Ward, Kasarani',
      link: null
    },
    {
      icon: 'whatsapp',
      title: 'WhatsApp',
      content: 'Join our group',
      link: 'https://chat.whatsapp.com/KfpZy480pQ13LysidCKuBp'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="contact-hero">
        <Container>
          <div className="contact-hero-content">
            <Badge bg="light" text="dark" className="contact-badge mb-3">
              <i className="bi bi-chat-dots-fill me-2"></i>Get in Touch
            </Badge>
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-subtitle">
              Have questions, suggestions, or want to get involved? We'd love to hear from you. 
              Reach out through any of the channels below or fill out the form.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <Container>
          <Row className="g-4">
            {contactInfo.map((info, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="contact-info-card h-100 text-center">
                  <Card.Body className="p-4">
                    <div className="contact-info-icon">
                      <i className={`bi bi-${info.icon}`}></i>
                    </div>
                    <h5 className="contact-info-title">{info.title}</h5>
                    {info.link ? (
                      <a href={info.link} target={info.link.startsWith('http') ? '_blank' : '_self'} 
                         rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                         className="contact-info-link">
                        {info.content}
                      </a>
                    ) : (
                      <p className="contact-info-text">{info.content}</p>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="contact-form-card">
                <Card.Body className="p-4">
                  <div className="form-header mb-4">
                    <h3 className="form-title">
                      <i className="bi bi-envelope-paper-fill me-2"></i>
                      Send Us a Message
                    </h3>
                    <p className="form-subtitle">
                      Fill out the form below and your email client will open with a pre-filled message.
                    </p>
                  </div>

                  <Form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="form-label">
                            <i className="bi bi-person me-2"></i>Your Name <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            {...register('name', {
                              required: 'Name is required',
                              minLength: { value: 2, message: 'Name must be at least 2 characters' }
                            })}
                            placeholder="Enter your full name"
                            className={errors.name ? 'is-invalid' : ''}
                          />
                          {errors.name && (
                            <div className="invalid-feedback d-block">{errors.name.message}</div>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="form-label">
                            <i className="bi bi-envelope me-2"></i>Email Address <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            type="email"
                            {...register('email', {
                              required: 'Email is required',
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Please enter a valid email address'
                              }
                            })}
                            placeholder="your@email.com"
                            className={errors.email ? 'is-invalid' : ''}
                          />
                          {errors.email && (
                            <div className="invalid-feedback d-block">{errors.email.message}</div>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label className="form-label">
                        <i className="bi bi-chat-left-text me-2"></i>Message <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        {...register('message', {
                          required: 'Message is required',
                          minLength: { value: 10, message: 'Message must be at least 10 characters' }
                        })}
                        placeholder="Tell us what's on your mind..."
                        className={errors.message ? 'is-invalid' : ''}
                      />
                      {errors.message && (
                        <div className="invalid-feedback d-block">{errors.message.message}</div>
                      )}
                    </Form.Group>

                    <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="submit-btn w-100"
                  >
                    <i className="bi bi-envelope me-2"></i>
                    Send Email 
                  </Button>
                  </Form>

                  {submitted && (
                    <Alert variant="success" className="mt-4 success-alert" dismissible onClose={() => setSubmitted(false)}>
                      <div className="d-flex align-items-start">
                        <i className="bi bi-check-circle-fill fs-3 me-3 text-success"></i>
                        <div>
                          <h5 className="alert-heading mb-2">Email Client Opened!</h5>
                          <p className="mb-0">
                            Your email client has opened with a pre-filled message. Please click "Send" in your email client to complete the message.
                          </p>
                        </div>
                      </div>
                    </Alert>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Contact;