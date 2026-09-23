import React from "react";
import { clsx } from "clsx";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "flare" | "neutral" | "emerald" | "cyan" | "amber";
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
  const variantStyles = {
    flare: "bg-[#E5192D]/15 border-[#E5192D]/30 text-red-200",
    neutral: "bg-white/5 border-white/10 text-zinc-300",
    emerald: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
    cyan: "bg-cyan-500/15 border-cyan-500/30 text-cyan-300",
    amber: "bg-amber-500/15 border-amber-500/30 text-amber-300",
  };

  const dotStyles = {
    flare: "bg-[#E5192D] shadow-[0_0_8px_#E5192D]",
    neutral: "bg-zinc-400",
    emerald: "bg-emerald-400 shadow-[0_0_8px_#34D399]",
    cyan: "bg-cyan-400 shadow-[0_0_8px_#22D3EE]",
    amber: "bg-amber-400 shadow-[0_0_8px_#FBBF24]",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs leading-none select-none",
        mono ? "font-mono font-medium tracking-wide" : "font-sans font-normal",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={clsx("w-1.5 h-1.5 rounded-full shrink-0", dotStyles[variant])}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};
