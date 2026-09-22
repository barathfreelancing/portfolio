const PRINCIPLES = [
  {
    title: 'Business first',
    body: 'Technology should solve a real problem.',
  },
  {
    title: 'Full-stack thinking',
    body: 'Frontend, backend, APIs, databases, AI, and automation should work together.',
  },
  {
    title: 'Clear communication',
    body: 'Keep progress understandable and expectations transparent.',
  },
  {
    title: 'Built to evolve',
    body: 'Create systems that can improve as the business grows.',
  },
];

export default function Principles() {
  return (
    <section id="principles" className="principles section-pad">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Principles</p>
          <h2 className="display-lg">How I approach the work.</h2>
        </div>

        <div className="principles__grid">
          {PRINCIPLES.map((p) => (
            <div className="principle-card" key={p.title}>
              <h3 className="display-sm principle-card__title">{p.title}</h3>
              <p className="body-md">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
