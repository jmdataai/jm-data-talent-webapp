import React from 'react';
import { Hero3D } from './Hero3D';
import { Button } from './ui/button.jsx';
import { ArrowRight, Users, Briefcase } from 'lucide-react';

export const HeroSection = ({ onBookDemo, onViewJobs }) => {
  return (
    <>
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

      {/* Trusted Partners Section */}
      <section className="py-12 bg-white border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs uppercase tracking-widest text-gray-500 mb-8 font-semibold">
            Trusted by Leading Technology Companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV4qszb4bgjhsz9UfJI5986WZa_r9TwNx57kq8Fw5X69ffRWPPg98T2oa1Js4o1cSLgGaSNItsR_kk58CB8sVSw7e3Z3Ya74WOYKQaPW02btMlTowuj9om41uqGuVtuC7OF_tYf4WQkrUUtQWvRsuac4uuKsyTMhdLG8maCmwF4NwrVqch8nb-H9lvPYL_0pavS1kk_2GN9OAZT0XAh2gbNummpZ4wWPZCB2guTpr61pv4T4Of784jWMY4yuh9N4dci3AykF_SFP4" 
              alt="Stripe" 
              className="h-8 grayscale hover:grayscale-0 transition-all"
            />
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZkalb-VWS84xjD9I1ooA0sLQgy1r2KJnqTZ6Jc0ljEOgu6r7JRHkuVchpuL4-HG5PFx-gyIbl94HOtvMhiev3OCKsC7Ivq1dQv71VhKEzx62sE4fUlUohMP-RaRg3kaCV1HXGiougv5L2jsuGJkzuqtB13YqLvsJpmIzuMmvt_UtzgOCrvYFSl6G7c29Hn4WTbotDBOui3pxIKoLen7aJT6L3xesMxANq3vfYBYaMwZoOaQ2ObJJMvpgOLtxAemp6qDyXi53H7S4" 
              alt="Intercom" 
              className="h-8 grayscale hover:grayscale-0 transition-all"
            />
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfUPbfWZItZ7IyrsOOGAf4AqBUUfXyHoBAN3Cvq1Lv_yvQzh_jNkg-LB4TMJnNS36uOrJgWyLExVjPx1Pq99t_oSPLFhFVaV2azEcs0RJkplEA6S-yCH6DAWrgDCOaxpiAYNYrCMSIvnJYLvO-pfZ496LLyMWyGFzEOC-J6cfQq1dq9nUiMmYFy75xAApeKSJmZeh8SK2jJ99bo3XSp1WrzKmxOCTIvPo1nbApDskRNnjDS1q7QYilRJXm40np_Pe-fwhVLJ_8JIw" 
              alt="Workday" 
              className="h-8 grayscale hover:grayscale-0 transition-all"
            />
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmk7s1jhPr_arOAOtKZSYJMKZ0Zogymy0-Z0pKSQl0qHKgj9cmPtD83aFKzVrRxW8UTDp5kgBbrvAWc8jyh42XZoURMs20JF5JBjFArVBlbEVGHdIRYWFuZq31tI0qZCmMWEBMtvnCTvf356w_n8WHfoklzM_rmGVOSrnfIMD-OCErjB02y24zZ3XmNQk2sLRu8BVp00G-oYotVfO5ZywX-j8Y_cOBnLwhfsKhS-AHyM4BnBKHwizwzxdOjsBG5GK41-i_y8xxv3o" 
              alt="HubSpot" 
              className="h-8 grayscale hover:grayscale-0 transition-all"
            />
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWJF-ThxY1klVNBlUwrP23Bh0I_HNz1Y6UhTDFd-8papoowHQUv5ZR5W5L6dZJkVWhgSddJV2SAjLz5UYFg0mBf96tUX2-YdIhSxN5cTGWFh4aTlKyBdmZUKaIMaHgnp941P3lHLtbuy9sVd1vKDMJ-8xo_KMr-I8BNs1h3dI-lPLPBcsblJhA-f7Anv-_XTRf9ETF9r0JDVaD7X7G13_vRtgpl_PfSjgwP1ZUF0ftHakrPgU-BueJM_yzv-li0R5ayPGMVOU5sKA" 
              alt="Google Ireland" 
              className="h-8 grayscale hover:grayscale-0 transition-all"
            />
          </div>
        </div>
      </section>
    </>
  );
};