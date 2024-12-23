import React from 'react';
import AccountantCard from './AccountantCard';

// Mock data for demonstration
const mockAccountants = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Certified Public Accountant',
    rating: 4.9,
    reviews: 127,
    completedProjects: 89,
    hourlyRate: 75,
    skills: ['Tax Planning', 'Bookkeeping', 'Financial Analysis'],
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e',
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Financial Advisor & CPA',
    rating: 4.8,
    reviews: 93,
    completedProjects: 64,
    hourlyRate: 85,
    skills: ['Business Planning', 'Tax Preparation', 'Audit'],
    imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296',
  },
];

export default function AccountantList() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockAccountants.map(accountant => (
          <AccountantCard key={accountant.id} accountant={accountant} />
        ))}
      </div>
    </div>
  );
}