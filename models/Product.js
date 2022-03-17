const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  productId: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productImage: {
    type: String,
    required: true
  },
  productPrice: {
    type: String, // TODO: Implement formater and change to number
    required: true
  },
  productCollection: {
    type: String,
    required: true
  },
  productCategory: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    required: true
  }
});

const Product = model('Product', productSchema);
module.exports = Product;