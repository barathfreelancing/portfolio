import { useReveal } from './lib/motion';

import Nav from './components/Nav';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Work from './sections/Work';
import Process from './sections/Process';
import About from './sections/About';
import Contact from './sections/Contact';

export default function App() {
<<<<<<< HEAD
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // In-page links glide instead of jumping, then hand focus to the section so keyboard and
    // screen-reader users continue from where they landed. The skip link stays native.
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest?.('a[href^="#"]');
      const hash = link?.getAttribute('href');
      if (!hash || hash === '#' || hash === '#main') return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      // Lenis applies the html scroll-padding-top (nav height + 16px), so no manual offset is needed.
      lenis.scrollTo(target, {
        duration: 1.1,
        // Keyboard activation (detail 0) jumps instantly; only pointer clicks glide.
        immediate: e.detail === 0,
        onComplete: () => {
          if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        },
      });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  // Late-loading fonts and images change section heights; re-measure once everything has settled.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);
=======
  useReveal();
>>>>>>> 27c7e9f (ui change)

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
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
