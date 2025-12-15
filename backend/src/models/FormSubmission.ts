import mongoose, { Schema, Document } from 'mongoose';

export interface IFormSubmission extends Document {
  userId?: mongoose.Types.ObjectId;
  gender: 'male' | 'female';
  fatScale: number;
  bmi: number;
  calorie: number;
  water: number;
  weightLoss: number;
  days: number;
  createdAt: Date;
  updatedAt: Date;
}

const FormSubmissionSchema = new Schema<IFormSubmission>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      index: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'Gender is required'],
    },
    fatScale: {
      type: Number,
      required: [true, 'Fat scale is required'],
      min: [0, 'Fat scale must be at least 0'],
      max: [100, 'Fat scale cannot exceed 100'],
    },
    bmi: {
      type: Number,
      required: [true, 'BMI is required'],
      min: [10, 'BMI seems too low'],
      max: [60, 'BMI seems too high'],
    },
    calorie: {
      type: Number,
      required: [true, 'Calorie target is required'],
      min: [1000, 'Calorie target seems too low'],
      max: [5000, 'Calorie target seems too high'],
    },
    water: {
      type: Number,
      required: [true, 'Water intake is required'],
      min: [0.5, 'Water intake seems too low'],
      max: [10, 'Water intake seems too high'],
    },
    weightLoss: {
      type: Number,
      required: [true, 'Weight loss goal is required'],
      min: [0.1, 'Weight loss goal must be positive'],
      max: [100, 'Weight loss goal seems unrealistic'],
    },
    days: {
      type: Number,
      required: [true, 'Timeline in days is required'],
      min: [7, 'Timeline must be at least 7 days'],
      max: [365, 'Timeline cannot exceed 365 days'],
    },
  },
  {
    timestamps: true,
  }
);

FormSubmissionSchema.index({ userId: 1, createdAt: -1 });

FormSubmissionSchema.virtual('isAnonymous').get(function () {
  return !this.userId;
});

const FormSubmission = mongoose.model<IFormSubmission>(
  'FormSubmission',
  FormSubmissionSchema
);

export default FormSubmission;
