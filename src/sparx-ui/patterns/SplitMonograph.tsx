import React from "react";
import { clsx } from "clsx";
import { ArrowLeft } from "lucide-react";
import { StageMediaSpine, type StageMediaCover } from "../atmosphere/StageMediaSpine";
import { ReadingGauge } from "../primitives/ReadingGauge";
import { useSparxTheme } from "../tokens/colors";

export interface MonographSection {
  id: string;
  title: string;
}

export interface SplitMonographProps {
  title: string;
  summary?: string;
  date?: string;
  category?: string;
  readingMinutes?: number;
  cover?: StageMediaCover;
  /** 目录；与正文中各段落的 id 对应 */
  sections?: MonographSection[];
  activeSectionId?: string;
  onSectionSelect?: (id: string) => void;
  /** 阅读进度 0 ~ 1 */
  progress?: number;
  onBack?: () => void;
  backText?: string;
  spineFooter?: React.ReactNode;
  canvasRef?: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * SplitMonograph：双栏长文。左侧 35% 固定（桌面端不滚动），显示封面、目录和阅读进度；
 * 右侧 65% 是正文，也是页面上唯一的滚动区域。配合 useActiveSection 让左栏跟随阅读位置。
 * 推荐主题：虚空绯红。
 */
export const SplitMonograph: React.FC<SplitMonographProps> = ({
  title,
  summary,
  date,
  category = "文章",
  readingMinutes = 5,
  cover,
  sections = [],
  activeSectionId,
  onSectionSelect,
  progress = 0,
  onBack,
  backText = "返回首页",
  spineFooter,
  canvasRef,
  children,
  className,
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";
  const percent = Math.round(progress * 100);

  return (
    <div
      className={clsx(
        "w-full h-full flex flex-col lg:flex-row overflow-hidden",
        isEmerald ? "bg-white text-slate-900" : "bg-[#030406] text-white",
        className
      )}
    >
      {/* 左栏 */}
      <aside
        className={clsx(
          "relative shrink-0 lg:w-[35%] lg:max-w-xl border-b lg:border-b-0 lg:border-r overflow-hidden flex flex-col",
          isEmerald ? "border-slate-200 bg-slate-50" : "border-white/10 bg-[#020204]"
        )}
      >
        <StageMediaSpine cover={cover} title={title} />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{ background: "var(--sparx-monograph-spine-gradient)" }}
        />

        <div className="relative z-10 flex-1 min-h-0 flex flex-col p-5 sm:p-8 lg:p-10 gap-6">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className={clsx(
                "self-start inline-flex items-center gap-2 text-sm font-mono cursor-pointer group transition-colors",
                isEmerald ? "text-slate-500 hover:text-slate-900" : "text-zinc-400 hover:text-white"
              )}
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              {backText}
            </button>
          )}

          <div className="space-y-4 lg:mt-auto">
            <div className="flex flex-wrap items-center gap-x-3 font-mono text-sm">
              <span className={clsx("font-bold uppercase tracking-wider", isEmerald ? "text-[#059669]" : "text-[#E5192D]")}>
                {category}
              </span>
              {date && (
                <>
                  <span className={isEmerald ? "text-slate-300" : "text-zinc-700"}>/</span>
                  <time className={isEmerald ? "text-slate-500" : "text-zinc-400"}>{date}</time>
                </>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-black tracking-tight leading-[1.15]">{title}</h1>
            {summary && (
              <p className={clsx("hidden sm:block text-sm leading-relaxed line-clamp-4", isEmerald ? "text-slate-600" : "text-zinc-400")}>
                {summary}
              </p>
            )}
          </div>

          {sections.length > 0 && (
            <nav aria-label="目录" className="hidden lg:block space-y-0.5">
              {sections.map((s, i) => {
                const active = s.id === activeSectionId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onSectionSelect?.(s.id)}
                    aria-current={active ? "location" : undefined}
                    className={clsx(
                      "w-full flex items-baseline gap-3 py-1.5 pl-3 border-l-2 text-left text-sm transition-colors cursor-pointer",
                      active
                        ? isEmerald
                          ? "border-[#059669] text-slate-900 font-semibold"
                          : "border-[#E5192D] text-white font-semibold"
                        : isEmerald
                        ? "border-slate-200 text-slate-500 hover:text-slate-900"
                        : "border-white/10 text-zinc-500 hover:text-zinc-200"
                    )}
                  >
                    <span
                      className={clsx(
                        "font-mono shrink-0",
                        active ? (isEmerald ? "text-[#059669]" : "text-[#E5192D]") : undefined
                      )}
                    >
                      {pad(i + 1)}
                    </span>
                    <span className="truncate">{s.title}</span>
                  </button>
                );
              })}
            </nav>
          )}

          <div
            className={clsx(
              "hidden lg:flex items-center justify-between gap-4 pt-5 border-t",
              isEmerald ? "border-slate-200" : "border-white/10"
            )}
          >
            <ReadingGauge minutes={readingMinutes} />
            <div className="text-right font-mono text-sm">
              <div className={isEmerald ? "text-slate-500" : "text-zinc-500"}>已读</div>
              <div className="font-bold">{percent}%</div>
            </div>
          </div>
          {spineFooter}
        </div>

        {/* 阅读进度条：贴在左栏底边（窄屏贴在顶部区域底边） */}
        <div className={clsx("relative z-10 h-[3px] w-full", isEmerald ? "bg-slate-200" : "bg-white/10")}>
          <div
            className={clsx(
              "h-full transition-[width] duration-150",
              isEmerald ? "bg-[#059669]" : "bg-[#E5192D] shadow-[0_0_8px_#E5192D]"
            )}
            style={{ width: `${percent}%` }}
          />
        </div>
      </aside>

      {/* 右栏：唯一的滚动区域 */}
      <div
        ref={canvasRef}
        className={clsx(
          "flex-1 min-h-0 overflow-y-auto subtle-scroll",
          isEmerald ? "bg-white selection:bg-[#059669] selection:text-white" : "bg-[#050505] selection:bg-[#E5192D] selection:text-white"
        )}
      >
        <article className="max-w-2xl mx-auto px-5 sm:px-10 py-10 sm:py-16 lg:py-20">{children}</article>
      </div>
    </div>
  );
};
