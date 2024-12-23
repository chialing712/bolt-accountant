import { create } from 'zustand';

interface ToastState {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  showToast: (type: 'success' | 'error', message: string) => void;
  hideToast: () => void;
}

export const useToast = create<ToastState>((set) => ({
  message: '',
  type: 'success',
  isVisible: false,
  showToast: (type, message) => {
    set({ type, message, isVisible: true });
    setTimeout(() => {
      set({ isVisible: false });
    }, 3000);
  },
  hideToast: () => set({ isVisible: false }),
}));