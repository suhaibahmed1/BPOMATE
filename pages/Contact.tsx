import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { ContactFormData } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Placeholder for API call
    // await fetch('https://api.bpomate.com/contact', { method: 'POST', body: JSON.stringify(formData) });
    
    // Simulate network request
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
       <div className="bg-brand-900 dark:bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-brand-200 dark:text-slate-400">Start your journey with BPOMATE today.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Get in Touch</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
              Have questions about our services or pricing? Fill out the form and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-brand-100 dark:bg-slate-800 p-3 rounded-lg mr-4">
                  <Phone className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Phone</h3>
                  <p className="text-slate-600 dark:text-slate-400">+1 (555) 123-4567</p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">Mon-Fri 9am-6pm EST</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-brand-100 dark:bg-slate-800 p-3 rounded-lg mr-4">
                  <Mail className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Email</h3>
                  <p className="text-slate-600 dark:text-slate-400">hello@bpomate.com</p>
                  <p className="text-slate-600 dark:text-slate-400">support@bpomate.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-brand-100 dark:bg-slate-800 p-3 rounded-lg mr-4">
                  <MapPin className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Headquarters</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    123 Business Avenue<br />
                    Tech Hub District<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a Message</h3>
            
            {isSuccess ? (
              <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-4 rounded-lg border border-green-200 dark:border-green-800 mb-6 flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                Your message has been sent successfully!
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-400"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-400"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-400"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all resize-none placeholder-slate-400 dark:placeholder-slate-400"
                  placeholder="Tell us about your outsourcing needs..."
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};