##  Book Store Backend API

This is a simple Book Store Backend API built using Node.js, Express, and MongoDB.  
It allows users to register, login, sell books, buy books, view inventory, and includes basic admin features.

This project is beginner-friendly and made for learning backend development.



##  Tech Stack

 Node.js
 Express.js
 MongoDB
 Mongoose
 JWT (JSON Web Token)
 Thunder Client / Postman (for testing APIs)



##  Features

### User
 Register user
 Login user
 JWT authentication

### Books
 Sell a book
 Buy a book
 Update book status
 View all books

### Inventory
 View purchased books (inventory)

### Admin (Basic)
 View all users
 View all books
 View sold books



## 📂 Folder Structure
src/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
└── server.js


##  Installation & Setup

clone the project
install dependencies
run the server


## Authentication

JWT is used for authentication
Pass token in headers
    
     
## Api end-points

# Auth Routes

POST /api/auth/register
POST /api/auth/login

# Book Routes

all routes work with authMiddleware only 

POST /api/book/sold
GET  /api/book/buy/id
GET  /api/book/getAll
PUT  /api/book/updateStatus/:id/:status -------------|
PUT  /api/book/allSoldBooks  ------------------------|this both routes work with allowRoles admin or user
POST /api/book/inventory/add/id
GET  /api/book/inventory/getAll


# Testing

You can test these api's on 
thunder client/postman

make sure login first