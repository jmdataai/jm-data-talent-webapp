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
    <section id="ai-solutions" className="section bg-white" data-testid="ai-solutions-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#3c83f5] font-medium">AI SOLUTIONS</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0e1629] mt-4 tracking-tight">
            Intelligent Automation
            <br />
            for Modern Business
          </h2>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed">
            Enhance your operations with cutting-edge AI technology. From chatbots to autonomous agents.
          </p>
        </div>

        {/* AI products grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {aiProducts.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={product.title}
                className={`card-hover p-8 rounded-lg border-2 ${
                  product.featured
                    ? 'bg-gradient-to-br from-[#3c83f5] to-[#1a6ae8] text-white border-[#3c83f5]'
                    : 'bg-[#f5f6f8] text-[#0e1629] border-gray-200'
                }`}
                data-testid={`ai-product-card-${index}`}
              >
                <div className="mb-6">
                  <div
                    className={`inline-flex p-4 rounded-lg ${
                      product.featured ? 'bg-white/20' : 'bg-white'
                    }`}
                  >
                    <Icon
                      size={32}
                      color={product.featured ? '#ffffff' : '#3c83f5'}
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
                
                <h3
                  className={`text-2xl font-bold mb-3 ${
                    product.featured ? 'text-white' : 'text-[#0e1629]'
                  }`}
                >
                  {product.title}
                </h3>
                
                <p
                  className={`leading-relaxed mb-6 ${
                    product.featured ? 'text-white/90' : 'text-gray-600'
                  }`}
                >
                  {product.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          product.featured ? 'bg-white' : 'bg-[#3c83f5]'
                        }`}
                      ></div>
                      <span
                        className={`text-sm ${
                          product.featured ? 'text-white/90' : 'text-gray-600'
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => onBookDemo('ai-demo')}
                  className={`w-full ${
                    product.featured
                      ? 'bg-white text-[#3c83f5] hover:bg-gray-100'
                      : 'bg-[#3c83f5] text-white hover:bg-[#1a6ae8]'
                  }`}
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