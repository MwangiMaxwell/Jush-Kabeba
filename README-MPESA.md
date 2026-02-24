# M-Pesa Daraja API Setup Guide

## 🚀 Quick Start

### 1. Backend Setup

```bash
# Install backend dependencies
npm install --package-lock-only server-package.json

# Copy environment template
cp env-example.txt .env

# Edit .env with your M-Pesa credentials
nano .env

# Start the backend server
node server.js
```

### 2. Frontend Setup

```bash
# Install frontend dependencies (already done)
npm install

# Set API URL (optional, defaults to localhost:3001)
echo "REACT_APP_API_URL=http://localhost:3001" > .env.local

# Start the React app
npm start
```

## 🔧 M-Pesa Setup

### Get API Credentials

1. **Register at Safaricom Developer Portal**
   - Visit: https://developer.safaricom.co.ke
   - Create a developer account
   - Register your app

2. **Get Required Credentials:**
   - Consumer Key
   - Consumer Secret
   - Business Shortcode (PayBill/Till number)
   - Passkey (from your app settings)

3. **Configure Environment**
   ```env
   MPESA_ENV=sandbox
   MPESA_CONSUMER_KEY=your_consumer_key
   MPESA_CONSUMER_SECRET=your_consumer_secret
   MPESA_SHORTCODE=your_shortcode
   MPESA_PASSKEY=your_passkey
   MPESA_CALLBACK_URL=https://yourdomain.com/api/mpesa/callback
   ```

### Testing

**Sandbox Test Credentials:**
- Use test phone numbers: 254708374149, 254728590313
- Test amounts: Keep under KSh 100 for testing

**Production Switch:**
- Change `MPESA_ENV=production`
- Use live credentials
- Ensure callback URL is HTTPS

## 📱 How It Works

1. **User selects donation amount** and enters phone number
2. **Frontend calls backend** `/api/mpesa/stkpush` endpoint
3. **Backend initiates STK Push** via M-Pesa API
4. **M-Pesa sends push notification** to user's phone
5. **User authorizes payment** on their phone
6. **M-Pesa sends callback** to backend with payment result
7. **Frontend polls for status** and shows confirmation

## 🔗 API Endpoints

### POST `/api/mpesa/stkpush`
Initiates M-Pesa STK Push payment.

**Request Body:**
```json
{
  "amount": 100,
  "phoneNumber": "0712345678",
  "accountReference": "Kabeba Campaign",
  "donorName": "John Doe",
  "donorEmail": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "checkoutRequestId": "ws_CO_123456789",
  "message": "STK Push sent! Check your phone..."
}
```

### GET `/api/mpesa/status/:checkoutRequestId`
Check payment status.

**Response:**
```json
{
  "success": true,
  "status": "completed",
  "amount": 100,
  "phoneNumber": "254712345678",
  "mpesaReceiptNumber": "QAB123ABCD",
  "completedAt": "2024-01-26T10:30:00.000Z"
}
```

### POST `/api/mpesa/callback`
M-Pesa payment result callback (server-to-server).

## 🛠️ Development

### Backend Development
```bash
# Install development dependencies
npm install nodemon --save-dev

# Run with auto-restart
npm run dev
```

### Frontend Development
```bash
# Start React development server
npm start

# Build for production
npm run build
```

## 🔒 Security

- Store API keys securely (never in code)
- Use HTTPS for production
- Validate all input data
- Implement rate limiting
- Log transactions for audit

## 🐛 Troubleshooting

### Common Issues

1. **"Failed to get M-Pesa access token"**
   - Check consumer key and secret
   - Verify sandbox/production environment

2. **"Invalid phone number"**
   - Must be valid Kenyan number (07XX or 2547XX)
   - Check formatting

3. **"STK Push timeout"**
   - User didn't respond to push notification
   - Network connectivity issues

4. **"Callback not received"**
   - Ensure callback URL is accessible
   - Check firewall settings

### Logs

Check server logs for detailed error information:
```bash
# Backend logs
tail -f server.log

# Frontend console
# Open browser dev tools > Console
```

## 📊 Production Deployment

### Backend Deployment
```bash
# Build and deploy to your server
# Ensure .env is properly configured
# Set up process manager (PM2, systemd, etc.)
```

### Frontend Deployment
```bash
# Build optimized bundle
npm run build

# Deploy build/ folder to your web server
```

### Environment Setup
- Set `MPESA_ENV=production`
- Use production API credentials
- Configure production callback URL
- Enable HTTPS

## 📞 Support

For M-Pesa API issues:
- Safaricom Developer Portal: https://developer.safaricom.co.ke
- API Documentation: https://developer.safaricom.co.ke/docs

For application issues:
- Check server logs
- Verify API connectivity
- Test with sandbox credentials first