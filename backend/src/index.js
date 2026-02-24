const express = require('express');
const cors = require('cors');
const mpesaRoutes = require('./routes/mpesa');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Kabeba Donation Backend'));

app.use('/api/mpesa', mpesaRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});