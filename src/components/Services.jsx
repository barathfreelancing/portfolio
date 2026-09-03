import { motion } from "framer-motion";
import services from "../data/services.js";
import ServiceCard from "./ServiceCard.jsx";
import useScrollAnimation from "../hooks/useScrollAnimation.js";

export default function Services() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="services" className="bg-cream-dim border-y border-line">
      <div className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-28">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="eyebrow uppercase text-ink-soft">What I can help with</h2>
        </motion.div>

        <div className="mt-4">
          {services.map((service) => (
            <ServiceCard key={service.number} service={service} />
          ))}
          <div className="border-t border-line" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
