import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Github, Linkedin } from "lucide-react";
import useScrollAnimation from "../hooks/useScrollAnimation.js";

const EMAIL = "barathfreelancing@gmail.com";
const GITHUB_URL = "https://github.com/barath220904";
const LINKEDIN_URL = "https://linkedin.com/in/barathkumar2209";

export default function Contact() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="contact" className="bg-ink text-cream">
      <div
        ref={ref}
        className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <h2 className="font-serif text-display-md text-balance">
            Have a project in mind?
          </h2>
          <p className="text-cream/70 leading-relaxed mt-5">
            Tell me what  you&apos;re trying to build.  I&apos;ll help you figure out the best way to approach it.
          </p>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=barathfreelancing@gmail.com&su=Freelance%20Project%20Inquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-9 border border-cream rounded-full px-6 py-3 text-sm font-medium hover:bg-cream hover:text-ink transition-colors duration-300"
          >
           Let&apos;s talk
            <ArrowUpRight size={16} />
          </a>
        </motion.div>

        <div className="flex flex-wrap gap-x-10 gap-y-4 mt-16 text-sm">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 text-cream/80 hover:text-cream underline-hover"
          >
            <Mail size={16} aria-hidden="true" />
            {EMAIL}
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cream/80 hover:text-cream underline-hover"
          >
            <Github size={16} aria-hidden="true" />
            GitHub
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cream/80 hover:text-cream underline-hover"
          >
            <Linkedin size={16} aria-hidden="true" />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
