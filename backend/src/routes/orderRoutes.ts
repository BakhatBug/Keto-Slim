import { Router } from 'express';
import orderController from '../controllers/orderController';
import { validate, authenticate, requireRole, asyncHandler } from '../middleware/auth';
import {
  createOrderSchema,
  updateOrderStatusSchema,
  getOrderByIdSchema,
  getOrdersQuerySchema,
} from '../middleware/orderValidation';
import { paymentLimiter } from '../middleware/rateLimiter';

const router = Router();

// POST /api/orders
router.post(
  '/',
  validate(createOrderSchema),
  asyncHandler(orderController.createOrder.bind(orderController))
);

// GET /api/orders/user/me
router.get(
  '/user/me',
  authenticate,
  asyncHandler(orderController.getMyOrders.bind(orderController))
);

// GET /api/orders/number/:orderNumber
router.get(
  '/number/:orderNumber',
  asyncHandler(orderController.getOrderByNumber.bind(orderController))
);

// GET /api/orders/:id
router.get(
  '/:id',
  authenticate,
  validate(getOrderByIdSchema),
  asyncHandler(orderController.getOrderById.bind(orderController))
);

// GET /api/orders (admin)
router.get(
  '/',
  authenticate,
  requireRole(['admin']),
  validate(getOrdersQuerySchema),
  asyncHandler(orderController.getAllOrders.bind(orderController))
);

// PATCH /api/orders/:id/status (admin)
router.patch(
  '/:id/status',
  authenticate,
  requireRole(['admin']),
  validate(updateOrderStatusSchema),
  asyncHandler(orderController.updateOrderStatus.bind(orderController))
);

// POST /api/orders/:id/cancel
router.post(
  '/:id/cancel',
  authenticate,
  validate(getOrderByIdSchema),
  asyncHandler(orderController.cancelOrder.bind(orderController))
);

// POST /api/orders/:id/payment
router.post(
  '/:id/payment',
  paymentLimiter,
  authenticate,
  validate(getOrderByIdSchema),
  asyncHandler(orderController.processPayment.bind(orderController))
);

export default router;
