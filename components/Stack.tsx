'use client';

import { stack } from '@/lib/data';

export default function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="relative section border-t border-line/60">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(55%_45%_at_80%_20%,rgba(255,77,46,0.10),transparent_70%)]"
      />

      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <p data-anim className="t-label text-accent">
              Stack
            </p>
            <h2
              id="stack-title"
              data-anim
              style={{ '--anim-d': '80ms' } as React.CSSProperties}
              className="t-h2 mt-3"
            >
              Tools I reach
              <br />
              for daily.
            </h2>
          </div>

          <p
            data-anim
            style={{ '--anim-d': '160ms' } as React.CSSProperties}
            className="max-w-[42ch] text-[0.92rem] text-muted"
          >
            Typed end to end, styled utility-first, deployed on Vercel — with accessibility and Core Web
            Vitals treated as part of the build, not a pass afterwards.
          </p>
        </div>

        <div className="mt-[clamp(28px,5vw,72px)] grid gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line ms:grid-cols-2 xl:grid-cols-3">
          {stack.map((group, i) => (
            <div
              key={group.group}
              data-anim
              style={{ '--anim-d': `${i * 70}ms` } as React.CSSProperties}
              className="group bg-ink p-[clamp(18px,2.6vw,32px)] transition-colors duration-500 hover:bg-surface"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-[clamp(1.05rem,2.4vw,1.35rem)] font-semibold text-bone">
                  {group.group}
                </h3>
                <span aria-hidden className="font-mono text-[0.62rem] text-faint">
                  0{i + 1}
                </span>
              </div>

              <ul className="mt-[clamp(12px,1.8vw,20px)] flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line/80 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted transition-colors duration-300 group-hover:border-accent/40 group-hover:text-bone ms:text-[0.68rem]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
