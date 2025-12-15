import { Request, Response } from 'express';
import productService from '../services/productService';

export class ProductController {
  async getAllProducts(req: Request, res: Response) {
    const filters = {
      category: req.query.category as string,
      search: req.query.search as string,
      minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
      inStock: req.query.inStock === 'true' ? true : req.query.inStock === 'false' ? false : undefined,
      isActive: req.query.isActive === 'false' ? false : true,
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
      sortBy: (req.query.sortBy as string) || 'createdAt',
      sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
    };

    const result = await productService.getProducts(filters);

    res.status(200).json({
      success: true,
      ...result,
    });
  }

  async getProductById(req: Request, res: Response) {
    const { id } = req.params;

    const product = await productService.getProductById(id);

    res.status(200).json({
      success: true,
      data: product,
    });
  }

  async createProduct(req: Request, res: Response) {
    const productData = req.body;

    const product = await productService.createProduct(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  }

  async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const updateData = req.body;

    const product = await productService.updateProduct(id, updateData);

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  }

  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;

    await productService.deleteProduct(id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  }

  async updateStock(req: Request, res: Response) {
    const { id } = req.params;
    const { quantityChange } = req.body;

    if (quantityChange === undefined || typeof quantityChange !== 'number') {
      return res.status(400).json({
        success: false,
        message: 'Quantity change must be a number',
      });
    }

    const product = await productService.updateStock(id, quantityChange);

    res.status(200).json({
      success: true,
      message: 'Stock updated successfully',
      data: product,
    });
  }
}

export default new ProductController();
