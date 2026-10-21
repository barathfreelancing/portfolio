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
      tl.from('.hero__veil', { opacity: 1, duration: 0.9 }, 0);
      if (reduce) {
        tl.from('.hero__line > span, .hero__lead, .hero__ctas', { opacity: 0, duration: 0.4, ease: 'none' }, 0.2);
        return;
      }
      tl.from('.hero__line > span', { yPercent: 108, duration: 1, stagger: 0.08 }, 0.25)
        .from('.hero__lead', { opacity: 0, y: 12, duration: 0.7 }, 0.75)
        .from('.hero__ctas > *', { opacity: 0, y: 12, duration: 0.7, stagger: 0.06 }, 0.85);
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
          Full-stack Python &amp; AI developer building websites, applications, and AI tools around real
          business needs.
        </p>
        <div className="hero__ctas">
          <a href="#work" className="btn btn-primary">
            Explore work
            <ArrowDownRight size={18} weight="bold" aria-hidden="true" />
          </a>
          <a href="#contact" className="btn btn-ghost" data-attract>
            Hire me
          </a>
        </div>
      </div>
    </section>
  );
}
