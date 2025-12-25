import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, LogOut, Briefcase } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  // We keep useTheme context usage if needed later, but remove the toggle button
  const { theme } = useTheme(); 

  const handleLogout = () => {
    // Mock logout
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Quote Requests', path: '/admin/quotes', icon: FileText },
    { label: 'Services', path: '/admin/services', icon: Briefcase },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-900 dark:bg-slate-900 text-white fixed h-full flex flex-col shadow-xl">
        <div className="p-6 border-b border-brand-800 dark:border-slate-800">
           <h2 className="text-2xl font-bold tracking-tight">BPOMATE <span className="text-brand-400 text-sm block">Admin Portal</span></h2>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-brand-700 text-white shadow-md' 
                    : 'text-slate-300 hover:bg-brand-800 hover:text-white'
                }`
              }
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-brand-800 dark:border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-slate-300 hover:text-white hover:bg-red-900/50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Topbar */}
        <header className="bg-white dark:bg-slate-900 shadow-sm h-16 flex items-center justify-end px-8 transition-colors duration-300">
           <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600 dark:text-slate-400">Welcome, Admin</span>
              <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
           </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};