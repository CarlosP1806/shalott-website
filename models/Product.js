const { Schema, model } = require('mongoose');
const slugify = require('slugify');

const productSchema = new Schema({
  productId: {
    type: String,
    required: true,
    unique: true
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
    type: Number,
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
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
});

productSchema.pre('validate', function() {
  if(this.productName) {
    this.slug = slugify(this.productName, {
      lower: true,
      strict: true
    });
  }
});

const Product = model('Product', productSchema);
module.exports = Product;