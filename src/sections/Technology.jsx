import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { techGroups } from '../data/tech';

gsap.registerPlugin(ScrollTrigger);

export default function Technology() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      gsap.from('.tech-group', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="technology" className="technology section-pad" ref={rootRef}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Technology</p>
          <h2 className="display-lg">The stack</h2>
        </div>

        <div className="tech-grid">
          {techGroups.map((group) => (
            <div className="tech-group" key={group.category}>
              <h3 className="caption-mono tech-group__title">{group.category}</h3>
              <ul className="tech-group__list">
                {group.items.map((item) => (
                  <li key={item} className="tech-group__item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
