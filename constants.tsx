
import { 
  Headset, 
  PhoneCall, 
  Keyboard, 
  Bot, 
  Briefcase, 
  Clock, 
  ShieldCheck, 
  Users, 
  TrendingUp 
} from 'lucide-react';
import { NavItem, Service, Testimonial, Feature } from './types';

export const COMPANY_NAME = "BPOMATE";
export const TAGLINE = "Your Trusted Partner in Smart Outsourcing.";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const SERVICES: Service[] = [
  {
    id: 'customer-support',
    title: 'Customer Support',
    description: '24/7 omnichannel support to ensure your customers remain happy and loyal.',
    icon: Headset,
    details: ['Email & Chat Support', 'Inbound/Outbound Calls', 'Social Media Management', 'Technical Support Level 1 & 2'],
    image: 'https://img.freepik.com/free-vector/customer-support-flat-illustration_23-2148889374.jpg?w=1380' // Vector style match
  },
  {
    id: 'telemarketing',
    title: 'Telemarketing',
    description: 'Strategic lead generation and sales calls to boost your revenue pipeline.',
    icon: PhoneCall,
    details: ['Lead Generation', 'Appointment Setting', 'Cold Calling', 'Market Research Surveys'],
    image: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'data-entry',
    title: 'Data Entry',
    description: 'Accurate and fast data processing services to keep your records organized.',
    icon: Keyboard,
    details: ['Data Cleansing', 'Online Data Entry', 'Data Mining', 'Transcription Services'],
    image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'virtual-assistance',
    title: 'Virtual Assistance',
    description: 'Executive administrative support to help you manage your schedule and tasks.',
    icon: Bot,
    details: ['Calendar Management', 'Email Correspondence', 'Travel Arrangements', 'Personal Tasks'],
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'back-office',
    title: 'Back Office Ops',
    description: 'Streamlined backend operations including payroll, accounting, and HR support.',
    icon: Briefcase,
    details: ['Payroll Processing', 'HR Administration', 'Accounting & Bookkeeping', 'Order Processing'],
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
];

export const FEATURES: Feature[] = [
  {
    title: '24/7 Support',
    description: 'Our teams work around the clock to align with your business hours and customer needs.',
    icon: Clock
  },
  {
    title: 'Cost-Effective',
    description: 'Reduce operational costs by up to 60% without compromising on quality or efficiency.',
    icon: TrendingUp
  },
  {
    title: 'Skilled Workforce',
    description: 'Access a talent pool of highly trained professionals ready to integrate with your team.',
    icon: Users
  },
  {
    title: 'Data Security',
    description: 'Enterprise-grade security protocols ensuring your sensitive data remains protected.',
    icon: ShieldCheck
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Operations Director',
    company: 'TechFlow Solutions',
    content: 'BPOMATE transformed our customer support. Their team was up and running in two weeks, and our CSAT scores have never been higher.',
    image: 'https://picsum.photos/id/64/100/100'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'CEO',
    company: 'StartUp Inc',
    content: 'Outsourcing our data entry to BPOMATE allowed us to focus on our core product. The accuracy and speed are impressive.',
    image: 'https://picsum.photos/id/91/100/100'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'Marketing Head',
    company: 'Global Retailers',
    content: 'The telemarketing team provided by BPOMATE is exceptional. They understood our brand voice immediately.',
    image: 'https://picsum.photos/id/129/100/100'
  }
];
