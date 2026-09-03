import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section id="top" className="max-w-content mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-20 md:pb-28">
      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16 items-center">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="eyebrow uppercase text-ink-soft mb-6">
            Freelance &middot; Remote &middot; Available for projects
          </motion.p>

          <motion.h1 variants={item} className="font-serif text-display-lg text-ink text-balance">
            Barath Kumar
          </motion.h1>

          <motion.p variants={item} className="font-serif text-display-md text-ink-soft mt-3 text-balance">
            Freelance software developer, AI/ML engineer &amp; automation developer
          </motion.p>

          <motion.p variants={item} className="mt-8 max-w-md text-ink-soft leading-relaxed">
            I build practical web applications, backend APIs, AI-powered tools, and
            automation solutions using Python and modern technologies.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 border border-ink rounded-full px-6 py-3 text-sm font-medium hover:bg-ink hover:text-cream transition-colors duration-300"
            >
              View my work
              <ArrowUpRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-ink-soft hover:text-ink underline-hover"
            >
              Work with me
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-line bg-cream-dim">
            <img
              src="/images/profile.jpg"
              alt="Portrait of Barath Kumar"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling.style.display = "flex";
              }}
            />
            <div
              className="w-full h-full items-center justify-center font-serif text-6xl text-ink-soft"
              style={{ display: "none" }}
              aria-hidden="true"
            >
              BK
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
