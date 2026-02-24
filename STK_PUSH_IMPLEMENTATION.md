# M-Pesa STK Push Implementation Guide

## Overview
This guide shows how to implement M-Pesa STK Push for your Kabeba campaign donation system. STK Push sends a payment prompt directly to the user's phone, making donations seamless.

## Current Implementation (Flutterwave)

The current implementation uses Flutterwave, which handles STK Push automatically. To activate:

1. **Get Flutterwave Account**
   - Sign up at https://flutterwave.com
   - Complete KYC verification
   - Get your API keys

2. **Update Environment Variables**
   ```javascript
   // In src/pages/Donate.js, replace:
   public_key: 'FLWPUBK_TEST-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-X'
   // With your live public key:
   public_key: 'FLWPUBK-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-X'
   ```

3. **Test STK Push**
   - Use test phone numbers during development
   - Switch to live mode for production

## Direct M-Pesa STK Push Implementation (Backend Required)

For full control, implement direct M-Pesa API integration:

### 1. Backend Setup (Node.js/Express)

```javascript
// server.js
const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// M-Pesa Configuration
const MPESA_CONFIG = {
  consumerKey: 'YOUR_CONSUMER_KEY',
  consumerSecret: 'YOUR_CONSUMER_SECRET',
  shortcode: 'YOUR_BUSINESS_SHORTCODE',
  passkey: 'YOUR_PASSKEY',
  callbackUrl: 'https://yourdomain.com/api/mpesa/callback'
};

// Get M-Pesa Access Token
async function getAccessToken() {
  const auth = Buffer.from(`${MPESA_CONFIG.consumerKey}:${MPESA_CONFIG.consumerSecret}`).toString('base64');

  try {
    const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: { 'Authorization': `Basic ${auth}` }
    });
    return response.data.access_token;
  } catch (error) {
    throw new Error('Failed to get M-Pesa access token');
  }
}

// STK Push Endpoint
app.post('/api/mpesa/stkpush', async (req, res) => {
  try {
    const { amount, phoneNumber, accountReference } = req.body;

    const accessToken = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${MPESA_CONFIG.shortcode}${MPESA_CONFIG.passkey}${timestamp}`).toString('base64');

    const stkPushData = {
      BusinessShortCode: MPESA_CONFIG.shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: MPESA_CONFIG.shortcode,
      PhoneNumber: phoneNumber,
      CallBackURL: MPESA_CONFIG.callbackUrl,
      AccountReference: accountReference || 'Kabeba Campaign',
      TransactionDesc: 'Donation to  Kabeba Campaign'
    };

    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      stkPushData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      success: true,
      checkoutRequestId: response.data.CheckoutRequestID,
      responseCode: response.data.ResponseCode,
      message: response.data.ResponseDescription
    });

  } catch (error) {
    console.error('STK Push error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// STK Push Callback
app.post('/api/mpesa/callback', (req, res) => {
  const callbackData = req.body;

  // Log callback data
  console.log('M-Pesa Callback:', JSON.stringify(callbackData, null, 2));

  // Process the callback
  if (callbackData.Body && callbackData.Body.stkCallback) {
    const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = callbackData.Body.stkCallback;

    if (ResultCode === 0) {
      // Payment successful
      const metadata = CallbackMetadata.Item;
      const transactionData = {
        merchantRequestId: MerchantRequestID,
        checkoutRequestId: CheckoutRequestID,
        resultCode: ResultCode,
        resultDesc: ResultDesc,
        amount: metadata.find(item => item.Name === 'Amount')?.Value,
        mpesaReceiptNumber: metadata.find(item => item.Name === 'MpesaReceiptNumber')?.Value,
        transactionDate: metadata.find(item => item.Name === 'TransactionDate')?.Value,
        phoneNumber: metadata.find(item => item.Name === 'PhoneNumber')?.Value
      };

      // Save to database and send confirmation
      console.log('Payment successful:', transactionData);
    } else {
      // Payment failed
      console.log('Payment failed:', ResultDesc);
    }
  }

  res.json({ success: true });
});

app.listen(3001, () => {
  console.log('M-Pesa STK Push server running on port 3001');
});
```

### 2. Frontend Integration

Update your Donate.js to use the direct STK Push:

```javascript
const handleDirectSTKPush = async () => {
  const amount = customAmount ? parseInt(customAmount) : selectedAmount;
  const phoneRegex = /^(?:\+254|254|0)?([17]\d{8})$/;
  const match = donorInfo.phone.match(phoneRegex);

  if (!match) {
    alert('Please enter a valid Kenyan phone number');
    return;
  }

  const formattedPhone = `254${match[1]}`;

  try {
    setIsProcessing(true);

    const response = await fetch('/api/mpesa/stkpush', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: amount,
        phoneNumber: formattedPhone,
        accountReference: 'Kabeba Campaign Donation'
      })
    });

    const result = await response.json();

    if (result.success) {
      alert('STK Push sent! Check your phone for the M-Pesa payment prompt.');
      // Poll for payment status or wait for callback
      pollPaymentStatus(result.checkoutRequestId);
    } else {
      alert('Failed to initiate STK Push. Please try again.');
    }
  } catch (error) {
    console.error('STK Push error:', error);
    alert('Payment initiation failed. Please try again.');
  } finally {
    setIsProcessing(false);
  }
};

