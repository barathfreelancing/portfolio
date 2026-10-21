import { useEffect, useRef, useState } from 'react';
import {
  CaretDown,
  Check,
  CheckCircle,
  Copy,
  EnvelopeSimple,
  GithubLogo,
  PaperPlaneTilt,
  WhatsappLogo,
} from '@phosphor-icons/react';
import { gsap, EASE_OUT, prefersReducedMotion } from '../motion/gsap';
import { flareWorld } from '../world/signals';

const EMAIL = 'barathfreelancing@gmail.com';
const WHATSAPP_URL = `https://wa.me/918148290307?text=${encodeURIComponent(
  'Hi Barathkumar, I saw your portfolio and would like to talk about a project.'
)}`;

const PROJECT_TYPES = ['Website', 'Full-stack application', 'API / integration', 'AI / automation', 'Other'];
const BUDGETS = ['Under ₹25k', '₹25k - ₹50k', '₹50k - ₹1L', '₹1L - ₹2L', '₹2L - ₹5L', '₹5L+'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE = 800;

const EMPTY_FORM = { name: '', email: '', type: PROJECT_TYPES[0], budget: 2, message: '' };

const validators = {
  name: (v) => (v.trim() ? '' : 'Enter your name.'),
  email: (v) => (EMAIL_RE.test(v.trim()) ? '' : 'Enter a valid email.'),
  message: (v) => (v.trim() ? '' : 'Tell me a bit about the project.'),
};

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error' | 'email'
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const formRef = useRef(null);
  const rootRef = useRef(null);
  const copyTimer = useRef(0);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  // Many visitors have no desktop mail client, so the address is one click from their clipboard.
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const field = document.createElement('textarea');
      field.value = EMAIL;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      field.remove();
    }
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    // Closing title card: the headline wipes in when the reader arrives.
    const ctx = gsap.context(() => {
      gsap.from('.contact__line > span', {
        yPercent: 108,
        duration: 1,
        ease: EASE_OUT,
        stagger: 0.08,
        scrollTrigger: { trigger: '.contact__headline', start: 'top 85%', once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const update = (field) => (e) => {
    const value = field === 'budget' ? Number(e.target.value) : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    if (touched[field] && validators[field]) {
      setErrors((prev) => ({ ...prev, [field]: validators[field](value) }));
    }
  };

  const handleBlur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validators[field](form[field]) }));
  };

  const validate = () => {
    const next = {};
    Object.keys(validators).forEach((field) => {
      next[field] = validators[field](form[field]);
    });
    setErrors(next);
    setTouched({ name: true, email: true, message: true });
    const firstInvalid = Object.keys(next).find((k) => next[k]);
    if (firstInvalid) {
      formRef.current?.querySelector(`#${firstInvalid}`)?.focus();
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting' || !validate()) return;

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
    if (!accessKey) {
      const subject = encodeURIComponent(`Project enquiry: ${form.type}`);
      const body = encodeURIComponent(
        `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\nProject type: ${form.type}\nBudget: ${BUDGETS[form.budget]}\n\n${form.message.trim()}`
      );
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      setStatus('email');
      setFeedbackMessage('Your email app should open with the enquiry ready. Send it there to complete your message.');
      return;
    }

    setStatus('submitting');
    setFeedbackMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Project enquiry: ${form.type}`,
          from_name: form.name.trim(),
          name: form.name.trim(),
          email: form.email.trim(),
          project_type: form.type,
          budget: BUDGETS[form.budget],
          message: form.message.trim(),
        }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Request failed');

      setStatus('success');
      flareWorld();
    } catch {
      setStatus('error');
      setFeedbackMessage(`Could not send your enquiry. Please email ${EMAIL} directly.`);
    }
  };

  const reset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setTouched({});
    setFeedbackMessage('');
    setStatus('idle');
  };

  const renderField = (field, label, Tag, props) => (
    <div className={`field${errors[field] ? ' is-invalid' : ''}`}>
      <label htmlFor={field} className="field__label chrome">
        {label}
      </label>
      <Tag
        id={field}
        value={form[field]}
        onChange={update(field)}
        onBlur={handleBlur(field)}
        disabled={status === 'submitting'}
        aria-invalid={Boolean(errors[field])}
        aria-describedby={errors[field] ? `${field}-error` : undefined}
        {...props}
      />
      {errors[field] && (
        <span id={`${field}-error`} className="field__error">
          {errors[field]}
        </span>
      )}
    </div>
  );

  return (
    <section id="contact" className="contact section-pad" ref={rootRef}>
      <div className="container contact__grid">
        <div className="contact__intro">
          <h2 className="title title--lg contact__headline">
            <span className="mask contact__line">
              <span>Let’s build</span>
            </span>
            <span className="mask contact__line">
              <span>something</span>
            </span>
            <span className="mask contact__line contact__line--accent">
              <span>extraordinary.</span>
            </span>
          </h2>
          <p className="lead contact__lead">Have an idea worth bringing to life? Tell me what you want to build.</p>

          <ul className="contact__direct">
            <li className="contact__email">
              <a href={`mailto:${EMAIL}`} className="contact__link">
                <EnvelopeSimple size={20} aria-hidden="true" />
                {EMAIL}
              </a>
              <button type="button" className="contact__copy" onClick={copyEmail}>
                {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
                <span className="visually-hidden"> email address</span>
              </button>
              <span className="visually-hidden" role="status">
                {copied ? 'Email address copied' : ''}
              </span>
            </li>
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="contact__link">
                <WhatsappLogo size={20} aria-hidden="true" />
                +91 81482 90307 (WhatsApp)
              </a>
            </li>
            <li>
              <a href="https://github.com/barathfreelancing" target="_blank" rel="noreferrer" className="contact__link">
                <GithubLogo size={20} aria-hidden="true" />
                github.com/barathfreelancing
              </a>
            </li>
          </ul>

          <div className="next">
            <h3 className="next__title chrome">What happens next</h3>
            <ol className="next__steps">
              <li>Send the form, an email or a WhatsApp message with a short brief.</li>
              <li>I reply within 24 hours.</li>
              <li>We talk through the goals, scope and timeline on a short call.</li>
              <li>You get a written scope and a quote.</li>
            </ol>
          </div>
        </div>

        {status === 'success' ? (
          <div className="contact-panel contact-success" role="status">
            <CheckCircle size={44} weight="light" className="contact-success__icon" aria-hidden="true" />
            <h3 className="title title--sm">Enquiry sent</h3>
            <p className="body">
              Thanks, {form.name.trim().split(' ')[0] || 'there'}. I&rsquo;ll reply to {form.email.trim()} within 24
              hours.
            </p>
            <button type="button" className="btn btn-ghost btn-sm" onClick={reset}>
              Send another
            </button>
          </div>
        ) : (
          <form className="contact-panel contact-form" onSubmit={handleSubmit} noValidate ref={formRef}>
            <div className="contact-form__row">
              {renderField('name', 'Name', 'input', { type: 'text', autoComplete: 'name' })}
              {renderField('email', 'Email', 'input', { type: 'email', autoComplete: 'email' })}
            </div>

            <div className="field">
              <label htmlFor="type" className="field__label chrome">
                Project type
              </label>
              <div className="field__select">
                <select id="type" value={form.type} onChange={update('type')} disabled={status === 'submitting'}>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <CaretDown size={16} weight="bold" aria-hidden="true" />
              </div>
            </div>

            <div className="field budget">
              <div className="budget__head">
                <label htmlFor="budget" className="field__label chrome">
                  Budget
                </label>
                <output htmlFor="budget" className="budget__value">
                  {BUDGETS[form.budget]}
                </output>
              </div>
              <input
                id="budget"
                type="range"
                min="0"
                max={BUDGETS.length - 1}
                step="1"
                value={form.budget}
                onChange={update('budget')}
                disabled={status === 'submitting'}
                style={{ '--fill': `${(form.budget / (BUDGETS.length - 1)) * 100}%` }}
                aria-valuetext={BUDGETS[form.budget]}
              />
              <div className="budget__ticks" aria-hidden="true">
                <span>{BUDGETS[0]}</span>
                <span>{BUDGETS[BUDGETS.length - 1]}</span>
              </div>
            </div>

            {renderField('message', 'Message', 'textarea', {
              rows: 5,
              maxLength: MAX_MESSAGE,
              placeholder: 'What are you building, and by when?',
            })}
            <span className={`field__count${form.message.length > MAX_MESSAGE - 100 ? ' is-near' : ''}`}>
              {form.message.length}/{MAX_MESSAGE}
            </span>

            {feedbackMessage && (
              <div
                className={`contact-form__feedback contact-form__feedback--${status}`}
                role={status === 'email' ? 'status' : 'alert'}
              >
                {feedbackMessage}
              </div>
            )}

            <button
              type="submit"
              data-attract
              className={`btn btn-primary contact-form__submit${status === 'submitting' ? ' is-busy' : ''}`}
              disabled={status === 'submitting'}
              aria-busy={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending...' : 'Send enquiry'}
              <PaperPlaneTilt size={18} weight="bold" aria-hidden="true" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
