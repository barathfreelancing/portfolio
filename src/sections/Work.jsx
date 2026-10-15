import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuredProjects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      // Cards slide in alternately from the left and right as you scroll, scrubbed for a smooth feel.
      gsap.utils.toArray('.featured-project').forEach((el, i) => {
        gsap.fromTo(
          el,
          { x: i % 2 === 0 ? -180 : 180, opacity: 0.1 },
          {
            x: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 50%', scrub: 0.8 },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="work section-pad" ref={rootRef}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Work</p>
          <h2 className="display-lg">Selected work</h2>
        </div>

        {featuredProjects.map((project, i) => (
          <article
            className={`featured-project${i % 2 === 1 ? ' featured-project--reverse' : ''}`}
            key={project.title}
          >
            <div className="featured-project__visual">
              <img
                src={project.image}
                alt={project.imageAlt}
                className="featured-project__image"
              />
            </div>
            <div className="featured-project__body">
              <p className="eyebrow">Case study</p>
              <h3 className="display-md featured-project__title">{project.title}</h3>
              <p className="body-lg featured-project__subtitle">{project.subtitle}</p>
              <p className="body-md">{project.description}</p>
              <ul className="featured-project__tech">
                {project.tech.map((t) => (
                  <li key={t} className="caption-mono">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="featured-project__actions">
                {project.sourceUrl && (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    View source ↗
                  </a>
                )}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Live preview →
                </a>
              </div>
            </div>
          </article>
        ))}

      </div>
    </section>
  );
}
