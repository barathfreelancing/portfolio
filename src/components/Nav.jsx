import { useEffect, useRef, useState } from 'react';
import { ArrowRight, List, X } from '@phosphor-icons/react';
import { site } from '../data/site';

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [tone, setTone] = useState('paper');
  const headerRef = useRef(null);
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
        const links = [toggleRef.current, ...(menuRef.current?.querySelectorAll('a') ?? [])].filter(Boolean);
        if (!links.length) return;
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

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 961px)');
    const onChange = (e) => e.matches && setOpen(false);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  // Mark the section being read; a thin band in the upper third of the viewport decides which one.
  useEffect(() => {
    const sections = LINKS.map(({ href }) => document.querySelector(href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const href = `#${entry.target.id}`;
          if (entry.isIntersecting) setActive(href);
          else setActive((current) => (current === href ? '' : current));
        });
      },
      { rootMargin: '-35% 0px -60% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Colour by chapter: the bar takes the field colour of whatever passes under its middle line.
  useEffect(() => {
    let observer;
    const observe = () => {
      observer?.disconnect();
      const mid = Math.round((headerRef.current?.offsetHeight ?? 68) / 2);
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Only fields that start at the left edge count, so a split section is decided by its first half
            if (entry.isIntersecting && entry.boundingClientRect.left <= 1) setTone(entry.target.dataset.tone);
          });
        },
        { rootMargin: `-${mid}px 0px -${Math.max(window.innerHeight - mid - 1, 0)}px 0px` }
      );
      document.querySelectorAll('[data-tone]').forEach((el) => observer.observe(el));
    };
    observe();
    window.addEventListener('resize', observe);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', observe);
    };
  }, []);

  // Focus is left alone so the browser's next Tab starts from the chosen section.
  const handleLinkClick = () => setOpen(false);

  return (
    <header ref={headerRef} className="nav" data-nav-tone={open ? 'paper' : tone}>
      <div className="container nav__inner">
        <a href="#top" className="nav__logo">
          <span className="nav__mark" aria-hidden="true">
            B
          </span>
          {site.name}
        </a>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.slice(0, -1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav__link${active === link.href ? ' is-active' : ''}`}
              aria-current={active === link.href ? 'location' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn-sm nav__cta">
          Discuss a project
          <ArrowRight size={16} weight="bold" aria-hidden="true" />
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
          {open ? <X size={20} aria-hidden="true" /> : <List size={20} aria-hidden="true" />}
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
              className={`nav__mobile-link${active === link.href ? ' is-active' : ''}`}
              style={{ '--i': i }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={handleLinkClick}
            className="btn btn-primary nav__mobile-cta"
            style={{ '--i': LINKS.length }}
          >
            Discuss a project
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}
