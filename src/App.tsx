import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import ProjectForm from './components/project/ProjectForm';
import AccountantList from './components/accountant/AccountantList';
import AuthTabs from './components/auth/AuthTabs';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<'home' | 'post-project' | 'browse-accountants' | 'auth'>('home');

  const handleNavigation = (view: 'post-project' | 'browse-accountants') => {
    if (!isAuthenticated) {
      setCurrentView('auth');
    } else {
      setCurrentView(view);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'auth':
        return <AuthTabs />;
      case 'post-project':
        return isAuthenticated ? <ProjectForm /> : <AuthTabs />;
      case 'browse-accountants':
        return isAuthenticated ? <AccountantList /> : <AuthTabs />;
      default:
        return (
          <>
            <Hero onNavigate={handleNavigation} />
            <Services />
            <HowItWorks />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={handleNavigation} setView={setCurrentView} />
      <div className="py-8">
        {renderView()}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}