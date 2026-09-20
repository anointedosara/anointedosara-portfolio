/**
 * Runs during HTML parse, before first paint. Elements that GSAP animates in
 * are only pre-hidden once we know JS is alive and motion is welcome — so a
 * no-JS visitor, or one who asked for reduced motion, sees the page in full.
 */
const flag = `(function(){try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-motion')}}catch(e){}})();`;

export default function MotionFlag() {
  return <script dangerouslySetInnerHTML={{ __html: flag }} />;
}
