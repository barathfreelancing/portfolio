import { useEffect, useRef } from 'react';
import { ScrollTrigger } from '../motion/gsap';
import { VERTEX, FRAGMENT } from './shader';
import { CHAPTERS, cloneChapter, blendInto } from './states';
import { onFlare } from './signals';

const UNIFORMS = [
  'uRes', 'uTime', 'uCam', 'uTop', 'uMid', 'uLow', 'uSun', 'uSunPos',
  'uStars', 'uAurora', 'uClouds', 'uEnt', 'uEntA', 'uEntGlow', 'uFlare', 'uNearA', 'uIsles', 'uPtr', 'uOct',
];

const smooth = (x) => {
  const t = Math.min(Math.max(x, 0), 1);
  return t * t * (3 - 2 * t);
};

function compile(gl, type, src) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function World() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return undefined; // CSS sky on <body> stays visible

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) return undefined;
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return undefined;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = {};
    UNIFORMS.forEach((name) => {
      u[name] = gl.getUniformLocation(program, name);
    });

    const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const small = window.matchMedia('(max-width: 768px)').matches;
    // Save-Data visitors get the same still sky as reduced motion: one frame per scroll change, no loop.
    const saveData = Boolean(navigator.connection?.saveData);
    let reduce = reduceQuery.matches || saveData;
    // Low-memory or low-core devices start at a lower resolution and fewer noise octaves.
    const lowEnd = (navigator.deviceMemory || 8) < 4 || (navigator.hardwareConcurrency || 8) <= 2;
    // Phones draw at 30fps: the sky drifts slowly, so half the frames buy back battery for little visible loss.
    const frameBudget = small ? 31 : 0;
    const slowDt = ((frameBudget || 16.7) * 1.6) / 1000;

    // Render below CSS resolution and let the browser upscale: the sky is soft by nature.
    let scale = (small ? 0.5 : 0.7) * (lowEnd ? 0.8 : 1);
    const octaves = (small ? 4 : 5) - (lowEnd ? 1 : 0);

    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(canvas.clientWidth * dpr * scale));
      height = Math.max(1, Math.round(canvas.clientHeight * dpr * scale));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Where each chapter begins, in document scroll pixels
    let marks = [];
    const measure = () => {
      const vh = window.innerHeight;
      marks = CHAPTERS.map((c) => {
        const el = document.getElementById(c.id);
        return el ? el.getBoundingClientRect().top + window.scrollY - vh * 0.55 : 0;
      });
    };
    measure();
    ScrollTrigger.addEventListener('refresh', measure);

    const state = cloneChapter(CHAPTERS[0]);
    const target = cloneChapter(CHAPTERS[0]);
    const entity = { x: state.entity[0], y: state.entity[1], vx: 0, vy: 0 };
    const pointer = { tx: 0, ty: 0, x: 0, y: 0, vx: 0, vy: 0 };

    const onPointer = (e) => {
      pointer.tx = e.clientX / window.innerWidth - 0.5;
      pointer.ty = 0.5 - e.clientY / window.innerHeight;
    };
    if (finePointer) window.addEventListener('pointermove', onPointer, { passive: true });

    // Hovering a `data-attract` control draws the entity toward it; a sent enquiry makes it flare.
    let attractEl = null;
    const onOver = (e) => {
      if (e.pointerType !== 'mouse') return;
      attractEl = e.target.closest?.('[data-attract]') ?? null;
    };
    const onOut = (e) => {
      if (attractEl && !attractEl.contains(e.relatedTarget)) attractEl = null;
    };
    if (finePointer) {
      document.addEventListener('pointerover', onOver, { passive: true });
      document.addEventListener('pointerout', onOut, { passive: true });
    }
    const glow = { value: 1 };
    let flareStart = -1;
    const offFlare = onFlare(() => {
      flareStart = performance.now();
      lastDrawKey = '';
    });

    const computeTarget = (scrollY) => {
      const vh = window.innerHeight;
      Object.assign(target, cloneChapter(CHAPTERS[0]));
      for (let i = 1; i < CHAPTERS.length; i += 1) {
        const w = smooth((scrollY - (marks[i] - vh * 0.35)) / (vh * 0.7));
        if (w <= 0) break;
        blendInto(target, CHAPTERS[i], w);
      }
    };

    let raf = 0;
    let last = performance.now();
    let clock = 0;
    let slowFrames = 0;
    let lastDrawKey = '';
    canvas.classList.add('is-live');

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (frameBudget && now - last < frameBudget) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const scrollY = window.scrollY;
      computeTarget(scrollY);

      // Colours follow the reader directly; the scroll itself is already smoothed by Lenis.
      blendInto(state, target, 1);

      // Lean a third of the way toward a hovered call to action, if it is on screen.
      let tx = target.entity[0];
      let ty = target.entity[1];
      // Portrait screens stack copy edge to edge, so after the hero the entity waits in the top-right
      // corner (the shader's portrait lift puts y = 0.7 just under the nav).
      if (window.innerWidth / window.innerHeight < 0.8) {
        const vh = window.innerHeight;
        const hero = 1 - smooth((scrollY - (marks[1] - vh * 0.35)) / (vh * 0.7));
        tx = 0.86 + (tx - 0.86) * hero;
        ty = 0.7 + (ty - 0.7) * hero;
      }
      let attracted = false;
      if (attractEl?.isConnected) {
        const r = attractEl.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) {
          attracted = true;
          tx += ((r.left + r.width / 2) / window.innerWidth - tx) * 0.33;
          ty += (1 - (r.top + r.height / 2) / window.innerHeight - ty) * 0.33;
        }
      }

      // Brightens while attracted; the flare is one ring over 1.4s (a brief glow under reduced motion).
      const flareT = flareStart < 0 ? 1 : (now - flareStart) / 1400;
      if (flareT >= 1) flareStart = -1;
      const flareGlow = flareStart < 0 ? 0 : (1 - flareT) * (reduce ? 1.2 : 0.6);
      const glowGoal = (attracted ? 1.6 : 1) + flareGlow;
      glow.value += (glowGoal - glow.value) * Math.min(1, dt * 10);

      // The entity drifts to its next post on a critically damped spring.
      const k = 18;
      const c = 2 * Math.sqrt(k);
      if (reduce) {
        entity.x = CHAPTERS[0].entity[0];
        entity.y = CHAPTERS[0].entity[1];
      } else {
        entity.vx += ((tx - entity.x) * k - entity.vx * c) * dt;
        entity.vy += ((ty - entity.y) * k - entity.vy * c) * dt;
        entity.x += entity.vx * dt;
        entity.y += entity.vy * dt;
        pointer.vx += ((pointer.tx - pointer.x) * 30 - pointer.vx * 9) * dt;
        pointer.vy += ((pointer.ty - pointer.y) * 30 - pointer.vy * 9) * dt;
        pointer.x += pointer.vx * dt;
        pointer.y += pointer.vy * dt;
        clock += dt;
      }

      // Each chapter sets a camera height; a slow continuous drift keeps long sections moving.
      const cam = reduce ? 0 : state.cam + (scrollY / window.innerHeight) * 0.012;
      // Under reduced motion nothing travels: the entity and the city stay put and fade out after the hero.
      const entA = reduce ? 1 - smooth((scrollY - window.innerHeight * 0.3) / (window.innerHeight * 0.5)) : 1;

      if (reduce) {
        const key = `${width}x${height}:${Math.round(scrollY / 4)}:${Math.round(glow.value * 40)}`;
        if (key === lastDrawKey) return;
        lastDrawKey = key;
      }

      gl.uniform2f(u.uRes, width, height);
      gl.uniform1f(u.uTime, reduce ? 18 : clock + 18);
      gl.uniform1f(u.uCam, cam);
      gl.uniform3fv(u.uTop, state.top);
      gl.uniform3fv(u.uMid, state.mid);
      gl.uniform3fv(u.uLow, state.low);
      gl.uniform3fv(u.uSun, state.sun);
      gl.uniform2fv(u.uSunPos, state.sunPos);
      gl.uniform1f(u.uStars, state.stars);
      gl.uniform1f(u.uAurora, state.aurora);
      gl.uniform1f(u.uClouds, state.clouds);
      gl.uniform1f(u.uIsles, state.isles);
      gl.uniform3f(u.uEnt, entity.x, entity.y, state.entity[2]);
      gl.uniform1f(u.uEntA, entA);
      gl.uniform1f(u.uEntGlow, glow.value);
      gl.uniform1f(u.uFlare, reduce || flareStart < 0 ? 0 : flareT);
      gl.uniform1f(u.uNearA, reduce ? entA : 1);
      gl.uniform2f(u.uPtr, pointer.x, pointer.y);
      gl.uniform1f(u.uOct, octaves);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // Adaptive resolution: step down when frames run long on slower devices.
      if (!reduce && dt > slowDt) slowFrames += 1;
      else slowFrames = Math.max(0, slowFrames - 1);
      if (slowFrames > 40 && scale > 0.36) {
        scale -= 0.1;
        slowFrames = 0;
        resize();
      }
    };
    raf = requestAnimationFrame(frame);

    const onReduceChange = (e) => {
      reduce = e.matches || saveData;
      lastDrawKey = '';
    };
    reduceQuery.addEventListener('change', onReduceChange);

    const onLost = (e) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
      canvas.classList.remove('is-live');
    };
    canvas.addEventListener('webglcontextlost', onLost);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      ScrollTrigger.removeEventListener('refresh', measure);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      offFlare();
      reduceQuery.removeEventListener('change', onReduceChange);
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.classList.remove('is-live');
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas ref={canvasRef} className="world" aria-hidden="true" />;
}
