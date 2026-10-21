import { useEffect, useRef, useState } from 'react';
import { Plus } from '@phosphor-icons/react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../motion/gsap';
import { services } from '../data/services';

const STEPS = [
  { title: 'Discover', body: 'Understand the business problem, goals, users, and requirements.' },
  { title: 'Plan', body: 'Define architecture, UX, integrations, and technical approach.' },
  { title: 'Build', body: 'Design and develop the website, application, API, or automation.' },
  { title: 'Integrate', body: 'Connect APIs, AI services, databases, authentication, and workflows.' },
  { title: 'Launch', body: 'Test, deploy, document, and hand over.' },
];

export default function Services() {
  const rootRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

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

  return (
    <section id="services" className="services section-pad" ref={rootRef}>
      <div className="container">
        <h2 className="title title--lg services__title">What I build</h2>

        <div className="services__list">
          {services.map((service, index) => {
            const isOpen = openIndex === index;
            return (
              <div className={`service${isOpen ? ' is-open' : ''}`} key={service.key}>
                <h3 className="service__heading">
                  <button
                    type="button"
                    className="service__trigger"
                    id={`service-trigger-${service.key}`}
                    aria-expanded={isOpen}
                    aria-controls={`service-panel-${service.key}`}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span className="title service__title">{service.title}</span>
                    <span className="service__icon" aria-hidden="true">
                      <Plus size={28} weight="light" />
                    </span>
                  </button>
                </h3>

                <div
                  id={`service-panel-${service.key}`}
                  className="service__panel"
                  role="region"
                  aria-labelledby={`service-trigger-${service.key}`}
                  inert={!isOpen}
                >
                  <div className="service__panel-inner">
                    <p className="lead service__value">{service.value}</p>
                    <ul className="service__tech" aria-label="Typical tools">
                      {service.tech.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
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
        </div>
      </div>
    </section>
  );
}
