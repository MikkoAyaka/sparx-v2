import React from "react";
import { clsx } from "clsx";

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
  const total = items.length;

  return (
    <div className={clsx("w-full select-none", className)}>
      {/* 移动端专属导览标尺：紧凑步进、左右翻页按钮与全宽分段指示条 */}
      <div className="sm:hidden space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D]" />
            <span className="text-zinc-200 font-bold">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-zinc-600">/</span>
            <span>{String(total).padStart(2, "0")}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onSelect((activeIndex - 1 + total) % total)}
              className="px-2 py-0.5 rounded bg-white/10 text-zinc-300 hover:bg-white/20 active:scale-95 transition-all text-xs font-mono cursor-pointer"
              aria-label="上一项"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => onSelect((activeIndex + 1) % total)}
              className="px-2 py-0.5 rounded bg-white/10 text-zinc-300 hover:bg-white/20 active:scale-95 transition-all text-xs font-mono cursor-pointer"
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
                    ? "bg-[#E5192D] shadow-[0_0_8px_#E5192D]"
                    : "bg-white/20 hover:bg-white/40"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* 桌面端导览名录：多列网格卡片 */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-mono">
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
                    ? "bg-[#E5192D] shadow-[0_0_10px_#E5192D]"
                    : "bg-white/15 group-hover:bg-white/40"
                )}
              />
              <div
                className={clsx(
                  "text-xs flex justify-between items-center gap-1.5 transition-colors",
                  activeIndex === idx
                    ? "font-bold text-white"
                    : "text-zinc-400 group-hover:text-zinc-200"
                )}
              >
                <span className="truncate">{item.title}</span>
                {item.meta && (
                  <span className="shrink-0 font-mono text-zinc-500 text-xs">
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
