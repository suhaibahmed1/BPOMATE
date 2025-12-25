import express from 'express';
import * as serviceController from '../controllers/service.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { serviceSchema } from '../validations/service.validation';

const router = express.Router();

// Public
router.get('/', serviceController.getAllServices);

// Admin
router.use(protect);
router.get('/admin', restrictTo('SUPER_ADMIN', 'MANAGER'), serviceController.getAllAdminServices);
router.post('/', restrictTo('SUPER_ADMIN'), validate(serviceSchema), serviceController.createService);
router.delete('/:id', restrictTo('SUPER_ADMIN'), serviceController.deleteService);

export default router;