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
    { label: 'AI Solutions', href: '#ai-solutions' },
    { label: 'Industries', href: '#industries' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'About', href: '#about' },
  ];

  return (
    <>
      {/* Top info bar */}
      <div className="bg-[#0e1629] text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <span data-testid="contact-email">Email: info@jmdatatalent.ie</span>
          <span>Ireland | India | Worldwide</span>
          <button
            onClick={() => onBookDemo('consultation')}
            className="text-[#3c83f5] hover:text-white transition-colors"
            data-testid="top-consultation-btn"
          >
            Book a Free Consultation →
          </button>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/70 backdrop-blur-xl border-b border-gray-200 shadow-sm'
            : 'bg-white'
        }`}
        data-testid="main-navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo with updated styling */}
            <a href="#" className="flex items-baseline gap-2" data-testid="logo-link">
              <span className="text-5xl md:text-6xl font-black text-[#0e1629]" style={{ fontFamily: 'Manrope', letterSpacing: '-0.03em' }}>
                JM
              </span>
              <span className="text-sm md:text-base font-bold tracking-widest text-[#3c83f5]" style={{ fontFamily: 'Inter', textTransform: 'uppercase' }}>
                DATA TALENT
              </span>
            </a>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[#0e1629] hover:text-[#3c83f5] transition-colors font-medium"
                  data-testid={`nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
                >
                  {link.label}
                </a>
              ))}
              <Button
                onClick={() => onBookDemo('demo')}
                className="bg-[#3c83f5] hover:bg-[#1a6ae8] text-white px-6 py-2 rounded-md"
                data-testid="nav-book-demo-btn"
              >
                Book a Demo
              </Button>
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
                className="w-full bg-[#3c83f5] hover:bg-[#1a6ae8] text-white py-3 rounded-md"
                data-testid="mobile-book-demo-btn"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};