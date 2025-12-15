import Order, { IOrder, IOrderItem } from '../models/Order';
import Product from '../models/Product';
import productService from './productService';
import { NotFoundError, ValidationError } from '../types';
import { Types } from 'mongoose';

export class OrderService {
  async createOrder(
    orderData: {
      items: Array<{ productId: string; quantity: number }>;
      currency?: string;
      paymentMethod: 'credit-card' | 'paypal' | 'stripe' | 'cash-on-delivery';
      shippingInfo: any;
      notes?: string;
    },
    userId?: string
  ): Promise<IOrder> {
    const orderItems: IOrderItem[] = [];
    let totalAmount = 0;
    const currency = orderData.currency || 'USD';

    for (const item of orderData.items) {
      const product = await productService.getProductById(item.productId);

      if (!product.isActive) {
        throw new ValidationError(`Product "${product.name}" is no longer available`);
      }

      if (product.currency !== currency) {
        throw new ValidationError(
          `Currency mismatch: Product "${product.name}" is priced in ${product.currency}, but order is in ${currency}`
        );
      }

      const hasStock = await productService.checkStock(item.productId, item.quantity);
      if (!hasStock) {
        throw new ValidationError(
          `Insufficient stock for product "${product.name}". Available: ${product.stock}`
        );
      }

      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;

      orderItems.push({
        productId: new Types.ObjectId(item.productId),
        productName: product.name,
        quantity: item.quantity,
        priceAtPurchase: product.price,
        subtotal: parseFloat(subtotal.toFixed(2)),
      });
    }

    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 9).toUpperCase();
    const orderNumber = `ORD-${timestamp}-${randomStr}`;

    const order = await Order.create({
      userId: userId ? new Types.ObjectId(userId) : undefined,
      orderNumber,
      items: orderItems,
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      currency,
      paymentMethod: orderData.paymentMethod,
      shippingInfo: orderData.shippingInfo,
      notes: orderData.notes,
      status: 'pending',
      paymentStatus: 'pending',
    });

    for (const item of orderData.items) {
      await productService.updateStock(item.productId, -item.quantity);
    }

    return order;
  }

  async getOrderById(orderId: string): Promise<IOrder> {
    if (!Types.ObjectId.isValid(orderId)) {
      throw new ValidationError('Invalid order ID format');
    }

    const order = await Order.findById(orderId)
      .populate('userId', 'name email')
      .populate('items.productId');

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    return order;
  }

  async getUserOrders(
    userId: string,
    filters?: {
      status?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<{ orders: IOrder[]; total: number; pages: number }> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new ValidationError('Invalid user ID format');
    }

    const { status, page = 1, limit = 20 } = filters || {};

    const query: any = { userId };
    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('items.productId'),
      Order.countDocuments(query),
    ]);

    return {
      orders,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  async getAllOrders(filters: {
    status?: string;
    paymentStatus?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<{ orders: IOrder[]; total: number; pages: number }> {
    const {
      status,
      paymentStatus,
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = filters;

    const query: any = {};
    if (status) query.status = status;
    if (paymentStatus) query.paymentStatus = paymentStatus;

    const skip = (page - 1) * limit;

    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [orders, total] = await Promise.all([
      Order.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('userId', 'name email')
        .populate('items.productId'),
      Order.countDocuments(query),
    ]);

    return {
      orders,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  async updateOrderStatus(
    orderId: string,
    status: IOrder['status'],
    paymentStatus?: IOrder['paymentStatus']
  ): Promise<IOrder> {
    if (!Types.ObjectId.isValid(orderId)) {
      throw new ValidationError('Invalid order ID format');
    }

    const updateData: any = { status };
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('userId', 'name email').populate('items.productId');

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    if ((status === 'cancelled' || status === 'refunded') && order) {
      for (const item of order.items) {
        await productService.updateStock(
          item.productId.toString(),
          item.quantity
        );
      }
    }

    return order;
  }

  async cancelOrder(orderId: string): Promise<IOrder> {
    const order = await this.getOrderById(orderId);

    if (order.status !== 'pending') {
      throw new ValidationError('Only pending orders can be cancelled');
    }

    return this.updateOrderStatus(orderId, 'cancelled');
  }

  async getOrderByOrderNumber(orderNumber: string): Promise<IOrder> {
    const order = await Order.findOne({ orderNumber })
      .populate('userId', 'name email')
      .populate('items.productId');

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    return order;
  }

  async processPayment(
    orderId: string,
    paymentData: {
      paymentMethod?: 'credit-card' | 'paypal' | 'stripe' | 'cash-on-delivery';
      cardNumber?: string;
      expiryDate?: string;
      cvv?: string;
    }
  ): Promise<{ success: boolean; order: IOrder; transactionId?: string; message: string }> {
    const order = await this.getOrderById(orderId);

    if (order.paymentStatus === 'completed') {
      throw new ValidationError('Order has already been paid');
    }

    if (order.status === 'cancelled' || order.status === 'refunded') {
      throw new ValidationError('Cannot pay for a cancelled or refunded order');
    }

    // Mock payment logic
    if (order.totalAmount >= 1000) {
      order.paymentStatus = 'failed';
      await order.save();

      return {
        success: false,
        order,
        message: 'Payment failed. Please check your payment details and try again.',
      };
    }

    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    order.paymentStatus = 'completed';
    order.status = 'paid';
    order.paymentRef = transactionId;

    if (paymentData.paymentMethod) {
      order.paymentMethod = paymentData.paymentMethod;
    }

    await order.save();

    return {
      success: true,
      order,
      transactionId,
      message: 'Payment processed successfully',
    };
  }
}

export default new OrderService();
