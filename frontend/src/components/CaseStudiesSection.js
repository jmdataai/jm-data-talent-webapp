import React from 'react';
import { TrendingUp, Clock, DollarSign } from 'lucide-react';

const caseStudies = [
  {
    title: 'AI Chatbot for IT Helpdesk',
    client: 'Global Tech Company',
    industry: 'Technology',
    stats: [
      { label: 'Tickets Automated', value: '80%', icon: TrendingUp },
      { label: 'Response Time', value: '<2 min', icon: Clock },
      { label: 'Cost Reduction', value: '60%', icon: DollarSign },
    ],
    description: 'Implemented an AI-powered helpdesk chatbot that handles tier-1 support queries automatically.',
  },
  {
    title: 'Complete Tech Team Build',
    client: 'FinTech Startup',
    industry: 'Financial Services',
    stats: [
      { label: 'Hires in 90 days', value: '15', icon: TrendingUp },
      { label: 'Time to Hire', value: '21 days', icon: Clock },
      { label: 'Retention Rate', value: '95%', icon: DollarSign },
    ],
    description: 'Built a full-stack development team from scratch for a Series A funded fintech startup.',
  },
  {
    title: 'Pharma IT Transformation',
    client: 'Life Sciences Company',
    industry: 'Pharmaceutical',
    stats: [
      { label: 'Specialists Placed', value: '12', icon: TrendingUp },
      { label: 'Project Duration', value: '6 months', icon: Clock },
      { label: 'Cost Savings', value: '40%', icon: DollarSign },
    ],
    description: 'Provided specialized IT consultants for a major digital transformation in clinical trials.',
  },
];

export const CaseStudiesSection = () => {
  return (
    <section id="case-studies" className="section bg-[#f5f6f8]" data-testid="case-studies-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#3c83f5] font-medium">SUCCESS STORIES</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0e1629] mt-4 tracking-tight">
            Real Results for
            <br />
            Real Businesses
          </h2>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed">
            See how we've helped companies transform their teams and operations.
          </p>
        </div>

        {/* Case studies grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={study.title}
              className="card-hover bg-white p-8 rounded-lg border border-gray-200 shadow-sm"
              data-testid={`case-study-card-${index}`}
            >
              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider text-[#3c83f5] font-medium">
                  {study.industry}
                </span>
                <h3 className="text-2xl font-bold text-[#0e1629] mt-2 mb-2">
                  {study.title}
                </h3>
                <p className="text-sm text-gray-500">{study.client}</p>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                {study.description}
              </p>
              
              <div className="space-y-4 pt-6 border-t border-gray-200">
                {study.stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon size={16} color="#3c83f5" />
                        <span className="text-sm text-gray-600">{stat.label}</span>
                      </div>
                      <span className="text-lg font-bold text-[#3c83f5]">
                        {stat.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};