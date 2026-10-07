let lenis = null;

export const setLenis = (instance) => { lenis = instance; };
export const getLenis = () => lenis;

const HEADER_OFFSET = -96;

/** Scroll to a number, selector, or element — through Lenis when it is running. */
export function scrollToTarget(target, { immediate = false } = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (target !== 0 && !el && typeof target !== 'number') return;
  if (lenis) {
    lenis.scrollTo(typeof target === 'number' ? target : el, { offset: typeof target === 'number' ? 0 : HEADER_OFFSET, immediate, duration: 1.2 });
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: immediate ? 'instant' : 'smooth' });
  } else {
    const y = el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
    window.scrollTo({ top: y, behavior: immediate ? 'instant' : 'smooth' });
  }
}
