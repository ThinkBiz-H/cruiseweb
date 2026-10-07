import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';

export function LogoMark({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="lm-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2F80ED" />
          <stop offset="1" stopColor="#0B5ED7" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill="url(#lm-bg)" />
      <circle cx="24" cy="19" r="7.5" fill="none" stroke="#fff" strokeWidth="2.4" />
      <path d="M24 7.5v2.5M13 19h2.5M32.5 19H35" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".7" />
      <path d="M8 31c4 0 4-3 8-3s4 3 8 3 4-3 8-3 4 3 8 3" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M11 37.5c3.25 0 3.25-2.5 6.5-2.5s3.25 2.5 6.5 2.5 3.25-2.5 6.5-2.5 3.25 2.5 6.5 2.5" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ className, onClick, tone = 'dark' }) {
  return (
    <Link to="/" onClick={onClick} className={cn('group inline-flex items-center gap-2.5', className)} aria-label="Maristella Voyages, home">
      <LogoMark className="h-10 w-10 transition-transform duration-500 ease-[var(--ease-tide)] group-hover:-rotate-6" />
      <span className="flex flex-col leading-none">
        <span className={cn('text-[1.3rem] font-extrabold tracking-[-0.03em]', tone === 'light' ? 'text-white' : 'text-foam')}>Maristella</span>
        <span className={cn('mt-1 text-[0.66rem] font-bold tracking-[0.22em] uppercase', tone === 'light' ? 'text-white/60' : 'text-brass')}>Voyages</span>
      </span>
    </Link>
  );
}
