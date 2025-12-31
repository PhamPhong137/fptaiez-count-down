import React, { useEffect, useRef } from 'react';

const COLORS = [
  '#ff0000', '#ffd700', '#ffffff', '#00ff00', '#00ffff', '#ff00ff',
  '#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#aa96da',
];

class Particle {
  x: number;
  y: number;
  color: string;
  velocity: { x: number; y: number };
  alpha: number;
  friction: number;
  gravity: number;
  size: number;
  trail: { x: number; y: number }[];

  constructor(x: number, y: number, color: string, isRocket = false) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.trail = [];
    
    if (isRocket) {
      this.velocity = { x: (Math.random() - 0.5) * 3, y: -(Math.random() * 4 + 8) };
      this.size = 3;
      this.gravity = 0.1;
      this.friction = 0.99;
    } else {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      this.velocity = { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed };
      this.size = Math.random() * 2 + 1;
      this.gravity = 0.05;
      this.friction = 0.95;
    }
    
    this.alpha = 1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    
    // Draw trail
    if (this.trail.length > 1) {
      ctx.beginPath();
      ctx.moveTo(this.trail[0].x, this.trail[0].y);
      for (let i = 1; i < this.trail.length; i++) {
        ctx.lineTo(this.trail[i].x, this.trail[i].y);
      }
      ctx.strokeStyle = this.color;
      ctx.globalAlpha = this.alpha * 0.3;
      ctx.lineWidth = this.size * 0.5;
      ctx.stroke();
    }
    
    // Draw particle with glow
    ctx.globalAlpha = this.alpha;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    
    ctx.restore();
  }

  update() {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 5) this.trail.shift();
    
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.velocity.y += this.gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.008;
  }
}

const Fireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasEl = canvas;
    const context = ctx;
    let particles: Particle[] = [];
    let rockets: Particle[] = [];

    const resize = () => {
      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const createExplosion = (x: number, y: number) => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const particleCount = Math.floor(Math.random() * 30) + 50;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, color));
      }
      
      // Add some sparkles with different color
      const sparkleColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      for (let i = 0; i < 20; i++) {
        particles.push(new Particle(x, y, sparkleColor));
      }
    };

    const launchRocket = () => {
      const x = Math.random() * canvasEl.width * 0.8 + canvasEl.width * 0.1;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      rockets.push(new Particle(x, canvasEl.height, color, true));
    };

    let animationId: number;
    let lastLaunch = 0;
    
    const animate = (timestamp: number) => {
      context.fillStyle = 'rgba(0, 0, 0, 0.15)';
      context.fillRect(0, 0, canvasEl.width, canvasEl.height);

      // Launch rockets periodically
      if (timestamp - lastLaunch > 300 + Math.random() * 500) {
        launchRocket();
        if (Math.random() > 0.5) launchRocket(); // Sometimes launch 2
        lastLaunch = timestamp;
      }

      // Update and draw rockets
      rockets.forEach((rocket, i) => {
        rocket.update();
        rocket.draw(context);
        
        // Explode when velocity slows
        if (rocket.velocity.y >= -2) {
          createExplosion(rocket.x, rocket.y);
          rockets.splice(i, 1);
        }
      });

      // Update and draw particles
      particles = particles.filter(p => p.alpha > 0);
      particles.forEach(p => {
        p.update();
        p.draw(context);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />;
};

export default Fireworks;
