import React from 'react';
import { TrendingUp, Users, Award, Target } from 'lucide-react';

export const StatsSection = () => {
  const stats = [
    { icon: Users, value: '850+', label: 'Professionals Placed', color: '#3c83f5' },
    { icon: Target, value: '240+', label: 'Client Engagements', color: '#3c83f5' },
    { icon: TrendingUp, value: '40%', label: 'Average Cost Savings', color: '#3c83f5' },
    { icon: Award, value: '98%', label: 'Client Satisfaction', color: '#3c83f5' },
  ];

  return (
    <section className="section bg-[#0e1629] text-white" data-testid="stats-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center"
                data-testid={`stat-item-${index}`}
              >
                <div className="flex justify-center mb-4">
                  <Icon size={40} color={stat.color} strokeWidth={1.5} />
                </div>
                <div className="text-4xl md:text-5xl font-black mb-2" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};