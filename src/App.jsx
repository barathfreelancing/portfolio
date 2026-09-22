import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Nav from './components/Nav';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Work from './sections/Work';
import Process from './sections/Process';
import Technology from './sections/Technology';
import About from './sections/About';
import Principles from './sections/Principles';
import Reviews from './sections/Reviews';
import Contact from './sections/Contact';
import AdminReviews from './components/AdminReviews';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isAdminPath, setIsAdminPath] = useState(
    () => typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')
  );

  useEffect(() => {
    const handlePopState = () => {
      setIsAdminPath(window.location.pathname.startsWith('/admin'));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  if (isAdminPath) {
    return (
      <>
        <header className="nav nav--scrolled">
          <div className="container nav__inner">
            <a href="/" className="nav__logo">
              BARATHKUMAR / ADMIN
            </a>
            <a href="/" className="btn btn-secondary btn-sm">
              &larr; Back to Site
            </a>
          </div>
        </header>
        <main id="main">
          <AdminReviews />
        </main>
      </>
    );
  }

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Services />
        <Work />
        <Process />
        <Technology />
        <About />
        <Principles />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
