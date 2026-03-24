import React, { useEffect, useRef } from 'react';

export const Hero3D = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let nodes = [];
    let connections = [];
    
    // Tech labels for nodes
    const techLabels = [
      'SAP', 'AI/ML', 'React', 'Python', 'Cloud', 'DevOps',
      'Java', 'Data', '.NET', 'AWS', 'Azure', 'Salesforce',
      'Node.js', 'Angular', 'Vue', 'Docker', 'K8s', 'MongoDB',
      'PostgreSQL', 'Microservices', 'Agile', 'CI/CD', 'Security', 'Blockchain'
    ];
    
    const companyNames = [
      'FinTech', 'Pharma', 'Tech Co', 'Healthcare',
      'Banking', 'E-commerce', 'Insurance', 'Retail'
    ];
    
    // Set canvas size
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Node types: talent (with tech labels) and companies
    class Node {
      constructor(type, label) {
        const centerX = canvas.offsetWidth / 2;
        const centerY = canvas.offsetHeight / 2;
        const angle = Math.random() * Math.PI * 2;
        const radius = type === 'talent' ? 120 + Math.random() * 100 : 80;
        
        this.x = centerX + Math.cos(angle) * radius;
        this.y = centerY + Math.sin(angle) * radius;
        this.targetX = this.x;
        this.targetY = this.y;
        this.type = type;
        this.label = label;
        this.size = type === 'talent' ? 6 : 12;
        this.color = type === 'talent' ? '#3c83f5' : '#0e1629';
        this.opacity = 1;
        this.angle = angle;
        this.radius = radius;
        this.speed = 0.0005 + Math.random() * 0.001;
      }
      
      update(time) {
        // Orbit around center
        this.angle += this.speed;
        const centerX = canvas.offsetWidth / 2;
        const centerY = canvas.offsetHeight / 2;
        this.targetX = centerX + Math.cos(this.angle) * this.radius;
        this.targetY = centerY + Math.sin(this.angle) * this.radius;
        
        // Smooth movement
        this.x += (this.targetX - this.x) * 0.05;
        this.y += (this.targetY - this.y) * 0.05;
      }
      
      draw() {
        // Draw node with glow for companies
        if (this.type === 'company') {
          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
          gradient.addColorStop(0, 'rgba(60, 131, 245, 0.4)');
          gradient.addColorStop(1, 'rgba(60, 131, 245, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw ring around companies
        if (this.type === 'company') {
          ctx.strokeStyle = '#3c83f5';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size + 4, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        // Draw labels
        if (this.label) {
          ctx.save();
          ctx.font = this.type === 'company' ? 'bold 11px Inter' : '9px Inter';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          if (this.type === 'company') {
            // Company labels - below the node with background
            const textY = this.y + this.size + 18;
            const metrics = ctx.measureText(this.label);
            const padding = 6;
            
            // Background
            ctx.fillStyle = 'rgba(14, 22, 41, 0.9)';
            ctx.fillRect(
              this.x - metrics.width / 2 - padding,
              textY - 7,
              metrics.width + padding * 2,
              14
            );
            
            // Text
            ctx.fillStyle = '#ffffff';
            ctx.fillText(this.label, this.x, textY);
          } else {
            // Tech labels - next to the node with subtle background
            const textX = this.x + this.size + 12;
            const metrics = ctx.measureText(this.label);
            const padding = 4;
            
            // Background
            ctx.fillStyle = 'rgba(60, 131, 245, 0.15)';
            ctx.fillRect(
              textX - padding,
              this.y - 6,
              metrics.width + padding * 2,
              12
            );
            
            // Text
            ctx.fillStyle = '#3c83f5';
            ctx.fillText(this.label, textX + metrics.width / 2, this.y);
          }
          ctx.restore();
        }
      }
    }
    
    // Initialize nodes - companies with names
    const companyNodes = [];
    for (let i = 0; i < 8; i++) {
      const node = new Node('company', companyNames[i]);
      nodes.push(node);
      companyNodes.push(node);
    }
    
    // Talent nodes with tech labels - only show some labels to avoid clutter
    for (let i = 0; i < 24; i++) {
      const showLabel = i < 18; // Show labels for first 18 nodes only
      const label = showLabel ? techLabels[i % techLabels.length] : null;
      nodes.push(new Node('talent', label));
    }
    
    let time = 0;
    let pulsePhase = 0;
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      time += 0.01;
      pulsePhase += 0.02;
      
      const centerX = canvas.offsetWidth / 2;
      const centerY = canvas.offsetHeight / 2;
      
      // Draw central hub (JM DATA TALENT platform)
      const hubSize = 45 + Math.sin(pulsePhase) * 5;
      
      // Hub glow
      const hubGradient = ctx.createRadialGradient(centerX, centerY, hubSize * 0.3, centerX, centerY, hubSize * 2.5);
      hubGradient.addColorStop(0, 'rgba(60, 131, 245, 0.6)');
      hubGradient.addColorStop(1, 'rgba(60, 131, 245, 0)');
      ctx.fillStyle = hubGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, hubSize * 2.5, 0, Math.PI * 2);
      ctx.fill();
      
      // Hub core
      const coreGradient = ctx.createRadialGradient(
        centerX - hubSize * 0.3,
        centerY - hubSize * 0.3,
        hubSize * 0.1,
        centerX,
        centerY,
        hubSize
      );
      coreGradient.addColorStop(0, '#3c83f5');
      coreGradient.addColorStop(1, '#1a6ae8');
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, hubSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Hub text "JM"
      ctx.fillStyle = 'white';
      ctx.font = 'bold 24px Manrope';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('JM', centerX, centerY);
      
      // Update and draw connections from hub to companies
      ctx.strokeStyle = 'rgba(60, 131, 245, 0.15)';
      ctx.lineWidth = 1;
      
      nodes.forEach((node, i) => {
        node.update(time);
        
        // Draw connections from hub to companies
        if (node.type === 'company') {
          const distance = Math.sqrt(Math.pow(node.x - centerX, 2) + Math.pow(node.y - centerY, 2));
          const opacity = 0.3 + Math.sin(pulsePhase + i) * 0.1;
          ctx.strokeStyle = `rgba(60, 131, 245, ${opacity})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(node.x, node.y);
          ctx.stroke();
        }
        
        // Connect some talent nodes to nearby companies
        if (node.type === 'talent') {
          companyNodes.forEach((company, j) => {
            const dx = node.x - company.x;
            const dy = node.y - company.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120 && Math.random() > 0.95) {
              const opacity = 0.08 + (1 - distance / 120) * 0.12;
              ctx.strokeStyle = `rgba(60, 131, 245, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(company.x, company.y);
              ctx.stroke();
            }
          });
        }
      });
      
      // Draw all nodes
      nodes.forEach(node => node.draw());
      
      // Draw label
      ctx.fillStyle = 'rgba(14, 22, 41, 0.7)';
      ctx.font = '14px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('Connecting Talent with Opportunity', centerX, canvas.offsetHeight - 30);
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div className="w-full h-full flex items-center justify-center" data-testid="hero-3d-canvas">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
    </div>
  );
};
