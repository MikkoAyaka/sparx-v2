import React from "react";
import { clsx } from "clsx";
import { useSparxTheme } from "../tokens/colors";

export interface ReadingGaugeProps {
  minutes: number;
  maxMinutes?: number;
  size?: "sm" | "md" | "lg";
  label?: string;
  showDetail?: boolean;
  className?: string;
}

export const ReadingGauge: React.FC<ReadingGaugeProps> = ({
  minutes,
  maxMinutes = 15,
  size = "md",
  label = "预计阅读耗时",
  showDetail = true,
  className,
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  const radius = 20;
  const circumference = 2 * Math.PI * radius; // ~125.66
  const progressRatio = Math.min(1, Math.max(0.1, minutes / maxMinutes));
  const strokeDashoffset = circumference - progressRatio * circumference;

  const sizeConfig = {
    sm: { svgSize: "w-8 h-8", viewBox: 48, strokeWidth: 3, text: "text-xs" },
    md: { svgSize: "w-10 h-10 sm:w-11 sm:h-11", viewBox: 48, strokeWidth: 3, text: "text-xs" },
    lg: { svgSize: "w-14 h-14", viewBox: 48, strokeWidth: 3.5, text: "text-sm" },
  };

  const currentSize = sizeConfig[size];

  return (
    <div className={clsx("flex items-center gap-3 select-none", className)}>
      <div className={clsx("relative shrink-0 flex items-center justify-center", currentSize.svgSize)}>
        <svg className={clsx("-rotate-90", currentSize.svgSize)} viewBox="0 0 48 48">
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke={isEmerald ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.12)"}
            strokeWidth={currentSize.strokeWidth}
            fill="none"
          />
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke={isEmerald ? "#059669" : "#E5192D"}
            strokeWidth={currentSize.strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <span
          className={clsx(
            "absolute font-mono font-bold",
            isEmerald ? "text-slate-900" : "text-white",
            currentSize.text
          )}
        >
          {minutes}分
        </span>
      </div>

      {showDetail && (
        <div className="space-y-0.5">
          <div className={clsx("text-xs font-sans", isEmerald ? "text-slate-500" : "text-zinc-400")}>
            {label}
          </div>
          <div
            className={clsx(
              "text-xs font-bold font-mono",
              isEmerald ? "text-slate-800" : "text-white"
            )}
          >
            {minutes} 分钟 · 深度思考
          </div>
        </div>
      )}
    </div>
  );
};
