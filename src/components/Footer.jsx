const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <p className="footer__name">BARATHKUMAR</p>
          <p className="caption-mono">Full-stack Python &amp; AI developer</p>
        </div>

        <nav className="footer__links" aria-label="Footer">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
          <a href="https://github.com/barath220904" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&to=barathfreelancing@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Email
          </a>
          <a href="https://wa.me/918148290307" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a href="/admin/reviews" style={{ opacity: 0.6 }}>
            Admin
          </a>
        </nav>

        <p className="footer__meta caption-mono">&copy; {YEAR}</p>
      </div>
    </footer>
  );
}
