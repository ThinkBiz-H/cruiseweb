/** Original stylised small expedition ship, bow facing left. Waterline at y=0. */
export default function Ship({ x = 0, y = 0, scale = 1, className }) {
  const lowerWindows = Array.from({ length: 18 }, (_, i) => 50 + i * 12.5);
  const upperWindows = Array.from({ length: 13 }, (_, i) => 80 + i * 13);
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className={className}>
      {/* reflection on the water */}
      <g opacity=".35">
        {lowerWindows.filter((_, i) => i % 2 === 0).map((wx) => (
          <rect key={`r${wx}`} x={wx} y={6} width="4" height={10 + (wx % 7)} rx="2" fill="#FFFFFF" opacity=".6" />
        ))}
      </g>
      <path d="M2 -28 L304 -28 L296 -7 Q293 0 282 0 L30 0 Q15 0 8 -11 Z" fill="#0B1F3A" />
      <path d="M2 -28 L304 -28" stroke="#FFFFFF" strokeOpacity=".7" strokeWidth="1.5" />
      <path d="M22 -9 L290 -9" stroke="#0B5ED7" strokeWidth="2.5" />
      <rect x="36" y="-50" width="250" height="22" rx="5" fill="#FFFFFF" />
      <rect x="70" y="-68" width="196" height="18" rx="5" fill="#F3F7FC" />
      <rect x="74" y="-82" width="70" height="14" rx="4" fill="#E6EEF8" />
      <rect x="78" y="-79" width="62" height="5" rx="2" fill="#0B1F3A" opacity=".55" />
      <path d="M196 -68 L203 -98 L233 -98 L238 -68 Z" fill="#0B5ED7" />
      <path d="M201 -88 L235 -88 L236 -82 L200 -82 Z" fill="#FFFFFF" />
      <path d="M110 -82 L110 -106 M110 -100 L124 -100" stroke="#55657C" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="110" cy="-108" r="2.4" fill="#D9472F" className="animate-twinkle" />
      {lowerWindows.map((wx, i) => (
        <rect key={`l${wx}`} x={wx} y="-43" width="7" height="6" rx="1.5" fill="#1C4F8C" opacity={i % 5 === 3 ? 0.35 : 0.8} />
      ))}
      {upperWindows.map((wx, i) => (
        <rect key={`u${wx}`} x={wx} y="-63" width="8" height="6" rx="1.5" fill="#1C4F8C" opacity={i % 4 === 1 ? 0.35 : 0.75} />
      ))}
    </g>
  );
}
