import { useState } from 'react';

const PROJECT_TYPES = ['Website', 'Full-stack application', 'API / integration', 'AI / automation', 'Other'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: PROJECT_TYPES[0], message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'success'
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Enter your name.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Enter a valid email.';
    }
    if (!form.type) next.type = 'Select a project type.';
    if (!form.message.trim()) next.message = 'Tell me a bit about the project.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = `Project enquiry: ${form.type}`;
    const body = `Name: ${form.name.trim()}
Email: ${form.email.trim()}
Project type: ${form.type}

${form.message.trim()}`;
    window.location.href = `mailto:barathfreelancing@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setStatus('success');
    setFeedbackMessage('Opening your email app to send the enquiry.');
  };

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

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={update('name')}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <span id="name-error" className="form-field__error">
                {errors.name}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={update('email')}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className="form-field__error">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="type">Project type</label>
            <select
              id="type"
              value={form.type}
              onChange={update('type')}
            >
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows={4}
              value={form.message}
              onChange={update('message')}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <span id="message-error" className="form-field__error">
                {errors.message}
              </span>
            )}
          </div>

          {feedbackMessage && (
            <div className={`contact-form__feedback contact-form__feedback--${status}`} role="alert">
              {feedbackMessage}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary contact-form__submit"
          >
            Send enquiry
          </button>
        </form>
      </div>
    </section>
  );
}
