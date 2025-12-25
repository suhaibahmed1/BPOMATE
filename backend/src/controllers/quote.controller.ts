import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import * as quoteService from '../services/quote.service';

export const createQuote = catchAsync(async (req: Request, res: Response) => {
  const quote = await quoteService.createQuote(req.body);

  res.status(201).json({
    status: 'success',
    data: { quote }
  });
});

export const getQuotes = catchAsync(async (_req, res) => {
  const quotes = await quoteService.getAllQuotes();

  res.status(200).json({
    status: 'success',
    results: quotes.length,
    data: { quotes }
  });
});

export const updateStatus = catchAsync(async (req: Request, res: Response) => {
  const quote = await quoteService.updateQuoteStatus(
    req.params.id,
    req.body.status
  );

  res.status(200).json({
    status: 'success',
    data: { quote }
  });
});

export const trackQuote = catchAsync(async (req: Request, res: Response) => {
  const quote = await quoteService.getQuoteByPublicId(req.params.quoteId);

  res.status(200).json({
    status: 'success',
    data: { quote }
  });
});
