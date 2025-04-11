const { feedbacks } = require('../data/store');

const createFeedback = (req, res) => {
  const { name, email, rating, message } = req.body;
  if (!name || !email || !rating || !message)
    return res.status(400).json({ message: 'All fields are required' });

  const feedback = {
    id: Date.now().toString(),
    name,
    email,
    rating: Number(rating),
    message,
    date: new Date().toISOString(),
  };

  feedbacks.push(feedback);
  res.status(201).json({ message: 'Feedback submitted' });
};

const getFeedbacks = (req, res) => {
  const { rating } = req.query;
  let result = feedbacks;
  if (rating) {
    result = feedbacks.filter((f) => f.rating === Number(rating));
  }
  res.json(result);
};

const deleteFeedback = (req, res) => {
  const index = feedbacks.findIndex((f) => f.id === req.params.id);
  if (index === -1)
    return res.status(404).json({ message: 'Feedback not found' });
  feedbacks.splice(index, 1);
  res.json({ message: 'Feedback deleted' });
};

module.exports = { createFeedback, getFeedbacks, deleteFeedback };
