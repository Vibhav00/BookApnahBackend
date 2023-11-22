const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const ApiFeatures = require('../utils/apifeatures')
const ErrorHander = require('../utils/errorHandler')
const util = require('util')
const CSVToJSON = require('csvtojson')
const Book = require('./../models/bookModel')

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
