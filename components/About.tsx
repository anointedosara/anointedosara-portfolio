'use client';

import Image from 'next/image';

import { SITE, stats } from '@/lib/data';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative section">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5] [background:radial-gradient(60%_50%_at_20%_0%,rgba(108,92,231,0.12),transparent_70%)]"
      />

      <div className="shell">
        <p data-anim className="t-label text-accent">
          About
        </p>

        <div className="mt-[clamp(20px,3vw,40px)] grid gap-[clamp(28px,5vw,80px)] lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start">
          {/* Portrait. Capped on phones so it never eats the whole screen. */}
          <div
            data-anim
            className="relative mx-auto w-full max-w-[min(100%,340px)] lg:sticky lg:top-28 lg:max-w-none"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius)] border border-line">
              <Image
                src="/images/anointed-osara.jpg"
                alt="Anointed Osara"
                fill
                sizes="(min-width: 1024px) 34vw, (min-width: 600px) 60vw, 84vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <span className="t-label text-bone">{SITE.short}</span>
              <span className="t-label text-faint">{SITE.sub}</span>
            </div>
          </div>

          <div>
            <h2
              id="about-title"
              data-anim
              style={{ '--anim-d': '80ms' } as React.CSSProperties}
              className="t-h2 max-w-[18ch]"
            >
              I build the front of the product, and the parts behind it that it needs.
            </h2>

            <div className="mt-[clamp(20px,3vw,40px)] space-y-[clamp(14px,2vw,22px)]">
              {SITE.bio.map((line, i) => (
                <p
                  key={i}
                  data-anim
                  style={{ '--anim-d': `${140 + i * 80}ms` } as React.CSSProperties}
                  className="t-lead max-w-measure text-muted"
                >
                  {line}
                </p>
              ))}
            </div>

            <dl className="mt-[clamp(28px,4vw,56px)] grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line xs:grid-cols-3">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  data-anim
                  style={{ '--anim-d': `${i * 70}ms` } as React.CSSProperties}
                  className="bg-ink px-[clamp(14px,2vw,24px)] py-[clamp(16px,2.4vw,28px)]"
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-[clamp(1.75rem,5vw,2.75rem)] font-bold leading-none text-bone">
                      {s.value}
                    </span>
                    <span className="mt-2 block font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint ms:text-[0.68rem]">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
