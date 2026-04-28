"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroCanvas.module.css";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
};

const DARK_COLORS = ["#2ff4d8", "#7c6bff", "#ff7c28", "#3dd9c4"];
const LIGHT_COLORS = ["#005580", "#2d5fa0", "#006655", "#7c3f00"];

function getTheme() {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let paused = false;
    const particles: Particle[] = [];
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCompact = window.innerWidth < 720;
    const COUNT = prefersReducedMotion ? 12 : isCompact ? 18 : 28;
    const CONNECTION_DIST = isCompact ? 72 : 96;
    const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);

    const getColors = () =>
      getTheme() === "light" ? LIGHT_COLORS : DARK_COLORS;

    const resize = () => {
      canvas.width = canvas.offsetWidth * pixelRatio;
      canvas.height = canvas.offsetHeight * pixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(pixelRatio, pixelRatio);
    };

    const spawn = (): Particle => {
      const colors = getColors();
      return {
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.55 + 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    resize();
    for (let i = 0; i < COUNT; i++) particles.push(spawn());
    window.addEventListener("resize", resize);

    // Re-tint particles when theme switches
    const observer = new MutationObserver(() => {
      const colors = getColors();
      for (const p of particles) {
        p.color = colors[Math.floor(Math.random() * colors.length)];
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const isLight = () => getTheme() === "light";

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }

      const lineAlphaMax = isLight() ? 0.28 : 0.18;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECTION_DIST_SQ) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = (1 - dist / CONNECTION_DIST) * lineAlphaMax;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      if (!paused) raf = requestAnimationFrame(draw);
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        paused = !entry.isIntersecting;
        if (!paused) raf = requestAnimationFrame(draw);
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      intersectionObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
