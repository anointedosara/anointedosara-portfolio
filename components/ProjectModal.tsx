'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

import type { Project } from '@/lib/data';

/**
 * Detail view for one project. The cards on the rail stay deliberately spare —
 * a screenshot, a name, a line — and everything else lives here, so the
 * sequence reads cleanly and nobody has to choose between a calm card and a
 * complete one.
 *
 * It is one scrolling column: the shot sits in a tinted band at the top, the
 * writing follows underneath, and the close button rides along at the top
 * right so it is always reachable.
 *
 * While it is open the page underneath is frozen: Lenis is stopped so the
 * pinned rail cannot scroll away behind the dialog, and the body is locked.
 */
export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;

    restoreTo.current = document.activeElement as HTMLElement | null;

    const { body } = document;
    const prevOverflow = body.style.overflow;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    // Lenis keeps its own scroll loop running; without this the rail would
    // slide under the dialog on a trackpad flick.
    window.__lenis?.stop();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel.current) return;

      const focusables = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
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
    const t = window.setTimeout(() => closeBtn.current?.focus(), 80);

    return () => {
      document.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = '';
      window.__lenis?.start();
      restoreTo.current?.focus?.();
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[160] flex items-end justify-center ms:items-center"
    >
      <button
        type="button"
        aria-label="Close project details"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/85 backdrop-blur-xl motion-safe:animate-[fade_0.3s_ease-out]"
      />

      {/* One scroll container for the whole dialog. `data-lenis-prevent` is how
          Lenis is told to leave a nested scroller alone — without it the wheel
          is swallowed document-wide and this never scrolls. */}
      <div
        ref={panel}
        data-lenis-prevent
        className="relative max-h-[94svh] w-full max-w-[min(100%,1040px)] overflow-y-auto overscroll-contain rounded-t-[var(--radius)] border border-line/80 bg-ink motion-safe:animate-[sheet_0.42s_cubic-bezier(0.22,1,0.36,1)] ms:mx-gutter ms:max-h-[90svh] ms:rounded-[var(--radius)]"
      >
        {/* Rides at the top of the scroller, so closing is always one click. */}
        <div className="pointer-events-none sticky top-0 z-10 flex justify-end p-[clamp(12px,2vw,20px)]">
          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            className="tap pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-line bg-ink/80 text-bone backdrop-blur-md transition-colors hover:border-accent hover:text-accent ms:h-14 ms:w-14"
          >
            <span className="sr-only">Close</span>
            <span aria-hidden className="relative block h-5 w-5">
              <span className="absolute left-0 top-1/2 block h-px w-5 rotate-45 bg-current" />
              <span className="absolute left-0 top-1/2 block h-px w-5 -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        {/* The shot, framed by the project's own colour. -mt pulls the band up
            under the close button, which is floating over it. */}
        <div
          className="-mt-[clamp(60px,9vw,84px)] px-[clamp(14px,3vw,40px)] pb-[clamp(14px,3vw,40px)] pt-[clamp(60px,9vw,84px)]"
          style={{ backgroundColor: project.panelBg }}
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[calc(var(--radius)*0.7)] shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)]">
            <Image
              src={project.image}
              alt={`${project.name} — full screen`}
              fill
              sizes="(min-width: 1040px) 980px, 92vw"
              className="object-contain"
            />
          </div>
        </div>

        {/* The writing */}
        <div className="px-[clamp(20px,4vw,56px)] pb-[clamp(28px,4vw,56px)] pt-[clamp(24px,4vw,44px)]">
          <p className="t-label" style={{ color: project.accent }}>
            {project.index} — {project.kind}
          </p>

          <h2
            id="project-modal-title"
            className="mt-[clamp(10px,1.6vw,18px)] font-display text-[clamp(1.75rem,5.6vw,3.25rem)] font-bold leading-[0.98] tracking-[-0.03em] text-bone"
          >
            {project.name}
          </h2>

          <p className="mt-[clamp(12px,2vw,20px)] t-lead max-w-measure text-bone/80">
            {project.summary}
          </p>

          <p className="mt-[clamp(10px,1.4vw,16px)] max-w-measure text-[0.92rem] leading-relaxed text-muted">
            {project.detail}
          </p>

          <ul className="mt-[clamp(16px,2.4vw,26px)] flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line px-4 py-2 text-[0.8rem] text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          <ul className="mt-[clamp(18px,2.6vw,30px)] grid gap-x-8 gap-y-2 ms:grid-cols-2">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[0.9rem] text-muted">
                <span
                  aria-hidden
                  className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full"
                  style={{ backgroundColor: project.accent }}
                />
                {f}
              </li>
            ))}
          </ul>

          <hr className="mt-[clamp(20px,3vw,36px)] border-0 border-t border-line" />

          <div className="mt-[clamp(18px,2.6vw,30px)] flex flex-wrap items-center gap-3">
            {/* Pill with a circular arrow badge, as in the reference. */}
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="tap group gap-4 rounded-full border border-line py-1.5 pl-6 pr-1.5 text-bone transition-colors hover:border-bone/50"
            >
              <span className="text-[0.95rem]">Visit website</span>
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full text-[1.05rem] text-ink transition-transform duration-300 ease-out group-hover:scale-[1.08]"
                style={{ backgroundColor: project.accent }}
              >
                &#8599;
              </span>
              <span className="sr-only"> — {project.name}, opens in a new tab</span>
            </a>

            <a
              href={project.code}
              target="_blank"
              rel="noreferrer"
              className="tap rounded-full border border-line px-6 py-3 text-[0.95rem] text-bone transition-colors hover:border-bone/50"
            >
              View code
              <span className="sr-only"> for {project.name}, opens in a new tab</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
