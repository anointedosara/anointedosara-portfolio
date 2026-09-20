'use client';

import { useEffect } from 'react';

/**
 * One observer for every `[data-anim]` on the page. Mounted once at the root,
 * it watches elements as they are added and flips them to `.is-in` when they
 * come into view — no per-element listener, no GSAP, no layout thrash.
 *
 * Reveals are reversible: an element that scrolls back out of view loses
 * `.is-in` and animates out, so scrolling up plays the entrance backwards
 * instead of leaving everything permanently on.
 *
 * Masked reveals need care: a span that starts translated below its own
 * `overflow: hidden` wrapper has an intersection rect of zero, because the
 * observer clips against that wrapper. Watching the child would deadlock — it
 * stays hidden because it is hidden — so we watch the outermost clipping
 * ancestor instead and reveal the children it covers.
 */
export default function RevealRoot() {
  useEffect(() => {
    if (!document.documentElement.classList.contains('js-motion')) return;

    const targets = new Map<Element, Element[]>();
    const known = new WeakSet<Element>();

    /** Nearest ancestor that clips — that box is what the viewer actually sees. */
    const clipRoot = (el: Element): Element => {
      let node = el.parentElement;
      while (node && node !== document.body) {
        const { overflow, overflowY, overflowX } = getComputedStyle(node);
        if (/hidden|clip/.test(`${overflow} ${overflowY} ${overflowX}`)) return node;
        node = node.parentElement;
      }
      return el;
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const group = targets.get(entry.target);
          if (!group) continue;
          for (const el of group) el.classList.toggle('is-in', entry.isIntersecting);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );

    const scan = () => {
      document.querySelectorAll('[data-anim]').forEach((el) => {
        if (known.has(el)) return;
        known.add(el);

        const target = clipRoot(el);
        const group = targets.get(target);
        if (group) {
          group.push(el);
          return;
        }
        targets.set(target, [el]);
        io.observe(target);
      });
    };

    scan();

    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      targets.clear();
    };
  }, []);

  return null;
}
