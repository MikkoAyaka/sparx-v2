import React, { useEffect, useRef } from "react";
import { clsx } from "clsx";
import { StageMediaSpine, type StageMediaCover } from "../atmosphere/StageMediaSpine";
import { ReadingGauge } from "../primitives/ReadingGauge";
import { Button } from "../primitives/Button";
import { Tag } from "../primitives/Tag";
import { SegmentedRail, type SegmentedRailItem } from "./SegmentedRail";
import { scheduleAdjacentPreload } from "./adjacentPreload";
import { useSparxTheme } from "../tokens/colors";

export interface StageEntry {
  id: string;
  title: string;
  summary?: string;
  category?: string;
  date?: string;
  readingMinutes?: number;
  tags?: string[];
  cover?: StageMediaCover;
}

export interface StageHeroCardProps {
  entries: StageEntry[];
  activeIndex: number;
  onChangeIndex: (index: number) => void;
  onOpenEntry?: (entry: StageEntry) => void;
  ctaText?: string;
  /** 舞台顶部的刊头，例如 SiteMasthead */
  header?: React.ReactNode;
  enableKeyboard?: boolean;
  enableWheel?: boolean;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * StageHeroCard：100dvh 主舞台。一屏只放一篇文章：左侧 60% 是封面，向右渐变过渡到底色；
 * 右侧是超大编号、标题、摘要和阅读入口；底部是分段导航。滚轮、方向键和横向滑动都可以翻篇。
 * 版式跟随卡片自身的宽高（容器查询），嵌在文档栏、侧栏或整屏里都能正确排布；高度不足时依次隐藏大编号、标签和摘要。
 * 推荐主题：虚空绯红。
 */
export const StageHeroCard: React.FC<StageHeroCardProps> = ({
  entries,
  activeIndex,
  onChangeIndex,
  onOpenEntry,
  ctaText = "阅读全文",
  header,
  enableKeyboard = true,
  enableWheel = true,
  className,
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  const total = entries.length;
  const activeEntry = entries[activeIndex] ?? entries[0];
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const step = (delta: number) => onChangeIndex((activeIndex + delta + total) % total);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) step(dx > 0 ? -1 : 1);
  };

