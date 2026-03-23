import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: 'JM DATA TALENT transformed our hiring process. We filled 10 critical positions in just 6 weeks, with candidates who were a perfect cultural and technical fit.',
    author: 'Sarah O\'Connor',
    position: 'CTO',
    company: 'TechCorp Ireland',
  },
  {
    quote: 'The offshore team they provided was exceptional. Seamless communication, high-quality work, and significant cost savings. Highly recommended.',
    author: 'Michael Chen',
    position: 'VP Engineering',
    company: 'FinTech Solutions',
  },
  {
    quote: 'Their AI chatbot solution reduced our support tickets by 75% and improved customer satisfaction scores dramatically. A game-changer for our business.',
    author: 'Emma Walsh',
    position: 'Head of Operations',
    company: 'Healthcare Plus',
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="section bg-white" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#3c83f5] font-medium">CLIENT TESTIMONIALS</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0e1629] mt-4 tracking-tight">
            Trusted by Leading
            <br />
            Organizations
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card-hover bg-[#f5f6f8] p-8 rounded-lg border border-gray-200"
              data-testid={`testimonial-card-${index}`}
            >
              <Quote size={40} color="#3c83f5" className="mb-6" />
              
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>
              
              <div className="pt-6 border-t border-gray-300">
                <p className="font-bold text-[#0e1629]">{testimonial.author}</p>
                <p className="text-sm text-gray-600">
                  {testimonial.position}, {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};