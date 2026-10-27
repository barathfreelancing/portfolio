import { ArrowRight } from '@phosphor-icons/react';
import { services } from '../data/services';
import { featuredProjects } from '../data/projects';
import { preselectInquiry } from '../lib/inquiry';

const projectBySlug = Object.fromEntries(featuredProjects.map((p) => [p.slug, p]));

export default function Services() {
  return (
    <section id="services" className="services" aria-labelledby="services-title">
      <div className="services__cell" data-tone="pale">
        <h2 id="services-title" className="heading services__title" data-reveal>
          <span className="services__title-line">What I can</span>
          <span className="services__title-line services__title-line--right">build for you</span>
        </h2>

        <div className="services__foot" data-reveal style={{ '--d': 1 }}>
          <p className="body services__intro">
            Four ways I usually help. If your project sits between them, that is normal: tell me what you need
            and we will scope it together.
          </p>
          <a href="#contact" className="btn btn-primary">
            Discuss a project
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
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
