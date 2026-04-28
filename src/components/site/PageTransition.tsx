"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      initial={false}
      animate={
        prefersReducedMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 1, y: 0 }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.18, ease: "easeOut" }
      }
    >
      {children}
    </motion.div>
  );
}
