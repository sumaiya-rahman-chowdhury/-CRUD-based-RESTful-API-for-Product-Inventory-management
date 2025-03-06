# Express.js API with JWT Authentication

## Overview
This is a secure **Express.js API** that provides JWT-based authentication for managing products. The API allows users to perform CRUD operations on products, with authentication required for adding, updating, and deleting products.

## Features
- **User Authentication** (Register & Login with JWT)
- **Product Management** (CRUD operations)
- **Pagination, Sorting, and Filtering** for fetching products
- **Middleware for JWT Authentication**

## Technologies Used
- Node.js & Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- dotenv (for environment variables)
- CORS & Body-parser

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/express-jwt-api.git
   cd express-jwt-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a **.env** file and configure:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_random_secret_key
   ```

## Running the API
Start the server:
```sh
npm start
```
The API runs at: `http://localhost:5000`

## API Endpoints

### **User Authentication**
#### **Register User**
`POST /api/register`
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "securepassword"
}
```

#### **Login User**
`POST /api/login`
```json
{
  "email": "test@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "token": "your_jwt_token"
}
```

### **Product Management**
#### **Get All Products (with Pagination & Filtering)**
`GET /api/products?page=1&limit=10&category=electronics&sortBy=price&order=asc`

#### **Get Single Product**
`GET /api/products/:id`

#### **Add Product (Authenticated)**
`POST /api/products/add-product`
**Headers:** `{ Authorization: Bearer <token> }`
```json
{
  "name": "Laptop",
  "price": 1200,
  "category": "electronics",
  "stock": 10,
  "description": "High-performance laptop"
}
```

#### **Update Product (Authenticated)**
`PUT /api/products/:id`
**Headers:** `{ Authorization: Bearer <token> }`
```json
{
  "name": "Updated Laptop",
  "price": 1000,
  "category": "electronics",
  "stock": 5,
  "description": "Updated description"
}
```

#### **Delete Product (Authenticated)**
`DELETE /api/products/:id`
**Headers:** `{ Authorization: Bearer <token> }`

## Deployment (Vercel)
1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Deploy API:
   ```sh
   vercel
   ```
3. Add environment variables:
   ```sh
   vercel env add MONGO_URI "your_mongodb_uri"
   vercel env add JWT_SECRET "your_secret"
   ```
4. Redeploy:
   ```sh
   vercel --prod
   ```

## License
MIT License

