import { useState, useEffect } from 'react';
import '../styles/reviews.css';

export default function AdminReviews() {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || '');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });

      if (!res.ok) throw new Error('Invalid admin password.');

      const data = await res.json();
      setToken(data.token);
      localStorage.setItem('admin_token', data.token);
      setPasswordInput('');
    } catch (err) {
      setLoginError(err.message);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('admin_token');
  };

  const loadAdminReviews = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/reviews`, {
        headers: {
          'X-Admin-Key': token,
        },
      });

      if (res.status === 401) {
        handleLogout();
        throw new Error('Session expired or unauthorized.');
      }

      if (!res.ok) throw new Error('Failed to load admin reviews.');

      const data = await res.json();
      setReviews(data);
      setFetchError('');
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadAdminReviews();
    }
  }, [token]);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/reviews/${id}/approve`, {
        method: 'PATCH',
        headers: {
          'X-Admin-Key': token,
        },
      });

      if (!res.ok) throw new Error('Failed to approve review.');

      await loadAdminReviews();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews/${id}`, {
        method: 'DELETE',
        headers: {
          'X-Admin-Key': token,
        },
      });

      if (!res.ok) throw new Error('Failed to delete review.');

      await loadAdminReviews();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!token) {
    return (
      <section className="admin-page section-pad">
        <div className="container admin-login-container">
          <div className="review-card">
            <h2 className="display-sm" style={{ marginBottom: '8px' }}>
              Admin Access
            </h2>
            <p className="body-sm" style={{ marginBottom: '20px' }}>
              Enter password to manage client reviews.
            </p>

            <form onSubmit={handleLogin} className="review-form">
              <div className="form-field">
                <label htmlFor="admin-pass">Password</label>
                <input
                  id="admin-pass"
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password"
                  autoFocus
                />
                {loginError && <span className="form-field__error">{loginError}</span>}
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>
                Authenticate
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  const pendingReviews = reviews.filter((r) => !r.is_approved);
  const publishedReviews = reviews.filter((r) => r.is_approved);

  return (
    <section className="admin-page section-pad">
      <div className="container">
        <div className="admin-header">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h2 className="display-lg">Review Moderation</h2>
          </div>
          <div>
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {fetchError && (
          <p className="body-md" style={{ color: '#ef4444', marginBottom: '16px' }}>
            {fetchError}
          </p>
        )}

        {loading ? (
          <p className="caption-mono">Loading reviews for moderation...</p>
        ) : (
          <>
            {/* PENDING SECTION */}
            <div className="admin-section">
              <h3 className="admin-section__title">
                Pending Reviews ({pendingReviews.length})
              </h3>
              {pendingReviews.length === 0 ? (
                <p className="body-sm" style={{ color: 'var(--mute)' }}>
                  No pending reviews awaiting approval.
                </p>
              ) : (
                pendingReviews.map((item) => (
                  <div key={item.id} className="admin-card">
                    <div className="admin-card__body">
                      <p className="body-md" style={{ fontWeight: 500, marginBottom: '6px' }}>
                        &ldquo;{item.review}&rdquo;
                      </p>
                      <p className="caption-mono">
                        By: <strong>{item.name}</strong>{' '}
                        {[item.role, item.company].filter(Boolean).length > 0 &&
                          `(${[item.role, item.company].filter(Boolean).join(', ')})`}
                      </p>
                      <p className="review-card__date" style={{ marginTop: '4px' }}>
                        Submitted: {new Date(item.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="admin-card__actions">
                      <button
                        type="button"
                        className="btn-approve"
                        onClick={() => handleApprove(item.id)}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        className="btn-delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* PUBLISHED SECTION */}
            <div className="admin-section">
              <h3 className="admin-section__title">
                Published Reviews ({publishedReviews.length})
              </h3>
              {publishedReviews.length === 0 ? (
                <p className="body-sm" style={{ color: 'var(--mute)' }}>
                  No published reviews.
                </p>
              ) : (
                publishedReviews.map((item) => (
                  <div key={item.id} className="admin-card">
                    <div className="admin-card__body">
                      <p className="body-md" style={{ fontWeight: 500, marginBottom: '6px' }}>
                        &ldquo;{item.review}&rdquo;
                      </p>
                      <p className="caption-mono">
                        By: <strong>{item.name}</strong>{' '}
                        {[item.role, item.company].filter(Boolean).length > 0 &&
                          `(${[item.role, item.company].filter(Boolean).join(', ')})`}
                      </p>
                      <p className="review-card__date" style={{ marginTop: '4px' }}>
                        Published: {new Date(item.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="admin-card__actions">
                      <button
                        type="button"
                        className="btn-delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
