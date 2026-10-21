import { useEffect, useRef, useState } from 'react';
import { List, X } from '@phosphor-icons/react';
import { ScrollTrigger } from '../motion/gsap';

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [solid, setSolid] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    menuRef.current?.querySelector('a')?.focus();
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (e.key === 'Tab') {
        const links = menuRef.current?.querySelectorAll('a');
        if (!links?.length) return;
        const first = links[0];
        const last = links[links.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (open) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Mark the chapter being read, and give the bar a ground once the hero is behind us.
  useEffect(() => {
    const triggers = LINKS.map(({ href }) =>
      ScrollTrigger.create({
        trigger: href,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: (self) => {
          if (self.isActive) setActive(href);
          else setActive((current) => (current === href ? '' : current));
        },
      })
    );
    const ground = ScrollTrigger.create({
      start: () => window.innerHeight * 0.6,
      onEnter: () => setSolid(true),
      onLeaveBack: () => setSolid(false),
    });
    return () => {
      triggers.forEach((t) => t.kill());
      ground.kill();
    };
  }, []);

  const handleLinkClick = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <header className={`nav${solid || open ? ' nav--solid' : ''}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__logo">
          BARATHKUMAR
        </a>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav__link chrome${active === link.href ? ' is-active' : ''}`}
              aria-current={active === link.href ? 'location' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn-primary btn-sm nav__cta" data-attract>
          Hire me
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          {open ? <X size={26} aria-hidden="true" /> : <List size={26} aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className="nav__mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
      >
        <nav aria-label="Mobile" className="container nav__mobile-links">
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="nav__mobile-link title"
              style={{ '--i': i }}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={handleLinkClick} className="btn btn-primary nav__mobile-cta" style={{ '--i': LINKS.length }}>
            Hire me
          </a>
        </nav>
      </div>
    </header>
  );
}
