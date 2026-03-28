import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export const LocationsSection = () => {
  return (
    <section className="section bg-white" data-testid="locations-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#3c83f5] font-medium">GLOBAL PRESENCE</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0e1629] mt-4 tracking-tight">
            Serving Clients
            <br />
            Worldwide
          </h2>
        </div>

        {/* Location card */}
        <div className="max-w-4xl mx-auto">
          <div className="card-hover bg-gradient-to-br from-[#0e1629] to-[#1a2a45] text-white p-12 rounded-xl border border-gray-700" data-testid="location-card-ireland">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 text-[#3c83f5] font-bold text-lg">
                <MapPin size={24} />
                HEADQUARTERS
              </span>
            </div>
            
            <h3 className="text-3xl font-bold mb-4">Ireland</h3>
            
            <div className="space-y-4 text-lg">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 flex-shrink-0" color="#3c83f5" />
                <p className="leading-relaxed">
                  27 Caragh Green, Naas, Kildare, Ireland W91 DXA9
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail size={20} className="flex-shrink-0" color="#3c83f5" />
                <a href="mailto:info@jmdatatalent.ie" className="hover:text-[#3c83f5] transition-colors">
                  info@jmdatatalent.ie
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone size={20} className="flex-shrink-0" color="#3c83f5" />
                <span>+353 1 XXX XXXX</span>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-700">
              <p className="text-gray-300 leading-relaxed">
                Operating globally with talent delivery across Ireland, India, Europe, and beyond.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};