import React from "react";
import { clsx } from "clsx";
import { useSparxTheme } from "../tokens/colors";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export interface MetricStatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  delta?: {
    value: string;
    trend: "up" | "down" | "neutral";
    label?: string;
  };
  sparkline?: number[];
  subtitle?: string;
  badge?: string;
  icon?: React.ReactNode;
  variant?: "default" | "active" | "alert";
  className?: string;
}

export const MetricStatCard: React.FC<MetricStatCardProps> = ({
  title,
  value,
  unit,
  delta,
  sparkline,
  subtitle,
  badge,
  icon,
  variant = "default",
  className,
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  // 计算简易 SVG 趋势折线坐标
  const renderSparkline = () => {
    if (!sparkline || sparkline.length < 2) return null;
    const min = Math.min(...sparkline);
    const max = Math.max(...sparkline);
    const range = max - min || 1;
    const width = 80;
    const height = 28;

    const points = sparkline
      .map((val, idx) => {
        const x = (idx / (sparkline.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 6) - 3;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

    const strokeColor =
      variant === "alert"
        ? isEmerald
          ? "#E11D48"
          : "#FF2D55"
        : delta?.trend === "up"
        ? isEmerald
          ? "#059669"
          : "#10B981"
        : delta?.trend === "down"
        ? isEmerald
          ? "#E11D48"
          : "#FF2D55"
        : isEmerald
        ? "#64748B"
        : "#A1A1AA";

    return (
      <svg
        width={width}
        height={height}
        className="overflow-visible shrink-0 select-none"
        aria-hidden="true"
      >
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  };

  const trendIcon =
    delta?.trend === "up" ? (
      <ArrowUpRight className="w-3.5 h-3.5" />
    ) : delta?.trend === "down" ? (
      <ArrowDownRight className="w-3.5 h-3.5" />
    ) : (
      <Minus className="w-3 h-3" />
    );

  const trendColors = isEmerald
    ? delta?.trend === "up"
      ? "bg-emerald-50 text-[#059669] border-emerald-200"
      : delta?.trend === "down"
      ? "bg-rose-50 text-rose-600 border-rose-200"
      : "bg-slate-100 text-slate-600 border-slate-200"
    : delta?.trend === "up"
    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    : delta?.trend === "down"
    ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
    : "bg-white/5 text-zinc-400 border-white/10";

  return (
    <div
      className={clsx(
        "rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex flex-col justify-between select-none relative overflow-hidden",
        isEmerald
          ? variant === "active"
            ? "bg-white border-[#059669] shadow-[0_1px_3px_rgba(5,150,105,0.08)]"
            : variant === "alert"
            ? "bg-white border-rose-300 shadow-[0_1px_3px_rgba(225,29,72,0.08)]"
            : "bg-white border-slate-200 hover:border-slate-300 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          : variant === "active"
          ? "bg-[#08090E] border-[#E5192D] shadow-[0_0_16px_rgba(229,25,45,0.2)]"
          : variant === "alert"
          ? "bg-[#08090E] border-rose-500/50 shadow-[0_0_16px_rgba(244,63,94,0.2)]"
          : "bg-[#08090E] border-white/10 hover:border-white/15",
        className
      )}
    >
      {/* 头部元信息 */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {icon && (
            <span
              className={clsx(
                "p-1.5 rounded-lg border",
                isEmerald
                  ? "bg-slate-50 border-slate-200 text-slate-700"
                  : "bg-white/5 border-white/10 text-zinc-300"
              )}
            >
              {icon}
            </span>
          )}
          <span
            className={clsx(
              "text-xs font-mono font-medium",
              isEmerald ? "text-slate-500" : "text-zinc-400"
            )}
          >
            {title}
          </span>
        </div>

        {badge && (
          <span
            className={clsx(
              "text-xs px-2 py-0.5 rounded-md font-mono border",
              isEmerald
                ? "bg-slate-50 border-slate-200 text-slate-600"
                : "bg-white/5 border-white/10 text-zinc-300"
            )}
          >
            {badge}
          </span>
        )}
      </div>

      {/* 主指标与趋势折线 */}
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-1.5">
          <span
            className={clsx(
              "text-2xl sm:text-3xl font-black font-mono tracking-tight",
              isEmerald ? "text-slate-900" : "text-white"
            )}
          >
            {value}
          </span>
          {unit && (
            <span
              className={clsx(
                "text-xs font-mono font-semibold",
                isEmerald ? "text-slate-500" : "text-zinc-400"
              )}
            >
              {unit}
            </span>
          )}
        </div>

        {renderSparkline()}
      </div>

      {/* 底部趋势增减与说明 */}
      {(delta || subtitle) && (
        <div className="mt-4 pt-3 border-t flex items-center justify-between gap-2 text-xs font-mono border-inherit">
          {delta && (
            <div
              className={clsx(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-md border font-semibold",
                trendColors
              )}
            >
              {trendIcon}
              <span>{delta.value}</span>
              {delta.label && (
                <span className="opacity-75 font-normal ml-0.5">
                  {delta.label}
                </span>
              )}
            </div>
          )}
          {subtitle && (
            <span
              className={clsx(
                "truncate text-right",
                isEmerald ? "text-slate-400" : "text-zinc-500"
              )}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
