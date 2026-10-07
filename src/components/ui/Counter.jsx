import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

/** Counts up from zero the first time it scrolls into view. */
export default function Counter({ value, decimals = 0, prefix = '', suffix = '', duration = 2.2, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const format = (n) =>
    `${prefix}${n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;

  useEffect(() => {
    if (!inView || !ref.current) return undefined;
    const node = ref.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.textContent = format(value);
      return undefined;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { node.textContent = format(v); },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true">{format(0)}</span>
      <span className="sr-only">{format(value)}</span>
    </span>
  );
}
