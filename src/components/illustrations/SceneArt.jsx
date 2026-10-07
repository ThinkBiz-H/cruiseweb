import { useId } from 'react';
import { safeId, wavePath } from './svgUtils';

const PALETTES = {
  tropic: { sky: ['#4DB2EE', '#C4E8FB'], sun: '#FFF3C4', sea: ['#1E9BD7', '#0B5ED7'] },
  sunset: { sky: ['#F59E6B', '#FFDDB0'], sun: '#FFF4D6', sea: ['#3B7FC4', '#1C4F8C'] },
  polar: { sky: ['#78B4DE', '#E2F1FB'], sun: '#FFFFFF', sea: ['#2F7FB8', '#174E7A'] },
  river: { sky: ['#8CC4EA', '#F6E4C2'], sun: '#FFF1CF', sea: ['#4A8DB3', '#2A5F80'] },
  harbour: { sky: ['#4FA3E3', '#D2EAFB'], sun: '#FFF6D8', sea: ['#1A78C2', '#0D4F8F'] },
  lagoon: { sky: ['#3FBFD8', '#CDF3F3'], sun: '#FFF8DE', sea: ['#1FB5B0', '#0E7F96'] },
  fjord: { sky: ['#6FA8D6', '#E0EEF8'], sun: '#FFFFFF', sea: ['#2C6E9E', '#16486E'] },
};

function Landforms({ scene, id }) {
  switch (scene) {
    case 'tropic':
      return (
        <g>
          <ellipse cx="300" cy="168" rx="90" ry="14" fill="#2E8B57" />
          <path d="M296 166 Q300 120 318 98" stroke="#2F5D3A" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M318 98 q-30 -6 -44 10 M318 98 q-8 -26 -34 -26 M318 98 q22 -20 44 -10 M318 98 q30 4 38 26 M318 98 q4 -30 22 -38" stroke="#2F5D3A" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M40 170 Q90 140 150 168Z" fill="#3A9A63" />
        </g>
      );
    case 'sunset':
      return (
        <g>
          <path d="M0 170 L0 110 L40 100 L70 112 L110 92 L150 120 L170 170Z" fill="#B0735A" />
          {[[22, 96], [48, 92], [74, 100], [100, 86], [126, 104]].map(([x, y]) => (
            <rect key={x} x={x} y={y} width="16" height="14" rx="2" fill="#E8C9A6" />
          ))}
          {[[26, 100], [52, 96], [104, 90]].map(([x, y]) => <rect key={`w${x}`} x={x} y={y} width="4" height="4" fill="#F6D5A8" opacity=".8" />)}
          <path d="M290 170 L340 132 L380 146 L400 128 L400 170Z" fill="#B0735A" />
        </g>
      );
    case 'polar':
      return (
        <g>
          <path d={`M0 60 Q100 20 200 70 T400 40`} stroke="#8FD6CB" strokeOpacity=".5" strokeWidth="18" fill="none" filter={`url(#${id}-blur)`} />
          <path d="M60 172 L100 120 L128 138 L160 104 L210 172Z" fill="#DDEBF2" />
          <path d="M100 120 L128 138 L120 172 L84 172Z" fill="#A9C6D6" />
          <path d="M160 104 L210 172 L170 172Z" fill="#A9C6D6" />
          <path d="M270 172 L300 146 L332 158 L350 172Z" fill="#C9DEE8" />
        </g>
      );
    case 'river':
      return (
        <g>
          <path d="M0 170 L0 120 L30 120 L30 100 L44 80 L58 100 L58 120 L100 120 L100 108 L130 108 L130 124 L170 124 L170 112 L184 92 L198 112 L198 124 L240 124 L240 170Z" fill="#5B6E82" />
          <path d="M240 170 Q300 110 360 170" stroke="#5B6E82" strokeWidth="10" fill="none" />
          <path d="M230 170 L230 150 M370 170 L370 150" stroke="#5B6E82" strokeWidth="10" />
          {[40, 112, 150, 186].map((x) => <rect key={x} x={x} y="128" width="4" height="5" fill="#F6E6C6" opacity=".8" />)}
        </g>
      );
    case 'harbour':
      return (
        <g>
          <path d="M0 172 L0 140 L40 140 L40 120 L70 120 L70 132 L110 132 L110 108 L140 108 L140 172Z" fill="#33506E" />
          {[10, 22, 48, 58, 80, 94, 118, 128].map((x, i) => <rect key={x} x={x} y={i % 2 ? 126 : 146} width="4" height="4" fill="#E2BF86" opacity=".85" />)}
          <rect x="330" y="100" width="14" height="72" fill="#EAF2F5" />
          <rect x="330" y="116" width="14" height="8" fill="#F0A58F" />
          <rect x="330" y="136" width="14" height="8" fill="#F0A58F" />
          <path d="M326 100 L348 100 L337 88Z" fill="#33506E" />
          <path d={`M337 94 L210 70 L210 118Z`} fill="#F3E3C3" opacity=".12" />
          <circle cx="337" cy="94" r="4" fill="#F3E3C3" />
        </g>
      );
    case 'lagoon':
      return (
        <g>
          {[60, 130, 200, 270].map((x) => (
            <g key={x}>
              <path d={`M${x - 22} 150 L${x} 132 L${x + 22} 150Z`} fill="#3B2A1E" />
              <rect x={x - 16} y="150" width="32" height="12" fill="#5A4130" />
              <path d={`M${x - 12} 162 L${x - 12} 176 M${x + 12} 162 L${x + 12} 176`} stroke="#3B2A1E" strokeWidth="2" />
            </g>
          ))}
          <path d="M40 168 L300 168" stroke="#3B2A1E" strokeWidth="2" />
        </g>
      );
    case 'fjord':
      return (
        <g>
          <path d="M0 172 L0 40 L60 70 L120 172Z" fill="#3E5F78" />
          <path d="M400 172 L400 30 L330 80 L270 172Z" fill="#2F4E66" />
          <path d="M60 70 L72 76 L50 62Z" fill="#EAF2F5" opacity=".8" />
          <path d="M330 80 L345 70 L320 88Z" fill="#EAF2F5" opacity=".8" />
          <path d="M104 120 L106 172" stroke="#DDEBF2" strokeWidth="2" opacity=".7" />
        </g>
      );
    default:
      return null;
  }
}

