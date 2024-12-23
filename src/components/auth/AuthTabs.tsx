import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="max-w-md mx-auto">
      <div className="flex mb-6">
        <button
          className={`flex-1 py-3 text-center font-medium border-b-2 transition-colors duration-200 ${
            activeTab === 'login'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button
          className={`flex-1 py-3 text-center font-medium border-b-2 transition-colors duration-200 ${
            activeTab === 'register'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('register')}
        >
          Register
        </button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}