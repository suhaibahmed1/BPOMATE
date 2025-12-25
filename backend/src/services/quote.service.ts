import Quote, { IQuote, QuotePriority, QuoteStatus } from '../models/Quote';
import { AppError } from '../utils/AppError';

// Helper to generate a human-readable ID (e.g., #8291)
const generateQuoteId = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const determinePriority = (teamSize: number, duration: string, serviceType: string): QuotePriority => {
  if (teamSize >= 10 || (duration.toLowerCase().includes('long') && teamSize >= 5) || (serviceType === 'Telemarketing' && teamSize >= 8)) {
    return QuotePriority.HIGH;
  }
  if (teamSize >= 4 || duration.toLowerCase().includes('medium')) {
    return QuotePriority.MEDIUM;
  }
  return QuotePriority.LOW;
};

export const createQuote = async (data: Partial<IQuote>) => {
  const priority = determinePriority(data.teamSize!, data.duration!, data.serviceType!);
  
  // Ensure unique ID
  let quoteId = generateQuoteId();
  let exists = await Quote.findOne({ quoteId });
  while (exists) {
    quoteId = generateQuoteId();
    exists = await Quote.findOne({ quoteId });
  }

  const newQuote = await Quote.create({
    ...data,
    quoteId,
    priority,
    status: QuoteStatus.SUBMITTED
  });

  return newQuote;
};

export const getAllQuotes = async (query: any) => {
  // Sorting logic: High priority first, then date desc
  const priorityOrder = { [QuotePriority.HIGH]: 1, [QuotePriority.MEDIUM]: 2, [QuotePriority.LOW]: 3 };
  
  const quotes = await Quote.aggregate([
    { $addFields: { priorityOrder: { $switch: { 
          branches: [
              { case: { $eq: ["$priority", QuotePriority.HIGH] }, then: 1 },
              { case: { $eq: ["$priority", QuotePriority.MEDIUM] }, then: 2 },
              { case: { $eq: ["$priority", QuotePriority.LOW] }, then: 3 }
          ],
          default: 4
      }}}},
    { $sort: { priorityOrder: 1, createdAt: -1 } }
  ]);

  return quotes;
};

export const getQuoteById = async (id: string) => {
  const quote = await Quote.findById(id);
  if (!quote) throw new AppError('Quote not found', 404);
  return quote;
};

export const getQuoteByPublicId = async (quoteId: string) => {
  const quote = await Quote.findOne({ quoteId }).select('quoteId status serviceType createdAt updatedAt');
  if (!quote) throw new AppError('Quote reference not found', 404);
  return quote;
};

export const updateQuoteStatus = async (id: string, status: QuoteStatus) => {
  const quote = await Quote.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
  if (!quote) throw new AppError('Quote not found', 404);
  return quote;
};