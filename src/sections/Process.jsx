// The process printed as an itinerary slip. Left of each row: what happens. Right: what you hold at that point.
// Numbers stay because the order is the information here.
const STAGES = [
  {
    title: 'Discovery',
    rows: [
      ['Your goals, users and requirements', 'Shared notes'],
      ['Questions answered before any proposal', 'Clear brief'],
    ],
  },
  {
    title: 'Planning',
    rows: [
      ['Scope, technical approach, deliverables', 'Written plan'],
      ['What gets built, agreed up front', 'Sign-off'],
    ],
  },
  {
    title: 'Development',
    rows: [
      ['Build, test and refine', 'Working build'],
      ['Progress shared along the way', 'Previews'],
    ],
  },
  {
    title: 'Delivery',
    rows: [
      ['Deploy the finished product', 'Live site'],
      ['Source code and the agreed handover', 'Handover'],
    ],
  },
];

// Straight top edge, zigzag bottom edge cut with clip-path.
const TEETH = 22;
const ZIGZAG = (() => {
  const points = ['0 0', '100% 0'];
  for (let i = TEETH; i >= 0; i -= 1) {
    const x = ((i / TEETH) * 100).toFixed(2);
    points.push(`${x}% ${i % 2 ? 'calc(100% - 10px)' : '100%'}`);
  }
  return `polygon(${points.join(', ')})`;
})();

export default function Process() {
  return (
    <section id="process" className="process section-pad" aria-labelledby="process-title" data-tone="cobalt">
      <div className="container process__grid">
        <div className="process__intro">
          <h2 id="process-title" className="heading" data-reveal>
            How we&rsquo;d work together
          </h2>
          <p className="lead process__lead" data-reveal style={{ '--d': 1 }}>
            Four steps that keep the scope clear and the project moving. You always know what happens next and
            what you will have at the end of it.
          </p>
        </div>

        <div className="slip" style={{ clipPath: ZIGZAG, '--d': 2 }} data-reveal>
          <ol className="slip__stages">
            {STAGES.map((stage, i) => (
              <li className="slip__stage" key={stage.title}>
                <h3 className="slip__title">
                  {String(i + 1).padStart(2, '0')} — {stage.title}
                </h3>
                <dl className="slip__rows">
                  {stage.rows.map(([what, value]) => (
                    <div className="slip__row" key={what}>
                      <dt>{what}</dt>
                      <span className="slip__leader" aria-hidden="true" />
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ol>
          <p className="slip__total">
            <span>You receive</span>
            <span>A live product and its source code</span>
          </p>
        </div>
      </div>
    </section>
  );
}
