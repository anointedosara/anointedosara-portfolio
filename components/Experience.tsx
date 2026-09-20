'use client';

import { experience } from '@/lib/data';

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative border-t border-line/60 pt-section pb-[clamp(40px,5vw,88px)]">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <p data-anim className="t-label text-accent">
              Experience
            </p>
            <h2
              id="experience-title"
              data-anim
              style={{ '--anim-d': '80ms' } as React.CSSProperties}
              className="t-h2 mt-3"
            >
              Where I have
              <br />
              been building.
            </h2>
          </div>
        </div>

        <ol className="mt-[clamp(28px,5vw,72px)]">
          {experience.map((item, i) => (
            <li
              key={`${item.org}-${item.period}`}
              data-anim
              style={{ '--anim-d': `${i * 90}ms` } as React.CSSProperties}
              className="group border-t border-line py-[clamp(20px,3vw,40px)] last:border-b"
            >
              <div className="grid gap-[clamp(10px,2vw,40px)] lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent ms:text-[0.72rem]">
                    {item.period}
                  </p>
                  <p className="mt-2 font-display text-[clamp(1.2rem,3.4vw,1.75rem)] font-semibold leading-tight text-bone">
                    {item.org}
                  </p>
                  <p className="mt-1 text-[0.85rem] text-faint">{item.place}</p>
                </div>

                <div>
                  <h3 className="t-h3 text-bone">{item.role}</h3>
                  <ul className="mt-[clamp(10px,1.6vw,18px)] space-y-2.5">
                    {item.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[0.9rem] text-muted ms:text-[0.95rem]">
                        <span aria-hidden className="mt-[0.62em] h-px w-4 shrink-0 bg-line" />
                        <span className="max-w-measure">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
