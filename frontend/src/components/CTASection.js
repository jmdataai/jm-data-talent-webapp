import React from 'react';
import { Button } from './ui/button.jsx';
import { ArrowRight } from 'lucide-react';

export const CTASection = ({ onBookDemo, onViewJobs }) => {
  return (
    <section className="section bg-gradient-to-r from-[#3c83f5] to-[#1a6ae8] text-white" data-testid="cta-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight">
          Ready to Transform Your Team?
        </h2>
        <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
          Whether you need top IT talent or cutting-edge AI solutions, we're here to help you succeed.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={() => onBookDemo('consultation')}
            size="lg"
            className="bg-white text-[#3c83f5] hover:bg-gray-100 px-8 py-6 text-lg group"
            data-testid="cta-consultation-btn"
          >
            Book a Consultation
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
          
          <Button
            onClick={onViewJobs}
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-[#3c83f5] px-8 py-6 text-lg"
            data-testid="cta-view-roles-btn"
          >
            View Open Roles
          </Button>
        </div>
      </div>
    </section>
  );
};