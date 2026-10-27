import { useEffect, useRef, useState } from 'react';
<<<<<<< HEAD
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
=======
import { CaretDown, CheckCircle, EnvelopeSimple, GithubLogo, PaperPlaneTilt, WhatsappLogo } from '@phosphor-icons/react';
import { site } from '../data/site';
import { onInquiryPreselect } from '../lib/inquiry';
import LocalTime from '../components/LocalTime';

const PROJECT_TYPES = ['Website', 'Landing page', 'Full-stack application', 'API / integration', 'AI / automation', 'Other'];
>>>>>>> 27c7e9f (ui change)
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
<<<<<<< HEAD
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
=======
  const successRef = useRef(null);
  const refocusName = useRef(false);
>>>>>>> 27c7e9f (ui change)

  // The form unmounts on success; move focus to the confirmation, and back to Name after "Send another".
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
    if (status === 'idle' && refocusName.current) {
      refocusName.current = false;
      formRef.current?.querySelector('#name')?.focus();
    }
  }, [status]);

  // A service's "Discuss ..." link preselects the matching project type.
  useEffect(
    () =>
      onInquiryPreselect((type) => {
        if (PROJECT_TYPES.includes(type)) setForm((f) => ({ ...f, type }));
      }),
    []
  );

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
<<<<<<< HEAD
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
=======
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
>>>>>>> 27c7e9f (ui change)
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
    } catch {
      setStatus('error');
<<<<<<< HEAD
      setFeedbackMessage(`Could not send your enquiry. Please email ${EMAIL} directly.`);
=======
      setFeedbackMessage(`Could not send your enquiry. Please email ${site.email} directly.`);
>>>>>>> 27c7e9f (ui change)
    }
  };

  const reset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setTouched({});
    setFeedbackMessage('');
    refocusName.current = true;
    setStatus('idle');
  };

  const renderField = (field, label, Tag, props) => (
    <div className={`field${errors[field] ? ' is-invalid' : ''}`}>
      <label htmlFor={field} className="field__label">
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
    <section id="contact" className="contact section-pad" aria-labelledby="contact-title" data-tone="paper">
      <div className="container">
        <h2 id="contact-title" className="heading contact__headline" data-reveal>
          Have a project in mind? Let&rsquo;s build something valuable.
        </h2>

<<<<<<< HEAD
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
=======
        {/* The enquiry as a coupon: details on the stub, the form on the slip, a perforation between */}
        <div className="coupon" data-reveal style={{ '--d': 1 }}>
          <div className="coupon__stub">
            <div className="coupon__stub-top">
              <p className="subheading coupon__title">Project enquiry</p>
              <p className="coupon__sentence">
                Tell me what you want to build and roughly when you need it. The form comes straight to my inbox.
              </p>
            </div>

            <ul className="coupon__direct">
              <li>
                <a href={`mailto:${site.email}`} className="coupon__link">
                  <EnvelopeSimple size={20} aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${site.whatsappNumber}`} target="_blank" rel="noreferrer" className="coupon__link">
                  <WhatsappLogo size={20} aria-hidden="true" />
                  {site.whatsappLabel} on WhatsApp
                </a>
              </li>
              <li>
                <a href={site.githubUrl} target="_blank" rel="noreferrer" className="coupon__link">
                  <GithubLogo size={20} aria-hidden="true" />
                  {site.githubLabel}
                </a>
              </li>
            </ul>

            <p className="status coupon__status">
              {site.available && (
                <>
                  <span className="status__dot" aria-hidden="true" />
                  <span>{site.availabilityLabel}</span>
                  <span aria-hidden="true">·</span>
                </>
              )}
              <LocalTime />
>>>>>>> 27c7e9f (ui change)
            </p>
          </div>

          <span className="coupon__perf" aria-hidden="true" />

          <div className="coupon__slip">
            {status === 'success' ? (
              <div className="contact-success" role="status">
                <CheckCircle size={44} weight="light" className="contact-success__icon" aria-hidden="true" />
                <h3 className="subheading contact-success__title" ref={successRef} tabIndex={-1}>
                  Enquiry sent
                </h3>
                <p>
                  Thanks, {form.name.trim().split(' ')[0] || 'there'}. I&rsquo;ll get back to you at{' '}
                  {form.email.trim()} soon.
                </p>
                <button type="button" className="btn btn-light btn-sm" onClick={reset}>
                  Send another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate ref={formRef} aria-label="Project enquiry">
                <div className="contact-form__row">
                  {renderField('name', 'Name', 'input', { type: 'text', autoComplete: 'name' })}
                  {renderField('email', 'Email', 'input', { type: 'email', autoComplete: 'email' })}
                </div>

                <div className="field">
                  <label htmlFor="type" className="field__label">
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
                    <label htmlFor="budget" className="field__label">
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
                  rows: 4,
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
        </div>
      </div>
    </section>
  );
}
