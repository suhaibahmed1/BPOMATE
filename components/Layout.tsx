
import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Mail, Phone, MapPin, Lock } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { Button } from './Button';

// Custom Logo Component refined to match provided brand image
const Logo = () => (
  <div className="flex items-center gap-0.5 select-none" aria-label="BPOMATE Logo">
    {/* Thin/Normal font weight to match image */}
    <span className="text-3xl md:text-4xl font-normal tracking-tight text-white font-[Inter]">BPOMA</span>
    {/* White circle with blue T */}
    <div className="mx-0.5 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-sm">
      <span className="text-brand-900 font-normal text-xl md:text-3xl leading-none pt-0.5">T</span>
    </div>
    <span className="text-3xl md:text-4xl font-normal tracking-tight text-white font-[Inter]">E</span>
  </div>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetQuote = () => {
    navigate('/quote');
    setIsMobileMenuOpen(false);
  };

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-brand-900 dark:bg-slate-950 text-white border-b border-brand-800 dark:border-slate-800 shadow-lg transition-colors">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div 
              className="cursor-pointer hover:opacity-90 transition-opacity" 
              onClick={() => navigate('/')}
            >
              <Logo />
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    `text-sm font-medium transition-colors hover:text-brand-400 ${
                      isActive ? 'text-brand-400' : 'text-slate-300'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              
              <Button size="sm" onClick={handleGetQuote} className="ml-4">
                Get a Quote
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden gap-4">
              <button 
                className="p-2 text-slate-300 hover:text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-brand-800 dark:bg-slate-900 border-t border-brand-700 dark:border-slate-800">
            <div className="px-4 py-4 space-y-3">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive ? 'bg-brand-900 dark:bg-slate-950 text-white' : 'text-slate-300 hover:bg-brand-700 dark:hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="pt-4">
                <Button className="w-full" onClick={handleGetQuote}>Get a Quote</Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-900 dark:bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-brand-800 dark:border-slate-800 transition-colors">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="mb-6">
                <Logo />
              </div>
              <p className="text-sm leading-relaxed text-slate-400 mb-6">
                Empowering businesses worldwide with intelligent outsourcing solutions. We handle the operations so you can focus on growth.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-6">Services</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#/services" className="hover:text-brand-400 transition-colors">Customer Support</a></li>
                <li><a href="#/services" className="hover:text-brand-400 transition-colors">Telemarketing</a></li>
                <li><a href="#/services" className="hover:text-brand-400 transition-colors">Data Entry</a></li>
                <li><a href="#/services" className="hover:text-brand-400 transition-colors">Virtual Assistants</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Company</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#/about" className="hover:text-brand-400 transition-colors">About Us</a></li>
                <li><a href="#/services" className="hover:text-brand-400 transition-colors">How It Works</a></li>
                <li><a href="#/track-quote" className="hover:text-brand-400 transition-colors">Track Quote</a></li>
                <li><a href="#/contact" className="hover:text-brand-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Contact Us</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-brand-500 shrink-0" />
                  <span>123 Business Avenue, Tech Hub District, New York, NY 10001</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-brand-500 shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-brand-500 shrink-0" />
                  <span>hello@bpomate.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-brand-800 dark:border-slate-800 pt-8 text-sm flex flex-col md:flex-row justify-between items-center text-slate-500">
            <p>&copy; {new Date().getFullYear()} BPOMATE. All rights reserved.</p>
            <button 
              onClick={() => navigate('/admin/login')} 
              className="mt-4 md:mt-0 flex items-center gap-2 hover:text-brand-400 transition-colors text-xs opacity-70 hover:opacity-100"
            >
              <Lock className="h-3 w-3" />
              <span></span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
