import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useToast } from '../hooks/useToast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'accountant';
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: 'client' | 'accountant') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        role: 'client',
      };
      
      setUser(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      showToast('success', `Welcome back, ${userData.name}!`);
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  const register = useCallback(async (email: string, password: string, role: 'client' | 'accountant') => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        role,
      };
      
      setUser(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      showToast('success', `Welcome, ${userData.name}!`);
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    showToast('success', 'Logged out successfully');
  }, [showToast]);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}