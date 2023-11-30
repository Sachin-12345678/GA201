// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  cDate: { type: Date, default: Date.now },
  uDate: { type: Date, default: Date.now },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

productSchema.virtual('virtualReviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'productId',
  });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
