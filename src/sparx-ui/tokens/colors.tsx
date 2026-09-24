import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * Sparx UI v2 - Multi-Style Design System Token Architecture
 * 
 * Supports:
 * 1. 'void-flare': Personal, avant-garde, geek darkroom (#020204 + #E5192D)
 * 2. 'glacial-emerald': Enterprise, stable, production-grade, clear light canvas (#F8FAFC + #059669)
 */

export type SparxStyleTheme = "void-flare" | "glacial-emerald";

export interface SparxSemanticTokens {
  success: string;
  info: string;
  warning: string;
  error: string;
  neutral: string;
}

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
    hover: string;
    subtle: string;
    border: string;
  };
  semantics: SparxSemanticTokens;
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
  shadow: {
    card: string;
    floating: string;
  };
}

export const themeVoidFlare: SparxTheme = {
  id: "void-flare",
  name: "虚空绯红",
  enName: "Void Flare",
  badge: "✦ 极客前卫",
  description: "面向个人独立出版与前卫极客场景，深黑暗房基底搭配锋利克制的激光绯红微发光",
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
    hover: "#FF2D55",
    subtle: "rgba(229, 25, 45, 0.08)",
    border: "rgba(229, 25, 45, 0.25)",
  },
  semantics: {
    success: "#10B981", // Emerald 500
    info: "#0D9488",    // Mineral Teal 600
    warning: "#E5A93C", // Warm Golden Amber (避免廉价刺眼荧光黄)
    error: "#F43F5E",   // Rose 500
    neutral: "#71717A", // Zinc 500
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
    focus: "rgba(229, 25, 45, 0.35)",
  },
  // 克制收敛的发光阴影：消除粗糙塑料大泛光，保持边缘锐利
  glow: {
    sm: "0 0 8px rgba(229, 25, 45, 0.25)",
    md: "0 0 14px rgba(229, 25, 45, 0.32)",
    lg: "0 0 22px rgba(229, 25, 45, 0.42)",
  },
  shadow: {
    card: "0 12px 24px -8px rgba(0, 0, 0, 0.65)",
    floating: "0 20px 35px -10px rgba(0, 0, 0, 0.75)",
  },
};

export const themeGlacialEmerald: SparxTheme = {
  id: "glacial-emerald",
  name: "皓白极翠",
  enName: "Glacial Emerald",
  badge: "◈ 企业稳态",
  description: "面向企业级生产、高可用知识库与稳定中后台，皓白清爽浅底搭配沉稳极翠绿与自然矿物灰阶",
  isDark: false,
  bg: {
    canvas: "#F8FAFC",  // slate-50
    stage: "#FFFFFF",   // Pure white card
    reading: "#FFFFFF", // Clear document white
    dock: "#FFFFFF",    // Clean white dock
    card: "#FFFFFF",    // Clean card surface
    muted: "#F1F5F9",   // slate-100
  },
  accent: {
    core: "#059669",    // emerald-600 (沉稳成熟的翡翠绿)
    hover: "#047857",   // emerald-700
    subtle: "rgba(5, 150, 105, 0.08)",
    border: "rgba(5, 150, 105, 0.25)",
  },
  // 经考究的高级语义配色：剔除突兀的亮紫与荧光青，采用与翡翠绿相协调的海洋青绿与温润琥珀
  semantics: {
    success: "#059669", // Emerald 600
    info: "#0D9488",    // Mineral Teal 600 (自然过渡，避免荧光青冲突)
    warning: "#D97706", // Warm Ochre / Honey Amber (高级温润的琥珀蜜蜡黄)
    error: "#E11D48",   // Rose Carmine 600
    neutral: "#64748B", // Slate 500
  },
  text: {
    primary: "#0F172A", // slate-900 (高对比度墨黑)
    secondary: "#334155", // slate-700 (舒适易读正文)
    muted: "#64748B",   // slate-500 (清晰次级文本)
    dim: "#94A3B8",     // slate-400 (辅助线条/微型说明)
  },
  borders: {
    subtle: "rgba(0, 0, 0, 0.05)",
    standard: "rgba(0, 0, 0, 0.09)", // 精密淡灰边框
    elevated: "rgba(0, 0, 0, 0.14)",
    focus: "rgba(5, 150, 105, 0.35)",
  },
  // 浅色模式严禁浮夸霓虹外发光，转为极致克制的环境微阴影（肉眼第一眼几乎无法感知，但细看是有阴影的）
  glow: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.03)",
    md: "0 1px 3px rgba(0, 0, 0, 0.04)",
    lg: "0 2px 6px rgba(0, 0, 0, 0.04)",
  },
  shadow: {
    card: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
    floating: "0 2px 6px -1px rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02)",
  },
};

export const sparxThemes: Record<SparxStyleTheme, SparxTheme> = {
  "void-flare": themeVoidFlare,
  "glacial-emerald": themeGlacialEmerald,
};

// 通用工业级语义色（向后兼容并规范化语义层）
export const semanticColors = {
  success: "#059669",
  info: "#0D9488",
  warning: "#D97706",
  error: "#E11D48",
  neutral: "#64748B",
  // 别名兼容
  active: "#059669",
  caution: "#D97706",
} as const;

// 保持对原有直接引用常量的向后兼容
export const voidColors = themeVoidFlare.bg;
export const flareColors = {
  core: themeVoidFlare.accent.core,
  neon: themeVoidFlare.accent.hover,
  dark: "#A80D1D",
  subtle: themeVoidFlare.accent.subtle,
  border: themeVoidFlare.accent.border,
} as const;

export const borderTones = themeVoidFlare.borders;
export const glowShadows = {
  flareSm: themeVoidFlare.glow.sm,
  flareMd: themeVoidFlare.glow.md,
  flareLg: themeVoidFlare.glow.lg,
  cardElevation: themeVoidFlare.shadow.card,
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
