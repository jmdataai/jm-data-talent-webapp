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
    
    // Set canvas size
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Node types: talent (candidates) and companies
    class Node {
      constructor(type) {
        const centerX = canvas.offsetWidth / 2;
        const centerY = canvas.offsetHeight / 2;
        const angle = Math.random() * Math.PI * 2;
        const radius = type === 'talent' ? 120 + Math.random() * 100 : 80;
        
        this.x = centerX + Math.cos(angle) * radius;
        this.y = centerY + Math.sin(angle) * radius;
        this.targetX = this.x;
        this.targetY = this.y;
        this.type = type; // 'talent' or 'company'
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
      }
    }
    
    // Initialize nodes - more talent than companies (representing candidates)
    const companyNodes = [];
    for (let i = 0; i < 8; i++) {
      const node = new Node('company');
      nodes.push(node);
      companyNodes.push(node);
    }
    
    for (let i = 0; i < 60; i++) {
      nodes.push(new Node('talent'));
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
      
      // Draw central hub (representing JM DATA TALENT platform)
      const hubSize = 40 + Math.sin(pulsePhase) * 5;
      
      // Hub glow
      const hubGradient = ctx.createRadialGradient(centerX, centerY, hubSize * 0.3, centerX, centerY, hubSize * 2);
      hubGradient.addColorStop(0, 'rgba(60, 131, 245, 0.5)');
      hubGradient.addColorStop(1, 'rgba(60, 131, 245, 0)');
      ctx.fillStyle = hubGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, hubSize * 2, 0, Math.PI * 2);
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
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('JM', centerX, centerY);
      
      // Update and draw connections from talent to companies
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
              const opacity = 0.1 + (1 - distance / 120) * 0.2;
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
      ctx.fillStyle = 'rgba(14, 22, 41, 0.6)';
      ctx.font = '14px IBM Plex Sans';
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
