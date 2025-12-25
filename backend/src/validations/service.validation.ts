import { z } from 'zod';

export const serviceSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    description: z.string().min(10),
    pricingRange: z.string(),
    deliveryTime: z.string(),
    features: z.array(z.string()).optional(),
    active: z.boolean().optional(),
  }),
});