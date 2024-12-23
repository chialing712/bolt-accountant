import React, { useState } from 'react';
import { Calculator, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onNavigate: (view: 'post-project' | 'browse-accountants') => void;
  setView: (view: 'home' | 'post-project' | 'browse-accountants' | 'auth') => void;
}

export default function Header({ onNavigate, setView }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const handleAuthClick = () => {
    setView('auth');
  };

  const handleLogoClick = () => {
    setView('home');
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
            <Calculator className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">AccountantPro</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => onNavigate('browse-accountants')} className="text-gray-600 hover:text-blue-600">
              Find an Accountant
            </button>
            <button onClick={() => onNavigate('post-project')} className="text-gray-600 hover:text-blue-600">
              Post a Project
            </button>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Welcome, {user?.name}</span>
                <button
                  onClick={logout}
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={handleAuthClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Login / Register
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <button
                onClick={() => onNavigate('browse-accountants')}
                className="block px-3 py-2 text-gray-600 hover:bg-gray-50 w-full text-left"
              >
                Find an Accountant
              </button>
              <button
                onClick={() => onNavigate('post-project')}
                className="block px-3 py-2 text-gray-600 hover:bg-gray-50 w-full text-left"
              >
                Post a Project
              </button>
              {isAuthenticated ? (
                <>
                  <span className="block px-3 py-2 text-gray-600">Welcome, {user?.name}</span>
                  <button
                    onClick={logout}
                    className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50 w-full"
                  >
                    <LogOut className="h-5 w-5 mr-1" />
                    Logout
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleAuthClick}
                  className="w-full text-left px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Login / Register
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}