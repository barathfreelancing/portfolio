import { useEffect, useRef } from 'react';
import { ArrowDownRight } from '@phosphor-icons/react';
import { gsap, EASE_OUT, prefersReducedMotion } from '../motion/gsap';

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = prefersReducedMotion();
      const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });

      // The world fades up from black; the title card wipes in over it.
      // Everything is readable within ~1.2s; no intro to sit through.
      tl.from('.hero__veil', { opacity: 1, duration: 0.7 }, 0);
      if (reduce) {
        tl.from('.hero__line > span, .hero__lead, .hero__ctas', { opacity: 0, duration: 0.3, ease: 'none' }, 0.1);
        return;
      }
      tl.from('.hero__line > span', { yPercent: 108, duration: 0.9, stagger: 0.07 }, 0.15)
        .from('.hero__lead', { opacity: 0, y: 12, duration: 0.6 }, 0.5)
        .from('.hero__ctas > *', { opacity: 0, y: 12, duration: 0.6, stagger: 0.05 }, 0.6);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" className="hero" ref={rootRef}>
      <div className="hero__veil" aria-hidden="true" />
      <div className="container hero__content">
        <h1 className="title title--xl hero__headline">
          <span className="mask hero__line">
            <span>Building</span>
          </span>
          <span className="mask hero__line hero__line--accent">
            <span>digital worlds.</span>
          </span>
        </h1>
        <p className="lead hero__lead">
          I’m <strong>Barathkumar</strong>, a freelance full-stack Python &amp; AI developer. I build websites,
          web apps, APIs and automation for businesses.
        </p>
        <div className="hero__ctas">
          <a href="#contact" className="btn btn-primary" data-attract>
            Hire me
          </a>
          <a href="#work" className="btn btn-ghost">
            See the work
            <ArrowDownRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
