import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero__eyebrow', { opacity: 0, y: 10, duration: 0.5 })
        .from(
          '.hero__line',
          { opacity: 0, y: 24, duration: 0.65, stagger: 0.08 },
          '-=0.25'
        )
        .from('.hero__lead', { opacity: 0, y: 16, duration: 0.5 }, '-=0.3')
        .from('.hero__ctas a', { opacity: 0, y: 12, duration: 0.45, stagger: 0.08 }, '-=0.25')
        .from('.hero__panel', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
        .from('.hero__panel-line', { opacity: 0, duration: 0.3, stagger: 0.12 }, '-=0.25');
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" className="hero section-pad" ref={rootRef}>
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">Full Stack Python & AI Developer</p>
          <h1 className="display-xl hero__headline">
            <span className="hero__line">Building digital systems</span>
            <span className="hero__line">for the way business moves.</span>
          </h1>
          <p className="body-lg hero__lead">
            Full-stack Python &amp; AI developer building websites, applications, APIs, AI
            systems, and business automations for growing businesses.
          </p>
          <div className="hero__ctas">
            <a href="#work" className="btn btn-primary">
              View work
            </a>
            <a href="#contact" className="btn btn-secondary">
              Start a project
            </a>
          </div>
        </div>

        <div className="hero__panel" aria-hidden="true">
          <div className="hero__panel-bar">
            <span className="hero__panel-dot" />
            <span className="hero__panel-dot" />
            <span className="hero__panel-dot" />
            <span className="hero__panel-title code">request_handler.py</span>
          </div>
          <pre className="hero__panel-body code">
            <span className="hero__panel-line"><span className="tok-kw">async def</span> <span className="tok-fn">handle_request</span>(payload: Request):</span>
            <span className="hero__panel-line">    data = <span className="tok-fn">validate</span>(payload)</span>
            <span className="hero__panel-line">    result = <span className="tok-kw">await</span> pipeline.run(data)</span>
            <span className="hero__panel-line">    <span className="tok-kw">return</span> Response(status=<span className="tok-num">200</span>, body=result)</span>
            <span className="hero__panel-line hero__panel-line--muted"># build, connect, automate, process</span>
          </pre>
        </div>
      </div>
    </section>
  );
}
