# KetoSlim Backend API Documentation

Complete REST API documentation for the KetoSlim backend application.

**Base URL:** `http://localhost:5000/api`

---

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [Forms](#forms)
3. [Results](#results)
4. [Products](#products)
5. [Orders](#orders)
6. [Error Handling](#error-handling)

---

## 🔐 Authentication

### Register User

Create a new user account.

**Endpoint:** `POST /auth/register`

**Auth Required:** No

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "name": "John Doe",
      "roles": ["user"]
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Login

Authenticate and receive JWT token.

**Endpoint:** `POST /auth/login`

**Auth Required:** No

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "name": "John Doe",
      "roles": ["user"]
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Get Current User

Get logged-in user's profile.

**Endpoint:** `GET /auth/me`

**Auth Required:** Yes

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "roles": ["user"],
    "createdAt": "2023-12-01T10:00:00.000Z"
  }
}
```

---

## 📝 Forms

### Submit Form

Create a new form submission with health data.

**Endpoint:** `POST /forms`

**Auth Required:** Optional (anonymous submissions allowed)

**Request Body:**
```json
{
  "gender": "male",
  "fatScale": 25,
  "bmi": 28.5,
  "calorie": 2000,
  "water": 2.5,
  "weightLoss": 10,
  "days": 90
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Form submission created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "gender": "male",
    "fatScale": 25,
    "bmi": 28.5,
    "calorie": 2000,
    "water": 2.5,
    "weightLoss": 10,
    "days": 90,
    "createdAt": "2023-12-01T10:00:00.000Z"
  }
}
```

---

### Get Form by ID

Retrieve a specific form submission.

**Endpoint:** `GET /forms/:id`

**Auth Required:** Optional

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "gender": "male",
    "fatScale": 25,
    "bmi": 28.5,
    // ... other form fields
  }
}
```

---

### Get My Forms

Get all form submissions for logged-in user.

**Endpoint:** `GET /forms/user/me`

**Auth Required:** Yes

**Success Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "gender": "male",
      // ... form fields
    }
  ]
}
```

---

## 📊 Results

### Generate Result

Generate personalized weight loss plan from form submission.

**Endpoint:** `POST /results/generate`

**Auth Required:** Optional

**Request Body:**
```json
{
  "formSubmissionId": "507f1f77bcf86cd799439011"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Result generated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "formSubmissionId": "507f1f77bcf86cd799439011",
    "totalWeeks": 13,
    "startWeight": 82.4,
    "goalWeight": 72.4,
    "totalWeightLoss": 10,
    "steps": [
      {
        "stepNumber": 1,
        "week": 1,
        "weight": 81.6,
        "bmi": 27.8,
        "calories": 1980,
        "water": 2.7
      },
      // ... more steps
    ]
  }
}
```

---

### Get Result by ID

Retrieve a specific result.

**Endpoint:** `GET /results/:id`

**Auth Required:** Optional

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "steps": [...],
    // ... result data
  }
}
```

---

### Get Result by Form ID

Get result associated with a form submission.

**Endpoint:** `GET /results/form/:formId`

**Auth Required:** Optional

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    // ... result data
  }
}
```

---

## 🛍️ Products

### Get All Products

Browse product catalog with filtering and pagination.

**Endpoint:** `GET /products`

**Auth Required:** No

**Query Parameters:**
- `category` (optional): Filter by category (meal-plan, supplement, guide, bundle)
- `search` (optional): Text search in name and description
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `inStock` (optional): Filter by stock availability (true/false)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `sortBy` (optional): Sort field (name, price, createdAt)
- `sortOrder` (optional): Sort direction (asc, desc)

**Example Request:**
```
GET /products?category=meal-plan&minPrice=20&maxPrice=100&page=1&limit=10
```

**Success Response (200):**
```json
{
  "success": true,
  "products": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "30-Day Keto Meal Plan",
      "description": "Complete 30-day meal plan...",
      "price": 79.99,
      "features": ["30 days of meals", "Shopping lists", "..."],
      "imageUrl": "https://example.com/image.jpg",
      "category": "meal-plan",
      "stock": 9999,
      "isActive": true,
      "inStock": true,
      "createdAt": "2023-12-01T10:00:00.000Z"
    }
  ],
  "total": 25,
  "pages": 3
}
```

---

### Get Product by ID

Get single product details.

**Endpoint:** `GET /products/:id`

**Auth Required:** No

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "30-Day Keto Meal Plan",
    // ... product fields
  }
}
```

---

### Create Product

Create a new product (Admin only).

**Endpoint:** `POST /products`

**Auth Required:** Yes (Admin role)

