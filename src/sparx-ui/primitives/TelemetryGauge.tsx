import React from "react";
import { clsx } from "clsx";
import { useSparxTheme } from "../tokens/colors";
import { Cpu, Zap, Activity, Thermometer } from "lucide-react";

export interface TelemetryGaugeProps {
  label: string;
  value: number; // 0 - 100 or metric value
  maxValue?: number;
  unit?: string;
  type?: "circular" | "bar";
  status?: "normal" | "warning" | "critical";
  quantization?: "INT4" | "INT8" | "FP16" | "BF16" | "FP32";
  iconType?: "cpu" | "power" | "latency" | "temp";
  subtext?: string;
  className?: string;
}

export const TelemetryGauge: React.FC<TelemetryGaugeProps> = ({
  label,
  value,
  maxValue = 100,
  unit = "%",
  type = "circular",
  status = "normal",
  quantization,
  iconType = "cpu",
  subtext,
  className,
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  const percentage = Math.min(Math.max((value / maxValue) * 100, 0), 100);

  const getStatusColor = () => {
    if (status === "critical") {
      return isEmerald ? "#E11D48" : "#FF2D55";
    }
    if (status === "warning") {
      return "#D97706";
    }
    return isEmerald ? "#059669" : "#10B981";
  };

  const renderIcon = () => {
    switch (iconType) {
      case "power":
        return <Zap className="w-3.5 h-3.5" />;
      case "latency":
        return <Activity className="w-3.5 h-3.5" />;
      case "temp":
        return <Thermometer className="w-3.5 h-3.5" />;
      default:
        return <Cpu className="w-3.5 h-3.5" />;
    }
  };

  // SVG 环形进度参数
  const size = 68;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={clsx(
        "rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between select-none relative overflow-hidden",
        isEmerald
          ? "bg-white border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          : "bg-[#08090E] border-white/10",
        className
      )}
    >
      {/* 头部元信息 */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
          <span
            className={clsx(
              "p-1 rounded-md border",
              isEmerald
                ? "bg-slate-50 border-slate-200 text-slate-700"
                : "bg-white/5 border-white/10 text-zinc-300"
            )}
          >
            {renderIcon()}
          </span>
          <span className={isEmerald ? "text-slate-600 font-medium" : "text-zinc-300"}>
            {label}
          </span>
        </div>

        {quantization && (
          <span
            className={clsx(
              "px-1.5 py-0.5 rounded text-xs font-mono border font-bold",
              isEmerald
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-[#E5192D]/10 border-[#E5192D]/20 text-red-300"
            )}
          >
            {quantization}
          </span>
        )}
      </div>

      {/* 主体计量呈现 */}
      {type === "circular" ? (
        <div className="flex items-center justify-between gap-3 my-1">
          <div className="flex items-baseline gap-1">
            <span
              className={clsx(
                "text-2xl sm:text-3xl font-black font-mono",
                isEmerald ? "text-slate-900" : "text-white"
              )}
            >
              {value}
            </span>
            <span className="text-xs font-mono text-zinc-500 font-semibold">
              {unit}
            </span>
          </div>

          {/* SVG 环形刻度 */}
          <div className="relative shrink-0" style={{ width: size, height: size }}>
            <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                className={clsx(
                  "fill-none stroke-current",
                  isEmerald ? "text-slate-100" : "text-white/5"
                )}
                strokeWidth={strokeWidth}
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                className="fill-none transition-all duration-500"
                stroke={getStatusColor()}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-zinc-400">
              {Math.round(percentage)}%
            </div>
          </div>
        </div>
      ) : (
        /* 线性进度条 */
        <div className="space-y-2 my-2">
          <div className="flex items-baseline justify-between text-xs font-mono">
            <div className="flex items-baseline gap-1">
              <span
                className={clsx(
                  "text-xl sm:text-2xl font-black",
                  isEmerald ? "text-slate-900" : "text-white"
                )}
              >
                {value}
              </span>
              <span className="text-zinc-500">{unit}</span>
            </div>
            <span className="text-zinc-500">{Math.round(percentage)}%</span>
          </div>

          <div
            className={clsx(
              "w-full h-2 rounded-full overflow-hidden border",
              isEmerald
                ? "bg-slate-100 border-slate-200"
                : "bg-white/5 border-white/10"
            )}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${percentage}%`,
                backgroundColor: getStatusColor(),
              }}
            />
          </div>
        </div>
      )}

      {/* 底部微注记 */}
      {subtext && (
        <div className="pt-2 border-t flex items-center justify-between text-xs font-mono border-inherit text-zinc-500">
          <span>{subtext}</span>
          <span>Max: {maxValue}{unit}</span>
        </div>
      )}
    </div>
  );
};
