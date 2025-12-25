import { z } from 'zod';
import { QuoteStatus, QuotePriority } from '../models/Quote';

export const createQuoteSchema = z.object({
  body: z.object({
    clientName: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(5, 'Phone is required'),
    serviceType: z.string().min(2, 'Service type is required'),
    teamSize: z.number().min(1, 'Team size must be at least 1'),
    duration: z.string().min(2, 'Duration is required'),
    details: z.string().optional(),
    estimatedCost: z.string().optional(),
    clientTimezone: z.string().optional(),
  }),
});

export const updateQuoteStatusSchema = z.object({
  body: z.object({
    status: z.nativeEnum(QuoteStatus),
  }),
});