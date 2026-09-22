'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { SITE, sections } from '@/lib/data';
import { scrollToId } from '@/lib/scroll';
import Logo from './Logo';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState<string>('');
  const panel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  /* Bar hides as you scroll down, returns the moment you scroll up.
     The decision is made on distance travelled since the last change of
     direction, not on one frame's delta: native touch momentum arrives in
     irregular steps, and plenty of those frames move only a pixel or two.
     Judged frame by frame, every one of them reads as "stopped" and slides
     the bar back in halfway down the page. */
  useEffect(() => {
    let last = window.scrollY;
    let run = 0; // signed distance travelled since the direction last flipped
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = Math.max(0, window.scrollY);
        const delta = y - last;
        last = y;
        raf = 0;

        setSolid(y > 24);
        // Back at the hero, nothing is current — otherwise the last section
        // the observer saw stays marked while the reader looks at the top.
        if (y < 240) setActive('');

        if (delta === 0) return;
        if (delta > 0 !== run > 0) run = 0;
        run += delta;

        // Near the top the bar is always present; past that it takes a
        // deliberate run — not a stray frame — to move it either way.
        if (y <= 320) setHidden(false);
        else if (run > 12) setHidden(true);
        else if (run < -12) setHidden(false);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* Which section the reader is in, for the nav's current-page marker. */
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (seen) setActive(seen.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* While the mobile sheet is open: scroll locked, Esc closes, Tab stays in. */
  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const prevOverflow = body.style.overflow;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !panel.current) return;

      const focusables = panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    const t = window.setTimeout(() => panel.current?.querySelector('a')?.focus(), 120);

    return () => {
      document.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = '';
    };
  }, [open]);

  /* A width change can swap the sheet out from under the reader. */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const close = () => setOpen(false);
    mq.addEventListener('change', close);
    return () => mq.removeEventListener('change', close);
  }, []);

  const go = useCallback((id: string) => {
    setOpen(false);
    // Let the sheet release the scroll lock before moving the page.
    window.setTimeout(() => scrollToId(id), 60);
  }, []);

  return (
    <>
      {/* Above the sheet, not below it: the bar is a positioned, z-indexed
          element, so it opens a stacking context and the toggle's own z-index
          is resolved inside it. Leave the bar under the sheet and the close
          button goes under it too, however high its z-index climbs. */}
      <header
        className={[
          'fixed inset-x-0 top-0 z-[130] transition-[transform,background-color,backdrop-filter,border-color] duration-500 ease-out',
          hidden && !open ? '-translate-y-full' : 'translate-y-0',
          solid && !open
            ? 'border-b border-line/80 bg-ink/70 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        ].join(' ')}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <nav
          aria-label="Primary"
          className="shell flex items-center justify-between gap-4 py-3 tb:py-4 lg:py-5"
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              // Reachable over an open sheet now, so it closes it first —
              // the sheet holds the scroll lock that would swallow the jump.
              go('top');
            }}
            aria-label={`${SITE.short} — back to top`}
            className="tap group shrink-0 gap-[clamp(9px,1.1vw,13px)] text-bone"
          >
            <Logo className="h-[21px] w-auto tb:h-[24px] lg:h-[26px]" />

            {/* The name only earns its space once there is some: below 400px
                the mark carries the brand on its own. */}
            <span aria-hidden className="hidden h-5 w-px bg-line xs:block" />
            <span
              aria-hidden
              className="hidden font-display text-[0.97rem] font-bold leading-none tracking-[-0.02em] xs:block tb:text-[1.05rem]"
            >
              Anointed{' '}
              <span className="font-semibold text-muted transition-colors duration-300 group-hover:text-bone">
                Osara
              </span>
            </span>
          </a>

          {/* Desktop: inline links + CTA. Below lg this collapses to the sheet. */}
          <div className="hidden items-center gap-1 lg:flex xl:gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={active === s.id ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  go(s.id);
                }}
                className="tap group relative rounded-full px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-bone aria-[current]:text-bone xl:px-4 xl:text-xs"
              >
                {s.label}
                <span
                  className={[
                    'absolute inset-x-3 bottom-1 h-px origin-left bg-accent transition-transform duration-500 ease-out',
                    active === s.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                  ].join(' ')}
                />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 tb:gap-3">
            <a
              href={`mailto:${SITE.email}`}
              className="tap hidden rounded-full border border-line px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-bone transition-colors hover:border-accent hover:text-accent ms:inline-flex xl:px-5 xl:text-xs"
            >
              Hire me
            </a>

            <button
              ref={toggle}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-sheet"
              className="tap relative z-[130] -mr-1 flex h-11 w-11 items-center justify-center rounded-full border border-line text-bone transition-colors hover:border-accent lg:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={[
                    'absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ease-out',
                    open ? 'top-1.5 rotate-45' : 'top-0',
                  ].join(' ')}
                />
                <span
                  className={[
                    'absolute left-0 block h-px bg-current transition-all duration-300 ease-out',
                    open ? 'top-1.5 w-5 -rotate-45' : 'top-3 w-3.5',
                  ].join(' ')}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile / tablet sheet */}
      <div
        id="menu-sheet"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-0 z-[125] lg:hidden"
      >
        <div
          className="absolute inset-0 bg-ink/95 backdrop-blur-2xl"
          onClick={() => setOpen(false)}
        />

        <div
          className="relative flex h-[100dvh] flex-col justify-between overflow-y-auto px-gutter"
          style={{
            paddingTop: 'calc(env(safe-area-inset-top, 0px) + 88px)',
            paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 28px)',
          }}
        >
          <ul className="flex flex-col gap-1">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(s.id);
                  }}
                  style={{ transitionDelay: open ? `${120 + i * 55}ms` : '0ms' }}
                  className={[
                    'flex items-baseline gap-4 border-b border-line/70 py-4 transition-all duration-500 ease-out ms:py-5',
                    open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
                  ].join(' ')}
                >
                  <span className="font-mono text-[0.65rem] text-faint">0{i + 1}</span>
                  <span className="font-display text-[clamp(2rem,10vw,3.5rem)] font-semibold leading-none text-bone">
                    {s.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div
            style={{ transitionDelay: open ? '420ms' : '0ms' }}
            className={[
              'mt-8 flex flex-col gap-4 transition-all duration-500 ease-out',
              open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
            ].join(' ')}
          >
            <a
              href={`mailto:${SITE.email}`}
              className="tap break-all font-display text-[clamp(1.05rem,4.6vw,1.5rem)] text-bone underline decoration-accent decoration-2 underline-offset-[6px]"
            >
              {SITE.email}
            </a>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {SITE.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="tap font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent justify-center px-2 min-w-[44px]"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
