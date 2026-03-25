import React, { useState, useEffect } from 'react';
import '@/App.css';
import axios from 'axios';
import { Toaster } from '@/components/ui/sonner';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { PartnersSection } from '@/components/PartnersSection';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { StatsSection } from '@/components/StatsSection';
import { IndustriesSection } from '@/components/IndustriesSection';
import { AISection } from '@/components/AISection';
import { CaseStudiesSection } from '@/components/CaseStudiesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { LocationsSection } from '@/components/LocationsSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { BookDemoModal } from '@/components/BookDemoModal';
import { JobsModal } from '@/components/JobsModal';
import { JobApplicationModal } from '@/components/JobApplicationModal';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [demoModal, setDemoModal] = useState({ isOpen: false, formType: 'demo' });
  const [jobsModal, setJobsModal] = useState(false);
  const [applicationModal, setApplicationModal] = useState({ isOpen: false, job: null });

  useEffect(() => {
    // Seed jobs on first load
    seedJobs();
  }, []);

  const seedJobs = async () => {
    try {
      await axios.post(`${API}/seed-jobs`);
    } catch (error) {
      console.error('Error seeding jobs:', error);
    }
  };

  const handleBookDemo = (formType) => {
    setDemoModal({ isOpen: true, formType });
  };

  const handleViewJobs = () => {
    setJobsModal(true);
  };

  const handleApplyJob = (job) => {
    setJobsModal(false);
    setApplicationModal({ isOpen: true, job });
  };

  return (
    <div className="App">
      <Navbar onBookDemo={handleBookDemo} />
      
      <main>
        <HeroSection
          onBookDemo={handleBookDemo}
          onViewJobs={handleViewJobs}
        />
        
        <PartnersSection />
        
        <AboutSection />
        
        <ServicesSection onEnquire={() => handleBookDemo('consultation')} />
        
        <StatsSection />
        
        <IndustriesSection />
        
        <AISection onBookDemo={handleBookDemo} />
        
        <CaseStudiesSection />
        
        <TestimonialsSection />
        
        <LocationsSection />
        
        <CTASection
          onBookDemo={handleBookDemo}
          onViewJobs={handleViewJobs}
        />
      </main>
      
      <Footer />
      
      {/* Modals */}
      <BookDemoModal
        isOpen={demoModal.isOpen}
        onClose={() => setDemoModal({ isOpen: false, formType: 'demo' })}
        formType={demoModal.formType}
      />
      
      <JobsModal
        isOpen={jobsModal}
        onClose={() => setJobsModal(false)}
        onApply={handleApplyJob}
      />
      
      <JobApplicationModal
        isOpen={applicationModal.isOpen}
        onClose={() => setApplicationModal({ isOpen: false, job: null })}
        job={applicationModal.job}
      />
      
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;