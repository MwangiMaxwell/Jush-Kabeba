const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// M-Pesa Configuration
const MPESA_CONFIG = {
  consumerKey: process.env.MPESA_CONSUMER_KEY,
  consumerSecret: process.env.MPESA_CONSUMER_SECRET,
  shortcode: process.env.MPESA_SHORTCODE,
  passkey: process.env.MPESA_PASSKEY,
  baseUrl: process.env.MPESA_ENV === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke',
  callbackUrl: process.env.MPESA_CALLBACK_URL || 'https://yourdomain.com/api/mpesa/callback'
};

// Store active transactions (in production, use Redis or database)
const activeTransactions = new Map();

// Get M-Pesa Access Token
async function getAccessToken() {
  try {
    const auth = Buffer.from(`${MPESA_CONFIG.consumerKey}:${MPESA_CONFIG.consumerSecret}`).toString('base64');

    const response = await axios.get(`${MPESA_CONFIG.baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Failed to get M-Pesa access token:', error.response?.data || error.message);
    throw new Error('Failed to authenticate with M-Pesa');
  }
}

// Generate password for STK Push
function generatePassword() {
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
  const password = Buffer.from(`${MPESA_CONFIG.shortcode}${MPESA_CONFIG.passkey}${timestamp}`).toString('base64');
  return { password, timestamp };
}

// STK Push endpoint
app.post('/api/mpesa/stkpush', async (req, res) => {
  try {
    const { amount, phoneNumber, accountReference, donorName, donorEmail } = req.body;

    // Validate required fields
    if (!amount || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Amount and phone number are required'
      });
    }

    // Validate amount
    if (amount < 1 || amount > 150000) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be between KSh 1 and KSh 150,000'
      });
    }

    // Format phone number
    const phoneRegex = /^(?:\+254|254|0)?([17]\d{8})$/;
    const match = phoneNumber.match(phoneRegex);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Kenyan phone number format'
      });
    }
    const formattedPhone = `254${match[1]}`;

    const accessToken = await getAccessToken();
    const { password, timestamp } = generatePassword();

    const stkPushData = {
      BusinessShortCode: MPESA_CONFIG.shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: MPESA_CONFIG.shortcode,
      PhoneNumber: formattedPhone,
      CallBackURL: MPESA_CONFIG.callbackUrl,
      AccountReference: accountReference || 'Kabeba Campaign',
      TransactionDesc: `Donation - ${donorName || 'Anonymous'}`
    };

    console.log('Initiating STK Push:', {
      phoneNumber: formattedPhone,
      amount,
      accountReference: stkPushData.AccountReference
    });

    const response = await axios.post(
      `${MPESA_CONFIG.baseUrl}/mpesa/stkpush/v1/processrequest`,
      stkPushData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const { CheckoutRequestID, ResponseCode, ResponseDescription } = response.data;

    if (ResponseCode === '0') {
      // Store transaction details
      activeTransactions.set(CheckoutRequestID, {
        checkoutRequestId: CheckoutRequestID,
        phoneNumber: formattedPhone,
        amount,
        donorName,
        donorEmail,
        accountReference: stkPushData.AccountReference,
        timestamp: new Date(),
        status: 'pending'
      });

      // Set timeout to clear stale transactions
      setTimeout(() => {
        activeTransactions.delete(CheckoutRequestID);
      }, 15 * 60 * 1000); // 15 minutes

      res.json({
        success: true,
        checkoutRequestId: CheckoutRequestID,
        message: 'STK Push sent successfully. Check your phone for the payment prompt.',
        response: {
          responseCode: ResponseCode,
          responseDescription: ResponseDescription
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: ResponseDescription || 'Failed to initiate STK Push',
        response: response.data
      });
    }

  } catch (error) {
    console.error('STK Push error:', error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: 'Failed to process payment request',
      error: error.response?.data?.errorMessage || error.message
    });
  }
});

// STK Push callback endpoint
app.post('/api/mpesa/callback', (req, res) => {
  try {
    const callbackData = req.body;

    console.log('M-Pesa Callback received:', JSON.stringify(callbackData, null, 2));

    if (callbackData.Body && callbackData.Body.stkCallback) {
      const {
        MerchantRequestID,
        CheckoutRequestID,
        ResultCode,
        ResultDesc,
        CallbackMetadata
      } = callbackData.Body.stkCallback;

      const transaction = activeTransactions.get(CheckoutRequestID);

      if (ResultCode === 0) {
        // Payment successful
        if (CallbackMetadata && CallbackMetadata.Item) {
          const metadata = CallbackMetadata.Item;
          const transactionData = {
            merchantRequestId: MerchantRequestID,
            checkoutRequestId: CheckoutRequestID,
            resultCode: ResultCode,
            resultDesc: ResultDesc,
            amount: metadata.find(item => item.Name === 'Amount')?.Value,
            mpesaReceiptNumber: metadata.find(item => item.Name === 'MpesaReceiptNumber')?.Value,
            balance: metadata.find(item => item.Name === 'Balance')?.Value,
            transactionDate: metadata.find(item => item.Name === 'TransactionDate')?.Value,
            phoneNumber: metadata.find(item => item.Name === 'PhoneNumber')?.Value
          };

          // Update transaction status
          if (transaction) {
            transaction.status = 'completed';
            transaction.mpesaReceiptNumber = transactionData.mpesaReceiptNumber;
            transaction.completedAt = new Date();
          }

          console.log('Payment successful:', transactionData);

          // Here you would typically:
          // 1. Save to database
          // 2. Send confirmation email/SMS
          // 3. Update donor records
          // 4. Trigger any post-payment actions

        }
      } else {
        // Payment failed
        console.log('Payment failed:', {
          checkoutRequestId: CheckoutRequestID,
          resultCode: ResultCode,
          resultDesc: ResultDesc
        });

        if (transaction) {
          transaction.status = 'failed';
          transaction.failureReason = ResultDesc;
          transaction.failedAt = new Date();
        }
      }
    }

    // Always respond with success to acknowledge callback
    res.json({ success: true });

  } catch (error) {
    console.error('Callback processing error:', error);
    res.status(500).json({ success: false, error: 'Callback processing failed' });
  }
});

// Check payment status endpoint
app.get('/api/mpesa/status/:checkoutRequestId', (req, res) => {
  try {
    const { checkoutRequestId } = req.params;
    const transaction = activeTransactions.get(checkoutRequestId);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.json({
      success: true,
      status: transaction.status,
      checkoutRequestId,
      amount: transaction.amount,
      phoneNumber: transaction.phoneNumber,
      timestamp: transaction.timestamp,
      ...(transaction.status === 'completed' && {
        mpesaReceiptNumber: transaction.mpesaReceiptNumber,
        completedAt: transaction.completedAt
      }),
      ...(transaction.status === 'failed' && {
        failureReason: transaction.failureReason,
        failedAt: transaction.failedAt
      })
    });

  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check payment status'
    });
  }
});

// Query STK Push status (alternative to polling)
app.post('/api/mpesa/query', async (req, res) => {
  try {
    const { checkoutRequestId } = req.body;

    if (!checkoutRequestId) {
      return res.status(400).json({
        success: false,
        message: 'CheckoutRequestID is required'
      });
    }

    const accessToken = await getAccessToken();
    const { password, timestamp } = generatePassword();

    const queryData = {
      BusinessShortCode: MPESA_CONFIG.shortcode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId
    };

    const response = await axios.post(
      `${MPESA_CONFIG.baseUrl}/mpesa/stkpushquery/v1/query`,
      queryData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('Query error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to query payment status',
      error: error.response?.data || error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'M-Pesa API server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.MPESA_ENV || 'sandbox',
    activeTransactions: activeTransactions.size
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 M-Pesa Daraja API server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.MPESA_ENV || 'sandbox'}`);
  console.log(`🔗 Callback URL: ${MPESA_CONFIG.callbackUrl}`);
});