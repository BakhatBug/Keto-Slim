import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { verifyToken } from '../services/authService';
import { UnauthorizedError, ForbiddenError, ValidationError } from '../types';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        roles: string[];
      };
    }
  }
}

export const validate = (schema: z.ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        return res.status(400).json({
          success: false,
          error: {
            message: 'Validation failed',
            details: errors,
          },
        });
      }
      next(error);
    }
  };
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided');
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new UnauthorizedError('Authentication required');
    }

    const hasRole = req.user.roles.some((role) =>
      allowedRoles.includes(role)
    );

    if (!hasRole) {
      throw new ForbiddenError(
        `Access denied. Required roles: ${allowedRoles.join(', ')}`
      );
    }

    next();
  };
};

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
