import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * Sparx UI v2 - Multi-Style Design System Token Architecture
 * 
 * Supports:
 * 1. 'void-flare': Personal, avant-garde, geek, darkroom (#020204 + #E5192D)
 * 2. 'glacial-emerald': Enterprise, stable, production-grade, clear light canvas (#F8FAFC + #059669)
 */

export type SparxStyleTheme = "void-flare" | "glacial-emerald";

export interface SparxTheme {
  id: SparxStyleTheme;
  name: string;
  enName: string;
  badge: string;
  description: string;
  isDark: boolean;
  bg: {
    canvas: string;
    stage: string;
    reading: string;
    dock: string;
    card: string;
    muted: string;
  };
  accent: {
    core: string;
    neon: string;
    dark: string;
    subtle: string;
    border: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    dim: string;
  };
  borders: {
    subtle: string;
    standard: string;
    elevated: string;
    focus: string;
  };
  glow: {
    sm: string;
    md: string;
    lg: string;
  };
}

export const themeVoidFlare: SparxTheme = {
  id: "void-flare",
  name: "虚空绯红",
  enName: "Void Flare",
  badge: "✦ 极客前卫",
  description: "面向个人独立出版与高反差极客场景，深黑暗房基底搭配高压激光绯红与光学发光脉冲",
  isDark: true,
  bg: {
    canvas: "#020204",
    stage: "#030406",
    reading: "#050505",
    dock: "#08090E",
    card: "#12131A",
    muted: "#181922",
  },
  accent: {
    core: "#E5192D",
    neon: "#FF2D55",
    dark: "#A80D1D",
    subtle: "rgba(229, 25, 45, 0.08)",
    border: "rgba(229, 25, 45, 0.25)",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#D4D4D8", // zinc-300
    muted: "#A1A1AA",     // zinc-400
    dim: "#71717A",       // zinc-500
  },
  borders: {
    subtle: "rgba(255, 255, 255, 0.06)",
    standard: "rgba(255, 255, 255, 0.10)",
    elevated: "rgba(255, 255, 255, 0.16)",
    focus: "rgba(229, 25, 45, 0.40)",
  },
  glow: {
    sm: "0 0 10px rgba(229, 25, 45, 0.40)",
    md: "0 0 16px rgba(229, 25, 45, 0.45)",
    lg: "0 0 28px rgba(229, 25, 45, 0.65)",
  },
};

export const themeGlacialEmerald: SparxTheme = {
  id: "glacial-emerald",
  name: "皓白极翠",
  enName: "Glacial Emerald",
  badge: "◈ 企业稳态",
  description: "面向企业级中后台、高可靠数字讲台与稳定生产环境，皓白浅色底搭配稳态极翠绿与精密灰阶",
  isDark: false,
  bg: {
    canvas: "#F8FAFC",  // slate-50
    stage: "#FFFFFF",   // Pure white card
    reading: "#FFFFFF", // Clear document white
    dock: "#FFFFFF",    // Elevated white frosted dock
    card: "#FFFFFF",    // Clean card surface
    muted: "#F1F5F9",   // slate-100
  },
  accent: {
    core: "#059669",    // emerald-600
    neon: "#10B981",    // emerald-500
    dark: "#047857",    // emerald-700
    subtle: "rgba(16, 185, 129, 0.08)",
    border: "rgba(16, 185, 129, 0.30)",
  },
  text: {
    primary: "#0F172A", // slate-900 (High contrast dark)
    secondary: "#334155", // slate-700 (High legibility body)
    muted: "#64748B",   // slate-500 (Metadata)
    dim: "#94A3B8",     // slate-400 (Muted line)
  },
  borders: {
    subtle: "rgba(0, 0, 0, 0.06)",
    standard: "rgba(0, 0, 0, 0.10)", // slate-200 tone
    elevated: "rgba(0, 0, 0, 0.16)",
    focus: "rgba(16, 185, 129, 0.40)",
  },
  glow: {
    sm: "0 0 10px rgba(16, 185, 129, 0.35)",
    md: "0 0 16px rgba(16, 185, 129, 0.40)",
    lg: "0 0 28px rgba(16, 185, 129, 0.55)",
  },
};

export const sparxThemes: Record<SparxStyleTheme, SparxTheme> = {
  "void-flare": themeVoidFlare,
  "glacial-emerald": themeGlacialEmerald,
};

// 保持对原有直接引用常量的完全向后兼容
export const voidColors = themeVoidFlare.bg;
export const flareColors = themeVoidFlare.accent;

export const semanticColors = {
  active: "#10B981",  // Emerald 500 (Live / Online)
  radar: "#06B6D4",   // Cyan 500 (Intelligence / Streams)
  caution: "#F59E0B", // Amber 500 (Pending / Verification)
  arch: "#8B5CF6",    // Violet 500 (Architecture / Depth)
} as const;

export const borderTones = themeVoidFlare.borders;
export const glowShadows = {
  flareSm: themeVoidFlare.glow.sm,
  flareMd: themeVoidFlare.glow.md,
  flareLg: themeVoidFlare.glow.lg,
  cardElevation: "0 25px 50px -12px rgba(0, 0, 0, 0.85)",
} as const;

// React 上下文与 Provider
interface SparxThemeContextType {
  themeId: SparxStyleTheme;
  theme: SparxTheme;
  setThemeId: (id: SparxStyleTheme) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const SparxThemeContext = createContext<SparxThemeContextType>({
  themeId: "void-flare",
  theme: themeVoidFlare,
  setThemeId: () => {},
  isDark: true,
  toggleTheme: () => {},
});

export const SparxThemeProvider: React.FC<{
  children: React.ReactNode;
  defaultTheme?: SparxStyleTheme;
}> = ({ children, defaultTheme = "void-flare" }) => {
  const [themeId, setThemeId] = useState<SparxStyleTheme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sparx-theme");
      if (saved === "void-flare" || saved === "glacial-emerald") {
        return saved;
      }
    }
    return defaultTheme;
  });

  const theme = sparxThemes[themeId] ?? themeVoidFlare;

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", themeId);
      localStorage.setItem("sparx-theme", themeId);
    }
  }, [themeId]);

  const toggleTheme = () => {
    setThemeId((prev) => (prev === "void-flare" ? "glacial-emerald" : "void-flare"));
  };

  return (
    <SparxThemeContext.Provider
      value={{
        themeId,
        theme,
        setThemeId,
        isDark: theme.isDark,
        toggleTheme,
      }}
    >
      {children}
    </SparxThemeContext.Provider>
  );
};

export const useSparxTheme = () => useContext(SparxThemeContext);
