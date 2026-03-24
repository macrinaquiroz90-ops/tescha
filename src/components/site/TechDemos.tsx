"use client";

import { useEffect, useRef } from "react";

// ── Helper: rounded rectangle path ────────────────────────
function rRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  if (h < r * 2) r = h / 2;
  if (w < r * 2) r = w / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ── 1. Red Neuronal ───────────────────────────────────────
export function NeuralNetCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width;
    const H = canvas.height;

    const layerXF = [0.1, 0.36, 0.64, 0.88];
    const layerYF = [
      [0.28, 0.5, 0.72],
      [0.18, 0.38, 0.59, 0.8],
      [0.28, 0.5, 0.72],
      [0.36, 0.64],
    ];

    type NodeData = { x: number; y: number; phase: number };
    const nodes: NodeData[][] = layerYF.map((yl, li) =>
      yl.map((yf) => ({ x: layerXF[li] * W, y: yf * H, phase: Math.random() * Math.PI * 2 })),
    );

    type Edge = [number, number, number, number];
    const edges: Edge[] = [];
    type Pulse = { x1: number; y1: number; x2: number; y2: number; t: number; spd: number };
    const pulses: Pulse[] = [];

    for (let l = 0; l < nodes.length - 1; l++) {
      for (const a of nodes[l]) {
        for (const b of nodes[l + 1]) {
          edges.push([a.x, a.y, b.x, b.y]);
          if (Math.random() > 0.42) {
            pulses.push({
              x1: a.x, y1: a.y,
              x2: b.x, y2: b.y,
              t: Math.random(),
              spd: 0.003 + Math.random() * 0.005,
            });
          }
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (const [x1, y1, x2, y2] of edges) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "rgba(100, 160, 255, 0.18)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (const p of pulses) {
        p.t = (p.t + p.spd) % 1;
        const px = p.x1 + (p.x2 - p.x1) * p.t;
        const py = p.y1 + (p.y2 - p.y1) * p.t;
        const g = ctx.createRadialGradient(px, py, 0, px, py, 7);
        g.addColorStop(0, "rgba(47, 244, 216, 0.95)");
        g.addColorStop(1, "rgba(47, 244, 216, 0)");
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      for (const layer of nodes) {
        for (const n of layer) {
          n.phase += 0.038;
          const glow = (Math.sin(n.phase) + 1) * 0.5;
          const r = 9 + glow * 5;
          const gr = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r);
          gr.addColorStop(0, `rgba(130, 190, 255, ${0.22 + glow * 0.18})`);
          gr.addColorStop(1, "rgba(130, 190, 255, 0)");
          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.fillStyle = gr;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(n.x, n.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = "#c8e0ff";
          ctx.fill();
          ctx.strokeStyle = "rgba(100, 180, 255, 0.9)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

// ── 2. Lluvia de Código ───────────────────────────────────
export function MatrixRainCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let frame = 0;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width;
    const H = canvas.height;
    const colW = 14;
    const cols = Math.ceil(W / colW);
    const drops: number[] = Array.from(
      { length: cols },
      () => -Math.floor(Math.random() * (H / colW + 6)),
    );
    const chars = "01アイウカキABCXYZ{}[]()<>=!+-*#$@";

    const draw = () => {
      frame++;
      ctx.fillStyle = "rgba(0, 0, 0, 0.055)";
      ctx.fillRect(0, 0, W, H);

      if (frame % 2 === 0) {
        ctx.font = `bold 13px monospace`;
        for (let i = 0; i < cols; i++) {
          const top = drops[i] * colW;
          ctx.fillStyle = "#2ff4d8";
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * colW, top);
          if (top > 0 && Math.random() > 0.5) {
            ctx.fillStyle = "rgba(47, 200, 140, 0.55)";
            ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * colW, top - colW);
          }
          if (top > H && Math.random() > 0.975) drops[i] = 0;
          else drops[i]++;
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

// ── 3. Visualización de Algoritmos (Insertion Sort) ───────
export function SortBarsCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width;
    const H = canvas.height;
    const N = 16;
    const PAD = 12;

    // Build all insertion-sort steps ahead of time
    type Step = { arr: number[]; hi: number[]; done: number };
    const steps: Step[] = [];
    const src = Array.from({ length: N }, (_, i) => (i + 1) / N);
    // Deterministic shuffle
    for (let i = src.length - 1; i > 0; i--) {
      const j = (i * 7 + 3) % (i + 1);
      [src[i], src[j]] = [src[j], src[i]];
    }
    const work = [...src];
    for (let i = 1; i < N; i++) {
      let j = i;
      while (j > 0 && work[j - 1] > work[j]) {
        steps.push({ arr: [...work], hi: [j - 1, j], done: 0 });
        [work[j - 1], work[j]] = [work[j], work[j - 1]];
        j--;
      }
      steps.push({ arr: [...work], hi: [], done: i + 1 });
    }
    steps.push({ arr: [...work], hi: [], done: N });

    let si = 0;
    let fc = 0;
    const STEP_EVERY = 10; // frames between steps
    const barW = (W - PAD * 2) / N;

    const draw = () => {
      fc++;
      if (fc % STEP_EVERY === 0) {
        si = (si + 1) % steps.length;
        // Restart after sorting completes: pause a moment then reshuffle
        if (si === steps.length - 1) si = 0;
      }

      const s = steps[si];
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < N; i++) {
        const bh = s.arr[i] * (H - PAD * 2);
        const x = PAD + i * barW + 1;
        const y = H - PAD - bh;
        const w = barW - 2;

        let color: string;
        if (s.hi.includes(i)) color = "#ff7c28";
        else if (i < s.done) color = "#2ff4d8";
        else color = "rgba(120, 170, 255, 0.55)";

        rRect(ctx, x, y, w, bh, 3);
        ctx.fillStyle = color;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

// ── 4. Topología de Red ───────────────────────────────────
export function NetTopoCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width;
    const H = canvas.height;

    const nodeDefs = [
      { label: "Servidor", xf: 0.5,  yf: 0.14 },
      { label: "PC",       xf: 0.14, yf: 0.6  },
      { label: "Nube",     xf: 0.86, yf: 0.6  },
      { label: "Router",   xf: 0.5,  yf: 0.88 },
    ] as const;

    const edges: Array<[number, number]> = [[0, 1], [0, 2], [1, 3], [2, 3]];

    type Packet = { edge: [number, number]; t: number; spd: number; dir: 1 | -1 };
    const packets: Packet[] = edges.flatMap((e, i) => [
      { edge: e, t: (i * 0.25) % 1,        spd: 0.004 + i * 0.001,  dir:  1 },
      { edge: e, t: ((i + 2) * 0.25) % 1,  spd: 0.005 + i * 0.0009, dir: -1 },
    ]);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (const [a, b] of edges) {
        const na = nodeDefs[a], nb = nodeDefs[b];
        ctx.beginPath();
        ctx.moveTo(na.xf * W, na.yf * H);
        ctx.lineTo(nb.xf * W, nb.yf * H);
        ctx.strokeStyle = "rgba(100, 160, 255, 0.28)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      for (const p of packets) {
        p.t += p.spd * p.dir;
        if (p.t >= 1) { p.t = 1; p.dir = -1; }
        if (p.t <= 0) { p.t = 0; p.dir =  1; }
        const na = nodeDefs[p.edge[0]], nb = nodeDefs[p.edge[1]];
        const px = (na.xf + (nb.xf - na.xf) * p.t) * W;
        const py = (na.yf + (nb.yf - na.yf) * p.t) * H;
        const g = ctx.createRadialGradient(px, py, 0, px, py, 8);
        g.addColorStop(0, "rgba(47, 244, 216, 0.95)");
        g.addColorStop(1, "rgba(47, 244, 216, 0)");
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      for (const n of nodeDefs) {
        const nx = n.xf * W, ny = n.yf * H;

        const gr = ctx.createRadialGradient(nx, ny, 0, nx, ny, 22);
        gr.addColorStop(0, "rgba(100, 160, 255, 0.22)");
        gr.addColorStop(1, "rgba(100, 160, 255, 0)");
        ctx.beginPath();
        ctx.arc(nx, ny, 22, 0, Math.PI * 2);
        ctx.fillStyle = gr;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(nx, ny, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#4a8aff";
        ctx.fill();
        ctx.strokeStyle = "#c8e0ff";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "#c8dcff";
        ctx.font = "12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(n.label, nx, ny < H * 0.5 ? ny - 16 : ny + 24);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
