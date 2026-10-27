import { techGroups } from '../data/tech';

// The four working principles (business first, full-stack thinking, clear communication, built to evolve)
// are written into the story; the highlighted words are the facts a scanning reader looks for.
export default function About() {
  return (
    <section id="about" className="about section-pad" aria-labelledby="about-title" data-tone="white">
      <div className="container">
        <h2 id="about-title" className="heading about__title" data-reveal>
          One person, start to finish
        </h2>

        <div className="about__story" data-reveal style={{ '--d': 1 }}>
          <p>
            <strong>I&rsquo;m Barathkumar</strong>, a full-stack developer with a background in{' '}
            <mark className="hl hl--a">AI and Data Science</mark>. I bring design, engineering and practical
            problem-solving together to build useful digital products: fast, considered interfaces in{' '}
            <mark className="hl hl--b">React</mark>, and behind them <mark className="hl hl--b">Python APIs</mark>,
            databases and, where it genuinely helps, <mark className="hl hl--a">AI and automation</mark>.
          </p>
          <p>
            I work <mark className="hl hl--c">business first</mark>: technology should solve a real problem. I think
            full-stack, so the frontend, backend, data and AI parts work together, and I build things to evolve as
            the business grows. You work with me directly, with <mark className="hl hl--c">clear communication</mark>{' '}
            from the first conversation to the handover, so progress stays understandable and expectations stay
            transparent.
          </p>
          <p className="about__close">
            <a href="#contact" className="hl hl--cta">
              Tell me what you&rsquo;re building.
            </a>
          </p>
        </div>

        <div id="technology" className="toolkit" data-reveal>
          <h3 className="subheading toolkit__title">Toolkit</h3>
          <table className="toolkit__table">
            <caption className="visually-hidden">Tools and technologies I work with, by area</caption>
            <tbody>
              {techGroups.map((group) => (
                <tr key={group.category}>
                  <th scope="row">{group.category}</th>
                  <td>{group.items.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
