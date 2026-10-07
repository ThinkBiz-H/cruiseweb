import { lazy } from 'react';
import Home from '../pages/Home.jsx';

const About = lazy(() => import('../pages/About.jsx'));
const Services = lazy(() => import('../pages/Services.jsx'));
const Pricing = lazy(() => import('../pages/Pricing.jsx'));
const Blog = lazy(() => import('../pages/Blog.jsx'));
const BlogPost = lazy(() => import('../pages/BlogPost.jsx'));
const Contact = lazy(() => import('../pages/Contact.jsx'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy.jsx'));
const Terms = lazy(() => import('../pages/Terms.jsx'));
const NotFound = lazy(() => import('../pages/NotFound.jsx'));

export const ROUTES = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/services', element: <Services /> },
  { path: '/pricing', element: <Pricing /> },
  { path: '/blog', element: <Blog /> },
  { path: '/blog/:slug', element: <BlogPost /> },
  { path: '/contact', element: <Contact /> },
  { path: '/privacy-policy', element: <PrivacyPolicy /> },
  { path: '/terms', element: <Terms /> },
  { path: '*', element: <NotFound /> },
];

/** Warm the chunk for a route before navigation (used on link hover / focus). */
const PRELOAD = {
  '/about': () => import('../pages/About.jsx'),
  '/services': () => import('../pages/Services.jsx'),
  '/pricing': () => import('../pages/Pricing.jsx'),
  '/blog': () => import('../pages/Blog.jsx'),
  '/contact': () => import('../pages/Contact.jsx'),
  '/privacy-policy': () => import('../pages/PrivacyPolicy.jsx'),
  '/terms': () => import('../pages/Terms.jsx'),
};

export const preloadRoute = (to = '') => {
  const path = String(to).split(/[?#]/)[0];
  if (path.startsWith('/blog/')) return import('../pages/BlogPost.jsx');
  return PRELOAD[path]?.();
};
