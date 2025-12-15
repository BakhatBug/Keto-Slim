import jwt, { SignOptions } from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { UnauthorizedError, ValidationError } from '../types';

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    roles: string[];
  };
  token: string;
}

const generateToken = (userId: string, roles: string[]): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined');

  const payload = { userId, roles };
  return jwt.sign(payload, secret);
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const { email, password, name } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ValidationError('Email already registered');
  }

  const user = await User.create({
    email,
    passwordHash: password,
    name,
    roles: ['user'],
  });

  const token = generateToken(user._id.toString(), user.roles);

  return {
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      roles: user.roles,
    },
    token,
  };
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const { email, password } = data;

  const user = await User.findOne({ email }).select('+passwordHash');
  if (!user) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const token = generateToken(user._id.toString(), user.roles);

  return {
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      roles: user.roles,
    },
    token,
  };
};

export const getUserById = async (userId: string): Promise<IUser | null> => {
  return await User.findById(userId);
};

export const verifyToken = (token: string): { userId: string; roles: string[] } => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined');

  try {
    const decoded = jwt.verify(token, secret) as {
      userId: string;
      roles: string[];
    };
    return decoded;
  } catch (error) {
    throw new UnauthorizedError('Invalid or expired token');
  }
};
