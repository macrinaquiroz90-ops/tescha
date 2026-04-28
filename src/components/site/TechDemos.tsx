"use client";

import { useEffect, useRef } from "react";

type SceneDraw = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) => void;

const FONT = "\"Segoe UI\", \"Trebuchet MS\", sans-serif";
const MONO = "\"Cascadia Code\", \"JetBrains Mono\", monospace";

function useCanvasScene(drawScene: SceneDraw) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId = 0;
    let width = 1;
    let height = 1;
    let paused = false;
    let lastFrame = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const targetFrameTime = coarsePointer ? 1000 / 30 : 1000 / 45;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, coarsePointer ? 1.15 : 1.5);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (reduceMotion) {
        drawScene(ctx, width, height, performance.now() / 1000);
      }
    };

    const render = (ms: number) => {
      if (paused) {
        return;
      }

      if (ms - lastFrame < targetFrameTime) {
        frameId = window.requestAnimationFrame(render);
        return;
      }

      lastFrame = ms;
      drawScene(ctx, width, height, ms / 1000);
      if (!reduceMotion) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    resize();
    render(performance.now());
    window.addEventListener("resize", resize);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        paused = !entry.isIntersecting;
        if (!paused && !reduceMotion) {
          lastFrame = 0;
          frameId = window.requestAnimationFrame(render);
        }
        if (!paused && reduceMotion) {
          drawScene(ctx, width, height, performance.now() / 1000);
        }
      },
      { threshold: 0.05, rootMargin: "120px 0px" }
    );
    intersectionObserver.observe(canvas);

    return () => {
      window.removeEventListener("resize", resize);
      intersectionObserver.disconnect();
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [drawScene]);

  return ref;
}

function DemoCanvas({
  className,
  drawScene,
}: {
  className?: string;
  drawScene: SceneDraw;
}) {
  const ref = useCanvasScene(drawScene);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden="true"
    />
  );
}

function rRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function clearScene(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(5, 12, 24, 0.22)";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(100, 160, 255, 0.06)";
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function glowCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, "rgba(47, 244, 216, 0)");
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
}

function drawPanel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  color = "rgba(47, 244, 216, 0.55)",
) {
  rRect(ctx, x, y, w, h, 8);
  ctx.fillStyle = "rgba(8, 18, 34, 0.82)";
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
  rRect(ctx, x + 7, y + 7, w - 14, 17, 5);
  ctx.fill();

  ctx.fillStyle = "#dceaff";
  ctx.font = `700 ${Math.max(9, Math.min(12, h * 0.09))}px ${FONT}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x + 13, y + 15.5);
}

function drawArrow(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color = "rgba(100, 160, 255, 0.34)",
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 6;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - Math.cos(angle - 0.45) * size, y2 - Math.sin(angle - 0.45) * size);
  ctx.lineTo(x2 - Math.cos(angle + 0.45) * size, y2 - Math.sin(angle + 0.45) * size);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function drawPacket(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  progress: number,
  color: string,
  label?: string,
) {
  const px = x1 + (x2 - x1) * progress;
  const py = y1 + (y2 - y1) * progress;
  glowCircle(ctx, px, py, 10, color);

  ctx.beginPath();
  ctx.arc(px, py, 3.2, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  if (label) {
    ctx.font = `700 9px ${MONO}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillStyle = "#dceaff";
    ctx.fillText(label, px, py - 8);
  }
}

