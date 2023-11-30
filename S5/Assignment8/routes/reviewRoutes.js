const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Routes
router.post('/', reviewController.addReview);
router.delete('/:reviewId', reviewController.deleteReview);

module.exports = router;
