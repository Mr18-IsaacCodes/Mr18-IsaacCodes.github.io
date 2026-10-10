"use client";

import { motion, useAnimationControls, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      controls.stop();
      controls.set({ opacity: 1, y: 0 });
      return;
    }
    if (inView) {
      void controls.start({
        opacity: [0, 1],
        y: [18, 0],
        transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
      });
    }
  }, [controls, delay, inView, reducedMotion]);

  return (
    <motion.div ref={ref} className={className} initial={false} animate={controls}>
      {children}
    </motion.div>
  );
}
