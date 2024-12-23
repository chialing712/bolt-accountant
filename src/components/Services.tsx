import React from 'react';
import { Calculator, FileSpreadsheet, PiggyBank, Receipt, FileCheck, TrendingUp } from 'lucide-react';

const services = [
  {
    title: 'Bookkeeping',
    description: 'Accurate recording and organization of daily financial transactions',
    icon: FileSpreadsheet,
  },
  {
    title: 'Tax Preparation',
    description: 'Professional tax return preparation and planning services',
    icon: Receipt,
  },
  {
    title: 'Financial Planning',
    description: 'Strategic planning for business growth and financial success',
    icon: TrendingUp,
  },
  {
    title: 'Payroll Services',
    description: 'Complete payroll processing and tax filing solutions',
    icon: PiggyBank,
  },
  {
    title: 'Audit Support',
    description: 'Comprehensive assistance during internal and external audits',
    icon: FileCheck,
  },
  {
    title: 'Financial Analysis',
    description: 'Detailed analysis of financial data for informed decision-making',
    icon: Calculator,
  },
];

export default function Services() {
  return (
    <div id="services" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Comprehensive accounting services to help your business thrive
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="pt-6"
                >
                  <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full hover:shadow-lg transition-shadow duration-300">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {service.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}