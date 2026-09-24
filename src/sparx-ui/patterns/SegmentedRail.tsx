import React from "react";
import { clsx } from "clsx";
import { useSparxTheme } from "../tokens/colors";

export interface SegmentedRailItem {
  id: string;
  title: string;
  subtitle?: string;
  meta?: string;
}

export interface SegmentedRailProps {
  items: SegmentedRailItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
}

export const SegmentedRail: React.FC<SegmentedRailProps> = ({
  items,
  activeIndex,
  onSelect,
  className,
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";
  const total = items.length;

  return (
    <div className={clsx("w-full select-none", className)}>
      {/* 移动端专属导览标尺：紧凑步进、左右翻页按钮与全宽分段指示条 */}
      <div className="sm:hidden space-y-2">
        <div
          className={clsx(
            "flex items-center justify-between text-xs font-mono",
            isEmerald ? "text-slate-500" : "text-zinc-400"
          )}
        >
          <div className="flex items-center gap-1.5">
            <span
              className={clsx(
                "w-1.5 h-1.5 rounded-full",
                isEmerald ? "bg-[#059669]" : "bg-[#E5192D]"
              )}
            />
            <span
              className={clsx(
                "font-bold",
                isEmerald ? "text-slate-900" : "text-zinc-200"
              )}
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className={isEmerald ? "text-slate-300" : "text-zinc-600"}>/</span>
            <span>{String(total).padStart(2, "0")}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onSelect((activeIndex - 1 + total) % total)}
              className={clsx(
                "px-2 py-0.5 rounded active:scale-95 transition-all text-xs font-mono cursor-pointer",
                isEmerald
                  ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  : "bg-white/10 text-zinc-300 hover:bg-white/20"
              )}
              aria-label="上一项"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => onSelect((activeIndex + 1) % total)}
              className={clsx(
                "px-2 py-0.5 rounded active:scale-95 transition-all text-xs font-mono cursor-pointer",
                isEmerald
                  ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  : "bg-white/10 text-zinc-300 hover:bg-white/20"
              )}
              aria-label="下一项"
            >
              →
            </button>
          </div>
        </div>

        <div className="flex gap-1.5 w-full">
          {items.map((item, idx) => (
            <button
              type="button"
              key={item.id}
              onClick={() => onSelect(idx)}
              className="flex-1 py-1 -my-1 focus:outline-none cursor-pointer"
              aria-label={`切换至第 ${idx + 1} 项：${item.title}`}
            >
              <div
                className={clsx(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeIndex === idx
                    ? isEmerald
                      ? "bg-[#059669]"
                      : "bg-[#E5192D] shadow-[0_0_8px_#E5192D]"
                    : isEmerald
                    ? "bg-slate-200 hover:bg-slate-300"
                    : "bg-white/20 hover:bg-white/40"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* 桌面端导览名录：多列网格卡片 */}
      <div className="hidden sm:block">
        <div
          className={clsx(
            "flex items-center justify-between text-xs sm:text-sm mb-2.5 font-mono",
            isEmerald ? "text-slate-500" : "text-zinc-400"
          )}
        >
          <span>列表导览 ({total})</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 cursor-pointer">
          {items.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onSelect(idx)}
              className="space-y-1.5 group focus:outline-none"
            >
              <div
                className={clsx(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeIndex === idx
                    ? isEmerald
                      ? "bg-[#059669]"
                      : "bg-[#E5192D] shadow-[0_0_10px_#E5192D]"
                    : isEmerald
                    ? "bg-slate-200 group-hover:bg-slate-300"
                    : "bg-white/15 group-hover:bg-white/40"
                )}
              />
              <div
                className={clsx(
                  "text-xs sm:text-sm flex justify-between items-center gap-1.5 transition-colors",
                  activeIndex === idx
                    ? isEmerald
                      ? "font-bold text-slate-900"
                      : "font-bold text-white"
                    : isEmerald
                    ? "text-slate-500 group-hover:text-slate-800"
                    : "text-zinc-400 group-hover:text-zinc-200"
                )}
              >
                <span className="truncate">{item.title}</span>
                {item.meta && (
                  <span
                    className={clsx(
                      "shrink-0 font-mono text-xs",
                      isEmerald ? "text-slate-400" : "text-zinc-500"
                    )}
                  >
                    {item.meta}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
