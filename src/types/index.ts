export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'accountant';
  profileImage?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  estimatedDuration: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: 'open' | 'in-progress' | 'completed';
  clientId: string;
  accountantId?: string;
  requirements: string[];
  deadline: string;
}