function drawInventoryScene(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  clearScene(ctx, width, height);
  const isCompact = width < 520;

  const pad = Math.max(10, width * 0.025);
  const panelY = height * 0.18;
  const panelH = height * 0.66;
  const appW = width * 0.28;
  const apiW = width * 0.22;
  const dbW = width * 0.23;
  const gap = Math.max(12, (width - pad * 2 - appW - apiW - dbW) / 2);
  const appX = pad;
  const apiX = appX + appW + gap;
  const dbX = apiX + apiW + gap;

  drawPanel(ctx, appX, panelY, appW, panelH, "React admin", "rgba(100, 160, 255, 0.58)");
  drawPanel(ctx, apiX, panelY + panelH * 0.12, apiW, panelH * 0.76, "Node API");
  drawPanel(ctx, dbX, panelY, dbW, panelH, "MySQL + reportes", "rgba(255, 168, 56, 0.58)");

  const rows = [
    { label: "Prod", color: "rgba(100, 160, 255, 0.68)" },
    { label: "User", color: "#2ff4d8" },
    { label: "Stock", color: "rgba(100, 160, 255, 0.68)" },
  ];
  ctx.font = `700 ${Math.max(8, height * 0.055)}px ${MONO}`;
  ctx.textAlign = "left";
  ctx.fillStyle = "#9dbdff";
  ctx.fillText("Inventario", appX + 12, panelY + 42);

  rows.forEach((row, i) => {
    const rowY = panelY + 54 + i * panelH * 0.18;
    const pulse = (Math.sin(time * 2 + i * 1.3) + 1) * 0.5;
    const labelY = rowY + 8;
    const trackY = rowY + 16;
    const trackHeight = 12;

    ctx.fillStyle = "#dceaff";
    ctx.font = `600 ${Math.max(7, height * 0.045)}px ${MONO}`;
    ctx.fillText(row.label, appX + 16, labelY);

    rRect(ctx, appX + 12, trackY, appW - 24, trackHeight, 4);
    ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
    ctx.fill();
    rRect(ctx, appX + 14, trackY + 2, (appW - 30) * (0.42 + pulse * 0.38), 8, 3);
    ctx.fillStyle = row.color;
    ctx.fill();
  });

  const apiLines = isCompact
    ? ["GET /prod", "POST /ent", "JWT"]
    : ["GET /productos", "POST /entrada", "JWT auth"];
  apiLines.forEach((line, i) => {
    const y = panelY + panelH * 0.31 + i * panelH * 0.18;
    rRect(ctx, apiX + 12, y, apiW - 24, 18, 5);
    ctx.fillStyle = i === 2 ? "rgba(255, 168, 56, 0.14)" : "rgba(47, 244, 216, 0.12)";
    ctx.fill();
    ctx.fillStyle = i === 2 ? "#ffa870" : "#bdf8ef";
    ctx.font = `700 ${Math.max(7, height * 0.047)}px ${MONO}`;
    ctx.textAlign = "center";
    ctx.fillText(line, apiX + apiW / 2, y + 9);
  });

  const dbCx = dbX + dbW * 0.5;
  const dbTop = panelY + panelH * 0.36;
  const dbHeight = panelH * 0.28;
  ctx.strokeStyle = "rgba(255, 168, 56, 0.68)";
  ctx.fillStyle = "rgba(255, 168, 56, 0.12)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.ellipse(dbCx, dbTop, dbW * 0.24, 11, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(dbCx - dbW * 0.24, dbTop);
  ctx.lineTo(dbCx - dbW * 0.24, dbTop + dbHeight);
  ctx.ellipse(dbCx, dbTop + dbHeight, dbW * 0.24, 11, 0, 0, Math.PI);
  ctx.lineTo(dbCx + dbW * 0.24, dbTop);
  ctx.stroke();
  ctx.fillStyle = "#ffd6aa";
  ctx.font = `700 ${Math.max(8, height * 0.05)}px ${MONO}`;
  ctx.textAlign = "center";
  ctx.fillText(isCompact ? "productos" : "productos", dbCx, dbTop + dbHeight * 0.55);

  const chartX = dbX + 14;
  const chartY = panelY + panelH * 0.72;
  ctx.strokeStyle = "rgba(47, 244, 216, 0.75)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const x = chartX + i * ((dbW - 28) / 4);
    const y = chartY + 18 - Math.sin(time * 1.4 + i) * 9 - i * 2;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.fillStyle = "#bdf8ef";
  ctx.font = `700 ${Math.max(7, height * 0.043)}px ${MONO}`;
  ctx.textAlign = "left";
  ctx.fillText("reporte", chartX, chartY + 31);

  const yReq = panelY + panelH * 0.46;
  const yRes = panelY + panelH * 0.62;
  drawArrow(ctx, appX + appW, yReq, apiX, yReq);
  drawArrow(ctx, apiX, yRes, appX + appW, yRes, "rgba(47, 244, 216, 0.34)");
  drawArrow(ctx, apiX + apiW, yReq, dbX, yReq, "rgba(255, 168, 56, 0.36)");
  drawArrow(ctx, dbX, yRes, apiX + apiW, yRes, "rgba(47, 244, 216, 0.34)");

  drawPacket(ctx, appX + appW, yReq, apiX, yReq, (time * 0.38) % 1, "rgba(100, 160, 255, 0.98)", "GET");
  drawPacket(ctx, apiX + apiW, yReq, dbX, yReq, (time * 0.42 + 0.25) % 1, "rgba(255, 168, 56, 0.95)", "SQL");
  drawPacket(ctx, dbX, yRes, apiX + apiW, yRes, (time * 0.42 + 0.5) % 1, "rgba(47, 244, 216, 0.95)", "rows");
  drawPacket(ctx, apiX, yRes, appX + appW, yRes, (time * 0.38 + 0.75) % 1, "rgba(47, 244, 216, 0.95)", "JSON");
}

