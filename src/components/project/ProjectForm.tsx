import React, { useState } from 'react';
import { Calendar, DollarSign } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

interface ProjectFormData {
  title: string;
  description: string;
  budget: string;
  deadline: string;
  requirements: string[];
}

export default function ProjectForm() {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    requirements: [''],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle project submission
    console.log('Project submitted:', formData);
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, ''],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Post Your Project</h2>
      
      <Input
        label="Project Title"
        value={formData.title}
        onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
        placeholder="e.g., Monthly Bookkeeping for Small Business"
        required
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Description
        </label>
        <textarea
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe your project requirements in detail..."
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Budget"
          type="number"
          value={formData.budget}
          onChange={e => setFormData(prev => ({ ...prev, budget: e.target.value }))}
          placeholder="Enter your budget"
          required
          icon={DollarSign}
        />

        <Input
          label="Deadline"
          type="date"
          value={formData.deadline}
          onChange={e => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
          required
          icon={Calendar}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Requirements
        </label>
        {formData.requirements.map((req, index) => (
          <input
            key={index}
            value={req}
            onChange={e => {
              const newReqs = [...formData.requirements];
              newReqs[index] = e.target.value;
              setFormData(prev => ({ ...prev, requirements: newReqs }));
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={`Requirement ${index + 1}`}
          />
        ))}
        <Button
          variant="secondary"
          onClick={addRequirement}
          className="mt-2"
        >
          Add Requirement
        </Button>
      </div>

      <Button type="submit" className="w-full mt-4">
        Post Project
      </Button>
    </form>
  );
}