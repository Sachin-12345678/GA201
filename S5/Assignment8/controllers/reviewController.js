const Product = require('../models/product');
const Review = require('../models/review');

// Controller functions
exports.addReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    const review = new Review(req.body);
    product.reviews.push(review);
    await Promise.all([review.save(), product.save()]);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    product.reviews.pull({ _id: req.params.reviewId });
    await Promise.all([Review.findByIdAndDelete(req.params.reviewId), product.save()]);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
