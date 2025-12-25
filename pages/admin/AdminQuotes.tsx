
import React, { useState, useEffect } from 'react';
import { Search, Check, X, Clock, ArrowUp, ArrowDown, AlertTriangle } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { useToast } from '../../ToastContext';
import { QuoteRequest, QuoteStatus } from '../../types';
import { calculateEstimate, determinePriority } from '../../utils/bpoHelper';

// Mock Data Initializer with Priority Calculation
const initializeMockData = (): QuoteRequest[] => {
  const rawData: Partial<QuoteRequest>[] = [
    { id: '1001', clientName: 'Alice Johnson', email: 'alice@techstart.io', phone: '555-0101', serviceType: 'Customer Support', teamSize: 25, duration: 'Long Term', status: 'Submitted', date: '2023-10-01' },
    { id: '1002', clientName: 'Bob Smith', email: 'bob@enterprise.co', phone: '555-0102', serviceType: 'Data Entry', teamSize: 20, duration: 'Short Term', status: 'Approved', date: '2023-10-02' },
    { id: '1003', clientName: 'Carol White', email: 'carol@market.net', phone: '555-0103', serviceType: 'Telemarketing', teamSize: 2, duration: 'Medium Term', status: 'Rejected', date: '2023-10-03' },
    { id: '1004', clientName: 'David Brown', email: 'david@fintech.com', phone: '555-0104', serviceType: 'Back Office', teamSize: 50, duration: 'Long Term', status: 'Completed', date: '2023-10-04' },
    { id: '1005', clientName: 'Eve Davis', email: 'eve@startup.io', phone: '555-0105', serviceType: 'Virtual Assistance', teamSize: 1, duration: 'Short Term', status: 'Submitted', date: '2023-10-05' },
  ];

  return rawData.map(q => ({
    ...q,
    estimatedCost: calculateEstimate(q.serviceType!, q.teamSize!, q.duration!),
    priority: determinePriority(q.teamSize!, q.duration!, q.serviceType!),
  })) as QuoteRequest[];
};

export const AdminQuotes: React.FC = () => {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({ key: 'priority', direction: 'desc' });
  const { showToast } = useToast();

  useEffect(() => {
    setQuotes(initializeMockData());
  }, []);

  const handleStatusChange = (id: string, newStatus: QuoteStatus) => {
    setQuotes(quotes.map(q => q.id === id ? { ...q, status: newStatus } : q));
    showToast(`Quote #${id} marked as ${newStatus}`, 'success');
  };

  const priorityValue = (p?: string) => {
    if (p === 'High') return 3;
    if (p === 'Medium') return 2;
    return 1;
  };

  const sortedQuotes = [...quotes].sort((a, b) => {
    if (sortConfig.key === 'priority') {
      const diff = priorityValue(a.priority) - priorityValue(b.priority);
      return sortConfig.direction === 'asc' ? diff : -diff;
    }
    return 0; // Simplified sort for demo
  });

  const filteredQuotes = sortedQuotes.filter(q => 
    q.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    q.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.id.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Approved': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Rejected': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'Submitted': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Completed': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  const getPriorityBadge = (priority?: string) => {
    switch(priority) {
      case 'High': return (
        <span className="flex items-center text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded border border-red-100 dark:border-red-900">
          <AlertTriangle className="h-3 w-3 mr-1" /> HIGH
        </span>
      );
      case 'Medium': return (
        <span className="text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded border border-orange-100 dark:border-orange-900">
          MED
        </span>
      );
      default: return (
        <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
          LOW
        </span>
      );
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Quote Requests</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage and prioritize inbound leads.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, service or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300 w-24">Priority</th>
                <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Client Info</th>
                <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Service Details</th>
                <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Est. Value</th>
                <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
                <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.map((quote) => (
                <tr key={quote.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="p-4">
                    {getPriorityBadge(quote.priority)}
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-slate-900 dark:text-white">{quote.clientName}</div>
                    <div className="text-sm text-slate-500">{quote.email}</div>
                    <div className="text-xs text-slate-400 mt-0.5">ID: #{quote.id}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-slate-900 dark:text-white font-medium">{quote.serviceType}</div>
                    <div className="text-sm text-slate-500">{quote.teamSize} Agents • {quote.duration}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-mono font-medium text-slate-700 dark:text-slate-300">{quote.estimatedCost}</div>
                    <div className="text-xs text-slate-400">/ month</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {quote.status === 'Submitted' && (
                      <>
                        <button 
                          onClick={() => handleStatusChange(quote.id, 'Approved')}
                          className="p-1.5 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                          title="Approve Quote"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleStatusChange(quote.id, 'Rejected')}
                          className="p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          title="Reject Quote"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </>
                    )}
                    {quote.status === 'Approved' && (
                       <button 
                          onClick={() => handleStatusChange(quote.id, 'Completed')}
                          className="p-1.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                          title="Mark Completed"
                        >
                          <Clock className="h-5 w-5" />
                        </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredQuotes.length === 0 && (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
              No quotes found matching your search.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
    