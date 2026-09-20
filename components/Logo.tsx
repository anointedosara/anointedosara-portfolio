/**
 * The AIO monogram — Anointed Ihinosen Osara.
 *
 * Drawn rather than typeset, so it keeps its proportions at any size and in
 * any font-loading state. Three initials on one 32-unit cap height:
 *
 *   A   a filled outline with a flat apex and a trapezoid crossbar, cut to
 *       follow the letter's own diagonals so the bar's ends stay flush
 *   I   a plain bar in the accent — the only colour in the mark, and the only
 *       part that moves on hover
 *   O   a ring, stroked slightly lighter than the A's stem (4.3 against 4.6)
 *       and overshooting the cap line top and bottom, because a circle set to
 *       the same metrics as a flat letter always reads heavier and shorter
 *
 * The A and O take `currentColor`, so the mark inherits whatever the link
 * around it is doing — including hover and focus states.
 */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 76 40"
      fill="none"
      aria-hidden
      focusable="false"
      className={className}
    >
      {/* A */}
      <path d="M10.5 4 H15.5 L26 36 H21 L13 11.62 L5 36 H0 Z" fill="currentColor" />
      <path d="M3.87 24.2 H22.13 L23.64 28.8 H2.36 Z" fill="currentColor" />
      {/* I */}
      <rect className="logo-i" x="32.6" y="4" width="4.2" height="32" fill="rgb(var(--accent))" />
      {/* O */}
      <circle cx="59.4" cy="20" r="14.45" stroke="currentColor" strokeWidth="4.3" />
    </svg>
  );
}
