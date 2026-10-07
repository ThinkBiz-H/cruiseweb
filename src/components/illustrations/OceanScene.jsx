import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { wavePath } from './svgUtils';
import Ship from './Ship.jsx';

const WAVES = [
  { y: 690, amp: 6, wavelength: 360, fill: '#7CC2F0', dur: 38, depth: 6 },
  { y: 728, amp: 9, wavelength: 480, fill: '#3E9BE3', dur: 30, depth: 12 },
  { y: 785, amp: 12, wavelength: 360, fill: '#1A7AD8', dur: 24, depth: 20 },
  { y: 845, amp: 16, wavelength: 480, fill: '#0B5ED7', dur: 18, depth: 30 },
];

const CLOUDS = [
  { x: 180, y: 150, s: 1.1, depth: 3 },
  { x: 620, y: 90, s: 0.8, depth: 2 },
  { x: 900, y: 230, s: 0.65, depth: 4 },
  { x: 1320, y: 330, s: 0.9, depth: 3 },
];

function Cloud({ x, y, s }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#fff">
      <ellipse cx="0" cy="0" rx="90" ry="26" opacity=".9" />
      <ellipse cx="-40" cy="-14" rx="44" ry="30" opacity=".95" />
      <ellipse cx="18" cy="-26" rx="52" ry="38" />
      <ellipse cx="66" cy="-8" rx="40" ry="24" opacity=".9" />
    </g>
  );
}

/**
 * Hero background: bright daytime sky, sun, drifting clouds, a ship on the
 * horizon and four GSAP-driven swell layers with pointer and scroll parallax.
 */
export default function OceanScene({ reduced }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-swell]').forEach((el) => {
        gsap.to(el, { x: -1440, duration: Number(el.dataset.dur), ease: 'none', repeat: -1 });
      });
      gsap.to('[data-ship]', { y: -5, rotation: 0.6, transformOrigin: '50% 100%', duration: 3.2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      gsap.to('[data-shimmer] rect', { opacity: 0.15, duration: 1.6, stagger: { each: 0.15, repeat: -1, yoyo: true }, ease: 'sine.inOut' });
      gsap.utils.toArray('[data-cloud]').forEach((el, i) => {
        gsap.to(el, { x: i % 2 ? -60 : 60, duration: 26 + i * 6, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      });

      // pointer parallax
      const layers = gsap.utils.toArray('[data-depth]').map((el) => ({
        x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' }),
        depth: Number(el.dataset.depth),
      }));
      const onMove = (e) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        layers.forEach((l) => { l.x(-nx * l.depth); l.y(-ny * l.depth * 0.4); });
      };
      window.addEventListener('pointermove', onMove, { passive: true });

      // scroll parallax
      gsap.to('[data-moon]', { yPercent: 40, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('[data-sky]', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });

      return () => window.removeEventListener('pointermove', onMove);
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={root} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg className="h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8FCBF5" />
            <stop offset="0.5" stopColor="#CFE8FB" />
            <stop offset="0.76" stopColor="#F4FAFF" />
          </linearGradient>
          <radialGradient id="hero-sunglow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FFF6D6" stopOpacity=".95" />
            <stop offset="0.35" stopColor="#FFE9A8" stopOpacity=".35" />
            <stop offset="1" stopColor="#FFE9A8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hero-horizon" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.7" stopColor="#ffffff" stopOpacity=".9" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g data-sky>
          <rect x="-80" y="-80" width="1600" height="1060" fill="url(#hero-sky)" />
        </g>

        <g data-moon data-depth="4">
          <circle cx="1190" cy="170" r="260" fill="url(#hero-sunglow)" />
          <circle cx="1190" cy="170" r="56" fill="#FFF8E1" />
        </g>

        {CLOUDS.map((c) => (
          <g key={c.x} data-depth={c.depth}>
            <g data-cloud><Cloud {...c} /></g>
          </g>
        ))}

        <g data-depth="3">
          <path d="M0 686 L60 676 L120 666 L170 672 L230 657 L300 669 L360 680 L420 686Z" fill="#9DB9D2" />
          <path d="M1240 686 L1290 672 L1330 664 L1380 674 L1440 678 L1440 686Z" fill="#9DB9D2" />
          <rect x="0" y="685" width="1440" height="2" fill="url(#hero-horizon)" />
        </g>

        <g data-shimmer data-depth="6">
          {Array.from({ length: 14 }, (_, i) => (
            <rect key={i} x={1190 - (40 + i * 9) / 2 + ((i * 37) % 21) - 10} y={700 + i * 11} width={40 + i * 9} height="2.5" rx="1.25" fill="#FFFFFF" opacity={0.75 - i * 0.04} />
          ))}
        </g>

        {WAVES.slice(0, 1).map((w) => (
          <g key={w.y} data-depth={w.depth}>
            <g transform="translate(-80 0)">
              <path data-swell data-dur={w.dur} d={wavePath({ ...w, width: 3040 })} fill={w.fill} opacity=".9" />
            </g>
          </g>
        ))}

        <g data-depth="10">
          <g data-ship>
            <Ship x={1090} y={716} scale={0.78} />
          </g>
        </g>

        {WAVES.slice(1).map((w) => (
          <g key={w.y} data-depth={w.depth}>
            <g transform="translate(-80 0)">
              <path data-swell data-dur={w.dur} d={wavePath({ ...w, width: 3040 })} fill={w.fill} />
              <path data-swell data-dur={w.dur} d={wavePath({ ...w, width: 3040, bottom: w.y + w.amp + 2 })} fill="none" stroke="#FFFFFF" strokeOpacity=".35" strokeWidth="1.5" />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
