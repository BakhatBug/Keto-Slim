# 🚀 KetoSlim Backend - Quick Start Guide

## Instant Setup (3 minutes)

### 1. Install & Configure
```bash
cd backend
npm install
```

### 2. Create `.env` file
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ketoslim
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:5173
BCRYPT_ROUNDS=10
```

### 3. Start Everything
```bash
# Seed database with test data
npm run seed

# Start server
npm run dev

# Server running on: http://localhost:5000
```

---

## 🧪 Test Accounts

```
Admin Account:
Email: admin@ketoslim.com
Password: admin123

User Account:
Email: user@test.com
Password: user123
```

---

## 📡 API Base URL

```
http://localhost:5000/api
```

---

## 🔥 Quick API Tests

### 1. Register User
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### 2. Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@ketoslim.com",
  "password": "admin123"
}

# Copy the token from response
```

### 3. Get Products
```bash
GET http://localhost:5000/api/products
```

### 4. Create Order
```bash
POST http://localhost:5000/api/orders
Content-Type: application/json

{
  "items": [
    {
      "productId": "<copy-from-products-response>",
      "quantity": 2
    }
  ],
  "currency": "USD",
  "paymentMethod": "credit-card",
  "shippingInfo": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

---

## 🧪 Run Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled production server |
| `npm run seed` | Populate database with test data |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |

---

## 📚 Import Postman Collection

1. Open Postman
2. Click **Import**
3. Select `KetoSlim_API.postman_collection.json`
4. Set variable `baseUrl` to `http://localhost:5000/api`
5. Start testing!

---

## 🎯 28 API Endpoints Ready

### Authentication (4)
- POST `/auth/register`
- POST `/auth/login`
- POST `/auth/logout`
- GET `/auth/me` 🔒

### Forms (5)
- POST `/forms`
- GET `/forms/:id`
- GET `/forms/user/me` 🔒
- GET `/forms` 🔒👑
- DELETE `/forms/:id` 🔒

### Results (5)
- POST `/results/generate`
- GET `/results/:id`
- GET `/results/form/:formId`
- GET `/results/user/me` 🔒
- DELETE `/results/:id` 🔒

### Products (6)
- GET `/products`
- GET `/products/:id`
- POST `/products` 🔒👑
- PUT `/products/:id` 🔒👑
- DELETE `/products/:id` 🔒👑
- PATCH `/products/:id/stock` 🔒👑

### Orders (8)
- POST `/orders`
- GET `/orders/user/me` 🔒
- GET `/orders/:id` 🔒
- GET `/orders/number/:orderNumber`
- GET `/orders` 🔒👑
- PATCH `/orders/:id/status` 🔒👑
- POST `/orders/:id/cancel` 🔒
- POST `/orders/:id/payment` 🔒

🔒 = Requires authentication  
👑 = Requires admin role

---

## ✅ What's Included

- ✅ JWT Authentication (Bearer tokens)
- ✅ Role-based Access Control (user/admin)
- ✅ Input Validation (Zod)
- ✅ Error Handling (Centralized)
- ✅ Security (Helmet, CORS, Rate Limiting)
- ✅ Database (MongoDB + Mongoose)
- ✅ Testing (Jest + Supertest)
- ✅ Documentation (README + API docs)
- ✅ Seed Data (2 users, 7 products)
- ✅ TypeScript (Type safety)

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
mongod

# Or use MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ketoslim
```

### Port Already in Use
```bash
# Change port in .env
PORT=3000
```

### Tests Failing
```bash
# Clear node modules and reinstall
rm -rf node_modules
npm install

# Make sure MongoDB is accessible
```

---

## 📖 Full Documentation

- **README.md** - Complete setup guide
- **API_DOCUMENTATION.md** - All endpoints with examples
- **SUPERVISOR_REQUIREMENTS_ANALYSIS.md** - Requirements comparison
- **COMPLETION_REPORT.md** - Implementation summary

---

## 🎓 Next Steps

1. **Test the API** - Use Postman collection
2. **Integrate Frontend** - Connect React app
3. **Deploy** - Heroku/Railway/Vercel
4. **Add Features** - Email, payments, etc.

---

**Need Help?**
- Check `README.md` for detailed docs
- Review `API_DOCUMENTATION.md` for endpoint details
- See `COMPLETION_REPORT.md` for what's implemented

---

**Ready to build something amazing!** 🚀
