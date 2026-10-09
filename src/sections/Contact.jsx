import { useRef, useState } from 'react';

const PROJECT_TYPES = ['Website', 'Full-stack application', 'API / integration', 'AI / automation', 'Other'];
const BUDGETS = ['Under ₹25k', '₹25k – ₹50k', '₹50k – ₹1L', '₹1L – ₹2L', '₹2L – ₹5L', '₹5L+'];
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
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const formRef = useRef(null);

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

    setStatus('submitting');
    setFeedbackMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
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
      setFeedbackMessage('Could not send your enquiry. Please email barathfreelancing@gmail.com directly.');
    }
  };

  const reset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setTouched({});
    setFeedbackMessage('');
    setStatus('idle');
  };

  const isValid = (field) => touched[field] && !errors[field] && form[field].trim() !== '';

  const renderField = (field, label, Tag, props) => (
    <div
      className={`form-field form-field--float${errors[field] ? ' is-invalid' : ''}${
        isValid(field) ? ' is-valid' : ''
      }`}
    >
      <Tag
        id={field}
        value={form[field]}
        placeholder=" "
        onChange={update(field)}
        onBlur={handleBlur(field)}
        disabled={status === 'submitting'}
        aria-invalid={Boolean(errors[field])}
        aria-describedby={errors[field] ? `${field}-error` : undefined}
        {...props}
      />
      <label htmlFor={field}>{label}</label>
      <svg className="form-field__tick" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M4 10.5l4 4 8-9" />
      </svg>
      {errors[field] && (
        <span id={`${field}-error`} className="form-field__error">
          {errors[field]}
        </span>
      )}
    </div>
  );

  return (
    <section id="contact" className="contact section-pad">
      <div className="container contact__grid">
        <div className="contact__intro">
          <p className="eyebrow">Contact</p>
          <h2 className="display-lg contact__headline">Have a problem worth building around?</h2>
          <p className="body-lg contact__lead">
            Tell me what you&rsquo;re trying to build, automate, or improve.
          </p>

          <div className="contact__direct">
            <a href="mailto:barathfreelancing@gmail.com" className="contact__direct-link">
              barathfreelancing@gmail.com
            </a>
            <a href="https://wa.me/918148290307" target="_blank" rel="noreferrer" className="contact__direct-link">
              +91 81482 90307 (WhatsApp)
            </a>
            <a
              href="https://github.com/barath220904"
              target="_blank"
              rel="noreferrer"
              className="contact__direct-link"
            >
              github.com/barath220904
            </a>
          </div>
        </div>

        {status === 'success' ? (
          <div className="contact-success" role="status">
            <svg className="contact-success__check" viewBox="0 0 52 52" aria-hidden="true">
              <circle cx="26" cy="26" r="24" />
              <path d="M15 27l8 8 14-16" />
            </svg>
            <h3 className="display-sm">Enquiry sent</h3>
            <p className="body-md">
              Thanks, {form.name.trim().split(' ')[0] || 'there'}. I&rsquo;ll get back to you at{' '}
              {form.email.trim()} soon.
            </p>
            <button type="button" className="btn btn-secondary btn-sm" onClick={reset}>
              Send another
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate ref={formRef}>
            {renderField('name', 'Name', 'input', { type: 'text', autoComplete: 'name' })}
            {renderField('email', 'Email', 'input', { type: 'email', autoComplete: 'email' })}

            <div className="form-field">
              <label htmlFor="type" className="form-field__label-static">
                Project type
              </label>
              <select
                id="type"
                value={form.type}
                onChange={update('type')}
                disabled={status === 'submitting'}
              >
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field budget">
              <div className="budget__head">
                <label htmlFor="budget" className="form-field__label-static">
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

            {renderField('message', 'Message', 'textarea', { rows: 4, maxLength: MAX_MESSAGE })}
            <span
              className={`form-field__count${form.message.length > MAX_MESSAGE - 100 ? ' is-near' : ''}`}
            >
              {form.message.length}/{MAX_MESSAGE}
            </span>

            {feedbackMessage && (
              <div className={`contact-form__feedback contact-form__feedback--${status}`} role="alert">
                {feedbackMessage}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary contact-form__submit"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? (
                <>
                  <span className="spinner" aria-hidden="true" /> Sending...
                </>
              ) : (
                'Send enquiry'
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
