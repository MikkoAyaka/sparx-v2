import React from "react";
import { clsx } from "clsx";
import { ArrowLeft, ArrowRight, BookOpen, Compass, ExternalLink, Layers, MonitorPlay } from "lucide-react";
import { PillDock, type PillDockItem, useSparxTheme, type SparxStyleTheme } from "@/sparx-ui";
import {
  SECTIONS,
  SCENES,
  THEME_LABELS,
  neighbors,
  sectionOf,
  type PageId,
  type RouteId,
  type SectionId,
} from "../routes";

interface DocsShellProps {
  route: PageId;
  onNavigate: (id: RouteId) => void;
  children: React.ReactNode;
}

const SECTION_ICONS: Record<SectionId, React.ReactNode> = {
  start: <Compass className="w-3.5 h-3.5" />,
  foundations: <BookOpen className="w-3.5 h-3.5" />,
  components: <Layers className="w-3.5 h-3.5" />,
  scenes: <MonitorPlay className="w-3.5 h-3.5" />,
};

/** 主题切换器：宽屏显示名称，窄屏只显示图标，保证顶栏始终单行 */
export const ThemeSwitcher: React.FC = () => {
  const { themeId, setThemeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  const select = (id: SparxStyleTheme) => {
    setThemeId(id);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("theme", id);
      window.history.replaceState(null, "", url.toString());
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="主题"
      className={clsx(
        "flex items-center p-1 rounded-xl border text-sm font-mono select-none shrink-0",
        isEmerald ? "bg-slate-100 border-slate-200" : "bg-[#08090E] border-white/10"
      )}
    >
      {(["void-flare", "glacial-emerald"] as SparxStyleTheme[]).map((id) => {
        const active = themeId === id;
        const meta = THEME_LABELS[id];
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => select(id)}
            title={`${meta.name} · ${meta.trait}`}
            className={clsx(
              "flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-medium",
              active
                ? id === "void-flare"
                  ? "bg-[#E5192D] text-white font-bold shadow-[0_0_10px_rgba(229,25,45,0.4)]"
                  : "bg-[#059669] text-white font-bold"
                : isEmerald
                ? "text-slate-500 hover:text-slate-900"
                : "text-zinc-400 hover:text-white"
            )}
          >
            <span className="font-bold">{meta.icon}</span>
            <span className="hidden xl:inline">{meta.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export const DocsShell: React.FC<DocsShellProps> = ({ route, onNavigate, children }) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";
  const section = sectionOf(route);
  const { prev, next } = neighbors(route);

  const sectionItems: PillDockItem<SectionId>[] = SECTIONS.map((s) => ({
    id: s.id,
    label: s.label,
    icon: SECTION_ICONS[s.id],
  }));

  // 同一部分内的页面按 group 分组展示在侧栏
  const groups: { name?: string; pages: typeof section.pages }[] = [];
  section.pages.forEach((p) => {
    const last = groups[groups.length - 1];
    if (last && last.name === p.group) last.pages.push(p);
    else groups.push({ name: p.group, pages: [p] });
  });

  const sidebarItemClass = (active: boolean) =>
    clsx(
      "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors cursor-pointer",
      active
        ? isEmerald
          ? "bg-emerald-50 text-emerald-800 font-bold"
          : "bg-[#E5192D]/12 text-white font-bold"
        : isEmerald
        ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
        : "text-zinc-400 hover:text-white hover:bg-white/5"
    );

  return (
    <div
      className={clsx(
        "min-h-[100dvh] w-full flex flex-col transition-colors duration-200",
        isEmerald
          ? "bg-[#F8FAFC] text-slate-900 selection:bg-[#059669] selection:text-white"
          : "bg-[#020204] text-white selection:bg-[#E5192D] selection:text-white"
      )}
    >
      {/* 顶栏：品牌 · 四个部分 · 主题切换，始终单行 */}
      <header
        className={clsx(
          "sticky top-0 z-50 border-b backdrop-blur-xl shrink-0",
          isEmerald
            ? "bg-white/95 border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
            : "bg-[#020204]/95 border-white/10"
        )}
      >
        <div className="max-w-[96rem] mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4 flex-nowrap">
          <button
            type="button"
            onClick={() => onNavigate("overview")}
            className="flex items-center gap-2 sm:gap-2.5 select-none cursor-pointer shrink-0"
            aria-label="Sparx UI 首页"
          >
            <span
              className={clsx(
                "w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-black text-white text-sm",
                isEmerald ? "bg-[#059669]" : "bg-[#E5192D] shadow-[0_0_10px_rgba(229,25,45,0.35)]"
              )}
            >
              {isEmerald ? "◈" : "✦"}
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-sm font-bold tracking-tight">
              <span>SPARX UI</span>
              <span className={clsx("font-mono", isEmerald ? "text-[#059669]" : "text-[#E5192D]")}>V2</span>
            </span>
          </button>

          <div className="flex-1 min-w-0 flex justify-start md:justify-center overflow-x-auto no-scrollbar">
            <PillDock
              items={sectionItems}
              activeId={section.id}
              onChange={(id) => {
                const target = SECTIONS.find((s) => s.id === id);
                if (target) onNavigate(target.pages[0].id);
              }}
              size="sm"
            />
          </div>

          <ThemeSwitcher />
        </div>
      </header>

      <div className="flex-1 w-full max-w-[96rem] mx-auto flex">
        {/* 侧栏：当前部分的页面列表（桌面端） */}
        <aside
          className={clsx(
            "hidden lg:block w-60 shrink-0 border-r sticky top-16 self-start h-[calc(100dvh-4rem)] overflow-y-auto subtle-scroll px-4 py-8",
            isEmerald ? "border-slate-200" : "border-white/[0.06]"
          )}
        >
          <div className="space-y-1 mb-6 px-3">
            <div className={clsx("text-sm font-bold", isEmerald ? "text-slate-900" : "text-white")}>
              {section.label}
            </div>
            <p className={clsx("text-sm leading-relaxed", isEmerald ? "text-slate-500" : "text-zinc-500")}>
              {section.description}
            </p>
          </div>

          <nav className="space-y-5" aria-label={section.label}>
            {groups.map((g, gi) => (
              <div key={gi} className="space-y-1">
                {g.name && (
                  <div
                    className={clsx(
                      "px-3 pb-1 text-xs font-mono font-bold uppercase tracking-wider",
                      isEmerald ? "text-slate-400" : "text-zinc-600"
                    )}
                  >
                    {g.name}
                  </div>
                )}
                {g.pages.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onNavigate(p.id)}
                    aria-current={route === p.id ? "page" : undefined}
                    className={sidebarItemClass(route === p.id)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            ))}

            {section.id === "scenes" &&
              (["void-flare", "glacial-emerald"] as SparxStyleTheme[]).map((theme) => (
                <div key={theme} className="space-y-1">
                  <div
                    className={clsx(
                      "px-3 pb-1 text-xs font-mono font-bold uppercase tracking-wider",
                      isEmerald ? "text-slate-400" : "text-zinc-600"
                    )}
                  >
                    {THEME_LABELS[theme].icon} {THEME_LABELS[theme].name}
                  </div>
                  {SCENES.filter((s) => s.theme === theme).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => onNavigate(s.id)}
                      className={clsx(sidebarItemClass(false), "justify-between group")}
                    >
                      <span>{s.title}</span>
                      <MonitorPlay className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
                    </button>
                  ))}
                </div>
              ))}
          </nav>
        </aside>

        <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-6 sm:py-10">
          {/* 窄屏：当前部分的页面以横向标签显示 */}
          <nav
            className="lg:hidden -mx-4 sm:-mx-8 px-4 sm:px-8 mb-6 flex gap-2 overflow-x-auto no-scrollbar"
            aria-label={section.label}
          >
            {section.pages.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onNavigate(p.id)}
                aria-current={route === p.id ? "page" : undefined}
                className={clsx(
                  "shrink-0 px-3.5 py-1.5 rounded-full border text-sm whitespace-nowrap cursor-pointer transition-colors",
                  route === p.id
                    ? isEmerald
                      ? "bg-[#059669] border-[#059669] text-white font-bold"
                      : "bg-[#E5192D] border-[#E5192D] text-white font-bold"
                    : isEmerald
                    ? "bg-white border-slate-200 text-slate-600"
                    : "bg-white/5 border-white/10 text-zinc-400"
                )}
              >
                {p.label}
              </button>
            ))}
          </nav>

          <div className="w-full max-w-5xl mx-auto">
            {children}

            {(prev || next) && (
              <nav
                className={clsx(
                  "mt-16 pt-6 border-t grid grid-cols-2 gap-4",
                  isEmerald ? "border-slate-200" : "border-white/10"
                )}
                aria-label="翻页"
              >
                <div>
                  {prev && (
                    <button
                      type="button"
                      onClick={() => onNavigate(prev.id)}
                      className={clsx(
                        "group text-left space-y-1 cursor-pointer",
                        isEmerald ? "text-slate-500 hover:text-slate-900" : "text-zinc-500 hover:text-white"
                      )}
                    >
                      <span className="flex items-center gap-1.5 text-sm font-mono">
                        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                        上一页
                      </span>
                      <span className={clsx("block text-base font-bold", isEmerald ? "text-slate-900" : "text-white")}>
                        {prev.label}
                      </span>
                    </button>
                  )}
                </div>
                <div className="flex justify-end">
                  {next && (
                    <button
                      type="button"
                      onClick={() => onNavigate(next.id)}
                      className={clsx(
                        "group text-right space-y-1 cursor-pointer",
                        isEmerald ? "text-slate-500 hover:text-slate-900" : "text-zinc-500 hover:text-white"
                      )}
                    >
                      <span className="flex items-center justify-end gap-1.5 text-sm font-mono">
                        下一页
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                      <span className={clsx("block text-base font-bold", isEmerald ? "text-slate-900" : "text-white")}>
                        {next.label}
                      </span>
                    </button>
                  )}
                </div>
              </nav>
            )}
          </div>
        </main>
      </div>

      <footer
        className={clsx(
          "border-t px-4 sm:px-8 py-3 flex flex-wrap gap-3 items-center justify-between text-sm font-mono",
          isEmerald ? "border-slate-200 bg-white text-slate-500" : "border-white/[0.06] bg-[#020204] text-zinc-500"
        )}
      >
        <span>
          <span className="font-bold">Sparx UI v2</span> · 一套设计规范，两种主题
        </span>
        <a
          href="https://channel.mikkoayaka.com"
          target="_blank"
          rel="noreferrer"
          className={clsx(
            "flex items-center gap-1 transition-colors",
            isEmerald ? "text-slate-600 hover:text-slate-900" : "hover:text-zinc-300"
          )}
        >
          访问 Channel 原站
          <ExternalLink className={clsx("w-3.5 h-3.5", isEmerald ? "text-[#059669]" : "text-[#E5192D]")} />
        </a>
      </footer>
    </div>
  );
};
