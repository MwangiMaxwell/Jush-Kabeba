const axios = require('axios');
require('dotenv').config();

const CONSUMER_KEY = process.env.DARAJA_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.DARAJA_CONSUMER_SECRET;
const SHORTCODE = process.env.DARAJA_SHORTCODE;
const PASSKEY = process.env.DARAJA_PASSKEY;
const BASE_URL = process.env.DARAJA_BASE_URL || 'https://sandbox.safaricom.co.ke';

async function getAccessToken() {
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');

  try {
    const res = await axios.get(
      `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: { Authorization: `Basic ${auth}` },
      }
    );
    return res.data.access_token;
  } catch (err) {
    console.error('Token error:', err.response?.data || err.message);
    throw new Error('Failed to get Daraja token');
  }
}

function generatePassword() {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T]/g, '')
    .slice(0, 14); // YYYYMMDDHHmmss

  const str = `${SHORTCODE}${PASSKEY}${timestamp}`;
  return Buffer.from(str).toString('base64');
}

async function initiateSTKPush(phone, amount, accountRef = 'KabebaDonation', desc = 'Donation') {
  const token = await getAccessToken();
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T]/g, '')
    .slice(0, 14);

  const password = generatePassword();

  const payload = {
    BusinessShortCode: SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phone.startsWith('0') ? '254' + phone.slice(1) : phone,
    PartyB: SHORTCODE,
    PhoneNumber: phone.startsWith('0') ? '254' + phone.slice(1) : phone,
    CallBackURL: `${process.env.CALLBACK_BASE_URL || 'https://your-domain.com'}/api/mpesa/callback`,
    AccountReference: accountRef,
    TransactionDesc: desc,
  };

  try {
    const res = await axios.post(
      `${BASE_URL}/mpesa/stkpush/v1/processrequest`,
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      checkoutRequestId: res.data.CheckoutRequestID,
      message: res.data.CustomerMessage || 'STK Push sent',
    };
  } catch (err) {
    console.error('STK error:', err.response?.data || err.message);
    return {
      success: false,
      error: err.response?.data?.errorMessage || 'STK Push failed',
    };
  }
}

module.exports = { initiateSTKPush };