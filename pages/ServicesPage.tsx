
import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { SERVICES } from '../constants';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="bg-brand-900 dark:bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-brand-200 dark:text-slate-400">Comprehensive solutions designed for your success.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="space-y-12">
          {SERVICES.map((service, index) => (
            <div 
              key={service.id} 
              className={`flex flex-col md:flex-row items-center gap-12 bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-slate-700 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} transition-colors duration-300`}
            >
              <div className="flex-1">
                <div className="inline-flex items-center justify-center p-3 bg-brand-50 dark:bg-slate-700 rounded-xl mb-6">
                  <service.icon className="h-8 w-8 text-brand-600 dark:text-brand-400" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{service.title}</h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  {service.description} We tailor our approach to fit your specific workflows, ensuring seamless integration with your existing processes.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {service.details?.map((detail, idx) => (
                    <div key={idx} className="flex items-center text-slate-700 dark:text-slate-400">
                      <CheckCircle2 className="h-5 w-5 text-brand-500 dark:text-brand-400 mr-3 flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                <Button onClick={() => navigate('/contact')}>
                  Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1 w-full">
                <div className="aspect-video rounded-xl bg-slate-200 dark:bg-slate-700 overflow-hidden relative shadow-lg">
                   <img 
                    src={service.image || `https://picsum.photos/seed/${service.id}/600/400`} 
                    alt={service.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                   />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
