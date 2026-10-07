import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { scrollToTarget } from '../../lib/smoothScroll';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <m.button
          type="button"
          onClick={() => scrollToTarget(0)}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="glass-strong fixed right-5 bottom-5 z-[90] flex h-12 w-12 items-center justify-center rounded-full text-brass sm:right-8 sm:bottom-8"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </m.button>
      )}
    </AnimatePresence>
  );
}