function drawJwtScene(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
  clearScene(ctx, width, height);
  const isCompact = width < 520;

  const pad = Math.max(12, width * 0.03);
  const cardY = height * 0.29;
  const cardH = height * 0.42;
  const cardW = width * 0.2;
  const authW = width * 0.23;
  const routeW = width * 0.23;
  const routeH = cardH + height * 0.08;
  const clientX = pad;
  const authX = width * 0.38;
  const routeX = width - pad - routeW;

  drawPanel(ctx, clientX, cardY, cardW, cardH, "Cliente", "rgba(100, 160, 255, 0.6)");
  drawPanel(ctx, authX, cardY - height * 0.05, authW, cardH + height * 0.1, "Auth API");
  drawPanel(ctx, routeX, cardY - height * 0.04, routeW, routeH, "Ruta protegida");

  ctx.textAlign = "center";
  ctx.font = `700 ${Math.max(8, height * 0.052)}px ${MONO}`;
  ctx.fillStyle = "#9dbdff";
  ctx.fillText(isCompact ? "/login" : "POST /login", clientX + cardW / 2, cardY + cardH * 0.52);
  const verifyX = routeX + routeW / 2;
  const routeTop = cardY - height * 0.04;
  const verifyY = routeTop + routeH * 0.46;
  const verifyPlateW = Math.min(routeW * 0.56, 104);
  const verifyPlateH = 28;
  rRect(ctx, verifyX - verifyPlateW / 2, verifyY - verifyPlateH / 2, verifyPlateW, verifyPlateH, 8);
  ctx.fillStyle = "rgba(7, 18, 31, 0.92)";
  ctx.fill();
  ctx.strokeStyle = "rgba(47, 244, 216, 0.24)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = "#bdf8ef";
  ctx.fillText(isCompact ? "verify()" : "jwt.verify()", verifyX, verifyY + 3);

  const jwtX = authX + authW / 2;
  const jwtY = cardY + cardH * 0.6;
  const tokenW = Math.min(authW * 0.82, 128);
  const tokenH = 20;
  const pulse = (Math.sin(time * 3) + 1) * 0.5;
  rRect(ctx, jwtX - tokenW / 2, jwtY - tokenH / 2, tokenW, tokenH, 6);
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.fill();
  const parts = [
    ["header", "#9dbdff"],
    ["payload", "#2ff4d8"],
    ["firma", "#ffa870"],
  ] as const;
  parts.forEach(([label, color], i) => {
    const partW = tokenW / 3 - 3;
    const x = jwtX - tokenW / 2 + 2 + i * (tokenW / 3);
    rRect(ctx, x, jwtY - tokenH / 2 + 3, partW, tokenH - 6, 4);
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.45 + pulse * 0.25;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#07121f";
    ctx.font = `700 ${Math.max(6, height * 0.034)}px ${MONO}`;
    ctx.fillText(label, x + partW / 2, jwtY + 1);
  });

  const lockX = routeX + routeW / 2;
  const lockY = routeTop + routeH * 0.8;
  const unlock = (Math.sin(time * 2.2) + 1) * 0.5;
  ctx.strokeStyle = "#2ff4d8";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(lockX, lockY - 11 - unlock * 4, 10, Math.PI * 1.05, Math.PI * 1.95);
  ctx.stroke();
  rRect(ctx, lockX - 14, lockY - 11, 28, 22, 5);
  ctx.fillStyle = "rgba(47, 244, 216, 0.18)";
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#2ff4d8";
  ctx.font = `700 ${Math.max(10, height * 0.06)}px ${FONT}`;
  ctx.fillText("OK", lockX, lockY + 5);

  const startY = cardY + cardH * 0.34;
  const tokenY = cardY + cardH * 0.62;
  const returnY = cardY + cardH * 0.86;
  drawArrow(ctx, clientX + cardW, startY, authX, startY, "rgba(100, 160, 255, 0.36)");
  drawArrow(ctx, authX + authW, tokenY, routeX, tokenY, "rgba(47, 244, 216, 0.36)");
  drawArrow(ctx, routeX, returnY, clientX + cardW, returnY, "rgba(255, 168, 56, 0.25)");

  drawPacket(ctx, clientX + cardW, startY, authX, startY, (time * 0.42) % 1, "rgba(100, 160, 255, 0.98)", "login");
  drawPacket(ctx, authX + authW, tokenY, routeX, tokenY, (time * 0.46 + 0.35) % 1, "rgba(47, 244, 216, 0.98)", "Bearer");
  drawPacket(ctx, routeX, returnY, clientX + cardW, returnY, (time * 0.34 + 0.65) % 1, "rgba(255, 168, 56, 0.88)", "200");

  ctx.textAlign = "left";
  ctx.font = `700 ${Math.max(8, height * 0.05)}px ${MONO}`;
  ctx.fillStyle = "rgba(220, 234, 255, 0.92)";
  ctx.textAlign = "center";
  ctx.fillText(isCompact ? "Docker" : "Docker", authX + authW / 2, cardY + cardH + height * 0.12);
  ctx.textAlign = "center";
  ctx.fillText(isCompact ? "Swagger" : "Swagger", routeX + routeW / 2, cardY + cardH + height * 0.12);
}

