import { Router } from 'express';
import * as authController from '../controllers/authController';
import { authenticate, asyncHandler } from '../middleware/auth';
import { validate } from '../middleware/auth';
import { registerSchema, loginSchema } from '../middleware/validation';

const router = Router();

// POST /api/auth/register
router.post(
  '/register',
  validate(registerSchema),
  asyncHandler(authController.register)
);

// POST /api/auth/login
router.post(
  '/login',
  validate(loginSchema),
  asyncHandler(authController.login)
);

// GET /api/auth/me
router.get(
  '/me',
  authenticate,
  asyncHandler(authController.getMe)
);

// POST /api/auth/logout
router.post(
  '/logout',
  authenticate,
  asyncHandler(authController.logout)
);

export default router;
