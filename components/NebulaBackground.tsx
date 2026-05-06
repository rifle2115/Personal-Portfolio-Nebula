"use client";

import { useEffect, useRef, useCallback } from "react";

// ─── Color Palette (Orion Nebula inspired — VIVID) ──────────────
const NC = {
  deepPink:   "rgba(220, 50, 130, ",
  hotPink:    "rgba(255, 80, 160, ",
  magenta:    "rgba(200, 60, 180, ",
  lavender:   "rgba(160, 110, 220, ",
  deepPurple: "rgba(100, 40, 160, ",
  cosmicBlue: "rgba(60, 110, 220, ",
  cyan:       "rgba(80, 200, 240, ",
  white:      "rgba(255, 255, 255, ",
  rosePink:   "rgba(240, 100, 140, ",
};

// ─── Interfaces ─────────────────────────────────────────────────
interface Star {
  x: number; y: number; size: number;
  baseOpacity: number; twinkleSpeed: number; twinkleOffset: number;
  color: string; hasCrossFlare: boolean;
}

interface DustParticle {
  x: number; y: number; baseX: number; baseY: number;
  size: number; opacity: number; color: string;
  vx: number; vy: number; speed: number; driftAngle: number;
}

interface NebulaCloud {
  x: number; y: number; radius: number; color: string;
  opacity: number; driftSpeed: number; phaseX: number; phaseY: number;
}

interface Wisp {
  x: number; y: number; width: number; height: number;
  angle: number; rotSpeed: number; color: string; opacity: number;
  phaseX: number; phaseY: number; driftSpeed: number;
}

interface FloatingOrb {
  x: number; y: number; size: number; opacity: number;
  speed: number; angle: number; hueShift: number; color: string;
}

interface ShootingStar {
  x: number; y: number; length: number; speed: number;
  angle: number; opacity: number; life: number; maxLife: number;
  active: boolean; thickness: number;
}

