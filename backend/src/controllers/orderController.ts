import { Request, Response } from 'express';
import orderService from '../services/orderService';

export class OrderController {
  async createOrder(req: Request, res: Response) {
    const orderData = req.body;
    const userId = (req as any).user?.id;

    const order = await orderService.createOrder(orderData, userId);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  }

  async getOrderById(req: Request, res: Response) {
    const { id } = req.params;

    const order = await orderService.getOrderById(id);

    const userId = (req as any).user?.id;
    const userRole = (req as any).user?.role;

    if (
      order.userId &&
      userId &&
      order.userId.toString() !== userId &&
      userRole !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'You can only view your own orders',
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  }

  async getMyOrders(req: Request, res: Response) {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    const filters = {
      status: req.query.status as string,
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
    };

    const result = await orderService.getUserOrders(userId, filters);

    res.status(200).json({
      success: true,
      ...result,
    });
  }

  async getAllOrders(req: Request, res: Response) {
    const filters = {
      status: req.query.status as string,
      paymentStatus: req.query.paymentStatus as string,
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
      sortBy: (req.query.sortBy as string) || 'createdAt',
      sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
    };

    const result = await orderService.getAllOrders(filters);

    res.status(200).json({
      success: true,
      ...result,
    });
  }

  async updateOrderStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status, paymentStatus } = req.body;

    const order = await orderService.updateOrderStatus(id, status, paymentStatus);

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: order,
    });
  }

  async cancelOrder(req: Request, res: Response) {
    const { id } = req.params;

    const order = await orderService.getOrderById(id);

    const userId = (req as any).user?.id;
    const userRole = (req as any).user?.role;

    if (
      order.userId &&
      userId &&
      order.userId.toString() !== userId &&
      userRole !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'You can only cancel your own orders',
      });
    }

    const cancelledOrder = await orderService.cancelOrder(id);

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      data: cancelledOrder,
    });
  }

  async getOrderByNumber(req: Request, res: Response) {
    const { orderNumber } = req.params;

    const order = await orderService.getOrderByOrderNumber(orderNumber);

    res.status(200).json({
      success: true,
      data: order,
    });
  }

  async processPayment(req: Request, res: Response) {
    const { id } = req.params;
    const paymentData = req.body;
    const userId = (req as any).user?.id;

    const order = await orderService.getOrderById(id);

    const userRole = (req as any).user?.role;

    if (
      order.userId &&
      userId &&
      order.userId.toString() !== userId &&
      userRole !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'You can only pay for your own orders',
      });
    }

    const result = await orderService.processPayment(id, paymentData);

    res.status(result.success ? 200 : 400).json({
      success: result.success,
      message: result.message,
      data: {
        order: result.order,
        transactionId: result.transactionId,
      },
    });
  }
}

export default new OrderController();