**Request Body:**
```json
{
  "name": "New Keto Product",
  "description": "Product description here...",
  "price": 49.99,
  "features": ["Feature 1", "Feature 2"],
  "imageUrl": "https://example.com/image.jpg",
  "category": "supplement",
  "stock": 100
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    // ... created product
  }
}
```

---

### Update Product

Update existing product (Admin only).

**Endpoint:** `PUT /products/:id`

**Auth Required:** Yes (Admin role)

**Request Body:** (All fields optional)
```json
{
  "name": "Updated Name",
  "price": 59.99,
  "stock": 150
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    // ... updated product
  }
}
```

---

### Delete Product

Soft delete a product (Admin only).

**Endpoint:** `DELETE /products/:id`

**Auth Required:** Yes (Admin role)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

### Update Stock

Update product stock quantity (Admin only).

**Endpoint:** `PATCH /products/:id/stock`

**Auth Required:** Yes (Admin role)

**Request Body:**
```json
{
  "quantityChange": -5
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Stock updated successfully",
  "data": {
    // ... updated product with new stock
  }
}
```

---

## 🛒 Orders

### Create Order

Place a new order (checkout).

**Endpoint:** `POST /orders`

**Auth Required:** Optional (guest checkout allowed)

**Request Body:**
```json
{
  "items": [
    {
      "productId": "507f1f77bcf86cd799439013",
      "quantity": 2
    },
    {
      "productId": "507f1f77bcf86cd799439014",
      "quantity": 1
    }
  ],
  "paymentMethod": "credit-card",
  "shippingInfo": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "notes": "Please deliver before 5 PM"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "orderNumber": "ORD-20231201-ABC123",
    "items": [
      {
        "productId": "507f1f77bcf86cd799439013",
        "productName": "30-Day Keto Meal Plan",
        "quantity": 2,
        "priceAtPurchase": 79.99,
        "subtotal": 159.98
      }
    ],
    "totalAmount": 194.97,
    "status": "pending",
    "paymentStatus": "pending",
    "paymentMethod": "credit-card",
    "shippingInfo": { ... },
    "createdAt": "2023-12-01T10:00:00.000Z"
  }
}
```

---

### Get My Orders

Get all orders for logged-in user.

**Endpoint:** `GET /orders/user/me`

**Auth Required:** Yes

**Query Parameters:**
- `status` (optional): Filter by status
- `page` (optional): Page number
- `limit` (optional): Items per page

**Success Response (200):**
```json
{
  "success": true,
  "orders": [...],
  "total": 5,
  "pages": 1
}
```

---

### Get Order by ID

Get specific order details.

**Endpoint:** `GET /orders/:id`

**Auth Required:** Yes (owner or admin)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    // ... order details
  }
}
```

---

### Get Order by Number

Track order using order number.

**Endpoint:** `GET /orders/number/:orderNumber`

**Auth Required:** No

**Example:** `GET /orders/number/ORD-20231201-ABC123`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    // ... order details
  }
}
```

---

### Update Order Status

Update order status (Admin only).

**Endpoint:** `PATCH /orders/:id/status`

**Auth Required:** Yes (Admin role)

**Request Body:**
```json
{
  "status": "shipped",
  "paymentStatus": "completed"
}
```

**Status Options:**
- `pending`
- `paid`
- `processing`
- `shipped`
- `delivered`
- `cancelled`
- `refunded`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Order status updated successfully",
  "data": {
    // ... updated order
  }
}
```

---

### Cancel Order

Cancel a pending order.

**Endpoint:** `POST /orders/:id/cancel`

**Auth Required:** Yes (owner or admin)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Order cancelled successfully",
  "data": {
    // ... cancelled order
  }
}
```

---

## ⚠️ Error Handling

All endpoints return consistent error responses:

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### Forbidden (403)
```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details (only in development)"
}
```

---

## 🧪 Testing with Seed Data

1. **Run seed script:**
   ```bash
   npm run seed
   ```

2. **Test accounts created:**
   - Admin: `admin@ketoslim.com` / `admin123`
   - User: `user@test.com` / `user123`

3. **Products created:**
   - 7 sample products across all categories
   - Ready for testing orders and cart functionality

---

## 📌 Notes

- All authenticated endpoints require `Authorization: Bearer <token>` header
- Tokens are returned from `/auth/login` and `/auth/register`
- Admin-only endpoints require user to have `admin` role
- Guest checkout is supported for orders (userId optional)
- Digital products (meal-plans, guides) have stock set to 9999
- Physical products (supplements) have realistic stock counts

---

## 🚀 Quick Start

1. Start MongoDB
2. Run seed: `npm run seed`
3. Start server: `npm run dev`
4. Server runs on: `http://localhost:5000`
5. Test with: Postman, Thunder Client, or cURL

---

**Last Updated:** December 2025  
**Version:** 1.0.0
