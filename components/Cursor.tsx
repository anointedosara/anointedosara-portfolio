'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Custom cursor for fine-pointer devices. Never mounts on touch screens, and
 * bows out under reduced-motion — the native cursor is left alone in both
 * cases, so nothing about the site depends on it existing.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const decide = () => setEnabled(fine.matches && !reduced.matches);

    decide();
    fine.addEventListener('change', decide);
    reduced.addEventListener('change', decide);
    return () => {
      fine.removeEventListener('change', decide);
      reduced.removeEventListener('change', decide);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;
    let visible = false;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        d.style.opacity = '1';
        r.style.opacity = '1';
      }
    };

    const leave = () => {
      visible = false;
      d.style.opacity = '0';
      r.style.opacity = '0';
    };

    // The ring trails the dot; the dot tracks the pointer exactly.
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      d.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const interactive = 'a, button, [role="button"], input, textarea, select, [data-cursor]';
    const over = (e: PointerEvent) => {
      const hit = (e.target as Element | null)?.closest?.(interactive);
      r.dataset.active = hit ? 'true' : 'false';
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    document.addEventListener('pointerleave', leave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.removeEventListener('pointerleave', leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[150] h-1.5 w-1.5 rounded-full bg-accent opacity-0 transition-opacity duration-300"
      />
      <div
        ref={ring}
        aria-hidden
        data-active="false"
        className="pointer-events-none fixed left-0 top-0 z-[150] h-9 w-9 rounded-full border border-bone/40 opacity-0 transition-[opacity,width,height,background-color,border-color] duration-300 ease-out data-[active=true]:h-16 data-[active=true]:w-16 data-[active=true]:border-accent/70 data-[active=true]:bg-accent/10"
      />
    </>
  );
}
