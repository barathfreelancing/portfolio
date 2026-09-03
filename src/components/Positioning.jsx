import { motion } from "framer-motion";
import useScrollAnimation from "../hooks/useScrollAnimation.js";

export default function Positioning() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section className="border-y border-line bg-cream-dim">
      <div
        ref={ref}
        className="max-w-content mx-auto px-6 md:px-10 py-16 md:py-20"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-2xl md:text-3xl text-ink max-w-2xl leading-snug text-balance"
        >
          I like solving practical technical problems rather than just building demos.
          I'm comfortable researching unfamiliar technologies, debugging issues, and
          working independently to turn an idea into a working solution.
        </motion.p>
      </div>
    </section>
  );
}
