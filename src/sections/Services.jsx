<<<<<<< HEAD
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../motion/gsap';
=======
import { ArrowRight } from '@phosphor-icons/react';
>>>>>>> 27c7e9f (ui change)
import { services } from '../data/services';
import { featuredProjects } from '../data/projects';
import { preselectInquiry } from '../lib/inquiry';

const projectBySlug = Object.fromEntries(featuredProjects.map((p) => [p.slug, p]));

export default function Services() {
<<<<<<< HEAD
  const rootRef = useRef(null);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    const ctx = gsap.context(() => {
      // The route draws itself as the reader moves through the steps; each stop lights when reached.
      gsap.utils.toArray('.route__step').forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 72%',
          onEnter: () => step.classList.add('is-reached'),
          onLeaveBack: () => step.classList.remove('is-reached'),
        });
      });
    }, rootRef);
    if (reduce) return () => ctx.revert();

    // Horizontal route on wide screens, vertical below the breakpoint in services.css.
    const mm = gsap.matchMedia(rootRef);
    const draw = (axis) => () => {
      gsap.fromTo(
        '.route__fill',
        { [axis]: 0 },
        {
          [axis]: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.route', start: 'top 72%', end: 'bottom 72%', scrub: true },
        }
      );
    };
    mm.add('(min-width: 861px)', draw('scaleX'));
    mm.add('(max-width: 860px)', draw('scaleY'));

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

=======
>>>>>>> 27c7e9f (ui change)
  return (
    <section id="services" className="services" aria-labelledby="services-title">
      <div className="services__cell" data-tone="pale">
        <h2 id="services-title" className="heading services__title" data-reveal>
          <span className="services__title-line">What I can</span>
          <span className="services__title-line services__title-line--right">build for you</span>
        </h2>

<<<<<<< HEAD
        <p className="lead services__lead">
          Four kinds of work, often combined in one project. You work with me directly, from the first call to launch.
        </p>

        <div className="services__grid">
          {services.map((service) => (
            <article className="service" key={service.key} aria-labelledby={`service-${service.key}`}>
              <h3 className="title service__title" id={`service-${service.key}`}>
                {service.title}
              </h3>
              <p className="service__value">{service.value}</p>
              <h4 className="service__label chrome">Typical work</h4>
              <ul className="service__examples">
                {service.examples.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
              <ul className="service__tech" aria-label={`${service.title} tools`}>
                {service.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="process">
          <h3 className="title title--md process__title">From idea to system.</h3>
          <div className="route">
            <div className="route__line" aria-hidden="true">
              <span className="route__fill" />
            </div>
            <ol className="route__steps">
              {STEPS.map((step) => (
                <li className="route__step" key={step.title}>
                  <span className="route__stop" aria-hidden="true" />
                  <h4 className="title route__name">{step.title}</h4>
                  <p className="body route__body">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
=======
        <div className="services__foot" data-reveal style={{ '--d': 1 }}>
          <p className="body services__intro">
            Four ways I usually help. If your project sits between them, that is normal: tell me what you need
            and we will scope it together.
          </p>
          <a href="#contact" className="btn btn-primary">
            Discuss a project
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
>>>>>>> 27c7e9f (ui change)
        </div>
      </div>

      <ul className="services__rows" data-tone="dark">
        {services.map((service, i) => {
          const related = service.related.map((slug) => projectBySlug[slug]).filter(Boolean);
          return (
            <li className="service" key={service.key} data-reveal style={{ '--d': i }}>
              <div className="service__name">
                <h3 className="subheading service__title">{service.title}</h3>
                {related.length > 0 && (
                  <p className="small service__related">
                    See{' '}
                    {related.map((p, j) => (
                      <span key={p.slug}>
                        <a href={`#project-${p.slug}`} className="text-link">
                          {p.title}
                        </a>
                        {j < related.length - 2 ? ', ' : j === related.length - 2 ? ' and ' : ''}
                      </span>
                    ))}
                  </p>
                )}
                <a
                  href="#contact"
                  className="text-link service__cta"
                  onClick={() => preselectInquiry(service.inquiryType)}
                >
                  {service.cta}
                </a>
              </div>

              <p className="service__problem">{service.problem}</p>

              <ul className="service__deliverables" aria-label={`${service.title}: what you get`}>
                {service.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
