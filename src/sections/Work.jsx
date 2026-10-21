import { useEffect, useRef } from 'react';
import { ArrowUpRight, GithubLogo } from '@phosphor-icons/react';
import { gsap, prefersReducedMotion } from '../motion/gsap';
import { featuredProjects } from '../data/projects';

export default function Work() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const mm = gsap.matchMedia(rootRef);
    // Desktop: frames pin like a stack of stills; each one recedes as the next slides over it.
    mm.add('(min-width: 900px)', () => {
      const frames = gsap.utils.toArray('.frame');
      frames.forEach((frame, i) => {
        const next = frames[i + 1];
        if (!next) return;
        gsap.to(frame.querySelector('.frame__card'), {
          scale: 0.93,
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 15%', scrub: true },
        });
        gsap.to(frame.querySelector('.frame__shade'), {
          opacity: 0.7,
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 15%', scrub: true },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="work" className="work section-pad" ref={rootRef}>
      <div className="container">
        <h2 className="title title--lg work__title">Worlds built for the web.</h2>
        <p className="lead work__lead">Five shipped projects, each with a live site and its source code.</p>

        <ol className="frames">
          {featuredProjects.map((project) => (
            <li className="frame" key={project.title}>
              <article className="frame__card">
                <div className="frame__visual">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="frame__image"
                    loading="lazy"
                    decoding="async"
                    width="1366"
                    height="637"
                  />
                </div>
                <div className="frame__body">
                  <div className="frame__heading">
                    <h3 className="title title--md frame__title">{project.title}</h3>
                    <p className="frame__subtitle">{project.subtitle}</p>
                  </div>
                  <p className="body frame__description">{project.description}</p>
                  <ul className="frame__tech" aria-label="Built with">
                    {project.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <div className="frame__actions">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-sm"
                      >
                        Live site
                        <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                        <span className="visually-hidden">: {project.title} (opens in a new tab)</span>
                      </a>
                    )}
                    {project.sourceUrl && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-sm"
                      >
                        <GithubLogo size={16} weight="bold" aria-hidden="true" />
                        Source
                        <span className="visually-hidden">: {project.title} on GitHub (opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                </div>
                <span className="frame__shade" aria-hidden="true" />
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
