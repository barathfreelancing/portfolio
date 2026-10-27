import { ArrowUp } from '@phosphor-icons/react';
import { site } from '../data/site';
import LocalTime from './LocalTime';

const YEAR = new Date().getFullYear();
const [EMAIL_USER, EMAIL_DOMAIN] = site.email.split('@');

export default function Footer() {
  return (
    <footer className="footer" data-tone="cobalt">
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__notes small">
            <p>
              <strong>{site.name}</strong>. {site.role}.
            </p>
            <p>
              Websites, web apps and AI automation. <LocalTime />.
            </p>
          </div>
          <a href="#top" className="arrow-link footer__top-link">
            Back to top
            <ArrowUp size={16} weight="bold" aria-hidden="true" />
          </a>
        </div>

        {/* The way to get in touch is the display line; it breaks before the @ */}
        <a href={`mailto:${site.email}`} className="footer__email">
          <span className="footer__email-line">{EMAIL_USER}</span>
          <span className="footer__email-line">@{EMAIL_DOMAIN}</span>
        </a>

        <div className="footer__meta small">
          <nav className="footer__links" aria-label="Footer">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#process">Process</a>
            <a href="#about">About</a>
            <a href={site.githubUrl} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={`https://wa.me/${site.whatsappNumber}`} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a
              href={`https://mail.google.com/mail/?view=cm&to=${site.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Write in Gmail
            </a>
          </nav>
          <p>
            &copy; {YEAR} {site.name}
          </p>
          <p>{site.timeZoneLabel}</p>
        </div>
      </div>
    </footer>
  );
}
