import { Request, Response } from 'express';
import formService from '../services/formService';

export class FormController {
  async createForm(req: Request, res: Response) {
    const formData = req.body;
    const userId = (req as any).user?.id;

    const formSubmission = await formService.createFormSubmission(
      formData,
      userId
    );

    res.status(201).json({
      success: true,
      message: 'Form submission created successfully',
      data: formSubmission,
    });
  }

  async getFormById(req: Request, res: Response) {
    const { id } = req.params;

    const formSubmission = await formService.getFormSubmissionById(id);

    res.status(200).json({
      success: true,
      data: formSubmission,
    });
  }

  async getMyForms(req: Request, res: Response) {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    const formSubmissions = await formService.getUserFormSubmissions(userId);

    res.status(200).json({
      success: true,
      count: formSubmissions.length,
      data: formSubmissions,
    });
  }

  async getAllForms(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await formService.getAllFormSubmissions(page, limit);

    res.status(200).json({
      success: true,
      ...result,
    });
  }

  async deleteForm(req: Request, res: Response) {
    const { id } = req.params;

    await formService.deleteFormSubmission(id);

    res.status(200).json({
      success: true,
      message: 'Form submission deleted successfully',
    });
  }
}

export default new FormController();
