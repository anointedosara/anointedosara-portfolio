'use client';

import { SITE } from '@/lib/data';

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative section border-t border-line/60">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(70%_60%_at_50%_100%,rgba(255,77,46,0.16),transparent_70%)]"
      />

      <div className="shell">
        <p data-anim className="t-label text-accent">
          Contact
        </p>

        <h2
          id="contact-title"
          data-anim
          style={{ '--anim-d': '80ms' } as React.CSSProperties}
          className="mt-[clamp(14px,2vw,24px)] font-display font-extrabold uppercase leading-[0.86] tracking-[-0.035em]"
        >
          <span className="block" style={{ fontSize: 'clamp(2.5rem, 11vw, 9rem)' }}>
            Let&apos;s build
          </span>
          <span className="block text-faint" style={{ fontSize: 'clamp(2.5rem, 11vw, 9rem)' }}>
            something
          </span>
        </h2>

        <div className="mt-[clamp(24px,4vw,56px)] grid gap-[clamp(24px,4vw,64px)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
          <div>
            <p
              data-anim
              style={{ '--anim-d': '160ms' } as React.CSSProperties}
              className="t-lead max-w-measure text-muted"
            >
              Open to frontend and full-stack roles, and to freelance builds. The fastest way to reach me is
              email — I reply to everything.
            </p>

            <a
              data-anim
              style={{ '--anim-d': '240ms' } as React.CSSProperties}
              href={`mailto:${SITE.email}`}
              className="tap mt-[clamp(18px,3vw,36px)] inline-flex max-w-full items-center break-all font-display text-[clamp(1.15rem,4.6vw,2.5rem)] font-semibold leading-tight text-bone underline decoration-accent decoration-[2px] underline-offset-[8px] transition-colors duration-300 hover:text-accent"
            >
              {SITE.email}
            </a>
          </div>

          <dl
            data-anim
            style={{ '--anim-d': '300ms' } as React.CSSProperties}
            className="grid gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line xs:grid-cols-2 lg:grid-cols-1"
          >
            <div className="bg-ink px-[clamp(16px,2.2vw,26px)] py-[clamp(14px,2vw,22px)]">
              <dt className="t-label text-faint">Phone</dt>
              <dd className="mt-2">
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="tap min-w-[44px] justify-center px-2 text-[0.95rem] text-bone transition-colors hover:text-accent"
                >
                  {SITE.phone}
                </a>
              </dd>
            </div>

            <div className="bg-ink px-[clamp(16px,2.2vw,26px)] py-[clamp(14px,2vw,22px)]">
              <dt className="t-label text-faint">Based in</dt>
              <dd className="mt-2 text-[0.95rem] text-bone">{SITE.location}</dd>
            </div>

            <div className="bg-ink px-[clamp(16px,2.2vw,26px)] py-[clamp(14px,2vw,22px)] xs:col-span-2 lg:col-span-1">
              <dt className="t-label text-faint">Elsewhere</dt>
              <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                {SITE.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="tap min-w-[44px] justify-center px-2 text-[0.95rem] text-bone transition-colors hover:text-accent"
                  >
                    {s.label}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        <div
          data-anim
          style={{ '--anim-d': '360ms' } as React.CSSProperties}
          className="mt-[clamp(24px,4vw,56px)] flex flex-wrap items-center gap-3 ms:gap-4"
        >
          <a
            href={`mailto:${SITE.email}`}
            className="tap rounded-full bg-accent px-6 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink transition-transform duration-300 ease-out hover:scale-[1.03] ms:px-8 ms:text-xs"
          >
            Start a conversation
          </a>
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
    </section>
  );
}
