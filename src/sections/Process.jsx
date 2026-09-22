import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: '01',
    title: 'Discover',
    body: 'Understand the business problem, goals, users, and requirements.',
  },
  {
    n: '02',
    title: 'Plan',
    body: 'Define architecture, UX, integrations, and technical approach.',
  },
  {
    n: '03',
    title: 'Build',
    body: 'Design and develop the website, application, API, or automation.',
  },
  {
    n: '04',
    title: 'Integrate',
    body: 'Connect APIs, AI services, databases, authentication, and workflows.',
  },
  {
    n: '05',
    title: 'Launch',
    body: 'Test, deploy, document, and hand over.',
  },
];

export default function Process() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const items = gsap.utils.toArray('.process-step');

      if (reduce) {
        gsap.set(items, { opacity: 1 });
        return;
      }

      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0.25 },
          {
            opacity: 1,
            duration: 0.4,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top 55%',
              end: 'top 35%',
              scrub: true,
            },
          }
        );
      });

      gsap.fromTo(
        '.process__line-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.process__steps',
            start: 'top 60%',
            end: 'bottom 70%',
            scrub: true,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="process section-pad" ref={rootRef}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Process</p>
          <h2 className="display-lg">From idea to system.</h2>
        </div>

        <div className="process__steps">
          <div className="process__line">
            <div className="process__line-fill" />
          </div>
          {STEPS.map((step) => (
            <div className="process-step" key={step.n}>
              <span className="process-step__dot" aria-hidden="true" />
              <span className="caption-mono process-step__n">{step.n}</span>
              <h3 className="display-md process-step__title">{step.title}</h3>
              <p className="body-md">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
