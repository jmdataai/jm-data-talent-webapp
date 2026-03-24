import React, { useState, useEffect } from 'react';
import { Button } from './ui/button.jsx';
import { Menu, X } from 'lucide-react';

export const Navbar = ({ onBookDemo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'IT Staffing', href: '#services' },
    { label: 'Permanent', href: '#services' },
    { label: 'Contract', href: '#services' },
    { label: 'Executive Search', href: '#services' },
    { label: 'AI Solutions', href: '#ai-solutions' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 bg-white border-b border-gray-100`}
      data-testid="main-navbar"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Matching stitch design exactly */}
          <a href="#" className="flex flex-col justify-center" data-testid="logo-link">
            <div className="flex items-baseline gap-0">
              <span 
                className="text-[2.75rem] leading-none font-black text-[#0e1629]" 
                style={{ 
                  fontFamily: 'Manrope', 
                  letterSpacing: '-0.05em',
                  lineHeight: '1'
                }}
              >
                JM
              </span>
            </div>
            <span 
              className="text-[11px] font-bold tracking-[0.15em] text-[#3c83f5] uppercase -mt-1" 
              style={{ fontFamily: 'Inter' }}
            >
              DATA TALENT
            </span>
          </a>

          {/* Desktop navigation - Clean and minimal like stitch */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-[15px] text-gray-600 hover:text-[#0e1629] transition-colors font-normal relative ${
                  index === 0 ? 'text-[#3c83f5] after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-[2px] after:bg-[#3c83f5]' : ''
                }`}
                data-testid={`nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
                style={{ fontFamily: 'Inter' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons - Matching stitch design */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              onClick={() => onBookDemo('demo')}
              className="bg-[#0066ff] hover:bg-[#0052cc] text-white px-6 py-2.5 text-[15px] font-semibold rounded-md shadow-sm"
              data-testid="nav-get-started-btn"
              style={{ fontFamily: 'Inter' }}
            >
              Get Started
            </Button>
            <button
              onClick={() => onBookDemo('contact')}
              className="text-[#0066ff] hover:text-[#0052cc] text-[15px] font-semibold transition-colors"
              data-testid="nav-contact-us-btn"
              style={{ fontFamily: 'Inter' }}
            >
              Contact Us
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-[#0e1629] p-2"
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden bg-white border-t border-gray-200"
          data-testid="mobile-menu"
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-[#0e1629] hover:text-[#3c83f5] transition-colors font-medium py-2"
                data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
              >
                {link.label}
              </a>
            ))}
            <Button
              onClick={() => {
                onBookDemo('demo');
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white py-3 rounded-md"
              data-testid="mobile-get-started-btn"
            >
              Get Started
            </Button>
            <button
              onClick={() => {
                onBookDemo('contact');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-[#0066ff] font-semibold py-3"
              data-testid="mobile-contact-us-btn"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};