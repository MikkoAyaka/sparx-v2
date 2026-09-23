import React from "react";
import { clsx } from "clsx";
import { useSparxTheme } from "../tokens/colors";

export interface StatusDotProps {
  status?: "live" | "radar" | "caution" | "arch" | "idle";
  pulse?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const StatusDot: React.FC<StatusDotProps> = ({
  status = "live",
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

  const colorMap = {
    live: isEmerald ? "bg-[#059669] shadow-[0_0_8px_#059669]" : "bg-[#E5192D] shadow-[0_0_8px_#E5192D]",
    radar: "bg-cyan-500 shadow-[0_0_8px_#06B6D4]",
    caution: "bg-amber-500 shadow-[0_0_8px_#F59E0B]",
    arch: "bg-purple-500 shadow-[0_0_8px_#A855F7]",
    idle: "bg-zinc-400 shadow-none",
  };

  const pulseRingColor = {
    live: isEmerald ? "bg-[#059669]" : "bg-[#E5192D]",
    radar: "bg-cyan-500",
    caution: "bg-amber-500",
    arch: "bg-purple-500",
    idle: "bg-zinc-400",
  };

  return (
    <span className={clsx("relative inline-flex items-center justify-center shrink-0", className)}>
      {pulse && status !== "idle" && (
        <span
          className={clsx(
            "absolute rounded-full opacity-75 animate-ping",
            sizeMap[size],
            pulseRingColor[status]
          )}
        />
      )}
      <span className={clsx("relative rounded-full", sizeMap[size], colorMap[status])} />
    </span>
  );
};
