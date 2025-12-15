import Result, { IResult, IResultStep } from '../models/Result';
import FormSubmission, { IFormSubmission } from '../models/FormSubmission';
import { NotFoundError, ValidationError } from '../types';
import { Types } from 'mongoose';

export class ResultService {
  async generateResult(formSubmissionId: string): Promise<IResult> {
    if (!Types.ObjectId.isValid(formSubmissionId)) {
      throw new ValidationError('Invalid form submission ID format');
    }

    const formSubmission = await FormSubmission.findById(formSubmissionId);
    if (!formSubmission) {
      throw new NotFoundError('Form submission not found');
    }

    const existingResult = await Result.findOne({ formSubmissionId });
    if (existingResult) {
      return existingResult;
    }

    const result = this.calculateWeightLossPlan(formSubmission);

    const savedResult = await Result.create({
      formSubmissionId: formSubmission._id,
      userId: formSubmission.userId,
      ...result,
    });

    return savedResult;
  }

  private calculateWeightLossPlan(form: IFormSubmission): {
    steps: IResultStep[];
    totalWeeks: number;
    startWeight: number;
    goalWeight: number;
    totalWeightLoss: number;
  } {
    const { bmi, weightLoss, days, calorie, water } = form;

    const estimatedHeight = 1.7;
    const startWeight = bmi * Math.pow(estimatedHeight, 2);
    const goalWeight = startWeight - weightLoss;

    const totalWeeks = Math.ceil(days / 7);

    const steps: IResultStep[] = [];
    const weeklyWeightLoss = weightLoss / totalWeeks;

    for (let week = 1; week <= totalWeeks; week++) {
      const currentWeight = startWeight - weeklyWeightLoss * (week - 1);
      const targetWeight = currentWeight - weeklyWeightLoss;

      const currentBMI = targetWeight / Math.pow(estimatedHeight, 2);

      const calorieAdjustment = (targetWeight / startWeight) * calorie;

      const waterIntake = (targetWeight * 0.033).toFixed(1);

      steps.push({
        stepNumber: week,
        week: week,
        weight: parseFloat(targetWeight.toFixed(1)),
        bmi: parseFloat(currentBMI.toFixed(1)),
        calories: Math.round(calorieAdjustment),
        water: parseFloat(waterIntake),
      });
    }

    return {
      steps,
      totalWeeks,
      startWeight: parseFloat(startWeight.toFixed(1)),
      goalWeight: parseFloat(goalWeight.toFixed(1)),
      totalWeightLoss: weightLoss,
    };
  }

  async getResultById(resultId: string): Promise<IResult> {
    if (!Types.ObjectId.isValid(resultId)) {
      throw new ValidationError('Invalid result ID format');
    }

    const result = await Result.findById(resultId)
      .populate('formSubmissionId')
      .populate('userId', 'name email');

    if (!result) {
      throw new NotFoundError('Result not found');
    }

    return result;
  }

  async getResultByFormId(formSubmissionId: string): Promise<IResult | null> {
    if (!Types.ObjectId.isValid(formSubmissionId)) {
      throw new ValidationError('Invalid form submission ID format');
    }

    const result = await Result.findOne({ formSubmissionId })
      .populate('formSubmissionId')
      .populate('userId', 'name email');

    return result;
  }

  async getUserResults(userId: string): Promise<IResult[]> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new ValidationError('Invalid user ID format');
    }

    const results = await Result.find({ userId })
      .sort({ createdAt: -1 })
      .populate('formSubmissionId')
      .populate('userId', 'name email');

    return results;
  }

  async deleteResult(resultId: string): Promise<void> {
    if (!Types.ObjectId.isValid(resultId)) {
      throw new ValidationError('Invalid result ID format');
    }

    const deleted = await Result.findByIdAndDelete(resultId);
    if (!deleted) {
      throw new NotFoundError('Result not found');
    }
  }
}

export default new ResultService();
