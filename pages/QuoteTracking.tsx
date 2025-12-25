
import React, { useState } from 'react';
import { Search, Package, CheckCircle2, Clock, FileText, AlertCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { QuoteStatus } from '../types';

const MOCK_STATUS_DB: Record<string, { status: QuoteStatus, date: string, service: string }> = {
  '1234': { status: 'Submitted', date: 'Oct 24, 2023', service: 'Customer Support' },
  '5678': { status: 'Reviewed', date: 'Oct 22, 2023', service: 'Telemarketing' },
  '9012': { status: 'Approved', date: 'Oct 20, 2023', service: 'Data Entry' },
  '3456': { status: 'In Progress', date: 'Oct 15, 2023', service: 'Virtual Assistance' },
  '7890': { status: 'Completed', date: 'Sep 30, 2023', service: 'Back Office Ops' },
};

const STATUS_STEPS: QuoteStatus[] = ['Submitted', 'Reviewed', 'Approved', 'In Progress', 'Completed'];

export const QuoteTracking: React.FC = () => {
  const [quoteId, setQuoteId] = useState('');
  const [result, setResult] = useState<{ status: QuoteStatus, date: string, service: string } | null>(null);
  const [error, setError] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const data = MOCK_STATUS_DB[quoteId];
    if (data) {
      setResult(data);
      setError(false);
    } else {
      setResult(null);
      setError(true);
    }
  };

  const getStepStatus = (step: QuoteStatus, current: QuoteStatus) => {
    const stepIndex = STATUS_STEPS.indexOf(step);
    const currentIndex = STATUS_STEPS.indexOf(current);
    
    if (current === 'Rejected') return 'rejected';
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-20 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Track Your Quote Status</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Enter your Quote Reference ID to check the current progress of your request.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-10 border border-slate-200 dark:border-slate-700">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Enter Quote ID (e.g., 1234)"
                value={quoteId}
                onChange={(e) => setQuoteId(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
            <Button type="submit" size="lg">
              Track Status
            </Button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Quote ID not found. Please check and try again.
            </div>
          )}
        </div>

        {result && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700 animate-fade-in-up">
            <div className="flex justify-between items-start mb-8 border-b border-slate-100 dark:border-slate-700 pb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Quote #{quoteId}</h2>
                <p className="text-slate-500 dark:text-slate-400">Service: <span className="font-medium text-slate-700 dark:text-slate-200">{result.service}</span></p>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400 mb-1">Last Updated</div>
                <div className="font-medium text-slate-900 dark:text-white">{result.date}</div>
              </div>
            </div>

            {result.status === 'Rejected' ? (
               <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl text-center">
                 <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
                 <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">Quote Rejected</h3>
                 <p className="text-red-600 dark:text-red-300">Unfortunately, we cannot proceed with this quote at this time. Please contact support for details.</p>
               </div>
            ) : (
              <div className="relative py-8">
                {/* Timeline Line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 -z-10 hidden md:block" />
                
                <div className="space-y-8">
                  {STATUS_STEPS.map((step, index) => {
                    const statusState = getStepStatus(step, result.status);
                    const isCompleted = statusState === 'completed';
                    const isCurrent = statusState === 'current';
                    
                    return (
                      <div key={step} className={`flex items-center md:justify-center relative ${index % 2 === 0 ? 'flex-row' : 'flex-row md:flex-row-reverse'}`}>
                        <div className={`w-full md:w-1/2 flex items-center ${index % 2 === 0 ? 'justify-start md:justify-end pr-8' : 'justify-start md:justify-start pl-0 md:pl-8'}`}>
                           <div className={`hidden md:block ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                              <h3 className={`font-bold ${isCompleted || isCurrent ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>{step}</h3>
                              {isCurrent && <p className="text-sm text-brand-500">Current Stage</p>}
                           </div>
                        </div>

                        <div className="absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 flex items-center justify-center w-16 md:w-auto">
                          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-4 flex items-center justify-center z-10 transition-colors
                            ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                              isCurrent ? 'bg-brand-500 border-brand-200 dark:border-brand-900 text-white animate-pulse' : 
                              'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-300'}
                          `}>
                            {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : 
                             isCurrent ? <Clock className="h-5 w-5" /> : 
                             <div className="w-2 h-2 rounded-full bg-slate-300" />}
                          </div>
                        </div>

                        {/* Mobile Text */}
                        <div className="block md:hidden pl-16">
                           <h3 className={`font-bold ${isCompleted || isCurrent ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>{step}</h3>
                           {isCurrent && <p className="text-sm text-brand-500">Current Stage</p>}
                        </div>
                        
                        {/* Desktop Empty Spacer */}
                        <div className="hidden md:block w-1/2" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
