const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/companies', require('./routes/companyRoutes'));
app.use('/api/communications', require('./routes/communicationRoutes'));

// Home Route
app.get('/', (req, res) => {
  res.send('Calendar Communication Tracker Backend is Running');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
