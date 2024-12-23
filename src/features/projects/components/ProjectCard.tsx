import React from 'react';
import { Calendar, DollarSign } from 'lucide-react';
import { Project } from '../../../types/database';
import Button from '../../../components/common/Button';

interface ProjectCardProps {
  project: Project;
  onApply?: () => void;
}

export default function ProjectCard({ project, onApply }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
      <p className="text-gray-600 mb-4">{project.description}</p>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center">
          <DollarSign className="w-4 h-4 text-gray-500 mr-1" />
          <span>${project.budget_min} - ${project.budget_max}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 text-gray-500 mr-1" />
          <span>{new Date(project.created_at).toLocaleDateString()}</span>
        </div>
      </div>

      {onApply && (
        <Button onClick={onApply} className="w-full">
          Apply Now
        </Button>
      )}
    </div>
  );
}