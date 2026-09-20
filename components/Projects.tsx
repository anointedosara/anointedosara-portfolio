'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import { projects, type Project } from '@/lib/data';
import ProjectModal from './ProjectModal';

/**
 * One card template for all seven projects: the captured screen on one side,
 * the details beside it, and a panel colour drawn from the product itself.
 * What separates the cards is colour and content, not seven different
 * skeletons — the sequence reads as one system moving past you.
 */
function Card({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  // A click that lands on a link belongs to that link, not to the card.
  const handleCard = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).closest('a, button')) return;
    onOpen(project);
  };

  return (
    <article
      className="panel relative h-full w-full"
      style={{ backgroundColor: project.panelBg }}
    >
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        onClick={handleCard}
        className="shell flex h-full w-full flex-col justify-center py-[var(--p-pad)] xl:pb-[calc(var(--p-pad)+26px)]"
      >
        <div className="grid items-center gap-[clamp(20px,3.5vw,56px)] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          {/* The full captured screen — contained, never cropped, so the panel
              colour frames it rather than slicing it. */}
          <figure
            data-parallax
            className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius)] xl:aspect-auto xl:h-[var(--p-shot)]"
          >
            <Image
              src={project.image}
              alt={`${project.name} — ${project.kind}`}
              fill
              sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 56vw, 92vw"
              className="object-contain object-center"
            />
          </figure>

          <div className="lg:pr-[clamp(0px,2vw,32px)]">
            <div className="flex items-start justify-between gap-4">
              <h3 className="min-w-0 break-words font-display text-[length:var(--p-title)] font-bold leading-[0.95] tracking-[-0.03em] text-bone">
                {project.name}
              </h3>

              <button
                type="button"
                onClick={() => onOpen(project)}
                className="tap -mr-2 -mt-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-bone transition-colors duration-300 hover:text-accent ms:h-14 ms:w-14"
              >
                <span className="sr-only">Open details for {project.name}</span>
                <span aria-hidden className="text-[1.7rem] leading-none ms:text-[2.15rem]">
                  &#8599;
                </span>
              </button>
            </div>

            <p className="mt-[var(--p-gap)] max-w-measure text-[length:var(--p-lead)] leading-snug text-bone/75">
              {project.summary}
            </p>

            <hr className="mt-[var(--p-gap)] border-0 border-t border-bone/15" />

            <ul className="mt-[var(--p-gap)] flex flex-wrap gap-x-4 gap-y-1.5">
              {project.stack.map((tech) => (
                <li key={tech} className="text-[length:var(--p-detail)] text-bone/55">
                  {tech}
                </li>
              ))}
            </ul>

            <p className="mt-[var(--p-gap)] t-label" style={{ color: project.accent }}>
              {project.index} — {project.kind}
            </p>

            <div className="mt-[var(--p-gap)] flex flex-wrap items-center gap-2 ms:gap-3">
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                style={{ backgroundColor: project.accent }}
                className="tap rounded-full px-5 py-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink transition-transform duration-300 ease-out hover:scale-[1.04] ms:px-6 ms:text-xs"
              >
                View live
                <span aria-hidden className="ml-2">
                  &#8599;
                </span>
                <span className="sr-only"> — {project.name}, opens in a new tab</span>
              </a>
              <button
                type="button"
                onClick={() => onOpen(project)}
                className="tap rounded-full border border-bone/25 px-5 py-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-bone transition-colors duration-300 hover:border-bone/60 ms:px-6 ms:text-xs"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- section */

