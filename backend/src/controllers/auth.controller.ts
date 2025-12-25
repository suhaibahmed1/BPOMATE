import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import * as authService from '../services/auth.service';

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const { user, token } = await authService.loginUser(email, password);

  res.status(200).json({
    status: 'success',
    token,
    data: { user },
  });
});

export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { user, token } = await authService.registerUser(req.body);

  res.status(201).json({
    status: 'success',
    token,
    data: { user },
  });
});