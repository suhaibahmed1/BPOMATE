
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ServicesPage } from './pages/ServicesPage';
import { Contact } from './pages/Contact';
import { QuoteRequest } from './pages/QuoteRequest';
import { QuoteTracking } from './pages/QuoteTracking';
import { ThemeProvider } from './ThemeContext';
import { ToastProvider } from './ToastContext';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminQuotes } from './pages/admin/AdminQuotes';
import { AdminServices } from './pages/admin/AdminServices';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <Routes>
            {/* Public Routes - Wrapped in Main Layout */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/quote" element={<Layout><QuoteRequest /></Layout>} />
            <Route path="/track-quote" element={<Layout><QuoteTracking /></Layout>} />

            {/* Admin Routes - Separate Layout (handled inside pages) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/quotes" element={<ProtectedRoute><AdminQuotes /></ProtectedRoute>} />
            <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
            
            {/* Redirect root admin to dashboard */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
