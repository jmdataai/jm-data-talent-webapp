import React from 'react';
import { Bot, Cpu, Workflow } from 'lucide-react';
import { Button } from './ui/button.jsx';

const aiProducts = [
  {
    icon: Bot,
    title: 'AI Chatbots',
    description: 'Intelligent conversational AI for customer service, IT helpdesk, and employee support.',
    features: ['24/7 Availability', 'Multi-language', 'Context-aware'],
    featured: true,
  },
  {
    icon: Cpu,
    title: 'AI Agents',
    description: 'Autonomous AI agents that handle complex tasks, data analysis, and decision-making.',
    features: ['Task automation', 'Smart routing', 'Analytics'],
    featured: false,
  },
  {
    icon: Workflow,
    title: 'Process Automation',
    description: 'End-to-end automation of business processes using AI and machine learning.',
    features: ['Workflow design', 'Integration', 'Optimization'],
    featured: false,
  },
];

export const AISection = ({ onBookDemo }) => {
  return (
    <section id="ai-solutions" className="section bg-white py-16" data-testid="ai-solutions-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header - smaller, less prominent */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[#3c83f5] font-medium">COMPLEMENTARY SERVICES</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0e1629] mt-3 tracking-tight">
            AI-Powered Solutions
          </h2>
          <p className="text-base text-gray-600 mt-3 leading-relaxed">
            Enhance operations with intelligent automation alongside our core recruitment services.
          </p>
        </div>

        {/* AI products - compact 3 column grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {aiProducts.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={product.title}
                className="card-hover p-6 rounded-lg border bg-[#f5f6f8] border-gray-200"
                data-testid={`ai-product-card-${index}`}
              >
                <div className="mb-4">
                  <div className="inline-flex p-3 rounded-lg bg-white">
                    <Icon size={24} color="#3c83f5" strokeWidth={1.5} />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-2 text-[#0e1629]">
                  {product.title}
                </h3>
                
                <p className="text-sm leading-relaxed mb-4 text-gray-600">
                  {product.description}
                </p>
                
                <Button
                  onClick={() => onBookDemo('ai-demo')}
                  variant="outline"
                  size="sm"
                  className="w-full border-[#3c83f5] text-[#3c83f5] hover:bg-[#3c83f5] hover:text-white"
                  data-testid={`ai-learn-more-btn-${index}`}
                >
                  Learn More
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};