import React from 'react';
import { Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0e1629] text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company info */}
          <div className="md:col-span-2">
            <img 
              src="/logo.png" 
              alt="JM DATA TALENT" 
              className="h-8 mb-4"
            />
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Ireland's leading IT recruitment specialist and AI solutions provider. 
              Connecting top tech talent with innovative companies worldwide.
            </p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" color="#3c83f5" />
                <span className="text-gray-400">
                  27 Caragh Green, Naas, Kildare, Ireland W91 DXA9
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0" color="#3c83f5" />
                <a
                  href="mailto:info@jmdatatalent.ie"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  info@jmdatatalent.ie
                </a>
              </div>
            </div>
          </div>
          
          {/* IT Staffing links */}
          <div>
            <h3 className="text-lg font-bold mb-4">IT Staffing</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Permanent Placements
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Contract Staffing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Remote Teams
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Executive Search
                </a>
              </li>
            </ul>
          </div>
          
          {/* AI Solutions links */}
          <div>
            <h3 className="text-lg font-bold mb-4">AI Solutions</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#ai-solutions" className="hover:text-white transition-colors">
                  AI Chatbots
                </a>
              </li>
              <li>
                <a href="#ai-solutions" className="hover:text-white transition-colors">
                  AI Agents
                </a>
              </li>
              <li>
                <a href="#ai-solutions" className="hover:text-white transition-colors">
                  Process Automation
                </a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-white transition-colors">
                  Case Studies
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} JM DATA TALENT. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#3c83f5] transition-colors"
                data-testid="footer-linkedin"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#3c83f5] transition-colors"
                data-testid="footer-twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:info@jmdatatalent.ie"
                className="text-gray-400 hover:text-[#3c83f5] transition-colors"
                data-testid="footer-email"
              >
                <Mail size={20} />
              </a>
            </div>
            
            <div className="flex gap-4 text-sm text-gray-400">
              <span className="px-3 py-1 bg-gray-800 rounded text-xs">GDPR Compliant</span>
              <span className="px-3 py-1 bg-gray-800 rounded text-xs">ISO Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};