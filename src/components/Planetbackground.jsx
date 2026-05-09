import React, { useEffect, useRef } from 'react';
import './Planetbackground.css';

const random = (min, max) => Math.random() * (max - min) + min;

const PlanetBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width, height;

    // ── 1. ASTEROID PARTICLES ─────────────────────────────
    // 120 tiny dust particles slowly drifting across the screen
    // like floating through an asteroid belt
    const particles = Array.from({ length: 120 }, () => ({
      x: random(0, 1),
      y: random(0, 1),
      size: random(0.5, 2.5),
      speedX: random(-0.00015, 0.00015),  // very slow horizontal drift
      speedY: random(-0.00008, 0.00008),  // very slow vertical drift
      opacity: random(0.2, 0.7),
      twinkle: random(0.002, 0.008),
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
    }));

    // ── 2. AURORA WAVES ───────────────────────────────────
    // 3 sine waves that slowly animate across the top portion
    // of the section like a northern lights effect
    const auroraWaves = [
      { offset: 0,    speed: 0.003, color: 'rgba(34, 197, 94,  ', amplitude: 0 },
      { offset: 2.1,  speed: 0.002, color: 'rgba(99,  66, 180, ', amplitude: 0 },
      { offset: 4.2,  speed: 0.004, color: 'rgba(56, 189, 248, ', amplitude: 0 },
    ];

    // ── 3. GALAXY SPIRAL ──────────────────────────────────
    // A slow rotating spiral watermark in the background
    // Made of many small dots arranged in a spiral pattern
    const spiralDots = Array.from({ length: 300 }, (_, i) => {
      const angle = i * 0.25;                    // spread dots around the spiral
      const radius = i * 0.6;                    // distance from center grows with i
      return {
        angle,
        radius,
        size: random(0.3, 1.2),
        opacity: Math.max(0.03, 0.15 - i * 0.0004), // fades toward edges
      };
    });
    let spiralRotation = 0;                       // incremented each frame

    const resize = () => {
      width  = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width  = width;
      canvas.height = height;

      // Aurora amplitude scales with canvas height
      auroraWaves[0].amplitude = height * 0.06;
      auroraWaves[1].amplitude = height * 0.08;
      auroraWaves[2].amplitude = height * 0.05;
    };

    // ── Draw sun glow ─────────────────────────────────────
    // A large warm radial gradient in the top-right corner
    // simulating the sun just out of frame
    const drawSunGlow = () => {
      const g = ctx.createRadialGradient(
        width * 0.92, height * 0.05, 0,
        width * 0.92, height * 0.05, width * 0.55
      );
      g.addColorStop(0,    'rgba(251, 191,  36, 0.18)');  // bright warm centre
      g.addColorStop(0.3,  'rgba(249, 115,  22, 0.10)');  // orange mid
      g.addColorStop(0.6,  'rgba(239,  68,  68, 0.05)');  // red fade
      g.addColorStop(1,    'rgba(0,     0,   0, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    };

    // ── Draw aurora ───────────────────────────────────────
    // Each wave is drawn as a filled sine curve using bezierCurveTo
    const drawAurora = () => {
      auroraWaves.forEach((wave) => {
        wave.offset += wave.speed;   // advance the wave each frame

        ctx.beginPath();
        ctx.moveTo(0, height * 0.3);

        // Draw a smooth wave across the full width
        // We step every 20px and calculate y using Math.sin
        for (let x = 0; x <= width; x += 20) {
          const y = height * 0.28 +
            Math.sin((x / width) * Math.PI * 3 + wave.offset) * wave.amplitude;
          ctx.lineTo(x, y);
        }

        // Close path down to top of canvas to create filled shape
        ctx.lineTo(width, 0);
        ctx.lineTo(0, 0);
        ctx.closePath();

        // Gradient fill: opaque at top, transparent at wave line
        const grad = ctx.createLinearGradient(0, 0, 0, height * 0.35);
        grad.addColorStop(0,   wave.color + '0.06)');
        grad.addColorStop(0.7, wave.color + '0.03)');
        grad.addColorStop(1,   wave.color + '0)');
        ctx.fillStyle = grad;
        ctx.fill();
      });
    };

    // ── Draw galaxy spiral ────────────────────────────────
    const drawGalaxySpiral = () => {
      spiralRotation += 0.0008;   // very slow rotation

      // Centre the spiral in bottom-left area
      const cx = width  * 0.15;
      const cy = height * 0.75;
      const scale = Math.min(width, height) * 0.0012;

      spiralDots.forEach((dot) => {
        const angle  = dot.angle + spiralRotation;
        const x = cx + Math.cos(angle) * dot.radius * scale;
        const y = cy + Math.sin(angle) * dot.radius * scale * 0.55; // squish to ellipse

        // Only draw if inside canvas
        if (x < 0 || x > width || y < 0 || y > height) return;

        ctx.beginPath();
        ctx.arc(x, y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 200, 255, ${dot.opacity})`;
        ctx.fill();
      });
    };

    // ── Draw asteroid particles ───────────────────────────
    const drawParticles = () => {
      particles.forEach((p) => {
        // Drift slowly
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around edges so particles never disappear
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;

        // Twinkle
        p.opacity += p.twinkle * p.twinkleDir;
        if (p.opacity >= 0.7) { p.opacity = 0.7; p.twinkleDir = -1; }
        if (p.opacity <= 0.1) { p.opacity = 0.1; p.twinkleDir =  1; }

        ctx.beginPath();
        ctx.arc(p.x * width, p.y * height, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 210, 255, ${p.opacity})`;
        ctx.fill();
      });
    };

    // ── Main animation loop ───────────────────────────────
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      drawSunGlow();       // Option 1 — sun glow top-right
      drawAurora();        // Option 2 — aurora waves top
      drawGalaxySpiral();  // Option 4 — spiral watermark bottom-left
      drawParticles();     // Option 3 — asteroid belt dust
      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="planet-bg-canvas"
      tabIndex={-1}
      aria-label="Decorative planet background animation"
    />
  );
};

export default PlanetBackground;