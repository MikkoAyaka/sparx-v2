import React from "react";
import { clsx } from "clsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * SegmentedRail：主舞台底部的分段导航。每一段是一篇文章：编号、标题、日期。
 * 容器宽度 ≥ 672px 时平铺全部分段；更窄时只显示当前编号、翻页按钮和分段条。
 */
export const SegmentedRail: React.FC<SegmentedRailProps> = ({ items, activeIndex, onSelect, className }) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";
  const total = items.length;
  const go = (i: number) => onSelect((i + total) % total);

  const bar = (active: boolean) =>
    clsx(
      "h-[3px] rounded-full transition-all duration-500",
      active
        ? isEmerald
          ? "bg-[#059669]"
          : "bg-[#E5192D] shadow-[0_0_10px_rgba(229,25,45,0.8)]"
        : isEmerald
        ? "bg-slate-200 group-hover:bg-slate-300"
        : "bg-white/15 group-hover:bg-white/35"
    );

  return (
    <div className={clsx("@container w-full select-none", className)}>
      {/* 窄容器：编号、翻页按钮和分段条 */}
      <div className="@2xl:hidden space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="font-mono text-sm">
            <span className={clsx("font-bold", isEmerald ? "text-[#059669]" : "text-[#E5192D]")}>{pad(activeIndex + 1)}</span>
            <span className={isEmerald ? "text-slate-400" : "text-zinc-600"}> / {pad(total)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {[
              { label: "上一篇", icon: <ArrowLeft className="w-4 h-4" />, to: activeIndex - 1 },
              { label: "下一篇", icon: <ArrowRight className="w-4 h-4" />, to: activeIndex + 1 },
            ].map((b) => (
              <button
                key={b.label}
                type="button"
                aria-label={b.label}
                onClick={() => go(b.to)}
                className={clsx(
                  "w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer active:scale-95 transition-colors",
                  isEmerald ? "border-slate-200 text-slate-700 hover:bg-slate-100" : "border-white/15 text-zinc-200 hover:bg-white/10"
                )}
              >
                {b.icon}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-1.5">
          {items.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(idx)}
              aria-label={`第 ${idx + 1} 篇：${item.title}`}
              aria-current={idx === activeIndex ? "true" : undefined}
              className="group flex-1 py-2 -my-2 cursor-pointer"
            >
              <div className={bar(idx === activeIndex)} />
            </button>
          ))}
        </div>
      </div>

      {/* 宽容器：平铺全部分段 */}
      <div
        className="hidden @2xl:grid gap-4 @5xl:gap-6"
        style={{ gridTemplateColumns: `repeat(${Math.min(total, 6)}, minmax(0, 1fr))` }}
      >
        {items.map((item, idx) => {
          const active = idx === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(idx)}
              aria-current={active ? "true" : undefined}
              className="group text-left space-y-2.5 cursor-pointer min-w-0"
            >
              <div className={bar(active)} />
              <div className="flex items-baseline gap-2.5 min-w-0">
                <span
                  className={clsx(
                    "font-mono text-sm font-bold shrink-0 transition-colors",
                    active
                      ? isEmerald
                        ? "text-[#059669]"
                        : "text-[#E5192D]"
                      : isEmerald
                      ? "text-slate-400"
                      : "text-zinc-600"
                  )}
                >
                  {pad(idx + 1)}
                </span>
                <span
                  className={clsx(
                    "min-w-0 text-sm truncate transition-colors",
                    active
                      ? isEmerald
                        ? "text-slate-900 font-semibold"
                        : "text-white font-semibold"
                      : isEmerald
                      ? "text-slate-500 group-hover:text-slate-800"
                      : "text-zinc-500 group-hover:text-zinc-200"
                  )}
                >
                  {item.title}
                </span>
                {item.meta && (
                  <span className={clsx("ml-auto shrink-0 font-mono text-sm", isEmerald ? "text-slate-400" : "text-zinc-600")}>
                    {item.meta}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
