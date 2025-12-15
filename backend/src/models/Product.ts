import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  sku: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  imageUrl?: string;
  category: 'meal-plan' | 'supplement' | 'guide' | 'bundle';
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    sku: {
      type: String,
      required: [true, 'Product SKU is required'],
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
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
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
      validate: {
        validator: function (value: number) {
          // Ensure price has max 2 decimal places
          return /^\d+(\.\d{1,2})?$/.test(value.toString());
        },
        message: 'Price can have maximum 2 decimal places',
      },
    },
    features: {
      type: [String],
      default: [],
      validate: {
        validator: function (features: string[]) {
          return features.length <= 20;
        },
        message: 'Cannot have more than 20 features',
      },
    },
    imageUrl: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: {
        values: ['meal-plan', 'supplement', 'guide', 'bundle'],
        message: 'Category must be meal-plan, supplement, guide, or bundle',
      },
      required: [true, 'Product category is required'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({ category: 1, isActive: 1 });
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ createdAt: -1 });

ProductSchema.virtual('inStock').get(function (this: IProduct) {
  return this.stock > 0;
});

ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });

const Product = model<IProduct>('Product', ProductSchema);
export default Product;
