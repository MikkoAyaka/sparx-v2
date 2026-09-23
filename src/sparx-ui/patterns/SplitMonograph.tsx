import React, { useRef } from "react";
import { clsx } from "clsx";
import { ArrowLeft, Clock, BookOpen, Flame } from "lucide-react";
import { StageMediaSpine, type StageMediaCover } from "../atmosphere/StageMediaSpine";
import { ReadingGauge } from "../primitives/ReadingGauge";
import { Tag } from "../primitives/Tag";

export interface SplitMonographProps {
  title: string;
  summary?: string;
  date?: string;
  category?: string;
  readingMinutes?: number;
  readingHeat?: number;
  tags?: string[];
  cover?: StageMediaCover;
  onBack?: () => void;
  backText?: string;
  children: React.ReactNode;
  spineFooter?: React.ReactNode;
  onScroll?: React.UIEventHandler<HTMLDivElement>;
  canvasRef?: React.Ref<HTMLDivElement>;
  className?: string;
}

export const SplitMonograph: React.FC<SplitMonographProps> = ({
  title,
  summary,
  date,
  category = "独立出版",
  readingMinutes = 5,
  readingHeat,
  tags = [],
  cover,
  onBack,
  backText = "返回舞台",
  children,
  spineFooter,
  onScroll,
  canvasRef,
  className,
}) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const activeRef = canvasRef || internalRef;

  return (
    <div
      className={clsx(
        "w-full h-full grid grid-cols-1 lg:grid-cols-12 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#030406] shadow-2xl",
        className
      )}
    >
      {/* 左侧 35% 固定环境色脊柱 (Fixed Ambient Spine - 桌面端严禁滚动) */}
      <aside className="relative lg:col-span-4 xl:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-hidden bg-neutral-950">
        {/* 背景媒体层与暗化渐变 */}
        <StageMediaSpine cover={cover} title={title} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-[#020204]/90 to-[#020204]/75 z-[2] pointer-events-none" />

        {/* 顶部：返回操作与分类 */}
        <div className="relative z-10 space-y-4">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>{backText}</span>
            </button>
          )}

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#E5192D] shadow-[0_0_8px_#E5192D]" />
            <span className="text-white font-bold tracking-wider uppercase">{category}</span>
            {date && (
              <>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-400">{date}</span>
              </>
            )}
            {typeof readingHeat === "number" && (
              <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E5192D]/15 border border-[#E5192D]/30 text-red-200 text-xs sm:text-sm font-mono font-bold">
                <Flame className="w-3.5 h-3.5 text-[#E5192D]" />
                <span>{readingHeat} 热度</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
            {title}
          </h1>

          {summary && (
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light line-clamp-4">
              {summary}
            </p>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          )}
        </div>

        {/* 底部：阅读规与附加信息 */}
        <div className="relative z-10 pt-6 border-t border-white/10 mt-6 space-y-4">
          <ReadingGauge minutes={readingMinutes} />
          {spineFooter}
        </div>
      </aside>

      {/* 右侧 65% 无界排版画布 (Scrollable Reading Canvas - 唯一正文滚动区域) */}
      <main
        ref={activeRef}
        onScroll={onScroll}
        className="lg:col-span-8 xl:col-span-8 overflow-y-auto subtle-scroll bg-[#050505] p-6 sm:p-10 lg:p-14 xl:p-16 selection:bg-[#E5192D] selection:text-white"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
};
