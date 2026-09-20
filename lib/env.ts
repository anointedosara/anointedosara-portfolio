'use client';

import { useEffect, useState } from 'react';

/**
 * Small matchMedia hook. Starts `false` on the server and on first paint, then
 * settles after hydration — so nothing renders differently between the two.
 */
export function useMedia(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);

  return matches;
}

export const useReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)');

/** True for devices without a fine pointer — phones, tablets, most hybrids. */
export const useIsTouch = () => useMedia('(hover: none), (pointer: coarse)');
