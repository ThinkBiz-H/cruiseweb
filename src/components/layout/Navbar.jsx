import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import Button from '../ui/Button.jsx';
import MegaMenu from './MegaMenu.jsx';
import MobileMenu from './MobileMenu.jsx';
import { MEGA_MENU, NAV_LINKS } from '../../data/navigation';
import { SITE } from '../../data/site';
import { preloadRoute } from '../../app/routes.jsx';
import { getLenis } from '../../lib/smoothScroll';
import { cn } from '../../lib/cn';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);
  const hoverOpenedAt = useRef(0);
  const megaWrap = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close menus on route change
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // lock scroll while the mobile menu is open
  useEffect(() => {
    const lenis = getLenis();
    if (mobileOpen) {
      lenis?.stop();
      document.documentElement.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.documentElement.style.overflow = '';
    }
  }, [mobileOpen]);

  // Esc closes, click outside closes the mega menu
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setMegaOpen(false); setMobileOpen(false); }
    };
    const onDown = (e) => {
      if (megaWrap.current && !megaWrap.current.contains(e.target)) setMegaOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('pointerdown', onDown); };
  }, []);

  const openMega = () => { clearTimeout(closeTimer.current); hoverOpenedAt.current = Date.now(); setMegaOpen(true); };
  const closeMegaSoon = () => { clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setMegaOpen(false), 160); };

  const linkClass = ({ isActive }) =>
    cn('relative isolate rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors', isActive ? 'text-brass' : 'text-foam/75 hover:text-brass');

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      <div
        className={cn(
          'transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500',
          scrolled || mobileOpen
            ? 'border-b border-line bg-white/90 shadow-[0_8px_30px_-12px_rgba(11,31,58,0.15)] backdrop-blur-xl backdrop-saturate-150'
            : 'border-b border-transparent bg-white/0',
        )}
      >
        <div className="container-x relative flex h-[72px] items-center justify-between gap-6 lg:h-20">
          <Logo onClick={() => setMobileOpen(false)} />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <li ref={megaWrap} onMouseEnter={openMega} onMouseLeave={closeMegaSoon}>
                <button
                  type="button"
                  aria-expanded={megaOpen}
                  aria-controls="mega-menu"
                  onClick={() => { if (Date.now() - hoverOpenedAt.current < 450) { setMegaOpen(true); return; } setMegaOpen((v) => !v); }}
                  onFocus={() => preloadRoute('/services')}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors',
                    megaOpen || pathname.startsWith('/services') ? 'text-brass' : 'text-foam/75 hover:text-brass',
                  )}
                >
                  {MEGA_MENU.label}
                  <ChevronDown className={cn('h-4 w-4 transition-transform duration-300', megaOpen && 'rotate-180')} aria-hidden="true" />
                </button>
                <AnimatePresence>
                  {megaOpen && <MegaMenu id="mega-menu" onNavigate={() => setMegaOpen(false)} />}
                </AnimatePresence>
              </li>
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} className={linkClass} onMouseEnter={() => preloadRoute(l.to)}>
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <m.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-brass/[0.08]"transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                        )}
                        {l.label}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SITE.phoneHref}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-foam/80 transition-colors hover:text-brass xl:flex"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-seaglass opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-seaglass" />
              </span>
              <Phone className="h-4 w-4" aria-hidden="true" />
              {SITE.phone}
            </a>
            <Button to="/contact" size="sm" className="hidden sm:inline-flex">Plan my voyage</Button>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-foam shadow-soft lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>{mobileOpen && <MobileMenu id="mobile-menu" onClose={() => setMobileOpen(false)} />}</AnimatePresence>
    </header>
  );
}
