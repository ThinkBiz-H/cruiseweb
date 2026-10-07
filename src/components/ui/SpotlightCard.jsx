import { m } from 'framer-motion';
import usePointerSpotlight from '../../hooks/usePointerSpotlight';
import { cn } from '../../lib/cn';
import { fadeUp } from './Reveal.jsx';

/** White card with a soft shadow, a pointer-tracking border sheen and a lift on hover. */
export default function SpotlightCard({ as = 'div', className, children, variants = fadeUp, ...rest }) {
  const onMove = usePointerSpotlight();
  const Comp = m[as];
  return (
    <Comp
      variants={variants}
      onPointerMove={onMove}
      className={cn('spotlight card card-lift rounded-[20px]', className)}
      {...rest}
    >
      {children}
    </Comp>
  );
}
