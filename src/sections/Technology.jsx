import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, EASE_IN_OUT, prefersReducedMotion } from '../motion/gsap';
import { techGroups } from '../data/tech';

export default function Technology() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    // Each row is uncovered from the top as it arrives, once; rows arriving together cascade.
    const ctx = gsap.context(() => {
      gsap.set('.stack-row', { clipPath: 'inset(0% 0% 100% 0%)' });
      ScrollTrigger.batch('.stack-row', {
        start: 'top 88%',
        once: true,
        onEnter: (rows) =>
          gsap.to(rows, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: EASE_IN_OUT, stagger: 0.06 }),
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="technology" className="technology section-pad" ref={rootRef}>
      <div className="container">
        <h2 className="title title--lg technology__title">The stack</h2>

        <div className="stack">
          {techGroups.map((group) => (
            <div className="stack-row" key={group.category}>
              <h3 className="title title--sm stack-row__name">{group.category}</h3>
              <ul className="stack-row__items">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
