import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../common/Input';
import Button from '../common/Button';
import { motion } from 'framer-motion';

export default function LoginForm() {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      await login(formData.email, formData.password);
    } catch (error) {
      setErrors({ form: 'Invalid email or password' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>
      
      {errors.form && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md text-sm">
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          required
          error={errors.password}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </motion.div>
  );
}