/**
 * Sparx UI v2 - Design Tokens: Motion & Transitions
 */

export const easings = {
  smoothOut: "cubic-bezier(0.16, 1, 0.3, 1)", // Channel standard 700ms spine dissolve
  snappy: "cubic-bezier(0.22, 1, 0.36, 1)",    // Micro-interaction bounce/spring
  standard: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

export const durations = {
  instant: 150,
  fast: 200,
  normal: 300,
  spineDissolve: 700,
  pulseCycle: 1800,
} as const;

export const transitionClasses = {
  spineFadeIn: "animate-spine-fade-in",
  arrowBreathe: "animate-arrow-breathe",
  importingPulse: "animate-importing-pulse",
} as const;
