'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollTrigger recalculates on resize by default, which on mobile fires every
 * time the URL bar slides away and causes pinned sections to jump. Ignoring
 * height-only changes on touch keeps those sections steady.
 */
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger };
