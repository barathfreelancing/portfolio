import { useEffect, useRef, useState } from 'react';

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const handleLinkClick = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__logo">
          BARATHKUMAR
        </a>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav__link">
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn-primary btn-sm nav__cta">
          Start a project
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">
            {open ? 'Close menu' : 'Open menu'}
          </span>
          <span className={`nav__burger ${open ? 'nav__burger--open' : ''}`} aria-hidden="true" />
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`nav__mobile ${open ? 'nav__mobile--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        hidden={!open}
      >
        <nav aria-label="Mobile" className="nav__mobile-links">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={handleLinkClick} className="nav__mobile-link">
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={handleLinkClick} className="btn btn-primary nav__mobile-cta">
            Start a project
          </a>
        </nav>
      </div>
    </header>
  );
}
