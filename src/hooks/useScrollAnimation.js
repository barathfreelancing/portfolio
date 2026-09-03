import { useRef } from "react";
import { useInView } from "framer-motion";

/**
 * Returns a ref to attach to a section and a boolean for whether it has
 * entered the viewport. Triggers once, slightly before the element is
 * fully in view, so reveals feel timed rather than late.
 */
export default function useScrollAnimation({ amount = 0.2, once = true } = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount, once });
  return { ref, isInView };
}
