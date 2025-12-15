import FormSubmission, { IFormSubmission } from '../models/FormSubmission';
import { NotFoundError } from '../types';
import { Types } from 'mongoose';

export class FormService {
  async createFormSubmission(
    formData: Partial<IFormSubmission>,
    userId?: string
  ): Promise<IFormSubmission> {
    const submissionData = userId
      ? { ...formData, userId: new Types.ObjectId(userId) }
      : formData;

    const formSubmission = await FormSubmission.create(submissionData);
    return formSubmission;
  }

  async getFormSubmissionById(formId: string): Promise<IFormSubmission> {
    if (!Types.ObjectId.isValid(formId)) {
      throw new NotFoundError('Invalid form ID format');
    }

    const formSubmission = await FormSubmission.findById(formId).populate(
      'userId',
      'name email'
    );

    if (!formSubmission) {
      throw new NotFoundError('Form submission not found');
    }

    return formSubmission;
  }

  async getUserFormSubmissions(userId: string): Promise<IFormSubmission[]> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundError('Invalid user ID format');
    }

    const formSubmissions = await FormSubmission.find({ userId })
      .sort({ createdAt: -1 })
      .populate('userId', 'name email');

    return formSubmissions;
  }

  async getAllFormSubmissions(
    page: number = 1,
    limit: number = 20
  ): Promise<{ forms: IFormSubmission[]; total: number; pages: number }> {
    const skip = (page - 1) * limit;

    const [forms, total] = await Promise.all([
      FormSubmission.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('userId', 'name email'),
      FormSubmission.countDocuments(),
    ]);

    return {
      forms,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  async deleteFormSubmission(formId: string): Promise<void> {
    if (!Types.ObjectId.isValid(formId)) {
      throw new NotFoundError('Invalid form ID format');
    }

    const deleted = await FormSubmission.findByIdAndDelete(formId);

    if (!deleted) {
      throw new NotFoundError('Form submission not found');
    }
  }
}

export default new FormService();
