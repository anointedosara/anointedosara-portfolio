'use client';

import { marqueeWords } from '@/lib/data';

/**
 * A single strip of vocabulary between the hero and the work. The content is
 * duplicated once and the track slides exactly half its width, so the loop is
 * seamless; `motion-safe` keeps it perfectly still under reduced motion.
 */
export default function Marquee() {
  const run = [...marqueeWords, ...marqueeWords];

  return (
    <div
      aria-hidden
      className="relative flex overflow-hidden border-y border-line/70 bg-surface/40 py-[clamp(12px,2vw,22px)]"
    >
      <div className="flex w-max shrink-0 items-center motion-safe:animate-[marquee_38s_linear_infinite] tb:motion-safe:animate-[marquee_52s_linear_infinite]">
        {run.map((word, i) => (
          <span key={`${word}-${i}`} className="flex items-center">
            <span className="whitespace-nowrap px-[clamp(14px,2.5vw,32px)] font-display text-[clamp(1.1rem,3.2vw,2rem)] font-semibold text-bone/70">
              {word}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" />
          </span>
        ))}
      </div>
    </div>
  );
}
