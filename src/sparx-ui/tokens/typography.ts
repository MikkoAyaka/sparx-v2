/**
 * Sparx UI v2 - Design Tokens: Typography System
 * 
 * Strict Guardrails:
 * 1. MINIMUM FONT SIZE >= 12px (Absolute floor: no rendering below 12px).
 * 2. NO SERIF FONTS (Strictly Sans-Serif & Monospace).
 */

export const MIN_FONT_SIZE_PX = 12;

export const fontFamilies = {
  display: '"Space Grotesk", "Noto Sans SC", "MiSans", "Microsoft YaHei UI", "Microsoft YaHei", sans-serif',
  sans: '"Space Grotesk", "Noto Sans SC", "MiSans", "Microsoft YaHei UI", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  mono: '"IBM Plex Mono", "Noto Sans SC", "MiSans", "Microsoft YaHei UI", "Microsoft YaHei", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
} as const;

export const typographyScale = {
  display: {
    size: "clamp(2rem, 4.5vw, 3.5rem)", // 32px ~ 56px
    weight: "900",
    letterSpacing: "-0.03em",
    lineHeight: "1.15",
  },
  h1: {
    size: "clamp(1.75rem, 3.5vw, 2.5rem)", // 28px ~ 40px
    weight: "800",
    letterSpacing: "-0.02em",
    lineHeight: "1.25",
  },
  h2: {
    size: "1.5rem", // 24px
    weight: "700",
    letterSpacing: "-0.015em",
    lineHeight: "1.35",
  },
  h3: {
    size: "1.25rem", // 20px
    weight: "600",
    letterSpacing: "-0.01em",
    lineHeight: "1.4",
  },
  bodyLarge: {
    size: "1.125rem", // 17px ~ 18px
    weight: "400",
    lineHeight: "1.8",
  },
  body: {
    size: "1rem", // 15px ~ 16px (Comfortable editorial body size)
    weight: "400",
    lineHeight: "1.85",
  },
  caption: {
    size: "0.875rem", // 13.5px ~ 14px (Secondary explanations, buttons, tags)
    weight: "400",
    lineHeight: "1.6",
  },
  metaMono: {
    size: "0.75rem", // 12px (Strict floor: reserved for micro timestamps, codes, status tags)
    weight: "600",
    letterSpacing: "0.05em",
    lineHeight: "1.5",
  },
} as const;
