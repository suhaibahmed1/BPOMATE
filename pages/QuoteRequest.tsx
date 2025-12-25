
import React, { useState, useEffect } from 'react';
import { Send, Loader2, ArrowRight, ArrowLeft, Calculator, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { useToast } from '../ToastContext';
import { SERVICES } from '../constants';
import { calculateEstimate } from '../utils/bpoHelper';

const STEPS = [
  { id: 1, title: 'Service Details' },
  { id: 2, title: 'Team Configuration' },
  { id: 3, title: 'Contact Info' }
];

export const QuoteRequest: React.FC = () => {
  const { showToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    teamSize: 1,
    duration: '',
    details: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  // Recalculate estimate whenever relevant fields change
  useEffect(() => {
    if (formData.serviceType && formData.teamSize > 0 && formData.duration) {
      const cost = calculateEstimate(formData.serviceType, Number(formData.teamSize), formData.duration);
      setEstimatedCost(cost);
    } else {
      setEstimatedCost(null);
    }
  }, [formData.serviceType, formData.teamSize, formData.duration]);

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return !!formData.serviceType && !!formData.duration;
      case 2:
        return formData.teamSize > 0;
      case 3:
        return !!formData.name && !!formData.email;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    } else {
      showToast('Please fill in all required fields.', 'error');
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    
    setIsSubmitting(true);

    // Simulate API Call
    setTimeout(() => {
      console.log('Quote Request:', { ...formData, estimatedCost });
      setIsSubmitting(false);
      showToast('Quote request submitted successfully! Reference ID: #8291', 'success');
      // Reset or redirect
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        teamSize: 1,
        duration: '',
        details: ''
      });
      setCurrentStep(1);
    }, 1500);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-20 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Request a Smart Quote</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Customize your BPO solution and get an instant estimated price range.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center w-full max-w-2xl">
            {STEPS.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center relative z-10">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                      currentStep >= step.id 
                        ? 'bg-brand-500 text-white' 
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {step.id}
                  </div>
                  <span className={`absolute top-12 text-xs font-medium whitespace-nowrap ${currentStep >= step.id ? 'text-brand-500' : 'text-slate-400'}`}>
                    {step.title}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`flex-grow h-1 mx-4 rounded ${currentStep > step.id ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Form Area */}
          <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-100 dark:border-slate-700 relative">
            
            <form onSubmit={handleSubmit}>
              {/* Step 1: Service & Duration */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Service Requirements</h2>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Service Type *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SERVICES.map(service => (
                        <div 
                          key={service.id}
                          onClick={() => setFormData({...formData, serviceType: service.title})}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.serviceType === service.title 
                              ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' 
                              : 'border-slate-200 dark:border-slate-700 hover:border-brand-200'
                          }`}
                        >
                          <div className="font-bold text-slate-900 dark:text-white">{service.title}</div>
                          <div className="text-xs text-slate-500">{service.description.substring(0, 40)}...</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Project Duration *</label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                    >
                      <option value="">Select Duration</option>
                      <option value="Short Term (1-3 months)">Short Term (1-3 months)</option>
                      <option value="Medium Term (3-12 months)">Medium Term (3-12 months)</option>
                      <option value="Long Term (1 year+)">Long Term (1 year+)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2: Team Size & Details */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Team Configuration</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Team Size: <span className="text-brand-500 font-bold">{formData.teamSize} Agents</span>
                    </label>
                    <input 
                      type="range" 
                      name="teamSize"
                      min="1" 
                      max="50" 
                      value={formData.teamSize}
                      onChange={handleChange}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-brand-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                      <span>1 Agent</span>
                      <span>25 Agents</span>
                      <span>50 Agents</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Additional Details</label>
                    <textarea
                      name="details"
                      rows={4}
                      value={formData.details}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none resize-none"
                      placeholder="Specific skills, languages, or software requirements..."
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Contact Details */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Client Information</h2>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-brand-50 dark:bg-brand-900/20 p-4 rounded-lg border border-brand-100 dark:border-brand-800">
                    <h4 className="font-bold text-brand-900 dark:text-brand-100 mb-2">Review Summary</h4>
                    <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                      <li><span className="font-semibold">Service:</span> {formData.serviceType}</li>
                      <li><span className="font-semibold">Team:</span> {formData.teamSize} Agents</li>
                      <li><span className="font-semibold">Duration:</span> {formData.duration}</li>
                      <li><span className="font-semibold">Estimated Monthly:</span> {estimatedCost || 'N/A'}</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-10 pt-6 border-t border-slate-100 dark:border-slate-700">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={currentStep === 1 ? 'invisible' : ''}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                
                {currentStep < 3 ? (
                  <Button type="button" onClick={handleNext}>
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                    ) : (
                      <>Submit Quote Request <Send className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Sidebar Estimator */}
          <div className="w-full lg:w-80">
            <div className="bg-brand-900 dark:bg-slate-800 text-white p-6 rounded-2xl shadow-xl sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-brand-700 rounded-lg">
                  <Calculator className="h-6 w-6 text-brand-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Cost Estimator</h3>
                  <p className="text-xs text-brand-300">Approximate Monthly Cost</p>
                </div>
              </div>

              <div className="mb-6 text-center py-6 bg-brand-800/50 rounded-xl border border-brand-700">
                {estimatedCost ? (
                  <>
                    <div className="text-3xl font-bold text-brand-300 tracking-tight">{estimatedCost}</div>
                    <div className="text-xs text-brand-400 mt-1">/ month</div>
                  </>
                ) : (
                   <span className="text-brand-400 text-sm italic">Select service details...</span>
                )}
              </div>

              <div className="space-y-4 text-sm text-brand-100">
                <div className="flex justify-between border-b border-brand-800 pb-2">
                  <span>Service Type</span>
                  <span className="font-medium text-white">{formData.serviceType || '-'}</span>
                </div>
                <div className="flex justify-between border-b border-brand-800 pb-2">
                  <span>Team Size</span>
                  <span className="font-medium text-white">{formData.teamSize} Agents</span>
                </div>
                <div className="flex justify-between border-b border-brand-800 pb-2">
                  <span>Duration</span>
                  <span className="font-medium text-white text-right max-w-[120px] truncate">{formData.duration || '-'}</span>
                </div>
              </div>

              <div className="mt-8 bg-brand-800/50 p-4 rounded-lg text-xs text-brand-300 leading-relaxed">
                <p>Note: This is a rough estimate for labor costs. Final pricing may vary based on specific technical requirements and service level agreements (SLAs).</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
