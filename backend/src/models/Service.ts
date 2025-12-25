import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  name: string;
  description: string;
  pricingRange: string;
  deliveryTime: string;
  features: string[];
  active: boolean;
}

const ServiceSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    pricingRange: { type: String, required: true },
    deliveryTime: { type: String, required: true },
    features: [{ type: String }],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IService>('Service', ServiceSchema);