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
    <section id="services" className="section bg-[#f5f6f8] py-20" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header - LARGER, more prominent */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="text-sm uppercase tracking-[0.2em] text-[#3c83f5] font-bold bg-[#3c83f5]/10 px-6 py-3 rounded-full inline-block">
            OUR CORE EXPERTISE
          </span>
          <h2 className="text-5xl sm:text-6xl font-black text-[#0e1629] mt-6 tracking-tight leading-tight">
            Complete IT Recruitment
            <br />
            <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 mt-6 leading-relaxed">
            From permanent hires to flexible contract staff, we provide comprehensive talent solutions 
            tailored to your technology needs. <strong>Ireland's trusted IT recruitment partner.</strong>
          </p>
        </div>

        {/* Services bento grid - LARGER cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="card-hover bg-white p-10 rounded-xl border-2 border-gray-200 shadow-lg hover:shadow-2xl hover:border-[#3c83f5] transition-all"
                data-testid={`service-card-${index}`}
              >
                <div className="mb-8">
                  <div className="inline-flex p-5 bg-gradient-to-br from-[#3c83f5] to-[#1a6ae8] rounded-xl shadow-lg">
                    <Icon size={40} color="#ffffff" strokeWidth={1.5} />
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-[#0e1629] mb-4 leading-tight">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6 text-base">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-4 py-2 bg-[#3c83f5]/10 text-[#3c83f5] rounded-full font-bold border border-[#3c83f5]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Button
                  onClick={onEnquire}
                  className="w-full bg-[#3c83f5] text-white hover:bg-[#1a6ae8] py-6 text-base font-bold"
                  data-testid={`service-enquire-btn-${index}`}
                >
                  Enquire Now →
                </Button>
              </div>
            );
          })}
        </div>

        {/* Additional recruitment benefits banner */}
        <div className="mt-16 bg-gradient-to-r from-[#0e1629] to-[#1a2a45] rounded-2xl p-12 text-white">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="text-3xl font-black mb-6">Why Choose JM DATA TALENT for IT Recruitment?</h3>
            <div className="grid md:grid-cols-4 gap-8 mt-8">
              <div>
                <div className="text-4xl font-black text-[#3c83f5] mb-2">5K+</div>
                <div className="text-sm text-gray-300">Vetted Candidates</div>
              </div>
              <div>
                <div className="text-4xl font-black text-[#3c83f5] mb-2">48hrs</div>
                <div className="text-sm text-gray-300">Average Response Time</div>
              </div>
              <div>
                <div className="text-4xl font-black text-[#3c83f5] mb-2">95%</div>
                <div className="text-sm text-gray-300">Placement Success Rate</div>
              </div>
              <div>
                <div className="text-4xl font-black text-[#3c83f5] mb-2">24/7</div>
                <div className="text-sm text-gray-300">Dedicated Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};