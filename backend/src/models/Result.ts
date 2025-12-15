import { Schema, model, Document, Types } from 'mongoose';

export interface IResultStep {
  stepNumber: number;
  week: number;
  weight: number;
  bmi: number;
  calories: number;
  water: number;
}

export interface IResult extends Document {
  formSubmissionId: Types.ObjectId;
  userId?: Types.ObjectId;
  steps: IResultStep[];
  totalWeeks: number;
  startWeight: number;
  goalWeight: number;
  totalWeightLoss: number;
  createdAt: Date;
  updatedAt: Date;
}

const ResultStepSchema = new Schema<IResultStep>(
  {
    stepNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    week: {
      type: Number,
      required: true,
      min: 1,
    },
    weight: {
      type: Number,
      required: true,
      min: 30,
      max: 300,
    },
    bmi: {
      type: Number,
      required: true,
      min: 10,
      max: 60,
    },
    calories: {
      type: Number,
      required: true,
      min: 1000,
      max: 5000,
    },
    water: {
      type: Number,
      required: true,
      min: 0.5,
      max: 10,
    },
  },
  { _id: false }
);

const ResultSchema = new Schema<IResult>(
  {
    formSubmissionId: {
      type: Schema.Types.ObjectId,
      ref: 'FormSubmission',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    steps: {
      type: [ResultStepSchema],
      required: true,
      validate: {
        validator: (steps: IResultStep[]) => steps.length > 0,
        message: 'Result must have at least one step',
      },
    },
    totalWeeks: {
      type: Number,
      required: true,
      min: 1,
      max: 52,
    },
    startWeight: {
      type: Number,
      required: true,
      min: 30,
      max: 300,
    },
    goalWeight: {
      type: Number,
      required: true,
      min: 30,
      max: 300,
    },
    totalWeightLoss: {
      type: Number,
      required: true,
      min: 0.1,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

ResultSchema.index({ formSubmissionId: 1 });
ResultSchema.index({ userId: 1 });
ResultSchema.index({ createdAt: -1 });

const Result = model<IResult>('Result', ResultSchema);
export default Result;
