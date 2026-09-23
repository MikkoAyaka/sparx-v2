import React from "react";
import { clsx } from "clsx";
import { ArrowRight } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "flare" | "outline" | "ghost" | "glass" | "subtle";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "flare",
      size = "md",
      withArrow = false,
      glow = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "group inline-flex items-center justify-center font-mono font-bold select-none cursor-pointer rounded-full transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-xs sm:text-sm px-5 py-2.5 gap-2",
      lg: "text-sm sm:text-base px-7 py-3.5 gap-2.5",
    };

    const variantStyles = {
      flare: clsx(
        "bg-[#E5192D] text-white hover:bg-red-600 hover:scale-[1.03]",
        glow && "shadow-[0_0_20px_rgba(229,25,45,0.45)] hover:shadow-[0_0_28px_rgba(229,25,45,0.7)]"
      ),
      outline:
        "border border-white/20 text-zinc-200 hover:border-white/50 hover:bg-white/5 hover:text-white",
      ghost: "text-zinc-400 hover:text-white hover:bg-white/5",
      glass:
        "bg-white/[0.05] border border-white/10 text-zinc-200 hover:bg-white/[0.1] hover:border-white/20 backdrop-blur-md shadow-lg",
      subtle:
        "bg-[#08090E] border border-white/10 text-zinc-300 hover:text-white hover:border-[#E5192D]/40",
    };

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        <span>{children}</span>
        {withArrow && (
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
