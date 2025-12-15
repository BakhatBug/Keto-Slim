import { Schema, model, Document, Types } from 'mongoose';

export interface IOrderItem {
  productId: Types.ObjectId;
  productName: string;
  quantity: number;
  priceAtPurchase: number;
  subtotal: number;
}

export interface IShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface IOrder extends Document {
  userId?: Types.ObjectId;
  orderNumber: string;
  items: IOrderItem[];
  totalAmount: number;
  currency: string;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentMethod: 'credit-card' | 'paypal' | 'stripe' | 'cash-on-delivery';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentRef?: string;
  shippingInfo: IShippingInfo;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    priceAtPurchase: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative'],
    },
    subtotal: {
      type: Number,
      required: true,
      min: [0, 'Subtotal cannot be negative'],
    },
  },
  { _id: false }
);

const ShippingInfoSchema = new Schema<IShippingInfo>(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    state: {
      type: String,
      required: [true, 'State is required'],
    },
    zipCode: {
      type: String,
      required: [true, 'Zip code is required'],
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      default: 'USA',
    },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
      validate: {
        validator: function (items: IOrderItem[]) {
          return items.length > 0;
        },
        message: 'Order must have at least one item',
      },
    },
    totalAmount: {
      type: Number,
      required: true,
      min: [0, 'Total amount cannot be negative'],
    },
    currency: {
      type: String,
      required: [true, 'Currency is required'],
      uppercase: true,
      default: 'USD',
      enum: {
        values: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
        message: 'Currency must be USD, EUR, GBP, CAD, or AUD',
      },
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
        message: 'Invalid order status',
      },
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: {
        values: ['credit-card', 'paypal', 'stripe', 'cash-on-delivery'],
        message: 'Invalid payment method',
      },
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ['pending', 'completed', 'failed', 'refunded'],
        message: 'Invalid payment status',
      },
      default: 'pending',
    },
    paymentRef: {
      type: String,
      required: false,
      trim: true,
    },
    shippingInfo: {
      type: ShippingInfoSchema,
      required: true,
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.index({ userId: 1 });
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });

OrderSchema.pre('save', async function () {
  if (!this.orderNumber) {
    const date = new Date();
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.orderNumber = `ORD-${dateStr}-${randomStr}`;
  }
});

const Order = model<IOrder>('Order', OrderSchema);
export default Order;
