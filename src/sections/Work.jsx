import { useEffect, useRef } from 'react';
import { ArrowUpRight, GithubLogo } from '@phosphor-icons/react';
import { gsap, prefersReducedMotion } from '../motion/gsap';
import { featuredProjects, pythonProjects } from '../data/projects';

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export default function Work() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const mm = gsap.matchMedia(rootRef);
    // Desktop and laptop viewports: frames stick like a stack of stills (work.css); each recedes as the next slides over it.
    mm.add('(min-width: 900px) and (min-height: 620px)', () => {
      const frames = gsap.utils.toArray('.frame');
      frames.forEach((frame, i) => {
        const next = frames[i + 1];
        if (!next) return;
        const scrollTrigger = { trigger: next, start: 'top bottom', end: 'top 15%', scrub: true };
        gsap.to(frame.querySelector('.frame__card'), { scale: 0.93, ease: 'none', scrollTrigger });
        gsap.to(frame.querySelector('.frame__shade'), { opacity: 0.7, ease: 'none', scrollTrigger: { ...scrollTrigger } });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="work" className="work section-pad" ref={rootRef}>
      <div className="container">
        <h2 className="title title--lg work__title">Worlds built for the web.</h2>
        <p className="lead work__lead">
          Five live projects, each designed and built end to end by me: one for a client, four self-initiated.
        </p>
      </div>

      <ol className="frames">
          {featuredProjects.map((project) => {
            const id = `project-${slug(project.title)}`;
            return (
              <li className="frame" key={project.title}>
                <article className="frame__card" aria-labelledby={id}>
                  <div className="frame__visual">
                    <img
                      src={project.image}
                      srcSet={`${project.imageSmall} 800w, ${project.image} 1366w`}
                      sizes="(max-width: 899px) 100vw, min(1224px, 92vw)"
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
                      <h3 className="title title--md frame__title" id={id}>
                        {project.title}
                      </h3>
                      <p className="frame__subtitle">{project.subtitle}</p>
                    </div>
                    <div className="frame__story">
                      <p className="frame__brief">{project.brief}</p>
                      <h4 className="frame__label chrome">What I built</h4>
                      <ul className="frame__built">
                        {project.built.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="frame__meta">
                      <p className={`frame__kind chrome${project.kind === 'Client project' ? ' is-client' : ''}`}>
                        {project.kind}
                      </p>
                      <ul className="frame__tech" aria-label="Built with">
                        {project.tech.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                      <div className="frame__actions">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                          Live site
                          <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                          <span className="visually-hidden">: {project.title} (opens in a new tab)</span>
                        </a>
                        <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                          <GithubLogo size={16} weight="bold" aria-hidden="true" />
                          Source
                          <span className="visually-hidden">: {project.title} on GitHub (opens in a new tab)</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <span className="frame__shade" aria-hidden="true" />
                </article>
              </li>
            );
          })}
      </ol>

      <div className="container">
        <div className="pyworks">
          <h3 className="title title--sm pyworks__title">Python and machine learning</h3>
          <p className="body pyworks__lead">
            Earlier Python projects behind the backend and AI services, each linked to its source.
          </p>
          <ul className="pyworks__list">
            {pythonProjects.map((p) => (
              <li key={p.title}>
                <a className="pywork" href={p.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <span className="pywork__title">{p.title}</span>
                  <span className="pywork__summary">{p.summary}</span>
                  <span className="pywork__tech">{p.tech.join(', ')}</span>
                  <ArrowUpRight className="pywork__arrow" size={20} aria-hidden="true" />
                  <span className="visually-hidden"> (source on GitHub, opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
