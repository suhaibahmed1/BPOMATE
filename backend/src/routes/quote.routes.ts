import express from 'express';
import * as quoteController from '../controllers/quote.controller';
import * as analyticsController from '../controllers/analytics.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createQuoteSchema, updateQuoteStatusSchema } from '../validations/quote.validation';

const router = express.Router();

// Public Routes
router.post('/', validate(createQuoteSchema), quoteController.createQuote);
router.get('/track/:quoteId', quoteController.trackQuote);

// Protected Admin Routes
router.use(protect);
router.use(restrictTo('SUPER_ADMIN', 'MANAGER'));

router.get('/', quoteController.getQuotes);
router.patch('/:id/status', validate(updateQuoteStatusSchema), quoteController.updateStatus);
router.get('/analytics', analyticsController.getStats);

export default router;