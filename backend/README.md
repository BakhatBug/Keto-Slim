# KetoSlim Backend - README

Complete Node.js + Express + MongoDB backend for the KetoSlim weight loss application.

## 📋 Features

### ✅ Authentication & Authorization
- JWT-based authentication
- Role-based access control (user, admin)
- Secure password hashing with bcrypt
- Protected routes and endpoints

### ✅ Form Submissions & Results
- Anonymous and authenticated form submissions
- Personalized weight loss plan generation
- Weekly step-by-step progress tracking
- BMI, calorie, and water intake calculations

### ✅ Product Catalog
- Full CRUD operations
- Advanced filtering and search
- Category-based organization
- Stock management
- Soft delete support

### ✅ Order Management
- Guest and authenticated checkout
- Multi-item shopping cart
- Automatic price calculation
- Order status tracking
- Inventory management
- Order cancellation with stock restoration

### ✅ Security & Best Practices
- Helmet for security headers
- CORS configuration
- Rate limiting
- Input validation with Zod
- Centralized error handling
- Request logging

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken) + bcrypt
- **Validation:** Zod
- **Security:** Helmet, CORS, express-rate-limit
- **Development:** nodemon, ts-node

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection
│   ├── controllers/             # HTTP request handlers
│   │   ├── authController.ts
│   │   ├── formController.ts
│   │   ├── resultController.ts
│   │   ├── productController.ts
│   │   └── orderController.ts
│   ├── middleware/              # Middleware functions
│   │   ├── auth.ts              # JWT verification, role checks
│   │   ├── errorHandler.ts      # Centralized error handling
│   │   ├── validation.ts        # Auth validation schemas
│   │   ├── formValidation.ts    # Form validation schemas
│   │   ├── productValidation.ts # Product validation schemas
│   │   └── orderValidation.ts   # Order validation schemas
│   ├── models/                  # Mongoose schemas
│   │   ├── User.ts
│   │   ├── FormSubmission.ts
│   │   ├── Result.ts
│   │   ├── Product.ts
│   │   └── Order.ts
│   ├── routes/                  # API route definitions
│   │   ├── authRoutes.ts
│   │   ├── formRoutes.ts
│   │   ├── resultRoutes.ts
│   │   ├── productRoutes.ts
│   │   └── orderRoutes.ts
│   ├── services/                # Business logic layer
│   │   ├── authService.ts
│   │   ├── formService.ts
│   │   ├── resultService.ts
│   │   ├── productService.ts
│   │   └── orderService.ts
│   ├── types/
│   │   └── index.ts             # Custom error classes
│   ├── index.ts                 # Main server entry point
│   └── seed.ts                  # Database seeding script
├── .env                         # Environment variables
├── package.json
├── tsconfig.json
└── API_DOCUMENTATION.md         # Complete API docs

```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Create a `.env` file in the backend directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/ketoslim
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   
   # CORS
   CLIENT_ORIGIN=http://localhost:5173
   
   # Bcrypt
   BCRYPT_ROUNDS=10
   ```

4. **Seed the database:**
   ```bash
   npm run seed
   ```

   This creates:
   - Admin user: `admin@ketoslim.com` / `admin123`
   - Test user: `user@test.com` / `user123`
   - 7 sample products

5. **Start the development server:**
   ```bash
   npm run dev
   ```

   Server will start on `http://localhost:5000`

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Quick Reference

**Authentication:**
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get JWT token
- `GET /auth/me` - Get current user (protected)
- `POST /auth/logout` - Logout user

**Forms:**
- `POST /forms` - Submit health data form
- `GET /forms/:id` - Get form by ID
- `GET /forms/user/me` - Get my forms (protected)
- `GET /forms` - Get all forms (admin only)
- `DELETE /forms/:id` - Delete form (protected)

**Results:**
- `POST /results/generate` - Generate weight loss plan
- `GET /results/:id` - Get result by ID
- `GET /results/form/:formId` - Get result by form ID
- `GET /results/user/me` - Get my results (protected)
- `DELETE /results/:id` - Delete result (protected)

**Products:**
- `GET /products` - Browse products (with filters)
- `GET /products/:id` - Get product details
- `POST /products` - Create product (admin only)
- `PUT /products/:id` - Update product (admin only)
- `DELETE /products/:id` - Delete product (admin only)
- `PATCH /products/:id/stock` - Update stock (admin only)

