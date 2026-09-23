import React, { useRef } from "react";
import { clsx } from "clsx";
import { ArrowLeft, Flame } from "lucide-react";
import { StageMediaSpine, type StageMediaCover } from "../atmosphere/StageMediaSpine";
import { ReadingGauge } from "../primitives/ReadingGauge";
import { Tag } from "../primitives/Tag";
import { useSparxTheme } from "../tokens/colors";

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
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  const internalRef = useRef<HTMLDivElement>(null);
  const activeRef = canvasRef || internalRef;

  return (
    <div
      className={clsx(
        "w-full h-full grid grid-cols-1 lg:grid-cols-12 rounded-2xl sm:rounded-3xl overflow-hidden border transition-colors duration-200",
        isEmerald
          ? "bg-white border-slate-200 text-slate-900 shadow-xl"
          : "bg-[#030406] border-white/10 text-white shadow-2xl",
        className
      )}
    >
      {/* 左侧 35% 固定环境色脊柱 (Fixed Ambient Spine - 桌面端严禁滚动) */}
      <aside
        className={clsx(
          "relative lg:col-span-4 xl:col-span-4 border-b lg:border-b-0 lg:border-r p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-colors duration-200",
          isEmerald
            ? "border-slate-200 bg-slate-50 text-slate-900"
            : "border-white/10 bg-neutral-950 text-white"
        )}
      >
        {/* 背景媒体层与暗化/柔化渐变 */}
        <StageMediaSpine cover={cover} title={title} />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] pointer-events-none transition-all duration-300"
          style={{
            background: "var(--sparx-monograph-spine-gradient)",
          }}
        />

        {/* 顶部：返回操作与分类 */}
        <div className="relative z-10 space-y-4">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className={clsx(
                "inline-flex items-center gap-2 text-xs font-mono transition-colors cursor-pointer group",
                isEmerald
                  ? "text-slate-500 hover:text-slate-900"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>{backText}</span>
            </button>
          )}

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span
              className={clsx(
                "w-2 h-2 rounded-full",
                isEmerald
                  ? "bg-[#059669] shadow-[0_0_8px_#059669]"
                  : "bg-[#E5192D] shadow-[0_0_8px_#E5192D]"
              )}
            />
            <span
              className={clsx(
                "font-bold tracking-wider uppercase",
                isEmerald ? "text-slate-800" : "text-white"
              )}
            >
              {category}
            </span>
            {date && (
              <>
                <span className={isEmerald ? "text-slate-300" : "text-zinc-600"}>·</span>
                <span className={isEmerald ? "text-slate-500" : "text-zinc-400"}>
                  {date}
                </span>
              </>
            )}
            {typeof readingHeat === "number" && (
              <span
                className={clsx(
                  "ml-auto inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-xs sm:text-sm font-mono font-bold",
                  isEmerald
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-[#E5192D]/15 border-[#E5192D]/30 text-red-200"
                )}
              >
                <Flame
                  className={clsx(
                    "w-3.5 h-3.5",
                    isEmerald ? "text-[#059669]" : "text-[#E5192D]"
                  )}
                />
                <span>{readingHeat} 热度</span>
              </span>
            )}
          </div>

          <h1
            className={clsx(
              "text-2xl sm:text-3xl font-black tracking-tight leading-snug",
              isEmerald ? "text-slate-900" : "text-white"
            )}
          >
            {title}
          </h1>

          {summary && (
            <p
              className={clsx(
                "text-sm sm:text-base leading-relaxed line-clamp-4",
                isEmerald ? "text-slate-600" : "text-zinc-300"
              )}
            >
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
        <div
          className={clsx(
            "relative z-10 pt-6 border-t mt-6 space-y-4",
            isEmerald ? "border-slate-200" : "border-white/10"
          )}
        >
          <ReadingGauge minutes={readingMinutes} />
          {spineFooter}
        </div>
      </aside>

      {/* 右侧 65% 无界排版画布 (Scrollable Reading Canvas - 唯一正文滚动区域) */}
      <main
        ref={activeRef}
        onScroll={onScroll}
        className={clsx(
          "lg:col-span-8 xl:col-span-8 overflow-y-auto subtle-scroll p-6 sm:p-10 lg:p-14 xl:p-16 transition-colors duration-200",
          isEmerald
            ? "bg-white text-slate-800 selection:bg-[#059669] selection:text-white"
            : "bg-[#050505] text-white selection:bg-[#E5192D] selection:text-white"
        )}
      >
        <div className="max-w-3xl mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
};
