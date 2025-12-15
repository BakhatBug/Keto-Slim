import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;

  const result = await authService.register({ email, password, name });

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const result = await authService.login({ email, password });

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: { message: 'Not authenticated' },
    });
    return;
  }

  const user = await authService.getUserById(req.user.userId);

  if (!user) {
    res.status(404).json({
      success: false,
      error: { message: 'User not found' },
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        roles: user.roles,
      },
    },
  });
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};
