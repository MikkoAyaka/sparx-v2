import React, { useEffect, useRef } from "react";
import { clsx } from "clsx";
import { StageMediaSpine, type StageMediaCover } from "../atmosphere/StageMediaSpine";
import { AmbientDissolveMask } from "../atmosphere/AmbientDissolveMask";
import { ReadingGauge } from "../primitives/ReadingGauge";
import { Button } from "../primitives/Button";
import { Tag } from "../primitives/Tag";
import { SegmentedRail, type SegmentedRailItem } from "./SegmentedRail";
import { scheduleAdjacentPreload } from "./adjacentPreload";

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
  enableKeyboard?: boolean;
  enableWheel?: boolean;
  className?: string;
}

export const StageHeroCard: React.FC<StageHeroCardProps> = ({
  entries,
  activeIndex,
  onChangeIndex,
  onOpenEntry,
  ctaText = "展卷阅读",
  enableKeyboard = true,
  enableWheel = true,
  className,
}) => {
  const activeEntry = entries[activeIndex] ?? entries[0];
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // 触控滑动手势
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    touchStartXRef.current = null;
    touchStartYRef.current = null;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        onChangeIndex(activeIndex > 0 ? activeIndex - 1 : entries.length - 1);
      } else {
        onChangeIndex(activeIndex < entries.length - 1 ? activeIndex + 1 : 0);
      }
    }
  };

  // 键盘左右导航
  useEffect(() => {
    if (!enableKeyboard) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") {
        onChangeIndex(activeIndex > 0 ? activeIndex - 1 : entries.length - 1);
      } else if (e.key === "ArrowRight") {
        onChangeIndex(activeIndex < entries.length - 1 ? activeIndex + 1 : 0);
      } else if (e.key === "Enter" && activeEntry && onOpenEntry) {
        onOpenEntry(activeEntry);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, activeEntry, enableKeyboard, entries.length, onChangeIndex, onOpenEntry]);

  // 滚轮阻尼切换
  useEffect(() => {
    if (!enableWheel || entries.length < 2) return;
    let lastWheelTime = 0;
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      const dominant = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(dominant) < 15) return;

      const now = performance.now();
      if (now - lastWheelTime < 400) return; // 节流步进节奏

      lastWheelTime = now;
      if (dominant > 0) {
        onChangeIndex(Math.min(entries.length - 1, activeIndex + 1));
      } else {
        onChangeIndex(Math.max(0, activeIndex - 1));
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeIndex, enableWheel, entries.length, onChangeIndex]);

  // 附近卡片静默预加载：在空闲时段预抓取相邻卡片大图，消除切页卡顿 (Issue #3)
  useEffect(() => {
    if (!entries.length) return;
    const cancel = scheduleAdjacentPreload({
      currentIndex: activeIndex,
      total: entries.length,
      radius: 1,
      getUrl: (idx) => entries[idx]?.cover?.imageUrl,
    });
    return cancel;
  }, [activeIndex, entries]);

  if (!activeEntry) return null;

  const railItems: SegmentedRailItem[] = entries.map((e) => ({
    id: e.id,
    title: e.title,
    meta: e.date?.slice(5, 10),
  }));

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={clsx(
        "relative rounded-2xl sm:rounded-3xl overflow-hidden h-full max-h-[820px] 2xl:max-h-[960px] bg-[#030406] border border-white/10 flex flex-col justify-between p-4 sm:p-8 lg:p-10 xl:p-12 shadow-2xl",
        className
      )}
    >
      {/* 大画幅摄影/视频背景：宽度 60%，横向消融 */}
      <div
        onClick={() => onOpenEntry?.(activeEntry)}
        className="absolute inset-y-0 left-0 w-full lg:w-[60%] overflow-hidden block cursor-pointer group"
      >
        <StageMediaSpine cover={activeEntry.cover} title={activeEntry.title} />
      </div>

      {/* 60% 渐变消融蒙版 */}
      <AmbientDissolveMask />

      {/* 顶层元信息栏 */}
      <div className="relative z-10 shrink-0 flex items-center justify-between text-xs sm:text-sm font-mono">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#E5192D] shadow-[0_0_8px_#E5192D]" />
          <span className="text-white font-bold tracking-wider uppercase">
            {activeEntry.category || "独立出版"}
          </span>
        </div>

        {activeEntry.date && (
          <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D]" />
            <span>{activeEntry.date}</span>
          </div>
        )}
      </div>

      {/* 核心内容区：右侧专属排版列 */}
      <div className="relative z-10 my-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center py-2 sm:py-4">
        {/* 左侧大图消融留白区 */}
        <div className="hidden lg:block lg:col-span-6" />

        {/* 右侧文字内容区 */}
        <div className="lg:col-span-6 pl-0 sm:pl-1 lg:pl-8 pr-0 sm:pr-8 py-1 sm:py-4 space-y-3 sm:space-y-5">
          <div className="space-y-1.5 sm:space-y-2.5">
            {activeEntry.date && (
              <div className="text-xs sm:text-sm font-mono text-[#E5192D] tracking-widest font-bold">
                {activeEntry.date} 出版
              </div>
            )}

            <div
              onClick={() => onOpenEntry?.(activeEntry)}
              className="cursor-pointer group block"
            >
              <h1 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight leading-snug group-hover:text-red-400 transition-colors line-clamp-2">
                {activeEntry.title}
              </h1>
            </div>

            {activeEntry.summary && (
              <p className="text-sm sm:text-base font-light text-zinc-300 leading-relaxed max-w-lg line-clamp-2 sm:line-clamp-3">
                {activeEntry.summary}
              </p>
            )}
          </div>

          {/* 标签列表 */}
          {activeEntry.tags && activeEntry.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {activeEntry.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}

          {/* 阅读刻度规与展卷按钮 */}
          <div className="flex items-center justify-between gap-3 pt-3 sm:pt-5 border-t border-white/10">
            <ReadingGauge minutes={activeEntry.readingMinutes || 5} />

            <Button
              variant="flare"
              glow
              withArrow
              onClick={() => onOpenEntry?.(activeEntry)}
            >
              {ctaText}
            </Button>
          </div>
        </div>
      </div>

      {/* 底层：导览名录标尺 */}
      <div className="relative z-10 shrink-0 pt-2.5 sm:pt-5 border-t border-white/10">
        <SegmentedRail
          items={railItems}
          activeIndex={activeIndex}
          onSelect={onChangeIndex}
        />
      </div>
    </section>
  );
};
