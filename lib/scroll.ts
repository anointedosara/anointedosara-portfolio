'use client';

import type Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * One entry point for in-page navigation: Lenis when it is driving the scroll,
 * native behaviour otherwise — which is also the path phones and reduced-motion
 * visitors take, since Lenis never starts for them.
 */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lenis = window.__lenis;

  if (lenis && !reduced) {
    lenis.scrollTo(el, { duration: 1.2 });
    return;
  }

  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
}

export {};
