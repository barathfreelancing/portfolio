import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuredProject, upcomingProjects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      gsap.from('.featured-project', {
        opacity: 0,
        y: 32,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.featured-project', start: 'top 80%' },
      });

      gsap.from('.upcoming-card', {
        opacity: 0,
        y: 24,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.upcoming-grid', start: 'top 85%' },
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

        <article className="featured-project">
          <div className="featured-project__visual">
            <img
              src="/studds-website.png"
              alt="STUDDS motorcycle helmet website"
              className="featured-project__image"
            />
          </div>
          <div className="featured-project__body">
            <p className="eyebrow">Case study</p>
            <h3 className="display-md featured-project__title">{featuredProject.title}</h3>
            <p className="body-lg featured-project__subtitle">{featuredProject.subtitle}</p>
            <p className="body-md">{featuredProject.description}</p>
            <ul className="featured-project__tech">
              {featuredProject.tech.map((t) => (
                <li key={t} className="caption-mono">
                  {t}
                </li>
              ))}
            </ul>
            <div className="featured-project__actions">
              <a
                href={featuredProject.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm"
              >
                View source
              </a>

              <a
                href="https://studds-website.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                Live preview →
              </a>
            </div>
          </div>
        </article>

        <div className="upcoming-grid">
          {upcomingProjects.map((project) => (
            <div className="upcoming-card" key={project.title}>
              <p className="caption-mono upcoming-card__status">{project.status}</p>
              <h4 className="display-sm upcoming-card__title">{project.title}</h4>
              <p className="body-sm">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
