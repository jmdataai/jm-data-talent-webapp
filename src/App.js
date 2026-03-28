import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@/App.css';
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
import { AdminPage } from '@/pages/AdminPage';

function MainSite() {
  const [demoModal, setDemoModal] = useState({ isOpen: false, formType: 'demo' });
  const [jobsModal, setJobsModal] = useState(false);
  const [applicationModal, setApplicationModal] = useState({ isOpen: false, job: null });

  const handleBookDemo = (formType) => setDemoModal({ isOpen: true, formType });
  const handleViewJobs = () => setJobsModal(true);
  const handleApplyJob = (job) => {
    setJobsModal(false);
    setApplicationModal({ isOpen: true, job });
  };

  return (
    <div className="App">
      <Navbar onBookDemo={handleBookDemo} />
      <main>
        <HeroSection onBookDemo={handleBookDemo} onViewJobs={handleViewJobs} />
        <PartnersSection />
        <AboutSection />
        <ServicesSection onEnquire={() => handleBookDemo('consultation')} />
        <StatsSection />
        <IndustriesSection />
        <AISection onBookDemo={handleBookDemo} />
        <CaseStudiesSection />
        <TestimonialsSection />
        <LocationsSection />
        <CTASection onBookDemo={handleBookDemo} onViewJobs={handleViewJobs} />
      </main>
      <Footer />
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/*" element={<MainSite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
