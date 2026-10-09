import { useEffect } from 'react';
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
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

const REVEAL_TARGETS = [
  '.section-head:not(.about__head)',
  '.contact__intro > *',
  '.principle-card',
].join(', ');

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    // Text rises from below and darkens as it travels up the viewport, tied to scroll.
    const ctx = gsap.context(() => {
      gsap.utils.toArray(REVEAL_TARGETS).forEach((el) => {
        gsap.fromTo(
          el,
          { y: 70, opacity: 0.12 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 98%',
              end: 'top 62%',
              scrub: 0.6,
            },
          }
        );
      });

      // About slides in from the right, scrubbed to scroll.
      gsap.utils.toArray('.about__head, .about__body').forEach((el) => {
        gsap.fromTo(
          el,
          { x: 180, opacity: 0.1 },
          {
            x: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 55%', scrub: 0.8 },
          }
        );
      });
    });

    return () => ctx.revert();
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
        <Contact />
      </main>
      <Footer />
    </>
  );
}
