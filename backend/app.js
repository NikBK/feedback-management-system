const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors({
  origin: 'https://nikbk-feedback-management-system.vercel.app',
  credentials: true
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/feedback', feedbackRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
