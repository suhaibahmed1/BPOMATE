
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { Users, FileText, DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';

const STATS = [
  { label: 'Total Quotes Received', value: '1,234', icon: FileText, change: '+12%', color: 'bg-blue-500' },
  { label: 'Avg Approval Time', value: '4.2 hrs', icon: Clock, change: '-18%', color: 'bg-indigo-500' },
  { label: 'Conversion Rate', value: '24%', icon: TrendingUp, change: '+1.4%', color: 'bg-green-500' },
  { label: 'Active Projects', value: '142', icon: Briefcase, change: '+5', color: 'bg-orange-500' },
];

const DATA_QUOTES = [
  { name: 'Jan', quotes: 40, approved: 20 },
  { name: 'Feb', quotes: 55, approved: 25 },
  { name: 'Mar', quotes: 48, approved: 28 },
  { name: 'Apr', quotes: 70, approved: 40 },
  { name: 'May', quotes: 62, approved: 35 },
  { name: 'Jun', quotes: 85, approved: 50 },
];

const DATA_SERVICES = [
  { name: 'Customer Support', value: 35, color: '#3b82f6' },
  { name: 'Telemarketing', value: 25, color: '#f59e0b' },
  { name: 'Data Entry', value: 20, color: '#10b981' },
  { name: 'Virtual Asst', value: 15, color: '#8b5cf6' },
  { name: 'Back Office', value: 5, color: '#ef4444' },
];

import { Briefcase } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Executive Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400">Overview of BPO performance and lead metrics.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {STATS.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg text-white shadow-lg shadow-opacity-20`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'text-green-600 bg-green-100 dark:bg-green-900/30' : 'text-red-600 bg-red-100 dark:bg-red-900/30'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wide">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quote Volume vs Approvals */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-bold text-slate-900 dark:text-white">Lead Volume vs Approvals</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DATA_QUOTES}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="quotes" stroke="#3b82f6" strokeWidth={3} name="Total Quotes" />
                <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={3} name="Approved" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Requested Services */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Most Requested Services</h3>
          <div className="flex flex-col md:flex-row items-center h-80">
            <div className="w-full md:w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                   <Pie
                    data={DATA_SERVICES}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                   >
                    {DATA_SERVICES.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                   </Pie>
                   <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 space-y-3">
               {DATA_SERVICES.map((item, idx) => (
                 <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center">
                       <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.color }} />
                       <span className="text-sm text-slate-700 dark:text-slate-300">{item.name}</span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">{item.value}%</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
