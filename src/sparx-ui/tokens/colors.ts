/**
 * Sparx UI v2 - Design Tokens: Color System
 * 
 * Based on Mikko Ayaka's Channel personal publishing surface.
 * Rooted in absolute void darkness with high-voltage optical crimson flare.
 */

export const voidColors = {
  canvas: "#020204",  // Absolute viewport canvas base
  stage: "#030406",   // Horizon stage container background
  reading: "#050505", // Document & monograph canvas
  dock: "#08090E",    // Floating pill docks & controls
  card: "#12131A",    // Subtle elevated cards & dropdowns
  muted: "#181922",   // Secondary panel fill
} as const;

export const flareColors = {
  core: "#E5192D",    // Sovereign primary laser flare
  neon: "#FF2D55",    // High-energy optical neon & hover
  dark: "#A80D1D",    // Deep flare for active shadows & gradients
  subtle: "rgba(229, 25, 45, 0.08)", // Transparent glow background
  border: "rgba(229, 25, 45, 0.25)", // Subtle flare border
} as const;

export const semanticColors = {
  active: "#10B981",  // Emerald 500 (Live / Online)
  radar: "#06B6D4",   // Cyan 500 (Intelligence / Streams)
  caution: "#F59E0B", // Amber 500 (Pending / Verification)
  arch: "#8B5CF6",    // Violet 500 (Architecture / Depth)
} as const;

export const borderTones = {
  subtle: "rgba(255, 255, 255, 0.06)",
  standard: "rgba(255, 255, 255, 0.10)",
  elevated: "rgba(255, 255, 255, 0.16)",
  focus: "rgba(229, 25, 45, 0.40)",
} as const;

export const glowShadows = {
  flareSm: "0 0 10px rgba(229, 25, 45, 0.40)",
  flareMd: "0 0 16px rgba(229, 25, 45, 0.45)",
  flareLg: "0 0 28px rgba(229, 25, 45, 0.65)",
  cardElevation: "0 25px 50px -12px rgba(0, 0, 0, 0.85)",
} as const;
