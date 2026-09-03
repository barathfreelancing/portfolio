import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowUpRight, ArrowLeft } from "lucide-react";
import MainLayout from "../layouts/MainLayout.jsx";
import useScrollAnimation from "../hooks/useScrollAnimation.js";

const API_URL = "/api/recommendations";

/* ── Star Rating widget ─────────────────────────────────────── */
function StarRating({ value, onChange, error }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div>
      <div
        className="flex items-center gap-1"
        role="radiogroup"
        aria-label="Rating"
        onMouseLeave={() => setHovered(0)}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= (hovered || value);
          return (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={value === star}
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              className="p-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2 rounded"
              onMouseEnter={() => setHovered(star)}
              onClick={() => onChange(star)}
            >
              <Star
                size={28}
                className={`transition-colors duration-150 ${
                  filled ? "text-ink fill-ink" : "text-line fill-transparent"
                }`}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-ink-soft" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Field wrapper ──────────────────────────────────────────── */
function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="eyebrow uppercase text-ink-soft text-xs tracking-widest">
        {label}
        {required && <span className="ml-0.5 text-ink" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-ink-soft" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full bg-cream border border-line rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-ink transition-colors duration-200";

/* ── Main Page ──────────────────────────────────────────────── */
export default function RecommendationPage() {
  const { ref, isInView } = useScrollAnimation();

  const [form, setForm] = useState({
    name: "",
    company: "",
    role: "",
    project: "",
    rating: 0,
    message: "",
    // honeypot — must remain empty
    website: "",
  });
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState("idle"); // idle | submitting | success | error

  function set(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    };
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your name.";
    if (!form.project.trim()) errs.project = "Please enter the project or service.";
    if (!form.rating) errs.rating = "Please select a rating.";
    if (!form.message.trim()) errs.message = "Please share your experience.";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Honeypot check — if filled, silently succeed (don't reveal to bots)
    if (form.website) {
      setSubmitState("success");
      return;
    }

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      // Scroll to first error
      const firstEl = e.target.querySelector("[aria-invalid='true']");
      firstEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitState("submitting");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          company: form.company.trim() || null,
          role: form.role.trim() || null,
          project: form.project.trim(),
          rating: form.rating,
          message: form.message.trim(),
        }),
      });
      if (!res.ok) throw new Error("API error");
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <MainLayout>
      <section className="max-w-content mx-auto px-6 md:px-10 pt-14 md:pt-20 pb-24 md:pb-32">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="max-w-2xl"
        >
          {/* Back link */}
          <motion.div variants={fadeUp}>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink underline-hover transition-colors duration-200 mb-10 md:mb-12"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Back to home
            </Link>
          </motion.div>

          <AnimatePresence mode="wait">
            {submitState === "success" ? (
              /* ── Success state ──────────────────────────────── */
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="border border-line rounded-2xl px-8 py-16 md:py-20 flex flex-col items-start"
              >
                <p className="eyebrow uppercase text-ink-soft mb-6">Submitted</p>
                <h1 className="font-serif text-display-md text-ink text-balance">
                  Thank you for sharing your experience.
                </h1>
                <p className="mt-5 text-ink-soft leading-relaxed max-w-md">
                  Your recommendation has been submitted and is waiting for review.
                  Once approved, it will appear on the homepage.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 mt-10 border border-ink rounded-full px-6 py-3 text-sm font-medium hover:bg-ink hover:text-cream transition-colors duration-300"
                >
                  Back to home
                  <ArrowUpRight size={16} />
                </Link>
              </motion.div>
            ) : (
              /* ── Form ───────────────────────────────────────── */
              <motion.div key="form">
                <motion.p variants={fadeUp} className="eyebrow uppercase text-ink-soft mb-5">
                  Share your experience
                </motion.p>

                <motion.h1
                  variants={fadeUp}
                  className="font-serif text-display-md text-ink text-balance"
                >
                  Worked with Barath?
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="mt-4 text-ink-soft leading-relaxed max-w-md"
                >
                  I&rsquo;d love to hear about your experience working together.
                  Your feedback helps potential clients understand what it&rsquo;s like
                  to work with me.
                </motion.p>

                <motion.form
                  variants={fadeUp}
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-12 flex flex-col gap-8"
                >
                  {/* Honeypot — visually hidden */}
                  <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
                    <label htmlFor="rec-website">Website</label>
                    <input
                      id="rec-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={set("website")}
                    />
                  </div>

                  {/* Row: Name + Company */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Field label="Your Name" required error={errors.name}>
                      <input
                        id="rec-name"
                        type="text"
                        className={inputClass}
                        placeholder="Jane Doe"
                        value={form.name}
                        onChange={set("name")}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "err-name" : undefined}
                        autoComplete="name"
                      />
                    </Field>

                    <Field label="Company / Organization" error={errors.company}>
                      <input
                        id="rec-company"
                        type="text"
                        className={inputClass}
                        placeholder="Acme Studio"
                        value={form.company}
                        onChange={set("company")}
                        autoComplete="organization"
                      />
                    </Field>
                  </div>

                  {/* Row: Role + Project */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Field label="Your Role" error={errors.role}>
                      <input
                        id="rec-role"
                        type="text"
                        className={inputClass}
                        placeholder="Founder"
                        value={form.role}
                        onChange={set("role")}
                        autoComplete="organization-title"
                      />
                    </Field>

                    <Field label="Project / Service" required error={errors.project}>
                      <input
                        id="rec-project"
                        type="text"
                        className={inputClass}
                        placeholder="AI Automation"
                        value={form.project}
                        onChange={set("project")}
                        aria-invalid={!!errors.project}
                      />
                    </Field>
                  </div>

                  {/* Rating */}
                  <Field label="Rating" required error={errors.rating}>
                    <StarRating
                      value={form.rating}
                      onChange={(val) => {
                        setForm((prev) => ({ ...prev, rating: val }));
                        if (errors.rating) setErrors((prev) => ({ ...prev, rating: "" }));
                      }}
                      error={null}
                    />
                  </Field>

                  {/* Experience */}
                  <Field label="Your Experience" required error={errors.message}>
                    <textarea
                      id="rec-message"
                      rows={5}
                      className={inputClass}
                      placeholder="Share what it was like working with Barath…"
                      value={form.message}
                      onChange={set("message")}
                      aria-invalid={!!errors.message}
                    />
                  </Field>

                  {/* API error message */}
                  {submitState === "error" && (
                    <p className="text-sm text-ink-soft border border-line rounded-xl px-4 py-3" role="alert">
                      Something went wrong. Please try again in a moment.
                    </p>
                  )}

                  {/* Submit */}
                  <div>
                    <button
                      type="submit"
                      disabled={submitState === "submitting"}
                      className="inline-flex items-center gap-2 border border-ink rounded-full px-6 py-3 text-sm font-medium hover:bg-ink hover:text-cream transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitState === "submitting" ? "Submitting…" : "Submit recommendation"}
                      {submitState !== "submitting" && <ArrowUpRight size={16} />}
                    </button>
                  </div>
                </motion.form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </MainLayout>
  );
}