/** Original vector "postcard" for a destination or cruise type. Inline, zero network cost. */
export default function SceneArt({ scene = 'tropic', className, label }) {
  const id = safeId(useId());
  const p = PALETTES[scene] || PALETTES.tropic;
  const sunPos = { tropic: [110, 80], sunset: [230, 126], polar: [320, 50], river: [300, 96], harbour: [70, 46], lagoon: [320, 66], fjord: [200, 60] }[scene] || [200, 80];
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.sky[0]} />
          <stop offset="1" stopColor={p.sky[1]} />
        </linearGradient>
        <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.sea[0]} />
          <stop offset="1" stopColor={p.sea[1]} />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor={p.sun} stopOpacity=".7" />
          <stop offset="1" stopColor={p.sun} stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-blur`}><feGaussianBlur stdDeviation="8" /></filter>
      </defs>
      <rect width="400" height="260" fill={`url(#${id}-sky)`} />
      <circle cx={sunPos[0]} cy={sunPos[1]} r="70" fill={`url(#${id}-glow)`} />
      <circle cx={sunPos[0]} cy={sunPos[1]} r="20" fill={p.sun} />
      <Landforms scene={scene} id={id} />
      <rect y="170" width="400" height="90" fill={`url(#${id}-sea)`} />
      <path d={wavePath({ y: 190, amp: 3, wavelength: 80, width: 400, bottom: 260 })} fill="#0B1F3A" opacity=".08" />
      <path d={wavePath({ y: 214, amp: 4, wavelength: 100, width: 400, bottom: 260 })} fill="#0B1F3A" opacity=".1" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={sunPos[0] - 22 + i * 3} y={176 + i * 10} width={44 - i * 6} height="2" rx="1" fill={p.sun} opacity={0.5 - i * 0.08} />
      ))}
    </svg>
  );
}
