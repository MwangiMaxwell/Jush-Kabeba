# M-Pesa Daraja API Setup Guide

Complete guide to set up direct M-Pesa STK Push integration for your Kabeba campaign donation system.

## 🚀 Quick Start

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Environment
MPESA_ENV=development

# M-Pesa Sandbox Credentials (for testing)
MPESA_CONSUMER_KEY=your_consumer_key_from_safaricom
MPESA_CONSUMER_SECRET=your_consumer_secret_from_safaricom
MPESA_SHORTCODE=174379
MPESA_PASSKEY=bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919

# Your callback URL (must be HTTPS in production)
MPESA_CALLBACK_URL=http://yourdomain.com/api/mpesa/callback

# Server port
PORT=3001
```

### 3. Get M-Pesa API Credentials

1. Visit [Safaricom Developer Portal](https://developer.safaricom.co.ke/)
2. Create an account and register your application
3. Get your Consumer Key and Consumer Secret
4. Use the sandbox credentials above for testing

### 4. Start Both Frontend and Backend

```bash
# From the project root directory
npm run dev
```

This will start:
- Frontend (React): http://localhost:3000
- Backend (Node.js): http://localhost:3001

### 5. Test the Integration

1. Go to http://localhost:3000/donate
2. Select M-Pesa as payment method
3. Enter a test phone number: `254708374149` or `254728590313`
4. Enter amount and donor details
5. Click "Donate"
6. Check the backend logs for STK Push initiation
7. Use the M-Pesa simulator to complete the payment

## 📋 Detailed Setup

### Backend Configuration

The backend server (`backend/server.js`) includes:

- **STK Push Endpoint**: `/api/mpesa/stkpush`
- **Callback Handler**: `/api/mpesa/callback`
- **Status Checker**: `/api/mpesa/status/:checkoutRequestId`
- **Query Endpoint**: `/api/mpesa/query`

### Frontend Integration

The frontend (`src/pages/Donate.js`) handles:

- Phone number validation for Kenyan numbers
- Real-time payment status polling
- User feedback and error handling
- Multiple payment method support

### Testing Phone Numbers

Use these test numbers in the sandbox environment:

| Phone Number | Description |
|-------------|-------------|
| 254708374149 | Test number 1 |
| 254728590313 | Test number 2 |
| 254758374149 | Test number 3 |

## 🔧 Production Setup

### 1. Switch to Production Environment

Update your `.env` file:

```env
MPESA_ENV=production
MPESA_SHORTCODE=your_production_shortcode
MPESA_PASSKEY=your_production_passkey
MPESA_CALLBACK_URL=https://yourdomain.com/api/mpesa/callback
```

### 2. Get Production Credentials

1. Apply for a production account on the Safaricom Developer Portal
2. Get your production Consumer Key and Secret
3. Register your production shortcode
4. Set up your callback URL (must be HTTPS)

### 3. Deploy Backend

```bash
# Build and deploy your backend
cd backend
npm run build  # if you have a build script
# Deploy to your hosting service (Heroku, AWS, DigitalOcean, etc.)
```

### 4. Update Frontend

Update the API URL in `src/pages/Donate.js`:

```javascript
const API_BASE_URL = 'https://your-production-backend-url.com';
```

### 5. Security Considerations

- Use HTTPS for all communications
- Store API credentials securely (never in client-side code)
- Implement rate limiting
- Add request validation
- Log all transactions for audit purposes
- Regular security updates

## 🧪 Testing Checklist

- [ ] Backend server starts without errors
- [ ] Frontend can connect to backend
- [ ] STK Push initiates successfully
- [ ] Phone number validation works
- [ ] Payment status polling functions
- [ ] Callback handling works
- [ ] Error handling is proper
- [ ] Success messages display correctly

## 🚨 Troubleshooting

### Common Issues

1. **"Failed to authenticate with M-Pesa"**
   - Check your Consumer Key and Secret
   - Ensure you're using the correct environment URLs

2. **"Invalid phone number format"**
   - Phone must be in format: 254XXXXXXXXX
   - Only Safaricom numbers are supported (starting with 2547, 2541)

3. **"STK Push timeout"**
   - User didn't respond to the STK Push within 30 seconds
   - Ask user to try again

4. **"Payment failed"**
   - Check M-Pesa account balance
   - Verify phone number is registered with M-Pesa
   - Check if user cancelled the transaction

### Debug Tips

1. Check backend console logs for detailed error messages
2. Use the `/api/health` endpoint to verify backend is running
3. Monitor the callback endpoint for payment confirmations
4. Test with small amounts first

## 📊 Monitoring & Analytics

### Track These Metrics

- Success rate of STK Push initiations
- Payment completion rate
- Average transaction amount
- User drop-off points
- Common error types

### Logs to Monitor

- STK Push initiation requests
- Callback data from M-Pesa
- Payment status queries
- Error responses

## 🔄 API Reference

### STK Push Request

```javascript
POST /api/mpesa/stkpush
Content-Type: application/json

{
  "amount": 100,
  "phoneNumber": "254712345678",
  "accountReference": "Kabeba Campaign Donation",
  "donorInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "anonymous": false
  }
}
```

### STK Push Response

```json
{
  "success": true,
  "checkoutRequestId": "ws_CO_1234567890",
  "responseCode": "0",
  "message": "STK Push sent successfully. Check your phone.",
  "customerMessage": "Please check your phone and enter your M-Pesa PIN to complete the payment."
}
```

### Payment Status Response

```json
{
  "success": true,
  "status": "completed",
  "transaction": {
    "checkoutRequestId": "ws_CO_1234567890",
    "amount": 100,
    "phoneNumber": "254712345678",
    "timestamp": "2024-01-27T10:30:00.000Z",
    "completedAt": "2024-01-27T10:30:30.000Z"
  }
}
```

## 🎯 Next Steps

1. **Test thoroughly** in sandbox environment
2. **Implement donor database** for record keeping
3. **Add email/SMS confirmations** for successful payments
4. **Set up monitoring** and alerting
5. **Plan for high traffic** during campaign peaks
6. **Consider payment analytics** for campaign insights

## 📞 Support

For M-Pesa API issues:
- [Safaricom Developer Portal](https://developer.safaricom.co.ke/)
- M-Pesa API Documentation

For integration issues:
- Check backend logs for detailed error messages
- Verify API credentials and configuration
- Test with small amounts first

---

**Note**: Always comply with M-Pesa's terms of service and Kenyan financial regulations. Ensure your callback URL is secure and can handle the payment data properly.