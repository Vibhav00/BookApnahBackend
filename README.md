# 📚📕 BookApnah Backend🌐

## Build with Node.js,Express.js and MongoDB 🚀🌐🛠️

I developed a Node.js server using Express.js and MongoDB, structured in the MVC architecture with robust error handling. The server facilitates CRUD operations for both users and products. Users can register, update, and delete their profiles, as well as add products to their carts. Admins can manage site-wide products, including uploading images to ImgBB. All data is stored in MongoDB for efficient retrieval and management.

---

## video

https://github.com/Vibhav00/BookApnahBackend/assets/101458238/876bce0a-7724-430a-bb06-75ddff40b8ef

---

## Initialization of the Database

- I had attached some books with their images in the utils folder with name defaultBooks
- Anyone can add these books to the database for their testing purposes
- For adding them you can send a GET request to "/books/init"

```
   http://127.0.0.1:5000/books/init

```

- this will return a list of books added to the database

---

## adding the books as admin ➕🍁

- you must be admin to add new books to the database
- you can change the role fot the first time directly from the database
- For adding them you can send a POST request to "/books/book"
- you can attach token to the cookie or pass directly as the parameter (token = "llk34309lksnfn20932lk9832390f")
- you must have to pass the base64 image as image in the form data for uplading them

```
   http://127.0.0.1:5000/books/book

```

- this will return the book with all the rest details like img url

- output

```json
{
  "success": true,
  "book": {
    "name": "sdf545784545",
    "isbn": 445424,
    "author": "sdfs sdgsdfs",
    "format": "sdfsd",
    "price": 141,
    "old_price": 14,
    "discount": 14,
    "ratings": 14,
    "book_depository_stars": 0,
    "image": "https://i.ibb.co/K7HK1f2/43056049c4a2.jpg",
    "category": "sdfs",
    "new_book": false,
    "top_sellings": false,
    "on_sale": false,
    "recent_comming": false,
    "stock": 414,
    "numOfReviews": 0,
    "_id": "6642e42e2450ade0d846860c",
    "reviews": [],
    "createdAt": "2024-05-14T04:10:22.146Z",
    "__v": 0
  }
}
```

---

## Rest urls with output are as follows :-

### user registerations 🧾

- url

```
http://localhost:5000/users/register

```

- body

```json
{
  "name": "vibhavkumgar",
  "email": "vkb@kbc.io",
  "password": "lskdjflskjdf",
  "username": "lgskdjf"
}
```

- output

```json
{
  "success": true,
  "user": {
    "name": "vibhavkumgagr",
    "username": "vibhavkumarock",
    "email": "vkb@kbc.io",
    "password": "$2a$10$nlleJtQkQGHrzylSAwBpC.DkrI7NfMEgAo0KfuoqH5ooPyBRpNfKK",
    "role": "user",
    "_id": "6642f227f77904beaa3b0b3f",
    "createdAt": "2024-05-14T05:09:59.168Z",
    "cart": [],
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDJmMjI3Zjc3OTA0YmVhYTNiMGIzZiIsImlhdCI6MTcxNTY2MzM5OSwiZXhwIjoxNzE1OTIyNTk5fQ.S0DeosslNixRdLRytZRdYfJtaziTG3dNmLqo06eBdEc"
}
```

---

### check if user is logged in 🚪

- url

```
http://localhost:5000/users/check

```

- output

```json
{
  "success": true
}
```

### user login 🔒🔑

- url

```
http://localhost:5000/users/login

```

- body

```json
{
  "password": "lskdjflskjdf",
  "username": "lgskdjf"
}
```

- output

```json
{
  "success": true,
  "user": {
    "_id": "6641824af442d399e0ddc906",
    "name": "vibhavkumgar",
    "username": "lgskdjf",
    "email": "vkb@kbc.io",
    "password": "$2a$10$5FJE.qqwgsdse20NA3APT.JXD12rPyut79zy/UiSMIADVvyNA3RMu",
    "role": "admin",
    "createdAt": "2024-05-13T03:00:26.881Z",
    "cart": [],
    "__v": 2
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDE4MjRhZjQ0MmQzOTllMGRkYzkwNiIsImlhdCI6MTcxNTY2MzYxNSwiZXhwIjoxNzE1OTIyODE1fQ.Z8obo8_Ibd2aJ8cvAcX8q1BSf7jAt5FQ6RvyUa4iNRg"
}
```

---

### get all books 📚

- url

```
http://127.0.0.1:5000/books

```

- output

```json
{
  "success": true,
  "books": [
    {
      "_id": "664084bae669ab34e5137fca",
      "name": "1984",
      "isbn": 9780141036144,
      "author": "George Orwell",
      "format": "Paperback",
      "price": 484,
      "old_price": 646,
      "discount": 25,
      "ratings": 0,
      "book_depository_stars": 4,
      "image": "https://i.ibb.co/8868vy1/0000001.jpg",
      "category": "Science-Fiction-Fantasy-Horror",
      "new_book": true,
      "top_sellings": false,
      "on_sale": false,
      "recent_comming": true,
      "stock": 10,
      "numOfReviews": 0,
      "reviews": [],
      "createdAt": "2024-05-12T08:58:34.617Z",
      "__v": 0
    },
    {
      "_id": "664084bae669ab34e5137fcb",
      "name": "The Testaments",
      "isbn": 9781784742324,
      "author": "Margaret Atwood",
      "format": "Hardback",
      "price": 1697,
      "old_price": 1715,
      "discount": 1,
      "ratings": 0,
      "book_depository_stars": 4,
      "image": "https://i.ibb.co/tcvrQLS/0000002.jpg",
      "category": "Science-Fiction-Fantasy-Horror",
      "new_book": true,
      "top_sellings": false,
      "on_sale": false,
      "recent_comming": true,
      "stock": 18,
      "numOfReviews": 0,
      "reviews": [],
      "createdAt": "2024-05-12T08:58:34.622Z",
      "__v": 0
    }
  ],
  "productsCount": 429,
  "resultPerPage": 2,
  "filteredBooksCount": 10
}
```

---
