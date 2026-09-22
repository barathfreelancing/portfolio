export default function About() {
  return (
    <section id="about" className="about section-pad">
      <div className="container about__grid">
        <div className="section-head about__head">
          <p className="eyebrow">About</p>
          <h2 className="display-lg">A developer who thinks in systems.</h2>
        </div>

        <div className="about__body">
          <p className="body-lg">
            I build digital products from interface to backend, connecting frontend
            experiences with APIs, databases, AI systems, and automation.
          </p>
          <p className="body-md">
            My focus is on useful, maintainable solutions: software that solves a real
            business problem today and can keep evolving as that business grows.
          </p>
        </div>
      </div>
    </section>
  );
}
