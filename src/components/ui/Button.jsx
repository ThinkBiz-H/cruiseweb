import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';
import { preloadRoute } from '../../app/routes.jsx';

const VARIANTS = {
  primary:
    'text-white bg-brass shadow-blue hover:bg-brass-deep hover:shadow-[0_18px_36px_-12px_rgba(11,94,215,0.65)] hover:-translate-y-0.5',
  secondary:
    'bg-white text-foam border border-line shadow-soft hover:border-brass/40 hover:text-brass hover:-translate-y-0.5',
  ghost: 'text-foam hover:bg-tide',
  sea: 'text-white bg-seaglass hover:bg-[#0b5f76] hover:-translate-y-0.5',
  white: 'bg-white text-brass shadow-soft hover:bg-tide hover:-translate-y-0.5',
};

const SIZES = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.95rem]',
  lg: 'h-14 px-8 text-base',
};

/**
 * Pill button with an ink ripple. Renders a router Link (`to`), an anchor (`href`) or a <button>.
 */
export default function Button({ to, href, variant = 'primary', size = 'md', className, children, icon: Icon, iconLeft: IconLeft, onPointerDown, ...rest }) {
  const handlePointerDown = useCallback(
    (e) => {
      onPointerDown?.(e);
      const host = e.currentTarget;
      const rect = host.getBoundingClientRect();
      const d = Math.max(rect.width, rect.height) * 2.2;
      const ink = document.createElement('span');
      ink.className = 'ripple-ink';
      ink.style.width = ink.style.height = `${d}px`;
      ink.style.left = `${e.clientX - rect.left}px`;
      ink.style.top = `${e.clientY - rect.top}px`;
      host.appendChild(ink);
      ink.addEventListener('animationend', () => ink.remove(), { once: true });
    },
    [onPointerDown],
  );

  const classes = cn(
    'relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-[-0.005em] whitespace-nowrap',
    'transition-[transform,box-shadow,background-color] duration-300 ease-[var(--ease-tide)] active:translate-y-0 disabled:pointer-events-none disabled:opacity-50',
    VARIANTS[variant],
    SIZES[size],
    className,
  );

  const content = (
    <>
      {IconLeft && <IconLeft className="h-4 w-4 shrink-0" aria-hidden="true" />}
      <span className="relative">{children}</span>
      {Icon && <Icon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-0.5" aria-hidden="true" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cn(classes, 'group/btn')} onPointerDown={handlePointerDown} onMouseEnter={() => preloadRoute(to)} onFocus={() => preloadRoute(to)} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cn(classes, 'group/btn')} onPointerDown={handlePointerDown} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={cn(classes, 'group/btn')} onPointerDown={handlePointerDown} {...rest}>
      {content}
    </button>
  );
}
