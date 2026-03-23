import React from 'react';
import { Users, Clock, Globe, Briefcase, TrendingUp, HeadphonesIcon } from 'lucide-react';
import { Button } from './ui/button.jsx';

const services = [
  {
    icon: Users,
    title: 'Permanent Placements',
    description: 'Full-time hires across all tech roles from junior to C-level executives.',
    tags: ['Full-time', 'Direct hire', 'Long-term'],
  },
  {
    icon: Clock,
    title: 'Contract Staffing',
    description: 'Flexible contract resources for project-based work and temporary coverage.',
    tags: ['Contract', 'Temporary', 'Project-based'],
  },
  {
    icon: Globe,
    title: 'Remote & Offshore Teams',
    description: 'Build distributed teams with top talent from Ireland, India, and worldwide.',
    tags: ['Remote', 'Offshore', 'Global'],
  },
  {
    icon: Briefcase,
    title: 'Pharma IT Specialists',
    description: 'Specialized recruitment for pharmaceutical and life sciences IT positions.',
    tags: ['Pharma', 'Biotech', 'Compliance'],
  },
  {
    icon: TrendingUp,
    title: 'Executive Search',
    description: 'Senior leadership and C-suite technology executive placements.',
    tags: ['C-level', 'Leadership', 'Strategic'],
  },
  {
    icon: HeadphonesIcon,
    title: 'Managed Outsourcing',
    description: 'End-to-end managed service teams for ongoing IT support and development.',
    tags: ['Managed', 'Outsourcing', '24/7'],
  },
];

export const ServicesSection = ({ onEnquire }) => {
  return (
    <section id="services" className="section bg-[#f5f6f8]" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#3c83f5] font-medium">IT STAFFING SERVICES</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0e1629] mt-4 tracking-tight">
            Complete IT Recruitment
            <br />
            Solutions
          </h2>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed">
            From permanent hires to flexible contract staff, we provide comprehensive talent solutions tailored to your needs.
          </p>
        </div>

        {/* Services bento grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="card-hover bg-white p-8 rounded-lg border border-gray-200 shadow-sm"
                data-testid={`service-card-${index}`}
              >
                <div className="mb-6">
                  <div className="inline-flex p-4 bg-[#3c83f5]/10 rounded-lg">
                    <Icon size={32} color="#3c83f5" strokeWidth={1.5} />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-[#0e1629] mb-3">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 bg-[#f5f6f8] text-[#0e1629] rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Button
                  onClick={onEnquire}
                  variant="outline"
                  className="w-full border-[#3c83f5] text-[#3c83f5] hover:bg-[#3c83f5] hover:text-white"
                  data-testid={`service-enquire-btn-${index}`}
                >
                  Enquire Now
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};