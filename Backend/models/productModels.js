const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid')

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    default:uuidv4()
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  rating: {
    rate: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
