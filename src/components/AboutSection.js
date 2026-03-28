import React from 'react';
import { CheckCircle } from 'lucide-react';

export const AboutSection = () => {
  const features = [
    'Vetted IT professionals across all tech stacks',
    'Fast placement with 48-hour response time',
    'Flexible hiring models: Permanent, Contract, Remote',
    'Specialized pharma and healthcare IT expertise',
    'AI-powered candidate matching',
    'Dedicated account management'
  ];

  return (
    <section className="py-20 bg-white" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/team-collaboration.png" 
                alt="Team collaboration"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#0066ff] opacity-10 rounded-2xl -z-10"></div>
          </div>

          {/* Right: Content */}
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#0066ff] font-semibold" style={{ fontFamily: 'Inter' }}>
                WHY CHOOSE US
              </span>
              <h2 className="text-4xl font-bold text-[#0e1629] mt-4 mb-6" style={{ fontFamily: 'Manrope' }}>
                Your Trusted Partner in <span className="text-[#0066ff]">IT Recruitment</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter' }}>
                With deep expertise in Ireland's tech ecosystem and global reach, we connect visionary companies with exceptional IT talent. Our proven process delivers results.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-[#0066ff] mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700" style={{ fontFamily: 'Inter' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
