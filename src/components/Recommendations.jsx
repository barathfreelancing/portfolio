import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Quote, Star } from "lucide-react";
import { Link } from "react-router-dom";
import useScrollAnimation from "../hooks/useScrollAnimation.js";

const API_URL = "/api/recommendations";

/** Maximum reviews shown on the homepage. */
const HOMEPAGE_LIMIT = 5;

/**
 * Safely decode standard HTML entities into plain text.
 * Does NOT use dangerouslySetInnerHTML — no arbitrary HTML is rendered.
 */
function decodeEntities(str) {
  if (!str) return str;
  return str
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );
}

/* ── Star display ──────────────────────────────────────────────── */
function StarDisplay({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "text-ink fill-ink" : "text-line fill-line"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/* ── Single review card with expandable text ────────────────────── */
function RecCard({ rec }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current && !isExpanded) {
        const isOverflow =
          textRef.current.scrollHeight > textRef.current.clientHeight + 1;
        setCanExpand(isOverflow);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [rec.message, isExpanded]);

  return (
    <blockquote className="border border-line rounded-xl p-8 bg-cream w-full">
      <StarDisplay rating={rec.rating} />
      <div className="mt-4">
        <p
          ref={textRef}
          className="text-ink leading-relaxed"
          style={
            !isExpanded
              ? {
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }
              : {}
          }
        >
          &ldquo;{decodeEntities(rec.message)}&rdquo;
        </p>
        {canExpand && (
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
            className="mt-3 text-sm font-medium text-ink-soft hover:text-ink underline transition-colors cursor-pointer"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
      <footer className="mt-4 text-sm text-ink-soft">
        {decodeEntities(rec.name)}
        {rec.role ? `, ${decodeEntities(rec.role)}` : ""}
        {rec.company ? `, ${decodeEntities(rec.company)}` : ""}
      </footer>
    </blockquote>
  );
}

/**
 * Vertical Staggered layout.
 * Each review card occupies its own row vertically (Review 1, then Review 2 below it, etc.).
 * On desktop: odd index cards align to the LEFT, even index cards align to the RIGHT.
 * On mobile: all cards render in a single full-width column.
 */
function VerticalStaggeredList({ recs }) {
  return (
    <div className="flex flex-col gap-8 w-full">
      {recs.map((rec, index) => {
        const isRight = index % 2 === 1;
        return (
          <div
            key={rec.id}
            className={`w-full md:w-[68%] ${
              isRight ? "md:self-end" : "md:self-start"
            }`}
          >
            <RecCard rec={rec} />
          </div>
        );
      })}
    </div>
  );
}

/* ── Homepage section ──────────────────────────────────────────── */
export default function Recommendations() {
  const { ref, isInView } = useScrollAnimation();
  const [recommendations, setRecommendations] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setRecommendations(data);
          setStatus("done");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => { cancelled = true; };
  }, []);

  const sorted = [...recommendations].sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return new Date(b.created_at ?? 0) - new Date(a.created_at ?? 0);
  });

  const displayed = sorted.slice(0, HOMEPAGE_LIMIT);
  const hasMore = sorted.length > HOMEPAGE_LIMIT;
  const hasRecommendations = displayed.length > 0;

  return (
    <section id="recommendations" className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-28">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="eyebrow uppercase text-ink-soft">Your Experience</h2>
      </motion.div>

      {status === "loading" && (
        <p className="mt-8 text-sm text-ink-soft">Loading…</p>
      )}

      {status === "error" && (
        <p className="mt-8 text-sm text-ink-soft">
          Could not load recommendations right now.
        </p>
      )}

      {status === "done" && hasRecommendations && (
        <div className="mt-10">
          <VerticalStaggeredList recs={displayed} />
        </div>
      )}

      {status === "done" && !hasRecommendations && (
        <div className="mt-8 border border-line rounded-2xl px-8 py-16 md:py-20 flex flex-col items-center text-center">
          <Quote size={22} className="text-ink-soft" aria-hidden="true" />
          <p className="font-serif text-2xl md:text-3xl text-ink mt-6 max-w-md text-balance">
            Worked with me on a project?
          </p>
          <p className="text-ink-soft mt-3 max-w-sm">
            Your experience could appear here.
          </p>
        </div>
      )}

      {status === "done" && hasMore && (
        <div className="mt-14 flex justify-center">
          <Link
            to="/recommendation"
            className="inline-flex items-center gap-2 border border-ink rounded-full px-8 py-4 text-base font-medium hover:bg-ink hover:text-cream transition-colors duration-300"
          >
            View All Experiences
            <ArrowUpRight size={18} />
          </Link>
        </div>
      )}

      {status === "done" && (
        <div className="mt-10 flex justify-center">
          <Link
            to="/recommendation"
            className="inline-flex items-center gap-2 border border-ink rounded-full px-8 py-4 text-base font-medium hover:bg-ink hover:text-cream transition-colors duration-300"
          >
            Share Your Experience
            <ArrowUpRight size={18} />
          </Link>
        </div>
      )}
    </section>
  );
}


