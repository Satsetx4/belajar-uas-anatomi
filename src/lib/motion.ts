import type { TargetAndTransition, Transition, Variants } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const springSnap: Transition = {
  type: 'spring',
  stiffness: 360,
  damping: 28,
  mass: 0.8,
};

export const springGentle: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 25,
  mass: 0.9,
};

export const tabIndicatorTransition: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 32,
};

export const tapScale: TargetAndTransition = {
  scale: 0.97,
};

export const hoverLift: TargetAndTransition = {
  y: -2,
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 26,
  },
};

export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 330,
      damping: 26,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.15 },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.02,
    },
  },
};
