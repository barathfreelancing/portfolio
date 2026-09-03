import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Your Experience", href: "#recommendations" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "bg-cream/90 backdrop-blur border-line" : "bg-cream border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="max-w-content mx-auto flex items-center justify-between px-6 md:px-10 py-5"
      >
        <a
          href="#top"
          aria-label="Barath Kumar, home"
          className="flex items-center gap-2 text-ink"
        >
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path
              d="M16 5 L18.2 13.8 L27 16 L18.2 18.2 L16 27 L13.8 18.2 L5 16 L13.8 13.8 Z"
              fill="currentColor"
            />
          </svg>
        </a>

        <ul className="hidden md:flex items-center gap-10 eyebrow uppercase text-ink-soft">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="underline-hover hover:text-ink transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center border border-ink rounded-full px-5 py-2 text-sm font-medium hover:bg-ink hover:text-cream transition-colors duration-300"
        >
          Work with me
        </a>

        <button
          type="button"
          className="md:hidden text-ink"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-line bg-cream"
          >
            <ul className="flex flex-col px-6 py-6 gap-5 eyebrow uppercase text-ink-soft">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={handleLinkClick} className="hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={handleLinkClick}
                  className="inline-flex items-center border border-ink rounded-full px-5 py-2 text-sm font-medium text-ink normal-case tracking-normal"
                >
                  Work with me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
