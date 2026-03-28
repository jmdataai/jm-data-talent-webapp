import React from 'react';
import { Button } from './ui/button.jsx';
import { Hero3D } from './Hero3D';

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

          {/* Right: 3D Technology Network */}
          <div className="relative h-[500px] lg:h-[600px]">
            <Hero3D />
          </div>
        </div>
      </div>
    </section>
  );
};