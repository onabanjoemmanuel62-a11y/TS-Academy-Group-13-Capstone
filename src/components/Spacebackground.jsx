import React, { useEffect, useRef } from 'react';
import './Spacebackground.css';

// ─── Helpers ───────────────────
const random = (min, max) => Math.random() * (max - min) + min;

// ─── Component ───────────────
const SpaceBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width, height;

    // ── 1. STARS ───────────────
    const stars = Array.from({ length: 180 }, () => ({
      x: random(0, 1),           
      y: random(0, 1),
      radius: random(0.4, 1.8),
      opacity: random(0.3, 1),
      twinkleSpeed: random(0.003, 0.012),
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
    }));

    // ── 2. SHOOTING STARS ────────────.
    const shootingStars = Array.from({ length: 5 }, () => ({
      active: false,
      x: 0, y: 0,
      vx: 0, vy: 0,
      length: 0,
      opacity: 0,
      timer: random(0, 300),   
    }));

    const resetShootingStar = (s) => {
      
        
      s.x = random(0.05, 0.6);
      s.y = random(0, 0.4);
      const angle = random(20, 45) * (Math.PI / 180); 
      const speed = random(8, 16);
      s.vx = Math.cos(angle) * speed;
      s.vy = Math.sin(angle) * speed;
      s.length = random(80, 180);
      s.opacity = 1;
      s.active = true;
      s.timer = random(180, 420); 
    };

    // ── 3. ORBITING PLANET ──────────────────
    const orbit = {
      angle: 0,
      speed: 0.004,             
      radiusX: 0,               
      radiusY: 0,
      centerX: 0,
      centerY: 0,
      planetSize: 0,
    };

    // ── Resize handler ────────────────────
    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;

      orbit.centerX = width * 0.88;
      orbit.centerY = height * 0.75;
      orbit.radiusX = width * 0.07;
      orbit.radiusY = height * 0.06;
      orbit.planetSize = Math.min(width, height) * 0.022;
    };

    // ── Draw nebula ──────────────────
    
    const drawNebula = () => {

      
      const g1 = ctx.createRadialGradient(
        width * 0.25, height * 0.5, 0,
        width * 0.25, height * 0.5, width * 0.45
      );
      g1.addColorStop(0,   'rgba(99,  66, 180, 0.13)');
      g1.addColorStop(0.5, 'rgba(60,  30, 120, 0.07)');
      g1.addColorStop(1,   'rgba(0,    0,   0, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      // Cyan nebula — right-center
      const g2 = ctx.createRadialGradient(
        width * 0.78, height * 0.35, 0,
        width * 0.78, height * 0.35, width * 0.38
      );
      g2.addColorStop(0,   'rgba(14, 165, 233, 0.10)');
      g2.addColorStop(0.5, 'rgba( 8,  80, 130, 0.05)');
      g2.addColorStop(1,   'rgba(0,    0,   0, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);
    };

    // ── Draw stars ────────────────
    const drawStars = () => {
      stars.forEach((star) => {
        // Twinkle: oscillate opacity up and down
        star.opacity += star.twinkleSpeed * star.twinkleDir;
        if (star.opacity >= 1)   { star.opacity = 1;   star.twinkleDir = -1; }
        if (star.opacity <= 0.1) { star.opacity = 0.1; star.twinkleDir =  1; }

        ctx.beginPath();
        
        ctx.arc(star.x * width, star.y * height, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
    };

    // ── Draw shooting stars ────────────────
    const drawShootingStars = () => {
      shootingStars.forEach((s) => {
        if (!s.active) {

          // Count down the timer; fire when it hits zero
          s.timer--;
          if (s.timer <= 0) resetShootingStar(s);
          return;
        }

        // Move the shooting star forward
        s.x += s.vx / width;
        s.y += s.vy / height;
        s.opacity -= 0.018;  

        if (s.opacity <= 0 || s.x > 1 || s.y > 1) {

          // Off screen or fully faded — deactivate and schedule next
          s.active = false;
          s.timer = random(180, 480);
          return;
        }

        // Draw a line with a gradient: bright head, transparent tail
        const x = s.x * width;
        const y = s.y * height;
        const tailX = x - (s.vx / width)  * s.length;
        const tailY = y - (s.vy / height) * s.length;

        const grad = ctx.createLinearGradient(tailX, tailY, x, y);
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(1, `rgba(180,230,255,${s.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    };

    // ── Draw orbiting planet ─────────────────
    const drawOrbitingPlanet = () => {
      orbit.angle += orbit.speed;

      // Parametric ellipse: x = cx + rx*cos(θ), y = cy + ry*sin(θ)
      const px = orbit.centerX + orbit.radiusX * Math.cos(orbit.angle);
      const py = orbit.centerY + orbit.radiusY * Math.sin(orbit.angle);
      const r  = orbit.planetSize;

      // Draw faint elliptical orbit path
      ctx.beginPath();
      ctx.ellipse(
        orbit.centerX, orbit.centerY,
        orbit.radiusX, orbit.radiusY,
        0, 0, Math.PI * 2
      );
      ctx.strokeStyle = 'rgba(56,189,248,0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Planet glow (outer halo)
      const glow = ctx.createRadialGradient(px, py, 0, px, py, r * 3.5);
      glow.addColorStop(0,   'rgba(99,179,237,0.35)');
      glow.addColorStop(0.5, 'rgba(56,189,248,0.10)');
      glow.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(px, py, r * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Planet body gradient
      const body = ctx.createRadialGradient(px - r*0.3, py - r*0.3, r*0.1, px, py, r);
      body.addColorStop(0,   '#a8d8f0');
      body.addColorStop(0.4, '#4a9aba');
      body.addColorStop(1,   '#1a3a5c');
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fillStyle = body;
      ctx.fill();

      // Planet ring
      ctx.beginPath();
      ctx.ellipse(px, py, r * 2.2, r * 0.55, -0.4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(180,220,255,0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    // ── Main animation loop ──────────────
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      drawNebula();
      drawStars();
      drawShootingStars();
      drawOrbitingPlanet();
      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    // Cleanup: when the component unmounts, it stops the animation
    // and remove the resize listener to avoid memory leaks
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="space-bg-canvas"
      tabIndex={-1}
      aria-label="Decorative space animation"
    />
  );
};                          

export default SpaceBackground;