import { Request, Response } from 'express';
import resultService from '../services/resultService';

export class ResultController {
  async generateResult(req: Request, res: Response) {
    const { formSubmissionId } = req.body;

    if (!formSubmissionId) {
      return res.status(400).json({
        success: false,
        message: 'Form submission ID is required',
      });
    }

    const result = await resultService.generateResult(formSubmissionId);

    res.status(201).json({
      success: true,
      message: 'Result generated successfully',
      data: result,
    });
  }

  async getResultById(req: Request, res: Response) {
    const { id } = req.params;

    const result = await resultService.getResultById(id);

    res.status(200).json({
      success: true,
      data: result,
    });
  }

  async getResultByFormId(req: Request, res: Response) {
    const { formId } = req.params;

    const result = await resultService.getResultByFormId(formId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Result not found for this form submission',
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  }

  async getMyResults(req: Request, res: Response) {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    const results = await resultService.getUserResults(userId);

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  }

  async deleteResult(req: Request, res: Response) {
    const { id } = req.params;

    await resultService.deleteResult(id);

    res.status(200).json({
      success: true,
      message: 'Result deleted successfully',
    });
  }
}

export default new ResultController();
