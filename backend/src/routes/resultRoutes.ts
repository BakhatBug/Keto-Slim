import { Router } from 'express';
import resultController from '../controllers/resultController';
import { authenticate, requireRole, asyncHandler } from '../middleware/auth';

const router = Router();

// POST /api/results/generate
router.post(
  '/generate',
  asyncHandler(resultController.generateResult.bind(resultController))
);

// GET /api/results/form/:formId
router.get(
  '/form/:formId',
  asyncHandler(resultController.getResultByFormId.bind(resultController))
);

// GET /api/results/user/me
router.get(
  '/user/me',
  authenticate,
  asyncHandler(resultController.getMyResults.bind(resultController))
);

// GET /api/results/:id
router.get(
  '/:id',
  asyncHandler(resultController.getResultById.bind(resultController))
);

// DELETE /api/results/:id
router.delete(
  '/:id',
  authenticate,
  asyncHandler(resultController.deleteResult.bind(resultController))
);

export default router;
