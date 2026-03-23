import React from 'react';
import { Hero3D } from './Hero3D';
import { Button } from './ui/button.jsx';
import { ArrowRight, Users, Briefcase } from 'lucide-react';

export const HeroSection = ({ onBookDemo, onViewJobs }) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#f5f6f8] via-white to-[#f5f6f8]" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-8 animate-fadeInUp">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="text-xs uppercase tracking-[0.2em] text-[#3c83f5] font-medium bg-[#3c83f5]/10 px-4 py-2 rounded-full">
                  IT RECRUITMENT & AI SOLUTIONS
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#0e1629] leading-tight tracking-tighter">
                Connect Top Tech
                <br />
                <span className="gradient-text">Talent</span> with
                <br />
                Leading Companies
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                JM DATA TALENT specializes in placing exceptional IT professionals across Ireland and globally. 
                From permanent positions to contract roles, we deliver talent solutions powered by AI innovation.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={onViewJobs}
                size="lg"
                className="bg-[#3c83f5] hover:bg-[#1a6ae8] text-white px-8 py-6 text-lg rounded-md group"
                data-testid="hero-find-talent-btn"
              >
                <Users className="mr-2" size={20} />
                Find IT Talent
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              
              <Button
                onClick={() => onBookDemo('demo')}
                size="lg"
                variant="outline"
                className="border-2 border-[#0e1629] text-[#0e1629] hover:bg-[#0e1629] hover:text-white px-8 py-6 text-lg rounded-md"
                data-testid="hero-explore-ai-btn"
              >
                <Briefcase className="mr-2" size={20} />
                Explore AI Solutions
              </Button>
            </div>

            {/* Key highlights */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#3c83f5] rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Permanent Placements</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#3c83f5] rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Contract Staffing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#3c83f5] rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Remote & Offshore Teams</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#3c83f5] rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">AI-Powered Solutions</span>
              </div>
            </div>
          </div>

          {/* Right: 3D Animation */}
          <div className="relative h-[500px] lg:h-[600px] animate-fadeInUp animate-delay-200">
            <Hero3D />
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#3c83f5]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#3c83f5]/5 rounded-full blur-3xl"></div>
    </section>
  );
};