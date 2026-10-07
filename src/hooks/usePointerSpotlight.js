import { useCallback } from 'react';

/** Writes pointer coordinates to --mx / --my so .spotlight cards can glow under the cursor. */
export default function usePointerSpotlight() {
  return useCallback((event) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }, []);
}
