import React from 'react';
import { Button } from './ui/button.jsx';

export const HeroSection = ({ onBookDemo, onViewJobs }) => {
  return (
    <section className="relative bg-white py-20 lg:py-28" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal text-[#0e1629] leading-tight tracking-tight" style={{ fontFamily: 'Manrope' }}>
              Powering <span className="text-[#0066ff]">Tech</span>
              <br />
              <span className="text-[#0066ff]">Innovation.</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl" style={{ fontFamily: 'Inter' }}>
              Ireland's specialist in IT Staffing and AI-driven workflow solutions. We bridge the gap between visionary companies and the world's most capable engineers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                onClick={onViewJobs}
                className="bg-[#0066ff] hover:bg-[#0052cc] text-white px-8 py-3.5 text-base font-semibold rounded-md shadow-lg"
                data-testid="hero-hire-talent-btn"
                style={{ fontFamily: 'Inter' }}
              >
                Hire Talent
              </Button>
              
              <Button
                onClick={() => onBookDemo('demo')}
                variant="outline"
                className="border-2 border-[#0066ff] text-[#0066ff] hover:bg-[#0066ff] hover:text-white px-8 py-3.5 text-base font-semibold rounded-md"
                data-testid="hero-explore-solutions-btn"
                style={{ fontFamily: 'Inter' }}
              >
                Explore Solutions
              </Button>
            </div>
          </div>

          {/* Right: Professional Team Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/hero-team.png" 
                alt="Professional tech team"
                className="w-full h-auto object-cover"
              />
              {/* Floating stat card */}
              <div className="absolute bottom-6 right-6 bg-white rounded-xl p-5 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="bg-[#0066ff] rounded-lg p-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold" style={{ fontFamily: 'Inter' }}>Placement Success</p>
                    <p className="text-2xl font-black text-[#0e1629]" style={{ fontFamily: 'Manrope' }}>98.4%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};