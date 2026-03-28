import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog.jsx';
import { Button } from './ui/button.jsx';
import { Input } from './ui/input.jsx';
import { Label } from './ui/label.jsx';
import { Textarea } from './ui/textarea.jsx';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const JobApplicationModal = ({ isOpen, onClose, job }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    current_company: '',
    experience_years: '',
    linkedin: '',
    cover_letter: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_type: 'application',
          job_title: job.title,
          job_company: job.company,
          job_location: job.location,
          ...formData,
          experience_years: parseInt(formData.experience_years, 10),
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Application submitted successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          current_company: '',
          experience_years: '',
          linkedin: '',
          cover_letter: '',
        });
        onClose();
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Application submission error:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto" data-testid="job-application-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#0e1629]">
            Apply for {job.title}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {job.company} - {job.location}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-[#0e1629]">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-1"
                data-testid="app-form-name"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-[#0e1629]">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="mt-1"
                data-testid="app-form-email"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="text-[#0e1629]">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="mt-1"
                data-testid="app-form-phone"
              />
            </div>

            <div>
              <Label htmlFor="experience_years" className="text-[#0e1629]">Years of Experience *</Label>
              <Input
                id="experience_years"
                type="number"
                min="0"
                value={formData.experience_years}
                onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                required
                className="mt-1"
                data-testid="app-form-experience"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="current_company" className="text-[#0e1629]">Current Company</Label>
            <Input
              id="current_company"
              value={formData.current_company}
              onChange={(e) => setFormData({ ...formData, current_company: e.target.value })}
              className="mt-1"
              data-testid="app-form-company"
            />
          </div>

          <div>
            <Label htmlFor="linkedin" className="text-[#0e1629]">LinkedIn Profile</Label>
            <Input
              id="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/..."
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              className="mt-1"
              data-testid="app-form-linkedin"
            />
          </div>

          <div>
            <Label htmlFor="cover_letter" className="text-[#0e1629]">Cover Letter</Label>
            <Textarea
              id="cover_letter"
              value={formData.cover_letter}
              onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
              rows={5}
              placeholder="Tell us why you're a great fit for this role..."
              className="mt-1"
              data-testid="app-form-cover-letter"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              data-testid="app-form-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#3c83f5] hover:bg-[#1a6ae8] text-white"
              data-testid="app-form-submit"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
