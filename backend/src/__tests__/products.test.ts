import request from 'supertest';
import express from 'express';
import productRoutes from '../routes/productRoutes';
import orderRoutes from '../routes/orderRoutes';
import authRoutes from '../routes/authRoutes';
import { connectTestDB, clearTestDB, disconnectTestDB } from './setup';
import { errorHandler } from '../middleware/errorHandler';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use(errorHandler);

describe('Product and Order API', () => {
  let adminToken: string;
  let userToken: string;
  let productId: string;

  beforeAll(async () => {
    await connectTestDB();
  }, 60000); // 60 seconds for MongoDB download

  beforeEach(async () => {
    await clearTestDB();

    // Create admin user
    const adminResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'admin@test.com',
        password: 'admin123',
        name: 'Admin User',
      });

    // Manually set admin role
    const User = require('../models/User').default;
    await User.findOneAndUpdate(
      { email: 'admin@test.com' },
      { roles: ['admin'] }
    );

    // Get new token with admin role
    const adminLoginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'admin123',
      });
    adminToken = adminLoginResponse.body.data.token;

    // Create regular user
    const userResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'user@test.com',
        password: 'user123',
        name: 'Test User',
      });
    userToken = userResponse.body.data.token;

    // Create a test product
    const productResponse = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        sku: 'TEST-PROD-001',
        name: 'Test Product',
        description: 'This is a test product for testing purposes',
        price: 29.99,
        currency: 'USD',
        features: ['Feature 1', 'Feature 2'],
        category: 'meal-plan',
        stock: 100,
      });

    productId = productResponse.body.data._id;
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  describe('GET /api/products', () => {
    it('should get all products', async () => {
      const response = await request(app).get('/api/products');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.products).toHaveLength(1);
      expect(response.body.products[0]).toHaveProperty('sku', 'TEST-PROD-001');
    });

    it('should filter products by category', async () => {
      const response = await request(app)
        .get('/api/products')
        .query({ category: 'meal-plan' });

      expect(response.status).toBe(200);
      expect(response.body.products).toHaveLength(1);
    });
  });

  describe('POST /api/products', () => {
    it('should create product as admin', async () => {
      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          sku: 'NEW-PROD-001',
          name: 'New Product',
          description: 'A brand new product',
          price: 49.99,
          currency: 'USD',
          features: ['New Feature'],
          category: 'supplement',
          stock: 50,
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('sku', 'NEW-PROD-001');
    });

    it('should fail to create product without admin role', async () => {
      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          sku: 'FAIL-PROD',
          name: 'Fail Product',
          description: 'This should fail',
          price: 29.99,
          currency: 'USD',
          category: 'guide',
          stock: 10,
        });

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/orders', () => {
    it('should create order with valid data', async () => {
      const response = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          items: [
            {
              productId: productId,
              quantity: 2,
            },
          ],
          currency: 'USD',
          paymentMethod: 'credit-card',
          shippingInfo: {
            fullName: 'John Doe',
            email: 'john@example.com',
            phone: '1234567890',
            address: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA',
          },
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('orderNumber');
      expect(response.body.data).toHaveProperty('totalAmount', 59.98);
      expect(response.body.data.items).toHaveLength(1);
    });

    it('should fail order with insufficient stock', async () => {
      const response = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          items: [
            {
              productId: productId,
              quantity: 200, // More than available stock
            },
          ],
          currency: 'USD',
          paymentMethod: 'credit-card',
          shippingInfo: {
            fullName: 'John Doe',
            email: 'john@example.com',
            phone: '1234567890',
            address: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA',
          },
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});
