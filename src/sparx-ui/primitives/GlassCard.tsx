import React from "react";
import { clsx } from "clsx";
import { useSparxTheme } from "../tokens/colors";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "stage" | "elevated" | "translucent" | "borderless";
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

    const variantStyles = {
      stage: isEmerald
        ? "bg-white border border-slate-200 shadow-md text-slate-900"
        : "bg-[#030406] border border-white/10 shadow-2xl text-white",
      elevated: isEmerald
        ? "bg-slate-50 border border-slate-200 shadow-sm text-slate-900"
        : "bg-[#08090E] border border-white/10 shadow-xl text-white",
      translucent: isEmerald
        ? "bg-white/80 border border-slate-200 backdrop-blur-md shadow-sm text-slate-900"
        : "bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-lg text-white",
      borderless: isEmerald
        ? "bg-white border-0 shadow-none text-slate-900"
        : "bg-[#030406] border-0 shadow-none text-white",
    };

    return (
      <div
        ref={ref}
        className={clsx(
          "rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300",
          variantStyles[variant],
          hoverEffect &&
            (isEmerald
              ? "hover:border-slate-300 hover:shadow-lg"
              : "hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"),
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
