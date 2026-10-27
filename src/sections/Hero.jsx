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
