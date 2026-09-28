import React from "react";
import { clsx } from "clsx";
import { useSparxTheme } from "../tokens/colors";

export type GlassCardVariant =
  | "stage"
  | "elevated"
  | "receding"
  | "sunken"
  | "translucent"
  | "borderless";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: GlassCardVariant;
  hoverEffect?: boolean;
  children: React.ReactNode;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      variant = "stage",
      hoverEffect = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { themeId } = useSparxTheme();
    const isEmerald = themeId === "glacial-emerald";

    // 规范化变体别名
    const resolvedVariant: "stage" | "elevated" | "receding" | "translucent" | "borderless" =
      variant === "sunken" ? "receding" : variant;

    // 严谨的双主题空间拓扑分层 (Spatial Elevation Architecture)
    // 浅色 (glacial-emerald):
    //   - stage: 纯白基底卡片 (bg-white border-slate-200 稳固平铺)
    //   - elevated: 明显物理悬浮抬升卡片 (bg-white border-slate-200/90 shadow-xl ring-1 ring-slate-900/[0.03])
    //   - receding: 凹陷下沉衬底 (bg-slate-100/75 border-slate-200/60 shadow-inner)
    //   - translucent: 通透晶质毛玻璃 (bg-white/80 backdrop-blur-xl border-white/80)
    // 深色 (void-flare):
    //   - stage: 暗房基底卡片 (#06080F border-white/[0.08] shadow-lg)
    //   - elevated: 明显抬升的高亮暗房层 (#111422 border-white/[0.15] shadow-2xl ring-1 ring-white/[0.04])
    //   - receding: 凹陷深渊衬底 (#030407 border-white/[0.04] shadow-inner)
    //   - translucent: 极客暗房毛玻璃 (bg-white/[0.05] backdrop-blur-xl border-white/[0.12])
    const variantStyles = {
      stage: isEmerald
        ? "bg-white border border-slate-200 shadow-[0_1px_3px_rgba(15,23,42,0.05)] text-slate-900"
        : "bg-[#06080F] border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.5)] text-white",
      elevated: isEmerald
        ? "bg-white border border-slate-200/90 shadow-[0_12px_28px_-4px_rgba(15,23,42,0.08),0_4px_10px_-2px_rgba(15,23,42,0.03)] ring-1 ring-slate-900/[0.03] text-slate-900"
        : "bg-[#111422] border border-white/[0.15] shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.04)] text-white",
      receding: isEmerald
        ? "bg-slate-100/75 border border-slate-200/60 shadow-[inset_0_2px_4px_rgba(15,23,42,0.04)] text-slate-800"
        : "bg-[#030407] border border-white/[0.04] shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)] text-zinc-300",
      translucent: isEmerald
        ? "bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_8px_24px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/[0.02] text-slate-900"
        : "bg-white/[0.05] backdrop-blur-xl border border-white/[0.12] shadow-[0_10px_30px_rgba(0,0,0,0.6)] text-white",
      borderless: isEmerald
        ? "bg-transparent border-0 shadow-none text-slate-900"
        : "bg-transparent border-0 shadow-none text-white",
    };

    return (
      <div
        ref={ref}
        className={clsx(
          "rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300",
          variantStyles[resolvedVariant],
          hoverEffect &&
            (isEmerald
              ? "hover:border-slate-300 hover:shadow-[0_16px_36px_-6px_rgba(15,23,42,0.12),0_6px_14px_-2px_rgba(15,23,42,0.06)]"
              : "hover:border-white/25 hover:shadow-[0_22px_50px_rgba(0,0,0,0.92)]"),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
