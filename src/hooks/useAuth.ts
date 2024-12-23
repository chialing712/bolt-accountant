import { useEffect } from 'react';
import { useAuthStore } from './useAuthStore';
import { supabase, getCurrentUser } from '../lib/supabase';
import { useToast } from './useToast';

export function useAuth() {
  const { user, profile, isLoading, setUser, setProfile, setLoading, reset } = useAuthStore();
  const { showToast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setLoading(true);
      if (event === 'SIGNED_IN') {
        const userData = await getCurrentUser();
        if (userData) {
          setUser(userData.user);
          setProfile(userData.profile);
        }
      } else if (event === 'SIGNED_OUT') {
        reset();
      }
      setLoading(false);
    });

    checkUser();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function checkUser() {
    try {
      const userData = await getCurrentUser();
      if (userData) {
        setUser(userData.user);
        setProfile(userData.profile);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      const user = await signIn(email, password);
      showToast('success', `Welcome back!`);
      return user;
    } catch (error) {
      showToast('error', 'Invalid email or password');
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function register(email: string, password: string, userType: 'client' | 'accountant') {
    try {
      setLoading(true);
      const user = await signUp(email, password, userType);
      showToast('success', 'Registration successful! Welcome aboard!');
      return user;
    } catch (error) {
      showToast('error', 'Registration failed. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await signOut();
      reset();
      showToast('success', 'Logged out successfully');
    } catch (error) {
      showToast('error', 'Error logging out');
      throw error;
    }
  }

  return {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };
}