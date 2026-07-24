"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type GuideScrollProps = {
  children: ReactNode;
};

export function GuideScroll({ children }: GuideScrollProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootEl = root.current;
    if (!rootEl) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions ?? {};
          if (!isDesktop || reduceMotion) return;

          const blocks = gsap.utils.toArray<HTMLElement>("[data-guide-reveal]", rootEl);
          if (!blocks.length) return;

          // Use from + clearProps (never gsap.set autoAlpha:0) so kill/fail leaves content readable
          blocks.forEach((block, index) => {
            gsap.from(block, {
              y: 10,
              autoAlpha: 0.85,
              duration: 0.45,
              ease: "power2.out",
              delay: index * 0.06,
              clearProps: "transform,opacity,visibility",
              scrollTrigger: {
                trigger: block,
                start: "top 88%",
                toggleActions: "play none none none",
                once: true,
              },
            });
          });
        },
      );
    }, rootEl);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={root}
      className="guide-scroll relative"
      style={{
        backgroundImage:
          "radial-gradient(color-mix(in srgb, var(--ink) 6%, transparent) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      {children}
    </div>
  );
}
