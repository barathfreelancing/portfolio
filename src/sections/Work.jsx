import { Fragment, useState } from 'react';
import { ArrowUpRight, GithubLogo, Plus } from '@phosphor-icons/react';
import { featuredProjects } from '../data/projects';

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
      </div>
    </section>
  );
}
