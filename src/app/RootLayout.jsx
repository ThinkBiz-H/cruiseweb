import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import Loader from '../components/global/Loader.jsx';
import ScrollProgress from '../components/global/ScrollProgress.jsx';
import BackToTop from '../components/global/BackToTop.jsx';
import TransitionRoutes from '../components/global/TransitionRoutes.jsx';
import useSmoothScroll from '../hooks/useSmoothScroll.js';

export default function RootLayout() {
  useSmoothScroll();
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-brass focus:px-5 focus:py-3 focus:font-semibold focus:text-abyss"
      >
        Skip to content
      </a>
      <Loader />
      <ScrollProgress />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <TransitionRoutes />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
