import Product, { IProduct } from '../models/Product';
import { NotFoundError, ValidationError } from '../types';
import { Types } from 'mongoose';

export class ProductService {
  async createProduct(productData: Partial<IProduct>): Promise<IProduct> {
    const product = await Product.create(productData);
    return product;
  }

  async getProducts(filters: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    isActive?: boolean;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<{ products: IProduct[]; total: number; pages: number }> {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      inStock,
      isActive = true,
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = filters;

    const query: any = { isActive };

    if (category) {
      query.category = category;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = minPrice;
      if (maxPrice !== undefined) query.price.$lte = maxPrice;
    }

    if (inStock !== undefined) {
      query.stock = inStock ? { $gt: 0 } : { $eq: 0 };
    }

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [products, total] = await Promise.all([
      Product.find(query).sort(sort).skip(skip).limit(limit),
      Product.countDocuments(query),
    ]);

    return {
      products,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  async getProductById(productId: string): Promise<IProduct> {
    if (!Types.ObjectId.isValid(productId)) {
      throw new ValidationError('Invalid product ID format');
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  }

  async updateProduct(
    productId: string,
    updateData: Partial<IProduct>
  ): Promise<IProduct> {
    if (!Types.ObjectId.isValid(productId)) {
      throw new ValidationError('Invalid product ID format');
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  }

  async deleteProduct(productId: string): Promise<void> {
    if (!Types.ObjectId.isValid(productId)) {
      throw new ValidationError('Invalid product ID format');
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      { $set: { isActive: false } },
      { new: true }
    );

    if (!product) {
      throw new NotFoundError('Product not found');
    }
  }

  async hardDeleteProduct(productId: string): Promise<void> {
    if (!Types.ObjectId.isValid(productId)) {
      throw new ValidationError('Invalid product ID format');
    }

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      throw new NotFoundError('Product not found');
    }
  }

  async updateStock(
    productId: string,
    quantityChange: number
  ): Promise<IProduct> {
    if (!Types.ObjectId.isValid(productId)) {
      throw new ValidationError('Invalid product ID format');
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    const newStock = product.stock + quantityChange;

    if (newStock < 0) {
      throw new ValidationError('Insufficient stock available');
    }

    product.stock = newStock;
    await product.save();

    return product;
  }

  async checkStock(productId: string, quantity: number): Promise<boolean> {
    if (!Types.ObjectId.isValid(productId)) {
      throw new ValidationError('Invalid product ID format');
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product.stock >= quantity;
  }
}

export default new ProductService();
