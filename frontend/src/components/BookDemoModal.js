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
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const BookDemoModal = ({ isOpen, onClose, formType }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, {
        ...formData,
        form_type: formType || 'demo',
      });
      
      toast.success('Thank you! We\'ll be in touch soon.');
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTitle = () => {
    if (formType === 'consultation') return 'Book a Free Consultation';
    if (formType === 'ai-demo') return 'Request AI Demo';
    return 'Book a Demo';
  };

  const getDescription = () => {
    if (formType === 'consultation') return 'Let\'s discuss your IT staffing needs';
    if (formType === 'ai-demo') return 'Discover how AI can transform your business';
    return 'See how we can help your business grow';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]" data-testid="book-demo-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#0e1629]">
            {getTitle()}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {getDescription()}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name" className="text-[#0e1629]">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="mt-1"
              data-testid="demo-form-name"
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
              data-testid="demo-form-email"
            />
          </div>
          
          <div>
            <Label htmlFor="company" className="text-[#0e1629]">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="mt-1"
              data-testid="demo-form-company"
            />
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-[#0e1629]">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1"
              data-testid="demo-form-phone"
            />
          </div>
          
          <div>
            <Label htmlFor="message" className="text-[#0e1629]">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={4}
              className="mt-1"
              data-testid="demo-form-message"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              data-testid="demo-form-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#3c83f5] hover:bg-[#1a6ae8] text-white"
              data-testid="demo-form-submit"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};