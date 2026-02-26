import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col, Badge } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { QRCodeSVG } from 'qrcode.react';
import emailjs from '@emailjs/browser';
import '../styles/Volunteer.css';

const Volunteer = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ 
    defaultValues: { group: 'WhatsApp Volunteers' } 
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
   
    data.whatsapp_group = 'https://chat.whatsapp.com/KfpZy480pQ13LysidCKuBp';
    
    try {
      await emailjs.send('service_6y3m5q8', 'template_z5otwhk', data, 'Lt69avNhZ9Njax7lp');
      setSubmitted(true);
      reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      
      setSubmitted(true);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappGroupLink = 'https://chat.whatsapp.com/KfpZy480pQ13LysidCKuBp';

  const volunteerBenefits = [
    { icon: 'people-fill', title: 'Community Impact', desc: 'Make a real difference in Clay City' },
    { icon: 'megaphone-fill', title: 'Stay Connected', desc: 'Real-time updates and coordination' },
    { icon: 'trophy-fill', title: 'Build Skills', desc: 'Gain experience in community organizing' },
    { icon: 'heart-fill', title: 'Join a Movement', desc: 'Be part of transformative change' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="volunteer-hero">
        <Container>
          <div className="volunteer-hero-content">
            <Badge bg="light" text="dark" className="volunteer-badge mb-3">
              <i className="bi bi-hand-thumbs-up-fill me-2"></i>Join Our Team
            </Badge>
            <h1 className="volunteer-title">Become a Volunteer</h1>
            <p className="volunteer-subtitle">
              Join  Kabeba's campaign to transform Clay City. Your time, energy, and passion can help build a stronger, safer, and more prosperous community for everyone.
            </p>
          </div>
        </Container>
      </section>

      {/*
      <section className="volunteer-benefits">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Why Volunteer?</h2>
            <p className="section-subtitle">Be part of something bigger than yourself</p>
          </div>
          <Row className="g-4">
            {volunteerBenefits.map((benefit, i) => (
              <Col md={6} lg={3} key={i}>
                <Card className="benefit-card h-100 text-center">
                  <Card.Body className="p-4">
                    <div className="benefit-icon">
                      <i className={`bi bi-${benefit.icon}`}></i>
                    </div>
                    <h5 className="benefit-title">{benefit.title}</h5>
                    <p className="benefit-desc">{benefit.desc}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      */}
      {/* Main Content Section */}
      <section className="volunteer-main">
        <Container>
          <Row className="g-4">
            {/* Left Column - QR Code & WhatsApp */}
            <Col lg={5}>
              <Card className="whatsapp-card">
                <Card.Body className="p-4 text-center">
                  <div className="whatsapp-icon mb-3">
                    <i className="bi bi-whatsapp"></i>
                  </div>
                  <h4 className="mb-3">Join Our WhatsApp Group</h4>
                  <p className="text-muted mb-4">
                    Get instant access to volunteer coordination, updates, and community chats. Scan the QR code or click the button below.
                  </p>
                  
                  <div className="qr-code-wrapper mb-4">
                    <QRCodeSVG 
                      value={whatsappGroupLink} 
                      size={220}
                      level="H"
                      includeMargin={true}
                    />
                  </div>

                  <Button 
                    variant="success" 
                    size="lg" 
                    className="whatsapp-btn w-100 mb-3"
                    href={whatsappGroupLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-whatsapp me-2"></i>
                    Join WhatsApp Group Now
                  </Button>
                  
                  <p className="small text-muted mb-0">
                    <i className="bi bi-info-circle me-1"></i>
                    Click to join instantly on your phone
                  </p>
                </Card.Body>
              </Card>
            </Col>

            {/* Right Column - Registration Form (Commented Out) */}
            {/*
            <Col lg={7}>
              <Card className="registration-card">
                <Card.Body className="p-4">
                  <div className="form-header mb-4">
                    <h3 className="form-title">
                      <i className="bi bi-person-plus-fill me-2"></i>
                      Complete Your Registration
                    </h3>
                    <p className="form-subtitle">
                      Fill out the form below to officially join our volunteer team. We'll confirm via email and add you to our coordination group.
                    </p>
                  </div>

                  <Form onSubmit={handleSubmit(onSubmit)} className="volunteer-form">
                    <Row>
                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label className="form-label">
                            <i className="bi bi-person me-2"></i>Full Name <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control 
                            {...register('name', { 
                              required: 'Full name is required',
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
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="form-label">
                            <i className="bi bi-telephone me-2"></i>Phone Number <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control 
                            {...register('phone', { 
                              required: 'Phone number is required',
                              pattern: {
                                value: /^(\+254|0)[17]\d{8}$/,
                                message: 'Please enter a valid Kenyan phone number'
                              }
                            })} 
                            placeholder="+254 7xx xxx xxx"
                            className={errors.phone ? 'is-invalid' : ''}
                          />
                          {errors.phone && (
                            <div className="invalid-feedback d-block">{errors.phone.message}</div>
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

                    <Form.Group className="mb-4">
                      <Form.Label className="form-label">
                        <i className="bi bi-people me-2"></i>Volunteer Group
                      </Form.Label>
                      <Form.Control 
                        value="WhatsApp Volunteers" 
                        readOnly 
                        className="bg-light"
                      />
                      <input type="hidden" {...register('group')} value="WhatsApp Volunteers" />
                      <Form.Text className="text-muted">
                        You'll be automatically added to our WhatsApp volunteer coordination group.
                      </Form.Text>
                    </Form.Group>

                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      className="submit-btn w-100"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-circle me-2"></i>
                          Register & Get Started
                        </>
                      )}
                    </Button>
                  </Form>

                  {submitted && (
                    <Alert variant="success" className="mt-4 success-alert" dismissible onClose={() => setSubmitted(false)}>
                      <div className="d-flex align-items-start">
                        <i className="bi bi-check-circle-fill fs-3 me-3 text-success"></i>
                        <div>
                          <h5 className="alert-heading mb-2">Karibu Sana! Welcome Aboard</h5>
                          <p className="mb-0">
                            Thank you for signing up to join kabeba's Kabeba in this journey to transform Clay City. 
                            Check your email for confirmation and join our WhatsApp group for your first message!
                          </p>
                        </div>
                      </div>
                    </Alert>
                  )}
                </Card.Body>
              </Card>
            </Col>
            */}
          </Row>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="volunteer-cta">
        <Container>
          <div className="cta-content text-center">
            <h3 className="cta-title">Ready to Make a Difference?</h3>
            <p className="cta-text">
              Every volunteer brings us one step closer to transforming Clay City. 
              Join us today and be part of the change!
            </p>
            <Button 
              variant="light" 
              size="lg" 
              className="cta-button"
              href="/contact"
            >
              <i className="bi bi-chat-dots me-2"></i>
              Have Questions? Contact Us
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Volunteer;