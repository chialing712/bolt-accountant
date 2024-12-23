import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

export function useAuthRedirect() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && profile) {
      const route = profile.user_type === 'client' ? '/client/dashboard' : '/accountant/dashboard';
      navigate(route);
    }
  }, [user, profile, navigate]);
}