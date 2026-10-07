import { m } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/** Fade + slide in once when scrolled into view. */
export function Reveal({ as = 'div', delay = 0, y = 28, x = 0, className, children, ...rest }) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.85, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Parent that staggers its <StaggerItem> children. */
export function Stagger({ as = 'div', stagger = 0.09, delay = 0, className, children, ...rest }) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({ as = 'div', className, children, ...rest }) {
  const Comp = m[as];
  return (
    <Comp className={className} variants={fadeUp} {...rest}>
      {children}
    </Comp>
  );
}
