/** Seamless sine-ish wave built from quadratic curves. width must be a multiple of wavelength. */
export function wavePath({ y, amp, wavelength, width = 2880, bottom = 900 }) {
  const half = wavelength / 2;
  let d = `M0 ${y}`;
  for (let x = 0, i = 0; x < width; x += half, i += 1) {
    const cy = i % 2 === 0 ? y - amp : y + amp;
    d += ` Q${x + half / 2} ${cy} ${x + half} ${y}`;
  }
  return `${d} L${width} ${bottom} L0 ${bottom} Z`;
}

/** Deterministic pseudo-random generator so SSR/CSR and re-renders match. */
export function seeded(seed = 7) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const safeId = (id) => id.replace(/[^a-zA-Z0-9_-]/g, '');
