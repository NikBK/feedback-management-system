const express = require('express');
const {
  createFeedback,
  getFeedbacks,
  deleteFeedback,
} = require('../controllers/feedbackController');
const { protect, isAdmin } = require('../middleware/authHandler');
const router = express.Router();

router.post('/', protect, createFeedback);
router.get('/', protect, getFeedbacks);
router.delete('/:id', protect, isAdmin, deleteFeedback);

module.exports = router;