function drawEnvelope(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
) {
  rRect(ctx, x - w / 2, y - h / 2, w, h, 5);
  ctx.fillStyle = "rgba(255, 255, 255, 0.09)";
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.3;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x - w / 2 + 4, y - h / 2 + 5);
  ctx.lineTo(x, y + 1);
  ctx.lineTo(x + w / 2 - 4, y - h / 2 + 5);
  ctx.stroke();
}

function pointOnPolyline(points: ReadonlyArray<readonly [number, number]>, progress: number) {
  const lengths = points.slice(1).map(([x, y], i) => {
    const [px, py] = points[i];
    return Math.hypot(x - px, y - py);
  });
  const total = lengths.reduce((sum, length) => sum + length, 0);
  let traveled = progress * total;

  for (let i = 0; i < lengths.length; i++) {
    if (traveled <= lengths[i]) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[i + 1];
      const local = lengths[i] === 0 ? 0 : traveled / lengths[i];
      return [x1 + (x2 - x1) * local, y1 + (y2 - y1) * local] as const;
    }
    traveled -= lengths[i];
  }

  return points[points.length - 1] as readonly [number, number];
}

function drawSpamScene(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
  clearScene(ctx, width, height);
  const isCompact = width < 520;

  const inputX = width * 0.13;
  const vectorX = width * 0.36;
  const modelX = width * 0.56;
  const outputX = width * 0.82;
  const centerY = height * 0.54;
  const spamY = height * 0.34;
  const okY = height * 0.72;
  const cycle = Math.floor(time / 3) % 4;
  const examples = [
    { spam: true, words: ["gratis", "oferta", "click"], score: 0.93 },
    { spam: false, words: ["clase", "tarea", "proyecto"], score: 0.12 },
    { spam: true, words: ["premio", "urgente", "gana"], score: 0.87 },
    { spam: false, words: ["reunion", "reporte", "equipo"], score: 0.18 },
  ];
  const active = examples[cycle];
  const local = (time % 3) / 3;
  const route = [
    [inputX, centerY],
    [vectorX, centerY],
    [modelX, centerY],
    [outputX, active.spam ? spamY : okY],
  ] satisfies Array<[number, number]>;
  const [mailX, mailY] = pointOnPolyline(route, local);

  drawPanel(ctx, inputX - width * 0.09, centerY - height * 0.22, width * 0.18, height * 0.32, "Correos", "rgba(100, 160, 255, 0.56)");
  drawPanel(ctx, vectorX - width * 0.09, centerY - height * 0.25, width * 0.18, height * 0.38, "Vectorizador");
  drawPanel(ctx, modelX - width * 0.09, centerY - height * 0.25, width * 0.18, height * 0.38, "Naive Bayes", "rgba(255, 168, 56, 0.6)");

  rRect(ctx, outputX - width * 0.09, spamY - height * 0.12, width * 0.18, height * 0.2, 8);
  ctx.fillStyle = "rgba(255, 124, 40, 0.14)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 124, 40, 0.75)";
  ctx.stroke();
  rRect(ctx, outputX - width * 0.09, okY - height * 0.12, width * 0.18, height * 0.2, 8);
  ctx.fillStyle = "rgba(47, 244, 216, 0.12)";
  ctx.fill();
  ctx.strokeStyle = "rgba(47, 244, 216, 0.7)";
  ctx.stroke();

  ctx.font = `800 ${Math.max(9, height * 0.06)}px ${MONO}`;
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffa870";
  ctx.fillText("SPAM", outputX, spamY);
  ctx.fillStyle = "#bdf8ef";
  ctx.fillText(isCompact ? "OK" : "NO SPAM", outputX, okY);

  route.slice(1).forEach(([x, y], i) => {
    const [px, py] = route[i];
    drawArrow(ctx, px + (i === 0 ? width * 0.09 : width * 0.08), py, x - width * 0.08, y);
  });

  for (let i = 0; i < 4; i++) {
    const y = centerY - height * 0.08 + i * height * 0.055;
    drawEnvelope(ctx, inputX - 14 + i * 7, y, 28, 18, i % 2 ? "#2ff4d8" : "#9dbdff");
  }

  active.words.forEach((word, i) => {
    const x = vectorX - width * 0.07 + i * width * 0.07;
    const y = centerY - height * 0.08 + (i % 2) * height * 0.09;
    rRect(ctx, x - 25, y - 9, 50, 18, 6);
    ctx.fillStyle = active.spam ? "rgba(255, 124, 40, 0.16)" : "rgba(47, 244, 216, 0.12)";
    ctx.fill();
    ctx.fillStyle = active.spam ? "#ffa870" : "#bdf8ef";
    ctx.font = `700 ${Math.max(7, height * 0.043)}px ${MONO}`;
    ctx.fillText(word, x, y + 1);
  });

  for (let i = 0; i < 12; i++) {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const value = (Math.sin(time * 1.8 + i) + 1) * 0.5;
    rRect(
      ctx,
      vectorX - width * 0.055 + col * width * 0.035,
      centerY + height * 0.06 + row * height * 0.035,
      width * 0.022,
      height * 0.022,
      3,
    );
    ctx.fillStyle = `rgba(47, 244, 216, ${0.18 + value * 0.52})`;
    ctx.fill();
  }

  glowCircle(ctx, modelX, centerY + height * 0.02, height * 0.17, "rgba(255, 168, 56, 0.2)");
  ctx.beginPath();
  ctx.arc(modelX, centerY + height * 0.02, height * 0.065, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 168, 56, 0.18)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 168, 56, 0.76)";
  ctx.stroke();
  ctx.fillStyle = "#ffd6aa";
  ctx.font = `800 ${Math.max(10, height * 0.07)}px ${MONO}`;
  ctx.fillText("NB", modelX, centerY + height * 0.035);

  drawEnvelope(ctx, mailX, mailY, 34, 22, active.spam ? "#ff7c28" : "#2ff4d8");
  glowCircle(ctx, mailX, mailY, 14, active.spam ? "rgba(255, 124, 40, 0.85)" : "rgba(47, 244, 216, 0.85)");

  const meterW = width * 0.3;
  const meterX = width * 0.35;
  const meterY = height * 0.88;
  rRect(ctx, meterX, meterY, meterW, 10, 5);
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  ctx.fill();
  rRect(ctx, meterX, meterY, meterW * active.score, 10, 5);
  ctx.fillStyle = active.spam ? "#ff7c28" : "#2ff4d8";
  ctx.fill();
  ctx.fillStyle = "#dceaff";
  ctx.font = `700 ${Math.max(7, height * 0.043)}px ${MONO}`;
  ctx.textAlign = "left";
  ctx.fillText(
    isCompact ? `${(active.score * 100).toFixed(0)}% spam` : `prob. spam ${(active.score * 100).toFixed(0)}%`,
    meterX,
    meterY - 7
  );
}

