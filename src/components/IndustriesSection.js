import React from 'react';
import { Building2, Code, Pill, HeartPulse, ShoppingBag, Shield } from 'lucide-react';

const industries = [
  {
    icon: Building2,
    name: 'Banking & Financial Services',
    description: 'Expert IT talent for digital transformation in finance, from blockchain developers to cybersecurity specialists.',
    color: '#3c83f5'
  },
  {
    icon: Code,
    name: 'Technology & Software',
    description: 'Full-stack developers, DevOps engineers, and cloud architects for cutting-edge tech companies.',
    color: '#3c83f5'
  },
  {
    icon: Pill,
    name: 'Pharmaceutical & Life Sciences',
    description: 'Specialized IT professionals for pharma, biotech, and clinical research organizations.',
    color: '#3c83f5'
  },
  {
    icon: HeartPulse,
    name: 'Healthcare & MedTech',
    description: 'Healthcare IT specialists, EHR developers, and medical software engineers.',
    color: '#3c83f5'
  },
  {
    icon: ShoppingBag,
    name: 'Retail & E-commerce',
    description: 'E-commerce developers, data analysts, and digital transformation specialists.',
    color: '#3c83f5'
  },
  {
    icon: Shield,
    name: 'Insurance & Risk Management',
    description: 'InsurTech developers, actuarial software engineers, and risk analytics experts.',
    color: '#3c83f5'
  }
];

export const IndustriesSection = () => {
  return (
    <section id="industries" className="section bg-white" data-testid="industries-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#3c83f5] font-medium">INDUSTRIES WE SERVE</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0e1629] mt-4 tracking-tight">
            Specialized Talent Across
            <br />
            Key Sectors
          </h2>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed">
            From fintech to pharma, we understand the unique IT staffing needs of every industry.
          </p>
        </div>

        {/* Industries grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.name}
                className="card-hover p-8 bg-[#f5f6f8] border border-gray-200 rounded-lg group"
                data-testid={`industry-card-${index}`}
              >
                <div className="mb-6">
                  <div
                    className="inline-flex p-4 rounded-lg"
                    style={{ backgroundColor: `${industry.color}15` }}
                  >
                    <Icon size={32} color={industry.color} strokeWidth={1.5} />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-[#0e1629] mb-3 group-hover:text-[#3c83f5] transition-colors">
                  {industry.name}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {industry.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};