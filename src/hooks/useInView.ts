"use client";

import { useCallback, useEffect, useState, type RefCallback } from "react";

type UseInViewOptions = {
  rootMargin?: string;
  threshold?: number | number[];
  initialInView?: boolean;
};

/** Observe element intersection with the viewport (or a root margin prefetch zone). */
export function useInView<T extends Element = HTMLDivElement>(
  options: UseInViewOptions = {},
): { ref: RefCallback<T | null>; inView: boolean } {
  const { rootMargin = "0px", threshold = 0, initialInView = false } = options;
  const [node, setNode] = useState<T | null>(null);
  const [inView, setInView] = useState(initialInView);

  const ref = useCallback<RefCallback<T | null>>((el) => {
    setNode(el);
  }, []);

  useEffect(() => {
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, rootMargin, threshold]);

  return { ref, inView };
}
