import { ArrowDown, ArrowRight } from '@phosphor-icons/react';
import { site } from '../data/site';
import LocalTime from '../components/LocalTime';

// Two fields meet at a seam. The headline is set twice and each copy is clipped to one side of the seam,
// so the first line stands on paper and the second sinks into the cobalt field and turns white.
const HEADLINE = (
  <>
    <span className="hero__line">Ideas into</span>
    <span className="hero__line">products.</span>
  </>
);

export default function Hero() {
<<<<<<< HEAD
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

=======
>>>>>>> 27c7e9f (ui change)
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__field hero__field--paper" data-tone="paper" />
      <div className="hero__field hero__field--cobalt" data-tone="cobalt" />

      <div className="hero__title-wrap">
        <h1 id="hero-title" className="display hero__title">
          <span className="hero__copy hero__copy--paper">{HEADLINE}</span>
          <span className="hero__copy hero__copy--cobalt" aria-hidden="true">
            {HEADLINE}
          </span>
        </h1>
<<<<<<< HEAD
        <p className="lead hero__lead">
          I’m <strong>Barathkumar</strong>, a freelance full-stack Python &amp; AI developer. I build websites,
          web apps, APIs and automation for businesses.
        </p>
        <div className="hero__ctas">
          <a href="#contact" className="btn btn-primary" data-attract>
            Hire me
=======
      </div>

      <div className="container hero__body">
        <p className="lead hero__lead" style={{ '--d': 0 }}>
          I&rsquo;m {site.name}, a full-stack Python &amp; AI developer. I design and build business websites,
          React apps with Python backends, and AI automations.
        </p>

        <div className="hero__ctas" style={{ '--d': 1 }}>
          <a href="#contact" className="btn btn-light">
            Discuss a project
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
          <a href="#work" className="arrow-link hero__work-link">
            View my work
            <ArrowDown size={18} weight="bold" aria-hidden="true" />
>>>>>>> 27c7e9f (ui change)
          </a>
          <a href="#work" className="btn btn-ghost">
            See the work
            <ArrowDownRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </div>

        <p className="status hero__status" style={{ '--d': 2 }}>
          {site.available && (
            <>
              <span className="status__dot" aria-hidden="true" />
              <span>{site.availabilityLabel}</span>
              <span aria-hidden="true">·</span>
            </>
          )}
          <LocalTime />
        </p>
      </div>
    </section>
  );
}
