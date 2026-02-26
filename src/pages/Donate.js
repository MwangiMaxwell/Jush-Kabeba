// Donate.js
import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import '../styles/Donate.css';

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [activeMethod, setActiveMethod] = useState('mpesa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const donationAmounts = [50, 100, 500, 1000, 2000, 5000, 10000];

  
  const PAYPAL_LINK = "https://www.paypal.com/qrcodes/p2pqrc/5TZF93XGGDLUG";
  

  const finalAmount = customAmount ? Number(customAmount) : selectedAmount;

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    if (val) setSelectedAmount(Number(val) || 0);
  };

  const handleDonorChange = (field) => (e) => {
    setDonorInfo((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleMpesaPayment = async () => {

    if (finalAmount < 10) {
      alert('Minimum donation is KSh 10');
      return;
    }

    
    const phoneRegex = /^(?:0|\+254|254)?[17]\d{8}$/;
    let phone = donorInfo.phone.trim();

    if (!phone || !phoneRegex.test(phone)) {
      alert('Please enter a valid Kenyan phone number (e.g. 07XXXXXXXX or 254XXXXXXXXX)');
      return;
    }

   
    if (phone.startsWith('0')) {
      phone = '254' + phone.slice(1);
    } else if (phone.startsWith('+')) {
      phone = phone.slice(1);
    }

    setIsProcessing(true);

    try {
      const response = await fetch('http://localhost:3001/api/mpesa/stkpush', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalAmount,
          phoneNumber: phone,
          donorName: donorInfo.name || 'Anonymous',
          donorEmail: donorInfo.email || '',
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(
          `${data.message || 'STK Push sent!'}\n\n` +
          'Check your phone for the M-Pesa prompt.\n' +
          'Enter your PIN to complete the donation.'
        );
        
      } else {
        alert(`Payment initiation failed: ${data.error || data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('M-Pesa payment error:', error);
      alert('Failed to connect to payment service. Please check your internet and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDonateClick = () => {
    if (activeMethod === 'mpesa') {
      handleMpesaPayment();
    } else {
      
      setIsProcessing(true);
      setTimeout(() => {
        alert(
          `Thank you! Your KSh ${finalAmount.toLocaleString()} donation via ${activeMethod.toUpperCase()} is being processed.\n\n` +
          '(Other payment methods integration coming soon)'
        );
        setIsProcessing(false);
      }, 1800);
    }
  };

  const isMpesa = activeMethod === 'mpesa';
  const isCard = activeMethod === 'card';
  const isPaypal = activeMethod === 'paypal';
  const isBank = activeMethod === 'bank';

  return (
    <div className="donate-page">
      <Container className="py-5">

        {/* Hero / Title */}
        <div className="text-center mb-5">
          <h1 className="donate-title">Support Kabeba 2027</h1>
          <p className="donate-subtitle text-muted">
            Your contribution helps build a stronger, and better ClayCity.<br />
            Most donors choose M-Pesa, start below.
          </p>
        </div>

        {/* MAIN DONATION FORM – NOW AT THE TOP */}
        <Card className="donation-card shadow-lg border-0 mb-5">
          <Card.Header className="bg-gradient-green text-white text-center py-4">
            <h3 className="mb-1">Make Your Contribution</h3>
            <p className="mb-0">Fastest way: M-Pesa STK Push</p>
          </Card.Header>

          <Card.Body className="p-4 p-md-5">

            {/* Payment Method Tabs */}
            <div className="method-tabs mb-5">
              <button
                className={`method-tab-btn ${isMpesa ? 'active' : ''}`}
                onClick={() => setActiveMethod('mpesa')}
              >
                M-Pesa
              </button>
              <button
                className={`method-tab-btn ${isCard ? 'active' : ''}`}
                onClick={() => setActiveMethod('card')}
              >
                Card / Stripe
              </button>
              <button
                className={`method-tab-btn ${isPaypal ? 'active' : ''}`}
                onClick={() => setActiveMethod('paypal')}
              >
                PayPal
              </button>
              <button
                className={`method-tab-btn ${isBank ? 'active' : ''}`}
                onClick={() => setActiveMethod('bank')}
              >
                Bank Transfer
              </button>
            </div>

            {/* Amount Selection */}
            <section className="mb-5">
              <h4 className="text-center mb-4 fw-semibold">Choose Amount (KSh)</h4>
              <div className="amount-buttons d-grid gap-3">
                {donationAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className={`btn amount-btn ${selectedAmount === amt && !customAmount ? 'active' : ''}`}
                    onClick={() => handleAmountSelect(amt)}
                  >
                    {amt.toLocaleString()}
                  </button>
                ))}
                <input
                  type="number"
                  min="10"
                  placeholder="Other"
                  className={`form-control amount-input ${customAmount ? 'active' : ''}`}
                  value={customAmount}
                  onChange={handleCustomChange}
                />
              </div>

              {finalAmount >= 10 && (
                <div className="mt-4 p-3 bg-light rounded text-center fs-4 fw-bold text-success">
                  You are donating: KSh {finalAmount.toLocaleString()}
                </div>
              )}
            </section>

            {/* M-Pesa specific fields */}
            {isMpesa && (
              <section className="mb-5">
                <h5 className="mb-4">M-Pesa Details (required for STK Push)</h5>

                <Form.Group className="mb-4">
                  <Form.Label>
                    Phone Number <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="07XXXXXXXX"
                    value={donorInfo.phone}
                    onChange={handleDonorChange('phone')}
                    isInvalid={donorInfo.phone && !/^(?:\+254|254|0)?[17]\d{8}$/.test(donorInfo.phone)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid Kenyan mobile number
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Name (optional)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your full name"
                    value={donorInfo.name}
                    onChange={handleDonorChange('name')}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Email (optional – for receipt)</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="your@email.com"
                    value={donorInfo.email}
                    onChange={handleDonorChange('email')}
                  />
                </Form.Group>
              </section>
            )}

            {/* PayPal QR + link section */}
            {isPaypal && (
              <section className="mb-5 text-center">
                <h5 className="mb-4">Donate with PayPal</h5>
                <div className="d-flex justify-content-center mb-4">
                  <img
                    src="./images/paypalqr.png" 
                    alt="PayPal QR Code"
                    style={{
                      maxWidth: '260px',
                      width: '100%',
                      height: 'auto',
                      border: '8px solid #ffffff',
                      borderRadius: '16px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    }}
                  />
                </div>
                <p className="text-muted mb-4">
                  Scan the QR code with your phone to open PayPal<br />
                  or click the button below to go directly to the payment page.
                </p>
                <a
                  href={PAYPAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg px-5 py-3"
                  style={{
                    background: '#00457C',
                    borderColor: '#00457C',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                  }}
                >
                  Donate KSh {finalAmount.toLocaleString()} via PayPal
                </a>
              </section>
            )}

            {/* Card / PayPal placeholder */}
            {isCard && (
              <section className="mb-5 text-center">
                <h5 className="mb-4">Credit/Debit Card (Stripe)</h5>
                <p className="text-muted mb-4">
                  You will be redirected to a secure payment page.<br />
                  Name and email will be collected there.
                </p>
              </section>
            )}

            {/* Bank Transfer instructions */}
            {isBank && (
              <section className="mb-5">
                <h5 className="mb-4">Bank Transfer Instructions</h5>
                <div className="p-4 bg-light rounded">
                  <p><strong>Account Name:</strong> Jeremiah Kabeba </p>
                  <p><strong>Bank:</strong> NCBA </p>
                  <p><strong>Account Number:</strong> 440000229962</p>
                  <p><strong>Branch:</strong> Garden City</p>
                  <p className="mt-3 fw-bold">Important:</p>
                  <p>Use reference: <strong>Your Name + DONATION + {finalAmount.toLocaleString()}</strong></p>
                  <p className="mt-3 text-muted small">
                    Please send proof of payment to: info@kabebajush.co.ke
                  </p>
                </div>
              </section>
            )}

            {/* Optional message */}
            {(isMpesa || isCard || isPaypal) && (
              <Form.Group className="mb-5">
                <Form.Label>Optional Message / Dedication</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Leave a short message or dedication..."
                  value={donorInfo.message}
                  onChange={handleDonorChange('message')}
                />
              </Form.Group>
            )}

            {/* Donate Button – only shown when NOT PayPal */}
            {!isPaypal && (
              <div className="text-center mt-5">
                <Button
                  className="donate-btn-main btn-lg px-5"
                  onClick={handleDonateClick}
                  disabled={
                    isProcessing ||
                    finalAmount < 10 ||
                    (isMpesa && !donorInfo.phone)
                  }
                >
                  {isProcessing
                    ? 'Processing…'
                    : `Donate KSh ${finalAmount.toLocaleString()} Now`}
                </Button>

                <div className="mt-3 text-muted small">
                  {isMpesa
                    ? 'You will receive an M-Pesa prompt shortly'
                    : 'You will be redirected to secure payment page'}
                </div>
              </div>
            )}

          </Card.Body>
        </Card>

        {/* LIVE PROGRESS – BELOW THE DONATION FORM */}
        <Card className="donation-card shadow-lg border-0 mb-5">
          <Card.Header className="bg-gradient-green text-white text-center py-4">
            <h3 className="mb-1">Live Campaign Progress</h3>
            <small>Real-time updates • Powered by community support</small>
          </Card.Header>
          <Card.Body className="text-center py-5">
            <div className="display-3 fw-bold text-success mb-2">KSh 0</div>
            <p className="fs-4 text-muted mb-4">raised so far</p>

            <div className="progress mb-4" style={{ height: '14px' }}>
              <div className="progress-bar bg-success" style={{ width: '0%' }}></div>
            </div>

            <div className="row g-3 text-start small">
              <div className="col-md-6">
                <div className="p-3 bg-light rounded">
                  <strong className="text-success">M-Pesa</strong><br />
                  KSh 0 • 0 donations • Most popular
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-light rounded">
                  <strong>Other methods</strong><br />
                  KSh 0 • Card, PayPal, Bank transfer
                </div>
              </div>
            </div>

            <small className="text-muted d-block mt-4">
              0 donations • Last updated: just now • ⚡ Live
            </small>
          </Card.Body>
        </Card>

        {/* Trust signals */}
        <Row className="g-4 mb-5 text-center">
          <Col md={4}>
            <div className="p-4 border rounded shadow-sm">
              <i className="bi bi-shield-check fs-1 text-success mb-3 d-block"></i>
              <h5>Secure</h5>
              <p className="text-muted small">Protected connection & data privacy</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-4 border rounded shadow-sm">
              <i className="bi bi-lock fs-1 text-success mb-3 d-block"></i>
              <h5>Private</h5>
              <p className="text-muted small">We never sell or share your information</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-4 border rounded shadow-sm">
              <i className="bi bi-chat-dots fs-1 text-success mb-3 d-block"></i>
              <h5>Support</h5>
              <p className="text-muted small">info@kabebajush.co.ke</p>
            </div>
          </Col>
        </Row>

        <div className="text-center text-muted small py-4 border-top">
          © {new Date().getFullYear()} Kabeba Campaign • All rights reserved • 🇰🇪
        </div>

      </Container>
    </div>
  );
};

export default Donate;