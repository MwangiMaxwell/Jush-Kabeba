const express = require('express');
const router = express.Router();
const { initiateSTKPush } = require('../utils/daraja');

router.post('/stkpush', async (req, res) => {
  const { amount, phoneNumber, donorName = 'Anonymous', donorEmail } = req.body;

  if (!amount || !phoneNumber) {
    return res.status(400).json({ success: false, message: 'Amount and phone required' });
  }

  const result = await initiateSTKPush(
    phoneNumber,
    amount,
    `DONATION-${donorName.slice(0, 10)}`,
    `Donation to Kabeba 2027`
  );

  res.json(result);
});

// Callback from Safaricom (must be public URL)
router.post('/callback', (req, res) => {
  const body = req.body;

  console.log('───── M-PESA CALLBACK ─────');
  console.log(JSON.stringify(body, null, 2));

  // TODO: save to database
  // Example fields:
  // - ResultCode === 0 → success
  // - CheckoutRequestID
  // - MpesaReceiptNumber
  // - Amount
  // - PhoneNumber

  // Send success response to Safaricom
  res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
});

module.exports = router;