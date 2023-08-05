const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, "Please provide product name" ],
    trim: true
  },
  desc: {
    type: String,
    required: [ true, "Please provide product description" ]
  },
  price: {
    type: Number,
    required: [ true, "Please provide product price" ],
    maxlength: [ 8, "Price cannot exceed 8 digits" ]
  },
  rating: {
    type: Number,
    default: 0,
    maxlength: [ 5, "Rating cannot exceed 5" ]
  },
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  category: {
    type: String,
    required: [ true, "Please provide product category" ]
  },
  stock: {
    type: Number,
    required: [ true, "Please provide product stock" ],
    maxlength: [ 4, "Stock cannot exceed 4 digits" ],
    default: 1
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  reviews: [
    {
      name: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      comment: {
        type: String,
        required: true
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Product', ProductSchema);