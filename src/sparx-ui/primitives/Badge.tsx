import React from "react";
import { clsx } from "clsx";
import { useSparxTheme } from "../tokens/colors";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "primary"
    | "neutral"
    | "success"
    | "info"
    | "warning"
    | "error"
    | "flare"
    | "emerald"
    | "cyan"
    | "amber"
    | "outline";
  dot?: boolean;
  mono?: boolean;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "neutral",
  dot = false,
  mono = true,
  className,
  children,
  ...props
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  // 映射别名
  const resolvedVariant =
    variant === "flare"
      ? isEmerald ? "primary" : "primary"
      : variant === "emerald"
      ? "success"
      : variant === "cyan"
      ? "info"
      : variant === "amber"
      ? "warning"
      : variant === "outline"
      ? "neutral"
      : variant;

  const variantStyles = {
    primary: isEmerald
      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
      : "bg-[#E5192D]/15 border-[#E5192D]/30 text-red-200",
    neutral: isEmerald
      ? "bg-slate-100 border-slate-200 text-slate-700"
      : "bg-white/5 border-white/10 text-zinc-300",
    success: isEmerald
      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
      : "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
    info: isEmerald
      ? "bg-teal-50 border-teal-200 text-teal-800"
      : "bg-teal-500/15 border-teal-500/30 text-teal-300",
    warning: isEmerald
      ? "bg-amber-50 border-amber-200 text-amber-800"
      : "bg-amber-500/15 border-amber-500/30 text-amber-300",
    error: isEmerald
      ? "bg-rose-50 border-rose-200 text-rose-800"
      : "bg-rose-500/15 border-rose-500/30 text-rose-300",
    // 兼容原键名
    flare: isEmerald
      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
      : "bg-[#E5192D]/15 border-[#E5192D]/30 text-red-200",
    emerald: isEmerald
      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
      : "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
    cyan: isEmerald
      ? "bg-teal-50 border-teal-200 text-teal-800"
      : "bg-teal-500/15 border-teal-500/30 text-teal-300",
    amber: isEmerald
      ? "bg-amber-50 border-amber-200 text-amber-800"
      : "bg-amber-500/15 border-amber-500/30 text-amber-300",
  };

  const dotStyles = {
    primary: isEmerald ? "bg-[#059669]" : "bg-[#E5192D] shadow-[0_0_8px_#E5192D]",
    neutral: isEmerald ? "bg-slate-400" : "bg-zinc-400",
    success: isEmerald ? "bg-[#059669]" : "bg-emerald-400 shadow-[0_0_8px_#34D399]",
    info: isEmerald ? "bg-[#0D9488]" : "bg-teal-400 shadow-[0_0_8px_#2DD4BF]",
    warning: isEmerald ? "bg-[#D97706]" : "bg-[#E5A93C] shadow-[0_0_8px_#E5A93C]",
    error: isEmerald ? "bg-[#E11D48]" : "bg-rose-400 shadow-[0_0_8px_#FB7185]",
    flare: isEmerald ? "bg-[#059669]" : "bg-[#E5192D] shadow-[0_0_8px_#E5192D]",
    emerald: isEmerald ? "bg-[#059669]" : "bg-emerald-400 shadow-[0_0_8px_#34D399]",
    cyan: isEmerald ? "bg-[#0D9488]" : "bg-teal-400 shadow-[0_0_8px_#2DD4BF]",
    amber: isEmerald ? "bg-[#D97706]" : "bg-[#E5A93C] shadow-[0_0_8px_#E5A93C]",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-sm select-none transition-colors duration-200",
        mono ? "font-mono font-medium tracking-wide" : "font-sans font-normal",
        variantStyles[resolvedVariant] || variantStyles.neutral,
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={clsx(
            "w-1.5 h-1.5 rounded-full shrink-0",
            dotStyles[resolvedVariant] || dotStyles.neutral
          )}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};
