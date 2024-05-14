const mongoose = require('mongoose')

//todo: add virtual field

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter Book Name'],
    trim: true,
  },
  isbn: {
    type: Number,
    default: 0,
  },
  author: {
    type: String,
    required: [true, 'Please Enter author name'],
    trim: true,
  },
  format: {
    type: String,
    required: [true, 'Please Enter format '],
    trim: true,
  },
  description: {
    type: String,
    // required: [true, 'Please Enter product Description'],
  },
  price: {
    type: Number,
    required: [true, 'Please Enter product Price'],
    maxLength: [8, 'Price cannot exceed 8 characters'],
  },
  old_price: {
    type: Number,
    required: [true, 'Please Enter old Price'],
    maxLength: [8, 'Old Price cannot exceed 8 characters'],
  },
  discount: {
    type: Number,
    maxLength: [8, 'Discount cannot exceed 8 characters'],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  book_depository_stars: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: [true, 'Please Enter Product Category'],
  },
  new_book: {
    type: Boolean,
    default: false,
  },
  top_sellings: {
    type: Boolean,
    default: false,
  },
  on_sale: {
    type: Boolean,
    default: false,
  },
  recent_comming: {
    type: Boolean,
    default: false,
  },
  stock: {
    type: Number,
    required: [true, 'Please Enter product Stock'],
    maxLength: [4, 'Stock cannot exceed 4 characters'],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Books', bookSchema)
