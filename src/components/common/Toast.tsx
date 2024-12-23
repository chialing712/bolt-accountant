import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center`}
      >
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 hover:text-gray-200 transition-colors"
        >
          <X size={18} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}