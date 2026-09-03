const EMAIL = "barathfreelancing@gmail.com";
const GITHUB_URL = "https://github.com/barath220904";
const LINKEDIN_URL = "https://linkedin.com/in/barathkumar2209";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/70">
      <div className="max-w-content mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="font-serif text-lg text-cream">Barath Kumar</p>
          <p className="text-sm mt-1">Freelance Software Developer, AI/ML Engineer &amp; Automation Developer</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
            GitHub
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
            LinkedIn
          </a>
          <a href={`mailto:${EMAIL}`} className="hover:text-cream">
            Email
          </a>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <p className="max-w-content mx-auto px-6 md:px-10 py-5 text-xs text-cream/50">
          © 2026 Barath Kumar
        </p>
      </div>
    </footer>
  );
}
