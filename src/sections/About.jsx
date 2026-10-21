import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../motion/gsap';

const MANIFESTO =
  'I bring design, engineering, and practical problem-solving together to build useful digital products.';

const PRINCIPLES = [
  {
    title: 'Business first',
    body: 'Technology should solve a real problem.',
  },
  {
    title: 'Full-stack thinking',
    body: 'Frontend, backend, APIs, databases, AI, and automation should work together.',
  },
  {
    title: 'Clear communication',
    body: 'Keep progress understandable and expectations transparent.',
  },
  {
    title: 'Built to evolve',
    body: 'Create systems that can improve as the business grows.',
  },
];

export default function About() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    // The statement lights up word by word at reading pace.
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about__word',
        // Starts at 45% so the unlit words still clear 3:1 for large text
        { opacity: 0.45 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.about__manifesto',
            start: 'top 85%',
            end: 'bottom 50%',
            scrub: true,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about section-pad" ref={rootRef}>
      <div className="container about__grid">
        <h2 className="title title--lg about__title">Builder by instinct.</h2>

        <p className="about__manifesto">
          {MANIFESTO.split(' ').map((word, i) => (
            <span className="about__word" key={i}>
              {word}{' '}
            </span>
          ))}
        </p>

        <div className="about__body">
          <p className="body">
            From the first interface to the systems behind it, I focus on clear experiences backed by
            maintainable code.
          </p>
          <p className="body">
            I learn the tools a project needs, connect its moving parts, and keep the result grounded in the
            problem it is meant to solve.
          </p>
        </div>

        <div className="about__principles">
          <h3 className="title title--sm about__principles-title">How I approach the work.</h3>
          <dl className="principles">
            {PRINCIPLES.map((p) => (
              <div className="principle" key={p.title}>
                <dt className="principle__title">{p.title}</dt>
                <dd className="principle__body">{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
