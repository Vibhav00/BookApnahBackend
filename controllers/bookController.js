const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const ApiFeatures = require('../utils/apifeatures')
const ErrorHander = require('../utils/errorHandler')
const util = require('util')
const CSVToJSON = require('csvtojson')
const Book = require('./../models/bookModel')
const fs = require('fs')

/** initializing the project
 * this will add default 20 items with images **/

exports.initializeBooks = catchAsyncErrors(async (req, res, next) => {
  let books = JSON.parse(fs.readFileSync('./utils/defaultBooks.json', 'utf8'))
  let respb = await Book.insertMany(books)
  res.status(200).json({
    success: true,
    respb,
  })
})

// function to get all books
exports.getAllBooks = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 10
  const productsCount = await Book.countDocuments()

  const apiFeature = new ApiFeatures(Book.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage)

  let books = await apiFeature.query

  let filteredBooksCount = books.length

  res.status(200).json({
    success: true,
    books,
    productsCount,
    resultPerPage,
    filteredBooksCount,
  })
})

// function to add the book and for admin route

exports.addBook = catchAsyncErrors(async (req, res, next) => {
  //getting the request body
  let bookReq = req.body

  // creating the form data
  let formData = new FormData()
  formData.append('image', bookReq.image)

  const settings = {
    method: 'POST',
    body: formData,
  }
  const fetchResponse = await fetch(
    `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.IMBB_KEY}`,
    settings
  )

  // making api request to save image
  const data = await fetchResponse.json()

  // updating the image64 with the actual image url
  bookReq.image = data.data.url

  // saving the image to local database
  const book = await Book.create(bookReq)
  res.status(200).json({
    success: true,
    book,
  })
})

// update book
exports.updateBook = catchAsyncErrors(async (req, res, next) => {
  const newBook = req.body

  const book = await Book.findByIdAndUpdate(req.body.id, newBook, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    message: 'book updated successfully',
    book,
  })
})

// single book details
exports.getBookDetails = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.body.id)

  res.status(200).json({
    success: true,
    book,
  })
})

/** deleting the book **/
exports.deleteBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.body.id)

  if (!book) {
    return next(new ErrorHander('Product not found', 404))
  }

  await Book.findByIdAndDelete(book)

  res.status(200).json({
    success: true,
    message: 'Product Delete Successfully',
  })
})
