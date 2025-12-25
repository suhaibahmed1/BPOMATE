import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Briefcase } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { Button } from '../../components/Button';
import { useToast } from '../../ToastContext';
import { SERVICES } from '../../constants';

export const AdminServices: React.FC = () => {
  const [services, setServices] = useState(SERVICES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== id));
      showToast('Service deleted successfully', 'success');
    }
  };

  const handleEdit = (id: string) => {
    showToast('Edit functionality would open a modal here.', 'success');
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Service Management</h1>
        <Button onClick={() => showToast('Add functionality simulated.', 'success')}>
          <Plus className="h-5 w-5 mr-2" /> Add New Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-brand-50 dark:bg-slate-700 rounded-lg text-brand-600 dark:text-brand-400">
                <service.icon className="h-6 w-6" />
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEdit(service.id)}
                  className="p-1.5 text-slate-400 hover:text-brand-500 transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDelete(service.id)}
                  className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{service.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow">{service.description}</p>
            
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
               <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Features</span>
               <div className="flex flex-wrap gap-2 mt-2">
                 {service.details?.slice(0, 3).map((detail, idx) => (
                   <span key={idx} className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs px-2 py-1 rounded">
                     {detail}
                   </span>
                 ))}
               </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};