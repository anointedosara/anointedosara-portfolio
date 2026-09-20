'use client';

import { SITE } from '@/lib/data';
import { scrollToId } from '@/lib/scroll';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer
      className="border-t border-line/60 bg-surface/30"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + clamp(20px, 3vw, 32px))' }}
    >
      <div className="shell flex flex-col gap-[clamp(16px,2.5vw,28px)] pt-[clamp(24px,4vw,44px)] tb:flex-row tb:items-center tb:justify-between">
        <div>
          <Logo className="h-[clamp(24px,3.4vw,30px)] w-auto text-bone" />
          <p className="mt-[clamp(11px,1.6vw,18px)] font-display text-[clamp(1.05rem,3vw,1.4rem)] font-bold text-bone">
            {SITE.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-[0.82rem] text-faint">
            {SITE.role} — {SITE.sub}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 tb:justify-end">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {SITE.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="tap t-label text-muted transition-colors hover:text-accent justify-center px-2 min-w-[44px]"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => scrollToId('top')}
            className="tap t-label text-muted transition-colors hover:text-bone"
          >
            Back to top &#8599;
          </button>
        </div>
      </div>

      <div className="shell mt-[clamp(16px,2.5vw,28px)] border-t border-line/60 pt-4">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint">
          &copy; {new Date().getFullYear()} {SITE.short} — Built with Next.js, TypeScript and GSAP
        </p>
      </div>
    </footer>
  );
}