export default function Projects() {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState<Project | null>(null);

  const onOpen = useCallback((p: Project) => setOpen(p), []);
  const onClose = useCallback(() => setOpen(null), []);

  useEffect(() => {
    const wrap = pin.current;
    const rail = track.current;
    if (!wrap || !rail) return;

    let ctx: { revert: () => void } | null = null;
    let detach: (() => void) | null = null;
    let cancelled = false;

    import('@/lib/gsap').then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        /* Wide desktop only: the sequence plays sideways under a pin. */
        mm.add('(min-width: 1280px) and (prefers-reduced-motion: no-preference)', () => {
          // Measured from the wrapper, not `100vw`: the viewport unit includes
          // the scrollbar, which would leave every panel a few px wider than
          // the space it has and push the last one out of alignment.
          const distance = () => Math.max(0, rail.scrollWidth - wrap.clientWidth);
          const steps = projects.length - 1;

          const drive = gsap.to(rail, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
              trigger: wrap,
              start: 'top top',
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              // Settle on whichever project is closest, so each one gets a
              // moment fully framed instead of always sitting half off-screen.
              snap: {
                snapTo: (value) => Math.round(value * steps) / steps,
                duration: { min: 0.15, max: 0.5 },
                delay: 0.06,
                ease: 'power2.out',
              },
              onUpdate: (self) => {
                // Written straight to the DOM: a scrub that calls setState
                // would re-render the whole section on every frame.
                if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
                if (counter.current) {
                  const i = Math.min(steps, Math.round(self.progress * steps));
                  counter.current.textContent = projects[i].index;
                }
              },
            },
          });

          // Screenshots drift against the travel — depth without a second pin.
          gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
            gsap.fromTo(
              el,
              { xPercent: 2.5 },
              {
                xPercent: -2.5,
                ease: 'none',
                scrollTrigger: {
                  trigger: el,
                  containerAnimation: drive,
                  start: 'left right',
                  end: 'right left',
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              },
            );
          });
        });

        /* Below xl — every tablet and phone — and for anyone asking for less
           motion, the same markup simply stacks and scrolls: no pin, no
           horizontal travel, nothing pinned to fight a thumb. */
      }, wrap);

      // Screenshots finishing late would otherwise leave the pin mis-measured.
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', onLoad);
      detach = () => window.removeEventListener('load', onLoad);
    });

    return () => {
      cancelled = true;
      detach?.();
      ctx?.revert();
    };
  }, []);

  return (
    <section id="work" aria-labelledby="work-title" className="relative">
      {/* Section intro */}
      <div className="shell pb-[clamp(28px,5vw,64px)] pt-section">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <p data-anim className="t-label text-accent">
              Selected work
            </p>
            <h2
              id="work-title"
              data-anim
              style={{ '--anim-d': '80ms' } as React.CSSProperties}
              className="t-h2 mt-3"
            >
              Seven builds,
              <br />
              front to back.
            </h2>
          </div>

          <p
            data-anim
            style={{ '--anim-d': '160ms' } as React.CSSProperties}
            className="max-w-[46ch] text-[0.92rem] text-muted"
          >
            Storefronts, dashboards and platforms — each one live, each one shipped. Every frame below is
            a capture of the running site; open any card for the full story.
          </p>
        </div>
      </div>

      {/* The journey. One set of markup: a horizontal rail once there is room
          for it, an ordinary vertical sequence when there is not. */}
      <div ref={pin} className="relative xl:h-[100svh] xl:overflow-hidden">
        <div
          ref={track}
          className="flex flex-col xl:h-full xl:flex-row xl:flex-nowrap xl:will-change-transform"
        >
          {projects.map((project) => (
            <div key={project.slug} className="w-full shrink-0 xl:h-full">
              <Card project={project} onOpen={onOpen} />
            </div>
          ))}
        </div>

        {/* Progress rail — only meaningful while the sequence runs sideways. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden items-center gap-4 px-gutter pb-5 xl:flex"
        >
          <span className="font-mono text-[0.7rem] text-bone">
            <span ref={counter}>01</span>
            <span className="text-bone/50"> / {projects[projects.length - 1].index}</span>
          </span>
          <span className="relative h-px flex-1 bg-bone/20">
            <span
              ref={bar}
              className="absolute inset-0 origin-left bg-bone"
              style={{ transform: 'scaleX(0)' }}
            />
          </span>
        </div>
      </div>

      <ProjectModal project={open} onClose={onClose} />
    </section>
  );
}
