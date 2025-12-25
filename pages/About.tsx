import React from 'react';
import { Target, Eye, Heart } from 'lucide-react';
import { COMPANY_NAME } from '../constants';

export const About: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 transition-colors duration-300 min-h-screen">
      {/* Header */}
      <div className="bg-brand-900 dark:bg-slate-950 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-brand-200 dark:text-slate-400">Building bridges between talent and opportunity.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Who We Are</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
              {COMPANY_NAME} is a premier Business Process Outsourcing provider dedicated to helping global businesses scale efficiently. Founded on the principles of integrity and excellence, we have grown from a small support team to a global workforce solution.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              We believe that outsourcing isn't just about cutting costs—it's about unlocking potential. By handling the complexities of day-to-day operations, we empower our partners to focus on innovation and strategy.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
             <img 
               src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
               alt="Team meeting" 
               className="w-full h-full object-cover"
             />
          </div>
        </div>

        {/* Mission Vision Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl border-t-4 border-brand-500 dark:border-brand-400">
            <div className="bg-brand-100 dark:bg-slate-700 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <Target className="h-7 w-7 text-brand-600 dark:text-brand-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h3>
            <p className="text-slate-600 dark:text-slate-400">
              To provide world-class outsourcing solutions that enable our clients to achieve operational excellence and sustainable growth.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl border-t-4 border-brand-500 dark:border-brand-400">
            <div className="bg-brand-100 dark:bg-slate-700 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <Eye className="h-7 w-7 text-brand-600 dark:text-brand-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Vision</h3>
            <p className="text-slate-600 dark:text-slate-400">
              To be the most trusted global partner in the BPO industry, known for innovation, reliability, and human-centric service.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl border-t-4 border-brand-500 dark:border-brand-400">
            <div className="bg-brand-100 dark:bg-slate-700 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <Heart className="h-7 w-7 text-brand-600 dark:text-brand-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Values</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Integrity in every action, Excellence in every delivery, and Empathy in every interaction with clients and employees alike.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};