const pollPaymentStatus = async (checkoutRequestId) => {
  // Poll every 5 seconds for payment status
  const pollInterval = setInterval(async () => {
    try {
      const response = await fetch(`/api/mpesa/status/${checkoutRequestId}`);
      const status = await response.json();

      if (status.paid) {
        clearInterval(pollInterval);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
      } else if (status.failed) {
        clearInterval(pollInterval);
        alert('Payment was not completed. Please try again.');
      }
    } catch (error) {
      console.error('Status check error:', error);
    }
  }, 5000);

  // Stop polling after 2 minutes
  setTimeout(() => {
    clearInterval(pollInterval);
  }, 120000);
};
```

### 3. M-Pesa Setup Requirements

1. **Register for M-Pesa API**
   - Visit https://developer.safaricom.co.ke
   - Create a developer account
   - Register your app and get API keys

2. **Get Business Shortcode**
   - Apply for a PayBill/Till number from Safaricom
   - Configure your callback URLs

3. **Security Setup**
   - Store API keys securely (use environment variables)
   - Implement proper validation and error handling
   - Use HTTPS for all API calls

### 4. Testing

**Sandbox Testing:**
- Use test credentials from Safaricom developer portal
- Test phone numbers: 254708374149, 254728590313
- Test amounts: Keep under KSh 100 for testing

**Production Switch:**
- Replace sandbox URLs with production URLs
- Update API credentials
- Test thoroughly before going live

### 5. Additional Features

**SMS Confirmations:**
```javascript
// Integrate Africa's Talking for SMS
const sendSMS = async (phone, message) => {
  // Implementation for SMS notifications
};
```

**Email Confirmations:**
```javascript
// Send email receipts
const sendEmailConfirmation = async (email, transactionData) => {
  // Implementation for email confirmations
};
```

**Webhooks:**
```javascript
// Real-time payment notifications
app.post('/api/mpesa/webhook', (req, res) => {
  // Handle real-time updates
});
```

## Security Best Practices

1. **Validate all inputs** on both frontend and backend
2. **Use HTTPS** for all API communications
3. **Store sensitive data securely** (encrypt API keys)
4. **Implement rate limiting** to prevent abuse
5. **Log all transactions** for audit purposes
6. **Regular security audits** and updates

## Cost Considerations

- **M-Pesa API**: Free for basic usage, fees for high volume
- **Flutterwave**: 1.5-3.5% per transaction + KSh 1-5 fixed fee
- **SMS Notifications**: ~KSh 0.50-1.00 per SMS (Africa's Talking)

The Flutterwave implementation is recommended for simplicity, while direct M-Pesa API gives you maximum control and potentially lower fees for high-volume campaigns.