**Orders:**
- `POST /orders` - Place order (checkout)
- `GET /orders/user/me` - Get my orders (protected)
- `GET /orders/:id` - Get order by ID (protected)
- `GET /orders/number/:orderNumber` - Track order (public)
- `GET /orders` - Get all orders (admin only)
- `PATCH /orders/:id/status` - Update order status (admin only)
- `POST /orders/:id/cancel` - Cancel order (protected)

For detailed API documentation with request/response examples, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 🧪 Testing

### Using Thunder Client / Postman

1. **Login as admin:**
   ```http
   POST http://localhost:5000/api/auth/login
   Content-Type: application/json

   {
     "email": "admin@ketoslim.com",
     "password": "admin123"
   }
   ```

2. **Copy the token from response**

3. **Test protected endpoints:**
   ```http
   GET http://localhost:5000/api/auth/me
   Authorization: Bearer <your-token-here>
   ```

### Test Workflow Example

1. **Register a new user**
2. **Login and get token**
3. **Submit a form** (health data)
4. **Generate result** (weight loss plan)
5. **Browse products**
6. **Create an order** (checkout)
7. **Track order status**

## 🏗️ Architecture

### Layered Architecture

```
┌─────────────────┐
│  HTTP Request   │
└────────┬────────┘
         │
┌────────▼────────┐
│     Routes      │  ← Define endpoints
└────────┬────────┘
         │
┌────────▼────────┐
│  Middleware     │  ← Validate, authenticate
└────────┬────────┘
         │
┌────────▼────────┐
│  Controllers    │  ← Handle HTTP layer
└────────┬────────┘
         │
┌────────▼────────┐
│    Services     │  ← Business logic
└────────┬────────┘
         │
┌────────▼────────┐
│     Models      │  ← Database operations
└────────┬────────┘
         │
┌────────▼────────┐
│    MongoDB      │
└─────────────────┘
```

### Key Design Patterns

- **Separation of Concerns:** Controllers, Services, Models are separated
- **Dependency Injection:** Services are injected into controllers
- **Error Handling:** Centralized error handler catches all errors
- **Validation:** Input validation before business logic
- **Authentication:** JWT-based with middleware
- **Authorization:** Role-based access control

## 📝 Scripts

```bash
npm run dev        # Start development server with hot reload
npm run build      # Compile TypeScript to JavaScript
npm start          # Run compiled JavaScript (production)
npm run seed       # Seed database with initial data
```

## 🔒 Security Features

- **Password Hashing:** bcrypt with salt rounds
- **JWT Authentication:** Secure token-based auth
- **Input Validation:** Zod schemas validate all inputs
- **Rate Limiting:** Prevent brute force attacks
- **Helmet:** Security headers
- **CORS:** Cross-origin protection
- **SQL Injection Protection:** MongoDB prevents SQL injection
- **XSS Protection:** Express built-in protection

## 🐛 Error Handling

All errors are handled by centralized error handler:

```typescript
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error (development only)",
  "stack": "Stack trace (development only)"
}
```

## 📊 Database Models

### User
- Email, password (hashed), name, roles
- Pre-save hook for password hashing
- comparePassword instance method

### FormSubmission
- Health data: gender, BMI, calories, water, weight loss goal
- Optional userId (supports anonymous submissions)
- Timestamps and indexes

### Result
- References FormSubmission
- Array of weekly steps
- Calculated BMI, calories, water per week
- Total weight loss tracking

### Product
- Name, description, price, features, category
- Stock management
- Soft delete (isActive flag)
- Text search index

### Order
- References User (optional for guest checkout)
- Array of order items with prices at purchase
- Shipping information
- Order status and payment status
- Auto-generated order number

## 🎯 Future Enhancements

- [ ] Email notifications (welcome, order confirmation)
- [ ] Password reset functionality
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Admin dashboard analytics
- [ ] File upload for product images
- [ ] Reviews and ratings system
- [ ] Coupon/discount code system
- [ ] Wishlist functionality
- [ ] Real-time order tracking
- [ ] Advanced search with Elasticsearch

## 📞 Support

For issues or questions:
1. Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
2. Review error messages in console
3. Check MongoDB connection
4. Verify environment variables

## 📄 License

This project is part of the KetoSlim internship project.

---

**Built with ❤️ for KetoSlim**
