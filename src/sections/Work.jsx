<<<<<<< HEAD
import { useEffect, useRef } from 'react';
import { ArrowUpRight, GithubLogo } from '@phosphor-icons/react';
import { gsap, prefersReducedMotion } from '../motion/gsap';
import { featuredProjects, pythonProjects } from '../data/projects';

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
=======
import { Fragment, useState } from 'react';
import { ArrowUpRight, GithubLogo, Plus } from '@phosphor-icons/react';
import { featuredProjects } from '../data/projects';
>>>>>>> 27c7e9f (ui change)

const hostOf = (url) => new URL(url).host;

// All project names run as one sentence, each followed by a small frame of its screenshot.
function WorkIndex() {
  return (
    <div className="work-index" data-reveal>
      <h2 id="work-title" className="work-index__title">
        Selected work:
      </h2>{' '}
      {featuredProjects.map((project, i) => (
        <Fragment key={project.slug}>
        <span>
          <a href={`#project-${project.slug}`} className="work-index__name">
            {project.title}
          </a>
          <span className="work-index__tail">
            <a href={`#project-${project.slug}`} className="work-index__frame" aria-hidden="true" tabIndex={-1}>
              <img src={project.image} alt="" width="1366" height="637" loading="lazy" decoding="async" />
            </a>
            {i < featuredProjects.length - 1 ? ',' : '.'}
          </span>
        </span>{' '}
        </Fragment>
      ))}
    </div>
  );
}

<<<<<<< HEAD
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
=======
function ProjectCase({ project, index }) {
  const [open, setOpen] = useState(false);
  const caseId = `case-${project.slug}`;

  return (
    <li className={`project${index % 2 ? ' project--flip' : ''}`}>
      <article id={`project-${project.slug}`} className="project__article" aria-labelledby={`${caseId}-title`}>
        <div className="project__row">
          <figure className="project__figure" data-reveal="picture">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project__visual reveal-media"
            >
              <img
                src={project.image}
                alt={project.imageAlt}
                className="project__image"
                loading="lazy"
                decoding="async"
                width="1366"
                height="637"
              />
              <span className="visually-hidden">Open the {project.title} live site (opens in a new tab)</span>
            </a>
            <figcaption className="small">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link project__host"
              >
                {hostOf(project.liveUrl)}
                <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </figcaption>
          </figure>

          <div className="project__info">
            <h3 id={`${caseId}-title`} className="subheading project__title" data-reveal>
              {project.title}
            </h3>
            <p className="project__subtitle" data-reveal style={{ '--d': 1 }}>
              {project.category}
            </p>
            <p className="body project__description" data-reveal style={{ '--d': 1 }}>
              {project.description}
            </p>

            <dl className="project__meta" data-reveal style={{ '--d': 2 }}>
              <div>
                <dt>Problem</dt>
                <dd>{project.problem}</dd>
              </div>
              <div>
                <dt>My role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Built with</dt>
                <dd>{project.tech.join(', ')}</dd>
              </div>
            </dl>

            <div className="project__actions" data-reveal style={{ '--d': 3 }}>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm">
                Live demo
                <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                <span className="visually-hidden">: {project.title} (opens in a new tab)</span>
              </a>
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-link project__source"
              >
                <GithubLogo size={18} weight="bold" aria-hidden="true" />
                Source code
                <span className="visually-hidden">: {project.title} on GitHub (opens in a new tab)</span>
              </a>
              <button
                type="button"
                className={`case-toggle${open ? ' is-open' : ''}`}
                aria-expanded={open}
                aria-controls={caseId}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? 'Hide case study' : 'Read case study'}
                <Plus size={16} weight="bold" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div
          id={caseId}
          className={`case${open ? ' is-open' : ''}`}
          role="region"
          aria-label={`${project.title} case study`}
          inert={!open}
        >
          <div className="case__inner">
            <dl className="case__grid">
              <div className="case__item case__item--wide">
                <dt>Overview</dt>
                <dd>{project.description}</dd>
              </div>
              <div className="case__item">
                <dt>Problem</dt>
                <dd>{project.problem}</dd>
              </div>
              <div className="case__item">
                <dt>Approach</dt>
                <dd>{project.approach}</dd>
              </div>
              <div className="case__item">
                <dt>Implementation</dt>
                <dd>{project.implementation}</dd>
              </div>
              <div className="case__item">
                <dt>Technology stack</dt>
                <dd>{project.tech.join(', ')}</dd>
              </div>
              <div className="case__item">
                <dt>Outcome</dt>
                <dd>{project.outcome}</dd>
              </div>
              <div className="case__item">
                <dt>Links</dt>
                <dd className="case__links">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                    {hostOf(project.liveUrl)}
                  </a>
                  <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                    Repository on GitHub
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </article>
    </li>
  );
}

export default function Work() {
  return (
    <section id="work" className="work section-pad" aria-labelledby="work-title" data-tone="paper">
      <div className="container">
        <WorkIndex />
        <p className="small work__note" data-reveal style={{ '--d': 1 }}>
          {featuredProjects.length} shipped projects, each with a live demo and public source code.
        </p>

        <ol className="projects">
          {featuredProjects.map((project, index) => (
            <ProjectCase project={project} index={index} key={project.slug} />
          ))}
        </ol>
>>>>>>> 27c7e9f (ui change)
      </div>
    </section>
  );
}
