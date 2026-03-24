import React from 'react';
import { Hero3D } from './Hero3D';
import { Button } from './ui/button.jsx';
import { ArrowRight, Users, Briefcase } from 'lucide-react';

export const HeroSection = ({ onBookDemo, onViewJobs }) => {
  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f8f9fa]" data-testid="hero-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div className="space-y-8 animate-fadeInUp">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal text-[#0e1629] leading-tight tracking-tight">
                Powering <span className="text-[#0066ff] font-normal">Tech</span>
                <br />
                <span className="text-[#0066ff] font-normal">Innovation.</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl" style={{ fontFamily: 'Inter' }}>
                Ireland's specialist in IT Staffing and AI-driven workflow solutions. We bridge the gap between visionary companies and the world's most capable engineers.
              </p>

              {/* CTA Buttons - Matching stitch */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  onClick={onViewJobs}
                  className="bg-[#0066ff] hover:bg-[#0052cc] text-white px-8 py-6 text-lg font-semibold rounded-md shadow-lg"
                  data-testid="hero-hire-talent-btn"
                  style={{ fontFamily: 'Inter' }}
                >
                  Hire Talent
                </Button>
                
                <Button
                  onClick={() => onBookDemo('demo')}
                  variant="outline"
                  className="border-2 border-[#0066ff] text-[#0066ff] hover:bg-[#0066ff] hover:text-white px-8 py-6 text-lg font-semibold rounded-md"
                  data-testid="hero-explore-solutions-btn"
                  style={{ fontFamily: 'Inter' }}
                >
                  Explore Solutions
                </Button>
              </div>
            </div>

            {/* Right: Professional Team Image from stitch */}
            <div className="relative h-[500px] lg:h-[600px] animate-fadeInUp animate-delay-200 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/hero-team.png" 
                alt="Professional tech team collaborating"
                className="w-full h-full object-cover"
              />
              {/* Floating stat card like in stitch design */}
              <div className="absolute bottom-8 right-8 bg-white rounded-xl p-6 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="bg-[#0066ff] rounded-lg p-3">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Placement Success</p>
                    <p className="text-3xl font-black text-[#0e1629]">98.4%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-center text-xs uppercase tracking-widest text-gray-400 mb-10 font-semibold" style={{ fontFamily: 'Inter' }}>
            Trusted by Leading Technology Companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-16 opacity-50">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV4qszb4bgjhsz9UfJI5986WZa_r9TwNx57kq8Fw5X69ffRWPPg98T2oa1Js4o1cSLgGaSNItsR_kk58CB8sVSw7e3Z3Ya74WOYKQaPW02btMlTowuj9om41uqGuVtuC7OF_tYf4WQkrUUtQWvRsuac4uuKsyTMhdLG8maCmwF4NwrVqch8nb-H9lvPYL_0pavS1kk_2GN9OAZT0XAh2gbNummpZ4wWPZCB2guTpr61pv4T4Of784jWMY4yuh9N4dci3AykF_SFP4" 
              alt="Stripe" 
              className="h-7 grayscale hover:grayscale-0 transition-all"
            />
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZkalb-VWS84xjD9I1ooA0sLQgy1r2KJnqTZ6Jc0ljEOgu6r7JRHkuVchpuL4-HG5PFx-gyIbl94HOtvMhiev3OCKsC7Ivq1dQv71VhKEzx62sE4fUlUohMP-RaRg3kaCV1HXGiougv5L2jsuGJkzuqtB13YqLvsJpmIzuMmvt_UtzgOCrvYFSl6G7c29Hn4WTbotDBOui3pxIKoLen7aJT6L3xesMxANq3vfYBYaMwZoOaQ2ObJJMvpgOLtxAemp6qDyXi53H7S4" 
              alt="Intercom" 
              className="h-7 grayscale hover:grayscale-0 transition-all"
            />
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfUPbfWZItZ7IyrsOOGAf4AqBUUfXyHoBAN3Cvq1Lv_yvQzh_jNkg-LB4TMJnNS36uOrJgWyLExVjPx1Pq99t_oSPLFhFVaV2azEcs0RJkplEA6S-yCH6DAWrgDCOaxpiAYNYrCMSIvnJYLvO-pfZ496LLyMWyGFzEOC-J6cfQq1dq9nUiMmYFy75xAApeKSJmZeh8SK2jJ99bo3XSp1WrzKmxOCTIvPo1nbApDskRNnjDS1q7QYilRJXm40np_Pe-fwhVLJ_8JIw" 
              alt="Workday" 
              className="h-7 grayscale hover:grayscale-0 transition-all"
            />
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmk7s1jhPr_arOAOtKZSYJMKZ0Zogymy0-Z0pKSQl0qHKgj9cmPtD83aFKzVrRxW8UTDp5kgBbrvAWc8jyh42XZoURMs20JF5JBjFArVBlbEVGHdIRYWFuZq31tI0qZCmMWEBMtvnCTvf356w_n8WHfoklzM_rmGVOSrnfIMD-OCErjB02y24zZ3XmNQk2sLRu8BVp00G-oYotVfO5ZywX-j8Y_cOBnLwhfsKhS-AHyM4BnBKHwizwzxdOjsBG5GK41-i_y8xxv3o" 
              alt="HubSpot" 
              className="h-7 grayscale hover:grayscale-0 transition-all"
            />
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWJF-ThxY1klVNBlUwrP23Bh0I_HNz1Y6UhTDFd-8papoowHQUv5ZR5W5L6dZJkVWhgSddJV2SAjLz5UYFg0mBf96tUX2-YdIhSxN5cTGWFh4aTlKyBdmZUKaIMaHgnp941P3lHLtbuy9sVd1vKDMJ-8xo_KMr-I8BNs1h3dI-lPLPBcsblJhA-f7Anv-_XTRf9ETF9r0JDVaD7X7G13_vRtgpl_PfSjgwP1ZUF0ftHakrPgU-BueJM_yzv-li0R5ayPGMVOU5sKA" 
              alt="Google Ireland" 
              className="h-7 grayscale hover:grayscale-0 transition-all"
            />
          </div>
        </div>
      </section>
    </>
  );
};