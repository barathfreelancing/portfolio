import { useEffect } from 'react';

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveals `[data-reveal]` elements once as they enter the viewport.
// Elements only start hidden after `reveal-ready` is set, so content stays visible without IntersectionObserver.
// Reduced motion still fades (see global.css); only the travel is dropped.
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (!('IntersectionObserver' in window)) return undefined;

    root.classList.add('reveal-ready');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);
}
