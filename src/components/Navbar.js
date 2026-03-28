import React, { useState, useEffect } from 'react';
import { Button } from './ui/button.jsx';
import { Menu, X } from 'lucide-react';

export const Navbar = ({ onBookDemo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('IT Staffing');

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

  const handleNavClick = (label, href) => {
    setActiveLink(label);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 bg-white border-b border-gray-100`}
      data-testid="main-navbar"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Using client's exact logo image */}
          <a href="#" className="flex items-center" data-testid="logo-link">
            <img 
              src="/logo.png" 
              alt="JM DATA TALENT" 
              className="h-12"
            />
          </a>

          {/* Desktop navigation - Clean and minimal like stitch */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link.label, link.href)}
                className={`text-[15px] transition-colors font-normal relative ${
                  activeLink === link.label 
                    ? 'text-[#0066ff] after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-[2px] after:bg-[#0066ff]' 
                    : 'text-gray-600 hover:text-[#0e1629]'
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
                key={link.label}
                href={link.href}
                onClick={() => {
                  handleNavClick(link.label, link.href);
                  setIsMobileMenuOpen(false);
                }}
                className={`block transition-colors font-medium py-2 ${
                  activeLink === link.label ? 'text-[#0066ff]' : 'text-[#0e1629] hover:text-[#0066ff]'
                }`}
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