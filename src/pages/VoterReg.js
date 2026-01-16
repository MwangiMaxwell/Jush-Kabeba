import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col, Badge } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { QRCodeSVG } from 'qrcode.react';
import emailjs from '@emailjs/browser';
import '../styles/VoterReg.css';

const VoterReg = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ 
    defaultValues: { group: 'Voter WhatsApp Support', ward: 'Clay City Ward' } 
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    data.whatsapp_group = 'https://chat.whatsapp.com/YOUR_VOTER_WHATSAPP_GROUP_LINK';
    
    try {
      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data, 'YOUR_USER_ID');
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

  const whatsappVoterLink = 'https://chat.whatsapp.com/YOUR_VOTER_WHATSAPP_GROUP_LINK';

  const benefits = [
    { icon: 'ballot-check', title: 'Election Reminders', desc: 'Never miss important voting dates' },
    { icon: 'info-circle-fill', title: 'Voter Information', desc: 'Get guidance on registration and voting' },
    { icon: 'question-circle-fill', title: 'Q&A Support', desc: 'Ask questions and get answers' },
    { icon: 'bell-fill', title: 'Campaign Updates', desc: 'Stay informed about the campaign' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="voter-hero">
        <Container>
          <div className="voter-hero-content">
            <Badge bg="light" text="dark" className="voter-badge mb-3">
              <i className="bi bi-person-check-fill me-2"></i>Register to Vote
            </Badge>
            <h1 className="voter-title">Voter Registration</h1>
            <p className="voter-subtitle">
              Register to vote in Clay City Ward and join our WhatsApp support group for election reminders, 
              voter information, and personalized guidance. Your voice matters, make it count in 2027!
            </p>
          </div>
        </Container>
      </section>

      {/* Benefits Section 
      <section className="voter-benefits">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Why Register?</h2>
            <p className="section-subtitle">Join our voter support group and stay informed</p>
          </div>
          <Row className="g-4">
            {benefits.map((benefit, i) => (
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
      <section className="voter-main">
        <Container>
          <Row className="g-4">
            {/* Left Column - QR Code & WhatsApp */}
            <Col lg={5}>
              <Card className="whatsapp-card">
                <Card.Body className="p-4 text-center">
                  <div className="whatsapp-icon mb-3">
                    <i className="bi bi-whatsapp"></i>
                  </div>
                  <h4 className="mb-3">Join Voter WhatsApp Support</h4>
                  <p className="text-muted mb-4">
                    Get instant access to voter information, election reminders, and personalized support. 
                    Scan the QR code or click the button below.
                  </p>
                  
                  <div className="qr-code-wrapper mb-4">
                    <QRCodeSVG 
                      value={whatsappVoterLink} 
                      size={220}
                      level="H"
                      includeMargin={true}
                    />
                  </div>

                  <Button 
                    variant="success" 
                    size="lg" 
                    className="whatsapp-btn w-100 mb-3"
                    href="https://wa.me/254798319842"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-whatsapp me-2"></i>
                     Voter WhatsApp Support
                  </Button>
                  
                  <p className="small text-muted mb-0">
                    <i className="bi bi-info-circle me-1"></i>
                    Click to instantly make a Whatsapp inquiry on your phone
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
                      <i className="bi bi-person-badge me-2"></i>
                      Complete Your Registration
                    </h3>
                    <p className="form-subtitle">
                      Fill out the form below to register as a voter. IEBC-compliant information—sent securely via email.
                    </p>
                  </div>

                  <Form onSubmit={handleSubmit(onSubmit)} className="voter-form">
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
                            placeholder="Enter your full name as per ID"
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
                            <i className="bi bi-card-text me-2"></i>National ID Number <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control 
                            {...register('id', { 
                              required: 'National ID is required',
                              pattern: {
                                value: /^\d{8}$/,
                                message: 'ID must be 8 digits'
                              }
                            })} 
                            placeholder="e.g., 12345678"
                            className={errors.id ? 'is-invalid' : ''}
                          />
                          {errors.id && (
                            <div className="invalid-feedback d-block">{errors.id.message}</div>
                          )}
                        </Form.Group>
                      </Col>
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
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label className="form-label">
                        <i className="bi bi-envelope me-2"></i>Email Address (Optional)
                      </Form.Label>
                      <Form.Control 
                        type="email" 
                        {...register('email', {
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

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="form-label">
                            <i className="bi bi-geo-alt me-2"></i>Ward
                          </Form.Label>
                          <Form.Control 
                            value="Clay City Ward" 
                            readOnly 
                            className="bg-light"
                          />
                          <input type="hidden" {...register('ward')} value="Clay City Ward" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label className="form-label">
                            <i className="bi bi-people me-2"></i>Support Group
                          </Form.Label>
                          <Form.Control 
                            value="Voter WhatsApp Support" 
                            readOnly 
                            className="bg-light"
                          />
                          <input type="hidden" {...register('group')} value="Voter WhatsApp Support" />
                          <Form.Text className="text-muted">
                            You'll be added to our voter support WhatsApp group.
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>

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
                          Register to Vote
                        </>
                      )}
                    </Button>
                  </Form>

                  {submitted && (
                    <Alert variant="success" className="mt-4 success-alert" dismissible onClose={() => setSubmitted(false)}>
                      <div className="d-flex align-items-start">
                        <i className="bi bi-check-circle-fill fs-3 me-3 text-success"></i>
                        <div>
                          <h5 className="alert-heading mb-2">Registration Successful!</h5>
                          <p className="mb-0">
                            Thank you for registering to vote! Your details have been noted. 
                            Check your WhatsApp for 2027 election reminders and voter information!
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
      <section className="voter-cta">
        <Container>
          <div className="cta-content text-center">
            <h3 className="cta-title">Your Vote Matters</h3>
            <p className="cta-text">
              Every registered voter brings us closer to transforming Clay City. 
              Register today and make your voice heard in 2027!
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

export default VoterReg;