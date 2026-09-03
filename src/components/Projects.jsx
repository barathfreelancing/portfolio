import { motion } from "framer-motion";
import projects from "../data/projects.js";
import ProjectCard from "./ProjectCard.jsx";
import useScrollAnimation from "../hooks/useScrollAnimation.js";

export default function Projects() {
  const { ref, isInView } = useScrollAnimation({ amount: 0.1 });

  return (
    <section id="projects" className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-28">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="eyebrow uppercase text-ink-soft">Selected projects</h2>
      </motion.div>

      <div className="mt-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} reversed={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
