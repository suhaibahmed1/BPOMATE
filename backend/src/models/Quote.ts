import mongoose, { Document, Schema, Types } from 'mongoose';

export enum QuoteStatus {
  SUBMITTED = 'Submitted',
  REVIEWED = 'Reviewed',
  APPROVED = 'Approved',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  REJECTED = 'Rejected'
}

export enum QuotePriority {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export interface IQuote extends Document {
  _id: Types.ObjectId;  // ✅ MongoDB ID
  quoteId: string;
  clientName: string;
  email: string;
  phone: string;
  serviceType: string;
  teamSize: number;
  duration: string;
  details?: string;
  estimatedCost?: string;
  priority: QuotePriority;
  status: QuoteStatus;
  clientTimezone?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuoteSchema = new Schema<IQuote>(
  {
    quoteId: { type: String, unique: true, index: true },

    clientName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    serviceType: { type: String, required: true },
    teamSize: { type: Number, required: true },
    duration: { type: String, required: true },
    details: { type: String },

    estimatedCost: { type: String },

    priority: {
      type: String,
      enum: Object.values(QuotePriority),
      default: QuotePriority.LOW
    },

    status: {
      type: String,
      enum: Object.values(QuoteStatus),
      default: QuoteStatus.SUBMITTED
    },

    clientTimezone: { type: String }
  },
  { timestamps: true }
);

QuoteSchema.index({ status: 1 });
QuoteSchema.index({ priority: 1 });

export default mongoose.model<IQuote>('Quote', QuoteSchema);
