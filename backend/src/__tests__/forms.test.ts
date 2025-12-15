import request from 'supertest';
import express from 'express';
import formRoutes from '../routes/formRoutes';
import resultRoutes from '../routes/resultRoutes';
import { connectTestDB, clearTestDB, disconnectTestDB } from './setup';
import { errorHandler } from '../middleware/errorHandler';

const app = express();
app.use(express.json());
app.use('/api/forms', formRoutes);
app.use('/api/results', resultRoutes);
app.use(errorHandler);

describe('Form and Result API', () => {
  beforeAll(async () => {
    await connectTestDB();
  }, 60000); // 60 seconds for MongoDB download

  afterEach(async () => {
    await clearTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  describe('POST /api/forms', () => {
    it('should create a form submission with valid data', async () => {
      const response = await request(app)
        .post('/api/forms')
        .send({
          gender: 'male',
          fatScale: 25,
          bmi: 28.5,
          calorie: 2000,
          water: 2.5,
          weightLoss: 10,
          days: 90,
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data).toHaveProperty('gender', 'male');
      expect(response.body.data).toHaveProperty('weightLoss', 10);
    });

    it('should fail with invalid gender', async () => {
      const response = await request(app)
        .post('/api/forms')
        .send({
          gender: 'invalid',
          fatScale: 25,
          bmi: 28.5,
          calorie: 2000,
          water: 2.5,
          weightLoss: 10,
          days: 90,
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should fail with missing required fields', async () => {
      const response = await request(app)
        .post('/api/forms')
        .send({
          gender: 'male',
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/results/generate', () => {
    let formId: string;

    beforeEach(async () => {
      const formResponse = await request(app)
        .post('/api/forms')
        .send({
          gender: 'female',
          fatScale: 30,
          bmi: 32,
          calorie: 1800,
          water: 2,
          weightLoss: 15,
          days: 120,
        });

      formId = formResponse.body.data._id;
    });

    it('should generate result from form submission', async () => {
      const response = await request(app)
        .post('/api/results/generate')
        .send({
          formSubmissionId: formId,
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('steps');
      expect(response.body.data.steps.length).toBeGreaterThan(0);
      expect(response.body.data).toHaveProperty('totalWeeks');
    });

    it('should fail with invalid form ID', async () => {
      const response = await request(app)
        .post('/api/results/generate')
        .send({
          formSubmissionId: '507f1f77bcf86cd799439011',
        });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});
