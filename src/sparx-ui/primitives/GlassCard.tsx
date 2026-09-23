import React from "react";
import { clsx } from "clsx";

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
    const variantStyles = {
      stage: "bg-[#030406] border border-white/10 shadow-2xl",
      elevated: "bg-[#08090E] border border-white/10 shadow-xl",
      translucent: "bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-lg",
      borderless: "bg-[#030406] border-0 shadow-none",
    };

    return (
      <div
        ref={ref}
        className={clsx(
          "rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300",
          variantStyles[variant],
          hoverEffect && "hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]",
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
