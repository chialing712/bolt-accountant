import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../common/Input';
import Button from '../common/Button';
import { motion } from 'framer-motion';

export default function RegisterForm() {
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'client' as 'client' | 'accountant',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await register(formData.email, formData.password, formData.userType);
    } catch (error) {
      setErrors({ form: 'Registration failed. Please try again.' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>

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
          error={errors.email}
          required
        />

        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          error={errors.password}
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
          error={errors.confirmPassword}
          required
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            I am a:
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="client"
                checked={formData.userType === 'client'}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  userType: e.target.value as 'client' | 'accountant'
                }))}
                className="mr-2"
              />
              Client
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="accountant"
                checked={formData.userType === 'accountant'}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  userType: e.target.value as 'client' | 'accountant'
                }))}
                className="mr-2"
              />
              Accountant
            </label>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>
    </motion.div>
  );
}