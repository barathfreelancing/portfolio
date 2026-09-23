import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/reviews.css';

gsap.registerPlugin(ScrollTrigger);

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Modal form state
  const [formData, setFormData] = useState({ name: '', company: '', role: '', review: '' });
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // 'submitting' | 'success' | 'error'

  const sectionRef = useRef(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews`);
      if (!res.ok) throw new Error('Failed to load reviews.');
      const data = await res.json();
      setReviews(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (loading || reviews.length === 0) return;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      const cards = gsap.utils.toArray('.review-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, reviews, expanded]);

  const handleShowMore = () => {
    setExpanded(true);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.review.trim()) errs.review = 'Please enter your review or feedback.';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitStatus('submitting');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to submit review.');

      setSubmitStatus('success');
      setFormData({ name: '', company: '', role: '', review: '' });
      setFormErrors({});
      // Refresh the public list so the new review appears immediately
      fetchReviews();
    } catch (err) {
      setSubmitStatus('error');
    }
  };

  const visibleReviews = expanded ? reviews : reviews.slice(0, 4);

  return (
    <section id="reviews" className="reviews section-pad hairline" ref={sectionRef}>
      <div className="container">
        <div className="reviews__header">
          <div className="reviews__title-group">
            <p className="eyebrow">Worked With Me</p>
            <h2 className="display-lg">Client feedback & recommendations</h2>
          </div>
          <div className="reviews__actions">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setModalOpen(true);
                setSubmitStatus(null);
              }}
            >
              Write a testimonial
            </button>
          </div>
        </div>

        {loading && (
          <div className="reviews__loading body-md">
            <p className="caption-mono">Loading reviews...</p>
          </div>
        )}

        {error && !loading && (
          <div className="reviews__empty">
            <p className="body-md" style={{ color: '#ef4444' }}>
              Unable to load reviews right now.
            </p>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ marginTop: '12px' }}
              onClick={fetchReviews}
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && reviews.length === 0 && (
          <div className="reviews__empty">
            <h3 className="display-sm reviews__empty-title">No client reviews yet</h3>
            <p className="body-md">
              Have we collaborated on a project? Be the first to leave a testimonial!
            </p>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              style={{ marginTop: '16px' }}
              onClick={() => {
                setModalOpen(true);
                setSubmitStatus(null);
              }}
            >
              Submit a review
            </button>
          </div>
        )}

        {!loading && !error && reviews.length > 0 && (
          <>
            <div className="reviews__staggered-container">
              {visibleReviews.map((item, index) => {
                const isOdd = index % 2 === 0; // index 0 (1st) = left, index 1 (2nd) = right, etc.
                const alignmentClass = isOdd ? 'reviews__row--left' : 'reviews__row--right';
                const cardClass = isOdd ? 'review-card--left' : 'review-card--right';

                return (
                  <div key={item.id} className={`reviews__row ${alignmentClass}`}>
                    <article className={`review-card ${cardClass}`}>
                      <div className="review-card__quote-icon" aria-hidden="true">
                        &ldquo;
                      </div>
                      <p className="review-card__text">{item.review}</p>
                      <div className="review-card__footer">
                        <div className="review-card__author">
                          <span className="review-card__name">{item.name}</span>
                          {(item.role || item.company) && (
                            <span className="review-card__meta">
                              {[item.role, item.company].filter(Boolean).join(' • ')}
                            </span>
                          )}
                        </div>
                        {item.created_at && (
                          <span className="review-card__date">
                            {new Date(item.created_at).toLocaleDateString(undefined, {
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        )}
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>

            {reviews.length > 4 && !expanded && (
              <div className="reviews__show-more-wrap">
                <button type="button" className="reviews__show-more-btn" onClick={handleShowMore}>
                  SHOW MORE &rarr;
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal for Client Submissions */}
      {modalOpen && (
        <div
          className="review-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setModalOpen(false)}
        >
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <div className="review-modal__header">
              <h3 id="modal-title" className="display-sm">
                Write a Testimonial
              </h3>
              <button
                type="button"
                className="review-modal__close"
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {submitStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <h4 className="display-sm" style={{ color: '#10b981', marginBottom: '8px' }}>
                  Thank you!
                </h4>
                <p className="body-md">
                  Thanks — your review is now live.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: '20px' }}
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </button>
              </div>
            ) : (
              <form className="review-form" onSubmit={handleFormSubmit} noValidate>
                <div className="form-field">
                  <label htmlFor="rev-name">Your Name *</label>
                  <input
                    id="rev-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Smith"
                  />
                  {formErrors.name && <span className="form-field__error">{formErrors.name}</span>}
                </div>

                <div className="review-form__row">
                  <div className="form-field">
                    <label htmlFor="rev-role">Role / Title</label>
                    <input
                      id="rev-role"
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. Founder / CTO"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="rev-company">Company</label>
                    <input
                      id="rev-company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Acme Inc"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="rev-text">Testimonial *</label>
                  <textarea
                    id="rev-text"
                    rows={4}
                    value={formData.review}
                    onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                    placeholder="Share your experience working with Barath..."
                  />
                  {formErrors.review && (
                    <span className="form-field__error">{formErrors.review}</span>
                  )}
                </div>

                {submitStatus === 'error' && (
                  <p className="form-field__error">
                    Something went wrong. Please check connection and try again.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitStatus === 'submitting'}
                  style={{ marginTop: '8px' }}
                >
                  {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Testimonial'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