function drawDevice(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  label: string,
  type: "pc" | "switch" | "router" | "cloud" | "server",
  color: string,
  height: number,
) {
  glowCircle(ctx, x, y, height * 0.13, color);
  ctx.strokeStyle = color;
  ctx.fillStyle = "rgba(8, 18, 34, 0.86)";
  ctx.lineWidth = 1.7;

  if (type === "router") {
    ctx.beginPath();
    ctx.arc(x, y, height * 0.06, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - height * 0.035, y);
    ctx.lineTo(x + height * 0.035, y);
    ctx.moveTo(x, y - height * 0.035);
    ctx.lineTo(x, y + height * 0.035);
    ctx.stroke();
  } else if (type === "switch") {
    rRect(ctx, x - height * 0.09, y - height * 0.045, height * 0.18, height * 0.09, 4);
    ctx.fill();
    ctx.stroke();
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath();
      ctx.arc(x + i * height * 0.027, y, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  } else if (type === "cloud") {
    ctx.beginPath();
    ctx.arc(x - height * 0.035, y + height * 0.014, height * 0.043, Math.PI * 0.55, Math.PI * 1.55);
    ctx.arc(x, y - height * 0.018, height * 0.054, Math.PI, Math.PI * 1.9);
    ctx.arc(x + height * 0.046, y + height * 0.012, height * 0.045, Math.PI * 1.25, Math.PI * 0.45);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else {
    rRect(ctx, x - height * 0.055, y - height * 0.045, height * 0.11, height * 0.09, 5);
    ctx.fill();
    ctx.stroke();
    if (type === "server") {
      ctx.beginPath();
      ctx.moveTo(x - height * 0.036, y - height * 0.015);
      ctx.lineTo(x + height * 0.036, y - height * 0.015);
      ctx.moveTo(x - height * 0.036, y + height * 0.015);
      ctx.lineTo(x + height * 0.036, y + height * 0.015);
      ctx.stroke();
    }
  }

  ctx.fillStyle = "#dceaff";
  ctx.font = `700 ${Math.max(8, height * 0.052)}px ${FONT}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, y + height * 0.105);
}

function drawTopologyScene(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  clearScene(ctx, width, height);
  const isCompact = width < 520;

  const pcA = [width * 0.11, height * 0.32] as const;
  const pcB = [width * 0.11, height * 0.68] as const;
  const sw = [width * 0.3, height * 0.5] as const;
  const router = [width * 0.5, height * 0.5] as const;
  const server = [width * 0.5, height * 0.2] as const;
  const wan = [width * 0.7, height * 0.5] as const;
  const cloud = [width * 0.88, height * 0.5] as const;

  const links = [
    [pcA, sw],
    [pcB, sw],
    [sw, router],
    [router, server],
    [router, wan],
    [wan, cloud],
  ] as const;

  links.forEach(([[x1, y1], [x2, y2]], i) => {
    ctx.strokeStyle = i < 2 ? "rgba(255, 130, 185, 0.34)" : "rgba(100, 160, 255, 0.32)";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });

  const traffic = [
    { path: [pcA, sw, router, server], color: "rgba(255, 130, 185, 0.9)", label: "VLAN10", speed: 0.22, off: 0 },
    { path: [pcB, sw, router, wan, cloud], color: "rgba(47, 244, 216, 0.95)", label: "OSPF", speed: 0.18, off: 0.32 },
    { path: [cloud, wan, router, sw, pcB], color: "rgba(100, 160, 255, 0.95)", label: "ACL", speed: 0.16, off: 0.68 },
  ];

  traffic.forEach(({ path, color, label, speed, off }) => {
    const [x, y] = pointOnPolyline(path, (time * speed + off) % 1);
    glowCircle(ctx, x, y, 10, color);
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.fillStyle = "#dceaff";
    ctx.font = `700 ${Math.max(7, height * 0.042)}px ${MONO}`;
    ctx.textAlign = "center";
    ctx.fillText(label, x, y - 11);
  });

  drawDevice(ctx, pcA[0], pcA[1], "PC A", "pc", "rgba(255, 130, 185, 0.82)", height);
  drawDevice(ctx, pcB[0], pcB[1], "PC B", "pc", "rgba(47, 244, 216, 0.82)", height);
  drawDevice(ctx, sw[0], sw[1], "Switch", "switch", "rgba(255, 130, 185, 0.82)", height);
  drawDevice(ctx, router[0], router[1], "Router", "router", "rgba(100, 160, 255, 0.95)", height);
  drawDevice(ctx, server[0], server[1], "Servidor", "server", "rgba(47, 244, 216, 0.88)", height);
  drawDevice(ctx, wan[0], wan[1], "WAN", "router", "rgba(100, 160, 255, 0.95)", height);
  drawDevice(ctx, cloud[0], cloud[1], "Nube", "cloud", "rgba(100, 160, 255, 0.9)", height);

  ctx.font = `700 ${Math.max(8, height * 0.048)}px ${MONO}`;
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffb0d0";
  ctx.fillText("VLAN 10", pcA[0] - width * 0.045, pcA[1] - height * 0.12);
  ctx.fillStyle = "#bdf8ef";
  ctx.fillText("VLAN 20", pcB[0] - width * 0.045, pcB[1] - height * 0.12);

  rRect(ctx, width * 0.38, height * 0.82, width * 0.24, height * 0.11, 7);
  ctx.fillStyle = "rgba(100, 160, 255, 0.12)";
  ctx.fill();
  ctx.strokeStyle = "rgba(100, 160, 255, 0.42)";
  ctx.stroke();
  ctx.fillStyle = "#dceaff";
  ctx.font = `800 ${Math.max(8, height * 0.052)}px ${MONO}`;
  ctx.textAlign = "center";
  ctx.fillText(isCompact ? "OSPF" : "OSPF area 0", width * 0.5, height * 0.875);
}

// Kept export names so existing project cards do not need to change.
export function NeuralNetCanvas({ className }: { className?: string }) {
  return <DemoCanvas className={className} drawScene={drawInventoryScene} />;
}

export function MatrixRainCanvas({ className }: { className?: string }) {
  return <DemoCanvas className={className} drawScene={drawJwtScene} />;
}

export function SortBarsCanvas({ className }: { className?: string }) {
  return <DemoCanvas className={className} drawScene={drawSpamScene} />;
}

export function NetTopoCanvas({ className }: { className?: string }) {
  return <DemoCanvas className={className} drawScene={drawTopologyScene} />;
}
