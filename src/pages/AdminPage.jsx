/**
 * AdminPage.jsx
 *
 * Private admin dashboard for the recommendation/experience system.
 *
 * Auth: The admin secret is entered at runtime in the login form.
 *       It is stored only in sessionStorage for the browser session —
 *       NEVER hardcoded here or in any VITE_* env var.
 *
 * APIs used (all existing, unchanged):
 *   GET  /api/admin/recommendations
 *   PATCH /api/admin/recommendations/{id}/approve
 *   PATCH /api/admin/recommendations/{id}/reject
 */

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Star,
  Check,
  X,
  Search,
  AlertCircle,
  Loader2,
  ShieldCheck,
} from "lucide-react";

/* ─── Constants ─────────────────────────────────────────────────── */
const SESSION_KEY = "admin_token";
const ADMIN_API = "/api/admin/recommendations";
const TABS = ["All", "Pending", "Approved", "Rejected"];

/* ─── Helpers ───────────────────────────────────────────────────── */
function authHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ─── StarDisplay ───────────────────────────────────────────────── */
function StarDisplay({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? "text-ink fill-ink" : "text-line fill-line"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/* ─── Toast notification ────────────────────────────────────────── */
function Toast({ message, type }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium shadow-lg border ${
        type === "error"
          ? "bg-cream border-line text-ink"
          : "bg-ink border-ink text-cream"
      }`}
    >
      {type === "error" ? (
        <AlertCircle size={15} />
      ) : (
        <Check size={15} />
      )}
      {message}
    </motion.div>
  );
}

/* ─── Confirm dialog ────────────────────────────────────────────── */
function ConfirmDialog({ message, onConfirm, onCancel, loading }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-ink/30 px-6"
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="bg-cream border border-line rounded-2xl p-8 max-w-sm w-full"
      >
        <p className="text-ink leading-relaxed">{message}</p>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 border border-line rounded-full py-2.5 text-sm font-medium text-ink-soft hover:border-ink hover:text-ink transition-colors duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-ink text-cream rounded-full py-2.5 text-sm font-medium hover:opacity-80 transition-opacity duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={13} className="animate-spin" />}
            Reject
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Experience card ───────────────────────────────────────────── */
function ExperienceCard({ rec, token, onUpdate, onToast }) {
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [confirmReject, setConfirmReject] = useState(false);

  async function handleApprove() {
    setApproving(true);
    try {
      const res = await fetch(`${ADMIN_API}/${rec.id}/approve`, {
        method: "PATCH",
        headers: authHeaders(token),
      });
      if (res.status === 401 || res.status === 403) {
        onToast("Session expired. Please log in again.", "error");
        return;
      }
      if (!res.ok) throw new Error();
      const updated = await res.json();
      onUpdate(updated);
      onToast("Experience approved.", "success");
    } catch {
      onToast("Failed to approve. Please try again.", "error");
    } finally {
      setApproving(false);
    }
  }

  async function handleRejectConfirmed() {
    setRejecting(true);
    try {
      const res = await fetch(`${ADMIN_API}/${rec.id}/reject`, {
        method: "PATCH",
        headers: authHeaders(token),
      });
      if (res.status === 401 || res.status === 403) {
        onToast("Session expired. Please log in again.", "error");
        return;
      }
      if (!res.ok) throw new Error();
      const updated = await res.json();
      onUpdate(updated);
      onToast("Experience rejected.", "success");
    } catch {
      onToast("Failed to reject. Please try again.", "error");
    } finally {
      setRejecting(false);
      setConfirmReject(false);
    }
  }

  const statusBadge = {
    pending: "bg-cream-dim border-line text-ink-soft",
    approved: "bg-cream-dim border-line text-ink",
    rejected: "bg-cream-dim border-line text-ink-soft",
  };

  return (
    <>
      <AnimatePresence>
        {confirmReject && (
          <ConfirmDialog
            message="Are you sure you want to reject this experience? This will remove it from the public portfolio."
            onConfirm={handleRejectConfirmed}
            onCancel={() => setConfirmReject(false)}
            loading={rejecting}
          />
        )}
      </AnimatePresence>

      <motion.article
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="border border-line rounded-xl p-6 md:p-8 bg-cream"
      >
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-serif text-lg text-ink leading-tight">{rec.name}</p>
            <p className="text-sm text-ink-soft mt-0.5">
              {[rec.role, rec.company].filter(Boolean).join(" · ")}
            </p>
          </div>
          <span
            className={`eyebrow text-xs uppercase tracking-widest px-3 py-1 rounded-full border ${statusBadge[rec.status]}`}
          >
            {rec.status}
          </span>
        </div>

        {/* Rating + project */}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <StarDisplay rating={rec.rating} />
          {rec.project && (
            <span className="text-xs text-ink-soft border border-line rounded-full px-3 py-1">
              {rec.project}
            </span>
          )}
        </div>

        {/* Message */}
        <blockquote className="mt-4 text-ink leading-relaxed text-sm border-l-2 border-line pl-4">
          &ldquo;{rec.message}&rdquo;
        </blockquote>

        {/* Footer */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-ink-soft">
            Submitted {formatDate(rec.created_at)}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {rec.status !== "approved" && (
              <button
                onClick={handleApprove}
                disabled={approving || rejecting}
                className="inline-flex items-center gap-1.5 border border-ink rounded-full px-4 py-2 text-xs font-medium hover:bg-ink hover:text-cream transition-colors duration-200 disabled:opacity-50"
              >
                {approving ? (
                  <>
                    <Loader2 size={12} className="animate-spin" />
                    Approving…
                  </>
                ) : (
                  <>
                    <Check size={12} />
                    Approve
                  </>
                )}
              </button>
            )}
            {rec.status !== "rejected" && (
              <button
                onClick={() => setConfirmReject(true)}
                disabled={approving || rejecting}
                className="inline-flex items-center gap-1.5 border border-line rounded-full px-4 py-2 text-xs font-medium text-ink-soft hover:border-ink hover:text-ink transition-colors duration-200 disabled:opacity-50"
              >
                <X size={12} />
                Reject
              </button>
            )}
          </div>
        </div>
      </motion.article>
    </>
  );
}

/* ─── Stats bar ─────────────────────────────────────────────────── */
function StatsBar({ recs }) {
  const total = recs.length;
  const pending = recs.filter((r) => r.status === "pending").length;
  const approved = recs.filter((r) => r.status === "approved").length;
  const rejected = recs.filter((r) => r.status === "rejected").length;

  const items = [
    { label: "Total", value: total },
    { label: "Pending", value: pending },
    { label: "Approved", value: approved },
    { label: "Rejected", value: rejected },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map(({ label, value }) => (
        <div key={label} className="border border-line rounded-xl p-5">
          <p className="eyebrow text-xs uppercase tracking-widest text-ink-soft">
            {label}
          </p>
          <p className="font-serif text-3xl text-ink mt-2">{value}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Login screen ──────────────────────────────────────────────── */
function AdminLogin({ onLogin }) {
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!secret.trim()) {
      setError("Please enter the admin secret.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(ADMIN_API, {
        headers: authHeaders(secret.trim()),
      });
      if (res.status === 401 || res.status === 403) {
        setError("Invalid admin credentials.");
        return;
      }
      if (!res.ok) {
        setError("Unable to reach the backend. Please check it is running.");
        return;
      }
      // Credentials valid — persist for this session only
      sessionStorage.setItem(SESSION_KEY, secret.trim());
      onLogin(secret.trim());
    } catch {
      setError("Unable to connect to the backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        {/* Logo mark */}
        <div className="flex items-center gap-2 mb-10">
          <ShieldCheck size={20} className="text-ink-soft" />
          <span className="eyebrow uppercase text-xs tracking-widest text-ink-soft">
            Admin Access
          </span>
        </div>

        <h1 className="font-serif text-display-md text-ink">Admin Dashboard</h1>
        <p className="text-ink-soft mt-3 leading-relaxed">
          Enter your admin secret to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5" noValidate>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="admin-secret"
              className="eyebrow text-xs uppercase tracking-widest text-ink-soft"
            >
              Admin Secret
            </label>
            <input
              id="admin-secret"
              type="password"
              autoComplete="current-password"
              value={secret}
              onChange={(e) => {
                setSecret(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter secret…"
              className="w-full bg-cream border border-line rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-ink transition-colors duration-200"
              aria-describedby={error ? "login-error" : undefined}
            />
          </div>

          {error && (
            <p
              id="login-error"
              role="alert"
              className="flex items-center gap-2 text-sm text-ink-soft border border-line rounded-xl px-4 py-3"
            >
              <AlertCircle size={14} />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 border border-ink rounded-full px-6 py-3 text-sm font-medium hover:bg-ink hover:text-cream transition-colors duration-300 disabled:opacity-50"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            {loading ? "Verifying…" : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

/* ─── Dashboard ─────────────────────────────────────────────────── */
function AdminDashboard({ token, onLogout }) {
  const [recs, setRecs] = useState([]);
  const [fetchStatus, setFetchStatus] = useState("loading");
  const [activeTab, setActiveTab] = useState("Pending");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null); // { message, type }

  /* Fetch all recommendations */
  const fetchAll = useCallback(async () => {
    setFetchStatus("loading");
    try {
      const res = await fetch(ADMIN_API, { headers: authHeaders(token) });
      if (res.status === 401 || res.status === 403) {
        onLogout();
        return;
      }
      if (!res.ok) throw new Error();
      const data = await res.json();
      setRecs(data);
      setFetchStatus("done");
    } catch {
      setFetchStatus("error");
    }
  }, [token, onLogout]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  /* Optimistic update: replace a single rec in state */
  function handleUpdate(updated) {
    setRecs((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  }

  /* Toast auto-dismiss */
  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }

  /* Filtered list */
  const filtered = useMemo(() => {
    let list = recs;
    if (activeTab !== "All") {
      list = list.filter((r) => r.status === activeTab.toLowerCase());
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.name?.toLowerCase().includes(q) ||
          r.company?.toLowerCase().includes(q) ||
          r.project?.toLowerCase().includes(q) ||
          r.role?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [recs, activeTab, search]);

  /* Empty state label */
  const emptyLabel =
    search.trim()
      ? "No experiences match your search."
      : activeTab === "All"
      ? "No experiences yet."
      : `No ${activeTab.toLowerCase()} experiences.`;

  return (
    <div className="min-h-screen bg-cream-dim">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-cream border-b border-line">
        <div className="max-w-content mx-auto px-6 md:px-10 py-5 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-xl text-ink leading-tight">
              Admin Dashboard
            </h1>
            <p className="text-xs text-ink-soft mt-0.5">
              Manage client experiences
            </p>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 border border-line rounded-full px-4 py-2 text-sm text-ink-soft hover:border-ink hover:text-ink transition-colors duration-200"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-content mx-auto px-6 md:px-10 py-12 flex flex-col gap-10">
        {/* Loading */}
        {fetchStatus === "loading" && (
          <div className="flex items-center gap-3 text-ink-soft text-sm">
            <Loader2 size={16} className="animate-spin" />
            Loading experiences…
          </div>
        )}

        {/* Error */}
        {fetchStatus === "error" && (
          <div className="border border-line rounded-xl px-6 py-10 flex flex-col items-center text-center gap-4">
            <AlertCircle size={22} className="text-ink-soft" />
            <p className="text-ink-soft text-sm">
              Unable to load experiences. Please check that the backend is
              running.
            </p>
            <button
              onClick={fetchAll}
              className="border border-ink rounded-full px-5 py-2 text-sm font-medium hover:bg-ink hover:text-cream transition-colors duration-200"
            >
              Retry
            </button>
          </div>
        )}

        {fetchStatus === "done" && (
          <>
            {/* Stats */}
            <StatsBar recs={recs} />

            {/* Filters + Search */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Tabs */}
              <div className="flex items-center gap-1 flex-wrap">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`eyebrow text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-colors duration-200 ${
                      activeTab === tab
                        ? "bg-ink text-cream border-ink"
                        : "border-line text-ink-soft hover:border-ink hover:text-ink"
                    }`}
                  >
                    {tab}
                    {tab !== "All" && (
                      <span className="ml-1.5 opacity-60">
                        ({recs.filter((r) => r.status === tab.toLowerCase()).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-64 ml-auto">
                <Search
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft pointer-events-none"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by client, company, project…"
                  className="w-full bg-cream border border-line rounded-full pl-9 pr-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-ink transition-colors duration-200"
                />
              </div>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-5">
              <AnimatePresence mode="popLayout">
                {filtered.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border border-line rounded-xl px-8 py-16 text-center"
                  >
                    <p className="text-ink-soft text-sm">{emptyLabel}</p>
                  </motion.div>
                ) : (
                  filtered.map((rec) => (
                    <ExperienceCard
                      key={rec.id}
                      rec={rec}
                      token={token}
                      onUpdate={handleUpdate}
                      onToast={showToast}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </main>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast key="toast" message={toast.message} type={toast.type} />}
      </AnimatePresence>
    </div>
  );
}

/* ─── Root export ───────────────────────────────────────────────── */
export default function AdminPage() {
  // Read token from sessionStorage so it survives hot-reload but clears on tab close
  const [token, setToken] = useState(() => sessionStorage.getItem(SESSION_KEY) ?? "");

  function handleLogin(t) {
    setToken(t);
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setToken("");
  }

  return token ? (
    <AdminDashboard token={token} onLogout={handleLogout} />
  ) : (
    <AdminLogin onLogin={handleLogin} />
  );
}