// ─── Utility ────────────────────────────────────────────────────
function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Component ──────────────────────────────────────────────────
export default function NebulaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);

  // ── Star Field ──────────────────────────────────────────────
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // ── Star Field ──────────────────────────────────────────────
  const mkStars = useCallback((w: number, h: number): Star[] => {
    const out: Star[] = [];
    const mobile = w < 768;
    const n = Math.min(Math.floor((w * h) / (mobile ? 4000 : 2500)), mobile ? 200 : 500);
    for (let i = 0; i < n; i++) {
      const bright = Math.random() < 0.1;
      out.push({
        x: rand(0, w), y: rand(0, h),
        size: bright ? rand(1.5, 3.2) : rand(0.3, 1.4),
        baseOpacity: bright ? rand(0.7, 1) : rand(0.15, 0.65),
        twinkleSpeed: rand(0.4, 3.5),
        twinkleOffset: rand(0, Math.PI * 2),
        color: bright
          ? pick(["#e0e8ff", "#b8d4ff", "#ffffff", "#d0dfff", "#a0c8ff"])
          : pick(["#ffffff", "#d0d8f0", "#c8c8e0", "#e0d8f0"]),
        hasCrossFlare: bright && Math.random() < 0.5,
      });
    }
    return out;
  }, []);

  // ── Dust Particles (interactive) ────────────────────────────
  const mkDust = useCallback((w: number, h: number): DustParticle[] => {
    const out: DustParticle[] = [];
    const mobile = w < 768;
    const n = Math.min(Math.floor((w * h) / (mobile ? 12000 : 7000)), mobile ? 60 : 180);
    const colors = [NC.deepPink, NC.hotPink, NC.lavender, NC.cosmicBlue, NC.cyan, NC.magenta, NC.white, NC.rosePink];
    for (let i = 0; i < n; i++) {
      const x = rand(0, w), y = rand(0, h);
      out.push({
        x, y, baseX: x, baseY: y,
        size: rand(1, 4.5), opacity: rand(0.06, 0.35),
        color: pick(colors), vx: 0, vy: 0,
        speed: rand(0.08, 0.45), driftAngle: rand(0, Math.PI * 2),
      });
    }
    return out;
  }, []);

  // ── Nebula Gas Clouds (VIVID) ───────────────────────────────
  const mkClouds = useCallback((w: number, h: number): NebulaCloud[] => {
    const scale = Math.min(w, h) / 1000;
    const defs = [
      // Central bright pink mass
      { xR: 0.48, yR: 0.38, rMin: 280, rMax: 500, c: NC.deepPink,   oMin: 0.06, oMax: 0.12 },
      { xR: 0.52, yR: 0.42, rMin: 250, rMax: 450, c: NC.hotPink,    oMin: 0.05, oMax: 0.10 },
      { xR: 0.45, yR: 0.35, rMin: 200, rMax: 400, c: NC.rosePink,   oMin: 0.04, oMax: 0.09 },
      { xR: 0.50, yR: 0.50, rMin: 220, rMax: 380, c: NC.magenta,    oMin: 0.04, oMax: 0.08 },
      // Purple hazes
      { xR: 0.28, yR: 0.30, rMin: 250, rMax: 550, c: NC.deepPurple, oMin: 0.03, oMax: 0.07 },
      { xR: 0.72, yR: 0.60, rMin: 250, rMax: 550, c: NC.lavender,   oMin: 0.03, oMax: 0.06 },
      // Blue wisps
      { xR: 0.18, yR: 0.72, rMin: 180, rMax: 400, c: NC.cosmicBlue, oMin: 0.025, oMax: 0.06 },
      { xR: 0.82, yR: 0.28, rMin: 180, rMax: 380, c: NC.cyan,       oMin: 0.02,  oMax: 0.05 },
      // Scattered extras
      { xR: 0.60, yR: 0.68, rMin: 150, rMax: 320, c: NC.deepPink,   oMin: 0.025, oMax: 0.06 },
      { xR: 0.35, yR: 0.58, rMin: 160, rMax: 340, c: NC.hotPink,    oMin: 0.03,  oMax: 0.06 },
      { xR: 0.65, yR: 0.25, rMin: 140, rMax: 300, c: NC.lavender,   oMin: 0.02,  oMax: 0.05 },
    ];
    return defs.map(d => ({
      x: w * d.xR + rand(-80, 80),
      y: h * d.yR + rand(-60, 60),
      radius: rand(d.rMin, d.rMax) * scale,
      color: d.c,
      opacity: rand(d.oMin, d.oMax),
      driftSpeed: rand(0.0003, 0.001),
      phaseX: rand(0, Math.PI * 2),
      phaseY: rand(0, Math.PI * 2),
    }));
  }, []);

  // ── Nebula Wisps (elongated flowing shapes) ─────────────────
  const mkWisps = useCallback((w: number, h: number): Wisp[] => {
    const out: Wisp[] = [];
    const colors = [NC.deepPink, NC.hotPink, NC.magenta, NC.lavender, NC.cosmicBlue, NC.rosePink];
    const count = w < 768 ? 4 : 8;
    for (let i = 0; i < count; i++) {
      out.push({
        x: rand(w * 0.1, w * 0.9),
        y: rand(h * 0.1, h * 0.9),
        width: rand(200, 500) * Math.min(w, h) / 1000,
        height: rand(40, 120) * Math.min(w, h) / 1000,
        angle: rand(0, Math.PI * 2),
        rotSpeed: rand(-0.0003, 0.0003),
        color: pick(colors),
        opacity: rand(0.02, 0.06),
        phaseX: rand(0, Math.PI * 2),
        phaseY: rand(0, Math.PI * 2),
        driftSpeed: rand(0.0002, 0.0006),
      });
    }
    return out;
  }, []);

  // ── Floating Orbs ───────────────────────────────────────────
  const mkOrbs = useCallback((w: number, h: number): FloatingOrb[] => {
    const out: FloatingOrb[] = [];
    const colors = [NC.hotPink, NC.lavender, NC.cyan, NC.deepPink, NC.rosePink];
    const count = w < 768 ? 8 : 18;
    for (let i = 0; i < count; i++) {
      out.push({
        x: rand(0, w), y: rand(0, h),
        size: rand(35, 100), opacity: rand(0.015, 0.05),
        speed: rand(0.1, 0.35), angle: rand(0, Math.PI * 2),
        hueShift: rand(0, 360), color: pick(colors),
      });
    }
    return out;
  }, []);

  // ── Shooting Star ───────────────────────────────────────────
  const mkShootingStar = useCallback((w: number, h: number): ShootingStar => {
    const fromTop = Math.random() < 0.5;
    return {
      x: fromTop ? rand(0, w) : rand(-100, 0),
      y: fromTop ? rand(-100, 0) : rand(0, h * 0.5),
      length: rand(80, 200),
      speed: rand(10, 22),
      angle: rand(Math.PI / 7, Math.PI / 3),
      opacity: 0, life: 0,
      maxLife: rand(35, 70),
      active: true,
      thickness: rand(1.5, 3),
    };
  }, []);

  // ═══════════════════════════════════════════════════════════
  // MAIN EFFECT
  // ═══════════════════════════════════════════════════════════
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const mobileDev = w < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, mobileDev ? 1.5 : 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let stars = mkStars(w, h);
    let dust = mkDust(w, h);
    let clouds = mkClouds(w, h);
    let wisps = mkWisps(w, h);
    let orbs = mkOrbs(w, h);
    let shootingStars: ShootingStar[] = [];
    let ssTimer = 0;
    let time = 0;

    const onResize = () => {
      resize();
      stars = mkStars(w, h);
      dust = mkDust(w, h);
      clouds = mkClouds(w, h);
      wisps = mkWisps(w, h);
      orbs = mkOrbs(w, h);
    };
    const onMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchEnd = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    document.addEventListener("mouseleave", onLeave);

    // ── DRAW: Nebula Clouds ──────────────────────────────────
    const drawClouds = (t: number) => {
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      for (const c of clouds) {
        const dx = Math.sin(t * c.driftSpeed * 1000 + c.phaseX) * 35;
        const dy = Math.cos(t * c.driftSpeed * 800 + c.phaseY) * 25;
        let px = 0, py = 0;
        if (mx > -9000) { px = (mx - w / 2) * -0.025; py = (my - h / 2) * -0.025; }
        const cx = c.x + dx + px, cy = c.y + dy + py;

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, c.radius);
        g.addColorStop(0,   c.color + c.opacity + ")");
        g.addColorStop(0.3, c.color + c.opacity * 0.7 + ")");
        g.addColorStop(0.6, c.color + c.opacity * 0.3 + ")");
        g.addColorStop(1,   c.color + "0)");
        ctx.fillStyle = g;
        ctx.fillRect(cx - c.radius, cy - c.radius, c.radius * 2, c.radius * 2);
      }
    };

    // ── DRAW: Wisps (flowing elongated shapes) ───────────────
    const drawWisps = (t: number) => {
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      for (const wi of wisps) {
        wi.angle += wi.rotSpeed;
        const dx = Math.sin(t * wi.driftSpeed * 800 + wi.phaseX) * 40;
        const dy = Math.cos(t * wi.driftSpeed * 600 + wi.phaseY) * 30;
        let px = 0, py = 0;
        if (mx > -9000) { px = (mx - w / 2) * -0.015; py = (my - h / 2) * -0.015; }
        const cx = wi.x + dx + px, cy = wi.y + dy + py;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(wi.angle);

        // Pulse opacity
        const pulse = 0.6 + 0.4 * Math.sin(t * 0.4 + wi.phaseX);
        const op = wi.opacity * pulse;

        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, wi.width * 0.5);
        g.addColorStop(0,   wi.color + op + ")");
        g.addColorStop(0.4, wi.color + op * 0.5 + ")");
        g.addColorStop(1,   wi.color + "0)");

        ctx.fillStyle = g;
        ctx.scale(1, wi.height / wi.width);
        ctx.beginPath();
        ctx.arc(0, 0, wi.width * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    // ── DRAW: Stars ──────────────────────────────────────────
    const drawStars = (t: number) => {
      for (const s of stars) {
        const tw = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset);
        const op = s.baseOpacity * (0.3 + 0.7 * tw);

        ctx.save();
        ctx.globalAlpha = op;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        if (s.hasCrossFlare && tw > 0.55) {
          const fl = s.size * 5 * tw;
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 0.6;
          ctx.globalAlpha = op * 0.6;
          ctx.beginPath();
          ctx.moveTo(s.x - fl, s.y); ctx.lineTo(s.x + fl, s.y);
          ctx.moveTo(s.x, s.y - fl); ctx.lineTo(s.x, s.y + fl);
          ctx.stroke();

          // Bloom glow
          const bg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 8);
          bg.addColorStop(0, `rgba(180, 210, 255, ${op * 0.2})`);
          bg.addColorStop(1, "rgba(180, 210, 255, 0)");
          ctx.fillStyle = bg;
          ctx.fillRect(s.x - s.size * 8, s.y - s.size * 8, s.size * 16, s.size * 16);
        }
        ctx.restore();
      }
    };

    // ── DRAW: Dust (interactive + connection lines) ──────────
    const drawDust = (t: number) => {
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const mouseR = 180;
      const connectDist = 100;

      for (const p of dust) {
        p.driftAngle += rand(-0.008, 0.008);
        p.baseX += Math.cos(p.driftAngle) * p.speed * 0.3;
        p.baseY += Math.sin(p.driftAngle) * p.speed * 0.3;

        // Wrap
        if (p.baseX < -30) p.baseX = w + 30;
        if (p.baseX > w + 30) p.baseX = -30;
        if (p.baseY < -30) p.baseY = h + 30;
        if (p.baseY > h + 30) p.baseY = -30;

        let tx = p.baseX, ty = p.baseY;
        if (mx > -9000) {
          const ddx = p.x - mx, ddy = p.y - my;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dist < mouseR && dist > 0) {
            const force = (1 - dist / mouseR) * 50;
            tx = p.baseX + (ddx / dist) * force;
            ty = p.baseY + (ddy / dist) * force;
          }
        }

        p.x += (tx - p.x) * 0.07;
        p.y += (ty - p.y) * 0.07;

        const pulse = 0.5 + 0.5 * Math.sin(t * 1.5 + p.driftAngle * 10);
        const alpha = p.opacity * (0.4 + 0.6 * pulse);

        ctx.save();
        ctx.globalAlpha = alpha;

        // Glow
        const gl = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5);
        gl.addColorStop(0, p.color + "0.6)");
        gl.addColorStop(0.4, p.color + "0.2)");
        gl.addColorStop(1, p.color + "0)");
        ctx.fillStyle = gl;
        ctx.fillRect(p.x - p.size * 3.5, p.y - p.size * 3.5, p.size * 7, p.size * 7);

        // Core
        ctx.fillStyle = p.color + "0.9)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ── Connection Lines between nearby particles ──────────
      ctx.save();
      for (let i = 0; i < dust.length; i++) {
        for (let j = i + 1; j < dust.length; j++) {
          const dx = dust[i].x - dust[j].x;
          const dy = dust[i].y - dust[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDist) {
            const opacity = (1 - dist / connectDist) * 0.12;
            ctx.strokeStyle = `rgba(180, 140, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(dust[i].x, dust[i].y);
            ctx.lineTo(dust[j].x, dust[j].y);
            ctx.stroke();
          }
        }

        // Lines to mouse
        if (mx > -9000) {
          const dx = dust[i].x - mx, dy = dust[i].y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseR) {
            const opacity = (1 - dist / mouseR) * 0.2;
            ctx.strokeStyle = `rgba(200, 160, 255, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(dust[i].x, dust[i].y);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        }
      }
      ctx.restore();
    };

    // ── DRAW: Mouse Cursor Glow ──────────────────────────────
    const drawMouseGlow = () => {
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      if (mx < -9000) return;

      // Outer purple glow
      const g1 = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
      g1.addColorStop(0, "rgba(168, 85, 247, 0.08)");
      g1.addColorStop(0.3, "rgba(140, 60, 200, 0.04)");
      g1.addColorStop(0.6, "rgba(100, 40, 180, 0.015)");
      g1.addColorStop(1, "rgba(100, 40, 180, 0)");
      ctx.fillStyle = g1;
      ctx.fillRect(mx - 200, my - 200, 400, 400);

      // Inner bright core
      const g2 = ctx.createRadialGradient(mx, my, 0, mx, my, 60);
      g2.addColorStop(0, "rgba(200, 170, 255, 0.12)");
      g2.addColorStop(0.5, "rgba(168, 85, 247, 0.05)");
      g2.addColorStop(1, "rgba(168, 85, 247, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(mx - 60, my - 60, 120, 120);
    };

    // ── DRAW: Floating Orbs ──────────────────────────────────
    const drawOrbs = (t: number) => {
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      for (const o of orbs) {
        o.angle += 0.002;
        o.x += Math.cos(o.angle) * o.speed;
        o.y += Math.sin(o.angle * 0.7) * o.speed * 0.6;
        let px = 0, py = 0;
        if (mx > -9000) { px = (mx - w / 2) * -0.012; py = (my - h / 2) * -0.012; }
        if (o.x < -o.size) o.x = w + o.size;
        if (o.x > w + o.size) o.x = -o.size;
        if (o.y < -o.size) o.y = h + o.size;
        if (o.y > h + o.size) o.y = -o.size;

        const pulse = 0.5 + 0.5 * Math.sin(t * 0.5 + o.hueShift);
        const ox = o.x + px, oy = o.y + py;
        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.size);
        g.addColorStop(0,   o.color + (o.opacity * pulse) + ")");
        g.addColorStop(0.4, o.color + (o.opacity * pulse * 0.4) + ")");
        g.addColorStop(1,   o.color + "0)");
        ctx.fillStyle = g;
        ctx.fillRect(ox - o.size, oy - o.size, o.size * 2, o.size * 2);
      }
    };

    // ── DRAW: Shooting Stars (brighter, more frequent) ───────
    const drawShootingStars = () => {
      for (const ss of shootingStars) {
        if (!ss.active) continue;
        ss.life++;
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;

        const prog = ss.life / ss.maxLife;
        if (prog < 0.15) ss.opacity = prog / 0.15;
        else if (prog > 0.6) ss.opacity = (1 - prog) / 0.4;
        else ss.opacity = 1;

        if (ss.life >= ss.maxLife || ss.x > w + 250 || ss.y > h + 250) {
          ss.active = false; continue;
        }

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        ctx.save();
        ctx.globalAlpha = ss.opacity;

        // Trail
        const tg = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        tg.addColorStop(0, "rgba(255, 255, 255, 0)");
        tg.addColorStop(0.4, "rgba(180, 200, 255, 0.2)");
        tg.addColorStop(0.7, "rgba(200, 220, 255, 0.5)");
        tg.addColorStop(1, "rgba(255, 255, 255, 1)");
        ctx.strokeStyle = tg;
        ctx.lineWidth = ss.thickness;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();

        // Head bloom
        const hg = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 12);
        hg.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
        hg.addColorStop(0.3, `rgba(180, 200, 255, ${ss.opacity * 0.5})`);
        hg.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = hg;
        ctx.fillRect(ss.x - 12, ss.y - 12, 24, 24);

        ctx.restore();
      }
      shootingStars = shootingStars.filter(s => s.active);
    };

    // ═══════════════════════════════════════════════════════════
    // ANIMATION LOOP
    // ═══════════════════════════════════════════════════════════
    const animate = () => {
      time += 0.016;
      ssTimer++;

      ctx.clearRect(0, 0, w, h);

      // Deep space gradient background
      const bg = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.8);
      bg.addColorStop(0, "rgba(12, 4, 22, 1)");
      bg.addColorStop(0.3, "rgba(8, 3, 16, 1)");
      bg.addColorStop(0.7, "rgba(5, 2, 12, 1)");
      bg.addColorStop(1, "rgba(3, 1, 6, 1)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Layer order: clouds → wisps → orbs → dust (+ connections) → stars → mouse glow → shooting stars
      drawClouds(time);
      drawWisps(time);
      drawOrbs(time);
      drawDust(time);
      drawStars(time);
      drawMouseGlow();

      // Shooting stars — more frequent
      if (ssTimer > 60 && Math.random() < 0.015) {
        shootingStars.push(mkShootingStar(w, h));
        ssTimer = 0;
      }
      drawShootingStars();

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [mkStars, mkDust, mkClouds, mkWisps, mkOrbs, mkShootingStar]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: -2, pointerEvents: "none" }}
    />
  );
}
