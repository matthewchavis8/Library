"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

type Props = {
  children: React.ReactNode;
  /** How far it drifts, in px, over the trip through the screen */
  distance?: number;
  /** Degrees it tilts across that same trip */
  tilt?: number;
  className?: string;
};

/**
 * Gently drifts and tilts its content as it passes through the screen.
 * Gives phones the same lively feel desktop gets from hover.
 */
export default function ScrollDrift({
  children,
  distance = 40,
  tilt = 4,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const y = useTransform(smooth, [0, 1], [distance / 2, -distance / 2]);
  const rotate = useTransform(smooth, [0, 1], [-tilt / 2, tilt / 2]);

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { y, rotate }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
