import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError';

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Incorrect email or password', 401);
  }

  if (!user.active) {
    throw new AppError('User account is deactivated', 403);
  }

  const token = signToken(user._id as string);
  // Remove password from output
  user.password = undefined;

  return { user, token };
};

export const registerUser = async (userData: Partial<IUser>) => {
  const newUser = await User.create(userData);
  const token = signToken(newUser._id as string);
  newUser.password = undefined;
  return { user: newUser, token };
};