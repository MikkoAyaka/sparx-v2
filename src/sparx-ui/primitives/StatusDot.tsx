import React from "react";
import { clsx } from "clsx";
import { useSparxTheme } from "../tokens/colors";

export interface StatusDotProps {
  status?:
    | "live"
    | "radar"
    | "caution"
    | "arch"
    | "idle"
    | "success"
    | "info"
    | "warning"
    | "error";
  variant?:
    | "emerald"
    | "crimson"
    | "amber"
    | "teal"
    | "neutral"
    | "primary"
    | "live"
    | "radar"
    | "caution"
    | "arch"
    | "idle"
    | "success"
    | "info"
    | "warning"
    | "error";
  pulse?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const StatusDot: React.FC<StatusDotProps> = ({
  status,
  variant,
  pulse = true,
  size = "md",
  className,
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  const sizeMap = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  };

  const effectiveStatus = variant || status || "live";

  const resolvedStatus =
    effectiveStatus === "live" || effectiveStatus === "crimson"
      ? "primary"
      : effectiveStatus === "emerald"
      ? "success"
      : effectiveStatus === "teal" || effectiveStatus === "radar" || effectiveStatus === "arch"
      ? "info"
      : effectiveStatus === "caution" || effectiveStatus === "amber"
      ? "warning"
      : effectiveStatus === "neutral"
      ? "idle"
      : effectiveStatus;

  const colorMap: Record<string, string> = {
    primary: isEmerald
      ? "bg-[#059669]"
      : "bg-[#E5192D] shadow-[0_0_8px_#E5192D]",
    success: isEmerald
      ? "bg-[#059669]"
      : "bg-emerald-400 shadow-[0_0_8px_#34D399]",
    info: isEmerald
      ? "bg-[#0D9488]"
      : "bg-teal-400 shadow-[0_0_8px_#2DD4BF]",
    warning: isEmerald
      ? "bg-[#D97706]"
      : "bg-[#E5A93C] shadow-[0_0_8px_#E5A93C]",
    error: isEmerald
      ? "bg-[#E11D48]"
      : "bg-rose-400 shadow-[0_0_8px_#FB7185]",
    idle: isEmerald ? "bg-slate-400" : "bg-zinc-500",
  };

  const pulseRingColor: Record<string, string> = {
    primary: isEmerald ? "bg-[#059669]" : "bg-[#E5192D]",
    success: isEmerald ? "bg-[#059669]" : "bg-emerald-400",
    info: isEmerald ? "bg-[#0D9488]" : "bg-teal-400",
    warning: isEmerald ? "bg-[#D97706]" : "bg-[#E5A93C]",
    error: isEmerald ? "bg-[#E11D48]" : "bg-rose-400",
    idle: isEmerald ? "bg-slate-400" : "bg-zinc-500",
  };

  const activeColor = colorMap[resolvedStatus] || colorMap.primary;
  const activePulse = pulseRingColor[resolvedStatus] || pulseRingColor.primary;

  return (
    <span className={clsx("relative inline-flex items-center justify-center shrink-0", className)}>
      {pulse && status !== "idle" && (
        <span
          className={clsx(
            "absolute rounded-full opacity-60 animate-ping",
            sizeMap[size],
            activePulse
          )}
        />
      )}
      <span className={clsx("relative rounded-full", sizeMap[size], activeColor)} />
    </span>
  );
};
