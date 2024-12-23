export const validateLoginForm = (data: { 
  email: string; 
  password: string; 
}) => {
  const errors: Record<string, string> = {};

  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Invalid email address';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  }

  return errors;
};

export const validateRegistrationForm = (data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const errors: Record<string, string> = {};

  if (!data.name) {
    errors.name = 'Name is required';
  }

  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Invalid email address';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};