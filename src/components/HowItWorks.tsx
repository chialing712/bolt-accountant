import React from 'react';
import { ClipboardList, Users, CheckCircle, CreditCard } from 'lucide-react';

const steps = [
  {
    title: 'Post Your Project',
    description: 'Describe your accounting needs and budget',
    icon: ClipboardList,
  },
  {
    title: 'Get Matched',
    description: 'We\'ll connect you with qualified accountants',
    icon: Users,
  },
  {
    title: 'Choose & Begin',
    description: 'Select your preferred accountant and start working',
    icon: CheckCircle,
  },
  {
    title: 'Safe Payment',
    description: 'Pay securely through our platform',
    icon: CreditCard,
  },
];

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Simple steps to find and work with your perfect accountant
          </p>
        </div>

        <div className="mt-20">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            
            {/* Steps */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="text-center">
                    <div className="relative flex flex-col items-center">
                      <div className="rounded-full bg-blue-600 p-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="mt-6 text-lg font-medium text-gray-900">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 max-w-[200px]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}