  // 方向键翻篇，回车打开当前文章
  useEffect(() => {
    if (!enableKeyboard) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "Enter" && activeEntry && onOpenEntry && t === document.body) onOpenEntry(activeEntry);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // 滚轮翻篇：400ms 内只响应一次，避免触控板惯性连续翻页
  useEffect(() => {
    if (!enableWheel || total < 2) return;
    let last = 0;
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      const d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(d) < 15) return;
      const now = performance.now();
      if (now - last < 400) return;
      last = now;
      onChangeIndex(d > 0 ? Math.min(total - 1, activeIndex + 1) : Math.max(0, activeIndex - 1));
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [activeIndex, enableWheel, total, onChangeIndex]);

  // 浏览器空闲时预加载前后各一张封面
  useEffect(() => {
    if (!total) return;
    return scheduleAdjacentPreload({
      currentIndex: activeIndex,
      total,
      radius: 1,
      getUrl: (idx) => entries[idx]?.cover?.imageUrl,
    });
  }, [activeIndex, entries, total]);

  if (!activeEntry) return null;

  const railItems: SegmentedRailItem[] = entries.map((e) => ({
    id: e.id,
    title: e.title.split(/[：:]/)[0],
    meta: e.date?.slice(5, 10),
  }));

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="轮播"
      className={clsx(
        "sparx-stage relative h-full w-full overflow-hidden flex flex-col",
        isEmerald ? "bg-white text-slate-900" : "bg-[#030406] text-white",
        className
      )}
    >
      {/* 封面：宽卡片占左侧 60%，窄卡片铺满并由纵向蒙版压暗 */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => onOpenEntry?.(activeEntry)}
        className="absolute inset-y-0 left-0 w-full @4xl/stage:w-[60%] overflow-hidden cursor-pointer"
      >
        <StageMediaSpine cover={activeEntry.cover} title={activeEntry.title} />
      </button>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-[5] hidden @4xl/stage:block" style={{ background: "var(--sparx-mask-horizontal)" }} />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-[5] @4xl/stage:hidden" style={{ background: "var(--sparx-mask-vertical)" }} />

      {header && <div className="relative z-20 shrink-0 px-5 @2xl/stage:px-8 @5xl/stage:px-12 pt-5 @2xl/stage:pt-7">{header}</div>}

      {/* 正文列 */}
      <div className="relative z-10 flex-1 min-h-0 grid grid-cols-1 @4xl/stage:grid-cols-12 px-5 @2xl/stage:px-8 @5xl/stage:px-12">
        <div className="hidden @4xl/stage:block @4xl/stage:col-span-6" />
        <div
          key={activeEntry.id}
          className="min-h-0 overflow-hidden @4xl/stage:col-span-6 @6xl/stage:col-span-5 @6xl/stage:col-start-8 flex flex-col justify-end @4xl/stage:justify-center py-6 animate-rise"
        >
          <div className="sparx-stage-numeral"><div className="flex items-end gap-3">
            <span
              aria-hidden="true"
              className={clsx(
                "font-black leading-[0.8] tracking-tighter text-[4.5rem] @2xl/stage:text-[6rem] @7xl/stage:text-[8.5rem] select-none",
                isEmerald ? "text-slate-100" : "text-transparent"
              )}
              style={isEmerald ? undefined : { WebkitTextStroke: "1.5px #E5192D" }}
            >
              {pad(activeIndex + 1)}
            </span>
            <span className={clsx("font-mono text-sm pb-2", isEmerald ? "text-slate-400" : "text-zinc-500")}>
              / {pad(total)}
            </span>
          </div></div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-4 font-mono text-sm">
            <span className={clsx("font-bold uppercase tracking-wider", isEmerald ? "text-[#059669]" : "text-[#E5192D]")}>
              {activeEntry.category ?? "文章"}
            </span>
            {activeEntry.date && (
              <>
                <span className={isEmerald ? "text-slate-300" : "text-zinc-700"}>/</span>
                <time className={isEmerald ? "text-slate-500" : "text-zinc-400"}>{activeEntry.date}</time>
              </>
            )}
          </div>

          <h2 className="mt-3">
            <button
              type="button"
              onClick={() => onOpenEntry?.(activeEntry)}
              className={clsx(
                "text-left text-2xl @md/stage:text-3xl @2xl/stage:text-4xl @6xl/stage:text-5xl @7xl/stage:text-6xl font-black tracking-tight leading-[1.08] line-clamp-3 cursor-pointer transition-colors",
                isEmerald ? "text-slate-900 hover:text-emerald-700" : "text-white hover:text-red-200"
              )}
            >
              {activeEntry.title}
            </button>
          </h2>

          {activeEntry.summary && (
            <div className="sparx-stage-summary">
              <p
                className={clsx(
                  "mt-4 text-sm @2xl/stage:text-base leading-relaxed max-w-xl line-clamp-3",
                  isEmerald ? "text-slate-600" : "text-zinc-300"
                )}
              >
                {activeEntry.summary}
              </p>
            </div>
          )}

          {activeEntry.tags && activeEntry.tags.length > 0 && (
            <div className="sparx-stage-tags">
              <div className="mt-4 hidden @2xl/stage:flex flex-wrap gap-2">
                {activeEntry.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button variant="flare" size="lg" glow withArrow onClick={() => onOpenEntry?.(activeEntry)}>
              {ctaText}
            </Button>
            <ReadingGauge minutes={activeEntry.readingMinutes ?? 5} />
          </div>
        </div>
      </div>

      {/* 分段导航 */}
      <div
        className={clsx(
          "relative z-20 shrink-0 mx-5 @2xl/stage:mx-8 @5xl/stage:mx-12 mb-5 @2xl/stage:mb-7 pt-4 border-t",
          isEmerald ? "border-slate-200" : "border-white/10"
        )}
      >
        <SegmentedRail items={railItems} activeIndex={activeIndex} onSelect={onChangeIndex} />
      </div>
    </section>
  );
};
