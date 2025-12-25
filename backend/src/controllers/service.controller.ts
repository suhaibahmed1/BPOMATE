import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import Service from '../models/Service';
import { AppError } from '../utils/AppError';

export const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const services = await Service.find({ active: true });
  res.status(200).json({
    status: 'success',
    data: { services },
  });
});

export const getAllAdminServices = catchAsync(async (req: Request, res: Response) => {
  const services = await Service.find();
  res.status(200).json({
    status: 'success',
    data: { services },
  });
});

export const createService = catchAsync(async (req: Request, res: Response) => {
  const service = await Service.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { service },
  });
});

export const deleteService = catchAsync(async (req: Request, res: Response) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) throw new AppError('Service not found', 404);
  res.status(204).json({
    status: 'success',
    data: null
  });
});