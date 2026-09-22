import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '../data/services';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const rootRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      gsap.from('.service-row', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 75%',
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="services section-pad" ref={rootRef}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Services</p>
          <h2 className="display-lg">What I build</h2>
        </div>

        <div className="services__list">
          {services.map((service, index) => {
            const isOpen = openIndex === index;
            return (
              <div className="service-row" key={service.key}>
                <button
                  type="button"
                  className="service-row__trigger"
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${service.key}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="service-row__code caption-mono">{service.code}</span>
                  <span className="service-row__title display-md">{service.title}</span>
                  <span className={`service-row__icon ${isOpen ? 'service-row__icon--open' : ''}`} aria-hidden="true" />
                </button>

                <div
                  id={`service-panel-${service.key}`}
                  className="service-row__panel"
                  hidden={!isOpen}
                >
                  <p className="body-md service-row__value">{service.value}</p>
                  <ul className="service-row__tech">
                    {service.tech.map((t) => (
                      <li key={t} className="caption-mono">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
