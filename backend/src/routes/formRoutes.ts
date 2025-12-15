import { Router } from 'express';
import formController from '../controllers/formController';
import { validate, authenticate, requireRole, asyncHandler } from '../middleware/auth';
import { createFormSchema, getFormByIdSchema } from '../middleware/formValidation';

const router = Router();

// POST /api/forms
router.post(
  '/',
  validate(createFormSchema),
  asyncHandler(formController.createForm.bind(formController))
);

// GET /api/forms/:id
router.get(
  '/:id',
  validate(getFormByIdSchema),
  asyncHandler(formController.getFormById.bind(formController))
);

// GET /api/forms/user/me
router.get(
  '/user/me',
  authenticate,
  asyncHandler(formController.getMyForms.bind(formController))
);

// GET /api/forms (admin)
router.get(
  '/',
  authenticate,
  requireRole(['admin']),
  asyncHandler(formController.getAllForms.bind(formController))
);

// DELETE /api/forms/:id
router.delete(
  '/:id',
  authenticate,
  validate(getFormByIdSchema),
  asyncHandler(formController.deleteForm.bind(formController))
);

export default router;
