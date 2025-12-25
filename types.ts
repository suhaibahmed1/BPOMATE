
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  details?: string[];
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export type QuoteStatus = 'Submitted' | 'Reviewed' | 'Approved' | 'In Progress' | 'Completed' | 'Rejected';

export interface QuoteRequest {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  serviceType: string;
  teamSize: number;
  duration: string;
  status: QuoteStatus;
  date: string;
  priority?: 'High' | 'Medium' | 'Low';
  estimatedCost?: string;
}

export interface AdminStats {
  totalQuotes: number;
  activeServices: number;
  revenue: number;
  pendingRequests: number;
}
