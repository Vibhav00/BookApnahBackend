class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query
    this.queryStr = queryStr
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {}

    console.log(this.queryStr.newbook)
    const newBook = this.queryStr.newbook == 'true' ? { new_book: true } : {}
    const topSellings =
      this.queryStr.topsellings == 'true' ? { top_sellings: true } : {}
    const onSale = this.queryStr.onsale == 'true' ? { on_sale: true } : {}
    const recentComming =
      this.queryStr.recentcomming == 'true' ? { recent_comming: true } : {}
     console.log({
       ...keyword,
       ...newBook,
       ...topSellings,
       ...onSale,
       ...recentComming,
     })
    this.query = this.query.find({
      ...keyword,
      ...newBook,
      ...topSellings,
      ...onSale,
      ...recentComming,
    })
    return this
  }

  filter() {
    const queryCopy = { ...this.queryStr }
    //   Removing some fields for category
    const removeFields = [
      'keyword',
      'page',
      'limit',
      'newbook',
      'topsellings',
      'onsale',
      'recentcomming',
      'resultperpage',
    ]

    removeFields.forEach((key) => delete queryCopy[key])

    // Filter For Price and Rating

    let queryStr = JSON.stringify(queryCopy)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)

    this.query = this.query.find(JSON.parse(queryStr))

    return this
  }

  pagination(resultPerPagedefault) {
    const currentPage = Number(this.queryStr.page) || 1
    const resultPerPage =
      Number(this.queryStr.resultperpage) || resultPerPagedefault

    const skip = resultPerPage * (currentPage - 1)

    this.query = this.query.limit(resultPerPage).skip(skip)

    return this
  }
}

module.exports = ApiFeatures
