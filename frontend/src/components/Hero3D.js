import React, { useEffect, useRef } from 'react';

export const Hero3D = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Set canvas size
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Create particles
    class Particle {
      constructor() {
        this.reset();
      }
      
      reset() {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 200 + 100;
        this.x = canvas.offsetWidth / 2 + Math.cos(angle) * radius;
        this.y = canvas.offsetHeight / 2 + Math.sin(angle) * radius;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Orbit around center
        const dx = this.x - canvas.offsetWidth / 2;
        const dy = this.y - canvas.offsetHeight / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 300 || distance < 50) {
          this.reset();
        }
      }
      
      draw() {
        ctx.fillStyle = `rgba(60, 131, 245, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Initialize particles
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }
    
    let rotation = 0;
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      rotation += 0.005;
      
      // Draw center sphere
      const centerX = canvas.offsetWidth / 2;
      const centerY = canvas.offsetHeight / 2;
      const radius = 80;
      
      // Outer glow
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.5, centerX, centerY, radius * 1.5);
      gradient.addColorStop(0, 'rgba(60, 131, 245, 0.3)');
      gradient.addColorStop(1, 'rgba(60, 131, 245, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();
      
      // Main sphere
      const sphereGradient = ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.3,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );
      sphereGradient.addColorStop(0, 'rgba(60, 131, 245, 1)');
      sphereGradient.addColorStop(1, 'rgba(26, 106, 232, 0.8)');
      ctx.fillStyle = sphereGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Rotating rings
      ctx.strokeStyle = 'rgba(14, 22, 41, 0.3)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation + i * (Math.PI / 3));
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * 1.5, radius * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Draw connections
      ctx.strokeStyle = 'rgba(60, 131, 245, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
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
