import React from 'react';
import { Star, Award, ThumbsUp } from 'lucide-react';
import Button from '../common/Button';

interface AccountantCardProps {
  accountant: {
    id: string;
    name: string;
    title: string;
    rating: number;
    reviews: number;
    completedProjects: number;
    hourlyRate: number;
    skills: string[];
    imageUrl: string;
  };
}

export default function AccountantCard({ accountant }: AccountantCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start space-x-4">
        <img
          src={accountant.imageUrl}
          alt={accountant.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{accountant.name}</h3>
          <p className="text-gray-600">{accountant.title}</p>
          
          <div className="flex items-center mt-2 space-x-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>{accountant.rating.toFixed(1)}</span>
              <span className="text-gray-500 ml-1">({accountant.reviews})</span>
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 text-blue-500 mr-1" />
              <span>{accountant.completedProjects} projects</span>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-gray-700 font-medium">${accountant.hourlyRate}/hr</p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {accountant.skills.map(skill => (
              <span
                key={skill}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex space-x-3">
        <Button variant="primary" className="flex-1">
          Contact
        </Button>
        <Button variant="secondary" className="flex-1">
          View Profile
        </Button>
      </div>
    </div>
  );
}