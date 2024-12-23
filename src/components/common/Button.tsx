import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  icon?: LucideIcon;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  icon: Icon,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  const baseStyles = 'flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </button>
  );
}