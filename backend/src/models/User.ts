import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  name: string;
  roles: ('user' | 'admin')[];
  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        'Please provide a valid email address',
      ],
    },

    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    roles: {
      type: [String],
      enum: ['user', 'admin'],
      default: ['user'],
    },
  },

  {
    timestamps: true,
  }
);

UserSchema.index({ email: 1 }, { unique: true });

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.passwordHash);
  } catch (error) {
    return false;
  }
};

UserSchema.pre('save', async function () {
  if (!this.isModified('passwordHash')) {
    return;
  }

  const rounds = parseInt(process.env.BCRYPT_ROUNDS || '10');
  const salt = await bcrypt.genSalt(rounds);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

UserSchema.set('toJSON', {
  transform: function (doc, ret: any) {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  },
});

// Create and export the Model
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
