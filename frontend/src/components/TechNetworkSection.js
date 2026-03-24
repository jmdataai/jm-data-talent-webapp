import React from 'react';
import { Hero3D } from './Hero3D';

export const TechNetworkSection = () => {
  return (
    <section className="py-20 bg-[#f8f9fa]" data-testid="tech-network-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#0e1629] mb-4" style={{ fontFamily: 'Manrope' }}>
            Our <span className="text-[#0066ff]">Technology Ecosystem</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Inter' }}>
            Connecting companies with specialized talent across cutting-edge technologies
          </p>
        </div>
        
        <div className="relative h-[600px] rounded-2xl bg-white shadow-lg overflow-hidden">
          <Hero3D />
        </div>
      </div>
    </section>
  );
};