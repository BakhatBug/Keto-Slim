import { Router } from 'express';
import productController from '../controllers/productController';
import { validate, authenticate, requireRole, asyncHandler } from '../middleware/auth';
import {
  createProductSchema,
  updateProductSchema,
  getProductByIdSchema,
  getProductsQuerySchema,
} from '../middleware/productValidation';

const router = Router();

// GET /api/products
router.get(
  '/',
  validate(getProductsQuerySchema),
  asyncHandler(productController.getAllProducts.bind(productController))
);

// GET /api/products/:id
router.get(
  '/:id',
  validate(getProductByIdSchema),
  asyncHandler(productController.getProductById.bind(productController))
);

// POST /api/products (admin)
router.post(
  '/',
  authenticate,
  requireRole(['admin']),
  validate(createProductSchema),
  asyncHandler(productController.createProduct.bind(productController))
);

// PUT /api/products/:id (admin)
router.put(
  '/:id',
  authenticate,
  requireRole(['admin']),
  validate(updateProductSchema),
  asyncHandler(productController.updateProduct.bind(productController))
);

// DELETE /api/products/:id (admin)
router.delete(
  '/:id',
  authenticate,
  requireRole(['admin']),
  validate(getProductByIdSchema),
  asyncHandler(productController.deleteProduct.bind(productController))
);

// PATCH /api/products/:id/stock (admin)
router.patch(
  '/:id/stock',
  authenticate,
  requireRole(['admin']),
  validate(getProductByIdSchema),
  asyncHandler(productController.updateStock.bind(productController))
);

export default router;
