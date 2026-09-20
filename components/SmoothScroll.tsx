'use client';

import { useEffect } from 'react';

/**
 * Lenis drives the scroll on pointer devices only. Touch platforms already have
 * momentum scrolling that feels better than anything we can synthesise, and
 * hijacking it costs frames — so phones and tablets keep native scroll.
 * ScrollTrigger is told to read position from Lenis while it runs.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (coarse || reduced) return;

    let cancelled = false;
    let teardown: (() => void) | null = null;

    (async () => {
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('@/lib/gsap'),
      ]);
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.05,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on('scroll', ScrollTrigger.update);

      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Published so in-page links can hand their jump to Lenis rather than
      // fighting it with a native smooth scroll.
      window.__lenis = lenis;

      teardown = () => {
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33);
        delete window.__lenis;
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, []);

  return null;
}
