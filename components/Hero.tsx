'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

import { SITE } from '@/lib/data';
import { useReducedMotion } from '@/lib/env';
import { scrollToId } from '@/lib/scroll';

export default function Hero() {
  const reduced = useReducedMotion();
  const copy = useRef<HTMLDivElement>(null);
  const role = useRef<HTMLSpanElement>(null);

  /* Copy drifts as the hero leaves — desktop only, and never under reduced motion. */
  useEffect(() => {
    if (reduced) return;
    const el = copy.current;
    if (!el) return;

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    import('@/lib/gsap').then(({ gsap }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();
        mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
          gsap.to(el, {
            y: -70,
            opacity: 0.8,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top top',
              end: '+=70%',
              scrub: 0.6,
            },
          });
        });
      }, el);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduced]);

  useEffect(() => {
    const el = role.current;
    if (!el) return;

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    import('@/lib/gsap').then(({ gsap }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();
        mm.add('(prefers-reduced-motion: no-preference)', () => {
          gsap.fromTo(
            el,
            { '--p': 0 },
            {
              '--p': 1,
              ease: 'none',
              scrollTrigger: {
                // `scrub: true` ties the fill directly to scroll position —
                // no easing, no glide after you stop. Short range so both
                // lines finish while the role is still in frame.
                trigger: '#top',
                start: 'top top',
                end: '+=30%',
                scrub: true,
              },
            },
          );
        });
      }, el);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden"
      style={{
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + clamp(96px, 13vh, 148px))',
        paddingBottom: 'clamp(24px, 5vh, 56px)',
      }}
    >
      {/* Backdrop ------------------------------------------------------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* The hero is one static frame — no canvas, no per-frame work, the
            same on every device. `priority` because it paints in the first
            screen. Swap this file to change the backdrop. */}
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(242,238,231,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(242,238,231,0.08)_1px,transparent_1px)] [background-size:clamp(40px,7vw,96px)_clamp(40px,7vw,96px)]" />

        {/* Readability wash under the type, only where the type is. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent lg:via-ink/40 lg:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* Top meta ------------------------------------------------------- */}
      <div className="shell flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <p data-anim className="t-label flex items-center gap-2 text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available for work
        </p>
        <p data-anim style={{ '--anim-d': '80ms' } as React.CSSProperties} className="t-label text-faint">
          {SITE.location}
        </p>
      </div>

      {/* Headline ------------------------------------------------------- */}
      <div ref={copy} className="shell py-[clamp(18px,3.5vh,44px)]">
        {/* The name introduces; the role is the statement. */}
        <h1 className="font-display leading-[0.92]">
          <span className="block overflow-hidden">
            <span
              data-anim
              style={{
                '--anim-y': '0.9em',
                '--anim-d': '140ms',
                fontSize: 'clamp(1.15rem, 3.1vw, 2.1rem)',
              } as React.CSSProperties}
              className="block font-semibold tracking-[-0.01em] text-bone/80"
            >
              {SITE.short}
            </span>
          </span>

          <span
            ref={role}
            className="hero-role mt-[clamp(14px,2.4vw,30px)] block font-extrabold uppercase leading-[0.88] tracking-[-0.035em]"
            style={{ fontSize: 'clamp(2.5rem, 12.5vw, 11rem)' }}
          >
            {SITE.roleLines.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <span
                  data-anim
                  style={{
                    '--anim-y': '0.9em',
                    '--anim-d': `${240 + i * 110}ms`,
                    '--i': i,
                  } as React.CSSProperties}
                  className="hero-line block"
                >
                  {line}
                </span>
              </span>
            ))}
          </span>
        </h1>

        <div className="mt-[clamp(20px,3.5vw,40px)] grid gap-[clamp(20px,3vw,48px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-end">
          <p
            data-anim
            style={{ '--anim-d': '420ms' } as React.CSSProperties}
            className="t-lead max-w-measure text-muted"
          >
            {SITE.intro}
          </p>

          <div
            data-anim
            style={{ '--anim-d': '520ms' } as React.CSSProperties}
            className="flex flex-wrap items-center gap-3 ms:gap-4 lg:justify-end"
          >
            <button
              type="button"
              onClick={() => scrollToId('work')}
              className="tap group relative overflow-hidden rounded-full bg-accent px-6 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink transition-transform duration-300 ease-out hover:scale-[1.03] ms:px-8 ms:text-xs"
            >
              <span className="relative z-10">Selected work</span>
            </button>

            <a
              href={SITE.cv}
              target="_blank"
              rel="noreferrer"
              className="tap rounded-full border border-line px-6 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-bone transition-colors duration-300 hover:border-accent hover:text-accent ms:px-8 ms:text-xs"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>

      {/* Footer rail ---------------------------------------------------- */}
      <div className="shell flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <button
          type="button"
          onClick={() => scrollToId('work')}
          data-anim
          style={{ '--anim-d': '620ms' } as React.CSSProperties}
          className="tap group flex items-center gap-3 text-muted transition-colors hover:text-bone"
        >
          <span className="relative block h-9 w-5 rounded-full border border-line">
            <span className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent motion-safe:animate-[scrollcue_2s_ease-in-out_infinite]" />
          </span>
          <span className="t-label">Scroll</span>
        </button>

        <ul
          data-anim
          style={{ '--anim-d': '700ms' } as React.CSSProperties}
          className="flex flex-wrap items-center gap-x-5 gap-y-1"
        >
          {SITE.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="tap t-label text-faint transition-colors hover:text-accent justify-center px-2 min-w-[44px]"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
