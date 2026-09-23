import React from "react";
import { PillDock, type PillDockItem, useSparxTheme } from "@/sparx-ui";
import {
  Compass,
  Sparkles,
  Layers,
  CloudRain,
  LayoutGrid,
  MonitorPlay,
  BookOpen,
  Terminal,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

export type ShowcaseNavId =
  | "overview"
  | "prompt"
  | "guardrails"
  | "primitives"
  | "atmosphere"
  | "patterns"
  | "stage-scene"
  | "monograph-scene"
  | "terminal-scene";

interface ShowcaseShellProps {
  activeNav: ShowcaseNavId;
  onNavChange: (id: ShowcaseNavId) => void;
  children: React.ReactNode;
}

export const ShowcaseShell: React.FC<ShowcaseShellProps> = ({
  activeNav,
  onNavChange,
  children,
}) => {
  const { themeId, setThemeId, isDark } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  const isSceneMode =
    activeNav === "stage-scene" ||
    activeNav === "monograph-scene" ||
    activeNav === "terminal-scene";

  const primaryNavItems: PillDockItem<ShowcaseNavId>[] = [
    { id: "overview", label: "概览", icon: <Compass className="w-3.5 h-3.5" /> },
    { id: "prompt", label: "Agent 提示词", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "guardrails", label: "规约指南", icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: "primitives", label: "基础原语", icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "atmosphere", label: "环境氛围", icon: <CloudRain className="w-3.5 h-3.5" /> },
    { id: "patterns", label: "复合模式", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
  ];

  const sceneNavItems: PillDockItem<ShowcaseNavId>[] = [
    { id: "stage-scene", label: "100dvh 主舞台", icon: <MonitorPlay className="w-3.5 h-3.5" /> },
    { id: "monograph-scene", label: "双轨展卷长文", icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: "terminal-scene", label: "开放终端", icon: <Terminal className="w-3.5 h-3.5" /> },
  ];

  // 风格切换器胶囊组件
  const StyleSwitcher = (
    <div
      className={`flex items-center p-0.5 sm:p-1 rounded-xl border text-xs font-mono select-none ${
        isEmerald ? "bg-slate-100 border-slate-200" : "bg-[#08090E] border-white/10"
      }`}
    >
      <button
        type="button"
        onClick={() => setThemeId("void-flare")}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer font-medium ${
          themeId === "void-flare"
            ? "bg-[#E5192D] text-white font-bold shadow-[0_0_10px_rgba(229,25,45,0.4)]"
            : isEmerald
            ? "text-slate-500 hover:text-slate-900"
            : "text-zinc-400 hover:text-white"
        }`}
        title="虚空绯红 · 个人/前卫/极客暗房"
      >
        <span>✦</span>
        <span className="hidden md:inline">虚空绯红</span>
      </button>
      <button
        type="button"
        onClick={() => setThemeId("glacial-emerald")}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer font-medium ${
          themeId === "glacial-emerald"
            ? "bg-[#059669] text-white font-bold shadow-[0_0_10px_rgba(16,185,129,0.35)]"
            : isEmerald
            ? "text-slate-500 hover:text-slate-900"
            : "text-zinc-400 hover:text-white"
        }`}
        title="皓白极翠 · 企业/稳态/生产高亮"
      >
        <span>◈</span>
        <span className="hidden md:inline">皓白极翠</span>
      </button>
    </div>
  );

  // 沉浸式全屏场景体验模式（100dvh 视口锁定，顶部悬浮轻量控制条）
  if (isSceneMode) {
    return (
      <div
        className={`h-[100dvh] w-full flex flex-col overflow-hidden transition-colors duration-200 ${
          isEmerald
            ? "bg-[#F8FAFC] text-slate-900 selection:bg-[#059669] selection:text-white"
            : "bg-[#020204] text-white selection:bg-[#E5192D] selection:text-white"
        }`}
      >
        {/* 顶部悬浮控制浮层 */}
        <header
          className={`shrink-0 px-3 sm:px-6 py-2 sm:py-2.5 z-50 flex items-center justify-between gap-4 border-b backdrop-blur-xl ${
            isEmerald
              ? "bg-white/90 border-slate-200"
              : "bg-[#020204]/95 border-white/10"
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavChange("overview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 shrink-0 ${
                isEmerald
                  ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800"
                  : "bg-white/10 hover:bg-white/15 border-white/15 text-white"
              }`}
            >
              ← 返回设计文档
            </button>
            <span
              className={`hidden sm:inline-block text-xs font-mono ${
                isEmerald ? "text-slate-300" : "text-zinc-600"
              }`}
            >
              |
            </span>
            <span
              className={`hidden md:inline-flex items-center gap-1.5 text-xs font-mono ${
                isEmerald ? "text-slate-500" : "text-zinc-400"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isEmerald ? "bg-[#059669]" : "bg-[#E5192D]"
                }`}
              />
              <span>全屏沉浸模式 · 支持滚轮阻尼漫游与键盘 ← / → 方向键</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* 风格切换器 */}
            {StyleSwitcher}

            {/* 场景切页 */}
            <div
              className={`flex items-center p-1 rounded-xl border text-xs font-mono ${
                isEmerald
                  ? "bg-slate-100 border-slate-200"
                  : "bg-[#08090E] border-white/10"
              }`}
            >
              {sceneNavItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavChange(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeNav === item.id
                      ? isEmerald
                        ? "bg-[#059669] text-white font-bold shadow-[0_0_10px_rgba(16,185,129,0.35)]"
                        : "bg-[#E5192D] text-white font-bold shadow-[0_0_10px_rgba(229,25,45,0.4)]"
                      : isEmerald
                      ? "text-slate-600 hover:text-slate-900"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* 沉浸式场景主体：充满视口，无外层双重滚动条 */}
        <main className="flex-1 min-h-0 overflow-hidden w-full max-w-[96rem] 2xl:max-w-[110rem] mx-auto p-2 sm:p-4 lg:p-6 flex flex-col">
          {children}
        </main>
      </div>
    );
  }

  // 常规设计规范与组件文档模式
  return (
    <div
      className={`min-h-[100dvh] w-full flex flex-col transition-colors duration-200 ${
        isEmerald
          ? "bg-[#F8FAFC] text-slate-900 selection:bg-[#059669] selection:text-white"
          : "bg-[#020204] text-white selection:bg-[#E5192D] selection:text-white"
      }`}
    >
      {/* 顶部全局导航栏 */}
      <header
        className={`sticky top-0 z-50 px-4 sm:px-8 py-3 border-b backdrop-blur-xl transition-colors duration-200 ${
          isEmerald
            ? "bg-white/90 border-slate-200 text-slate-900"
            : "bg-[#020204]/90 border-white/10 text-white"
        }`}
      >
        <div className="max-w-[96rem] 2xl:max-w-[110rem] mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* 左侧品牌 */}
          <div
            onClick={() => onNavChange("overview")}
            className="flex items-center gap-3 select-none cursor-pointer group shrink-0"
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm transition-all ${
                isEmerald
                  ? "bg-[#059669] shadow-[0_0_16px_rgba(16,185,129,0.35)] group-hover:shadow-[0_0_24px_rgba(16,185,129,0.55)]"
                  : "bg-[#E5192D] shadow-[0_0_16px_rgba(229,25,45,0.45)] group-hover:shadow-[0_0_24px_rgba(229,25,45,0.7)]"
              }`}
            >
              ✦
            </div>
            <div>
              <div
                className={`text-sm font-bold tracking-tight flex items-center gap-2 ${
                  isEmerald ? "text-slate-900" : "text-white"
                }`}
              >
                <span>SPARX UI</span>
                <span className={isEmerald ? "text-slate-400" : "text-zinc-600"}>/</span>
                <span
                  className={`font-mono text-xs font-bold ${
                    isEmerald ? "text-[#059669]" : "text-[#E5192D]"
                  }`}
                >
                  V2
                </span>
                <span
                  className={`text-[12px] px-2 py-0.5 rounded-full border font-mono ${
                    isEmerald
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : "bg-red-500/10 border-red-500/20 text-red-300"
                  }`}
                >
                  {isEmerald ? "皓白极翠 · 企业稳态" : "虚空绯红 · 极客前卫"}
                </span>
              </div>
              <div
                className={`text-[12px] ${
                  isEmerald ? "text-slate-500" : "text-zinc-400"
                }`}
              >
                通用设计体系与多风格实现框架
              </div>
            </div>
          </div>

          {/* 中间文档与原语主导航 */}
          <div className="hidden lg:flex items-center gap-3">
            <PillDock
              items={primaryNavItems}
              activeId={activeNav}
              onChange={(id) => onNavChange(id as ShowcaseNavId)}
              size="sm"
            />
          </div>

          {/* 右侧：风格切换器 + 沉浸式场景切换入口 */}
          <div className="flex items-center gap-3 shrink-0">
            {/* 多风格切换器 */}
            {StyleSwitcher}

            {/* 场景切页 */}
            <div
              className={`hidden sm:flex items-center p-1 rounded-xl border text-xs font-mono ${
                isEmerald
                  ? "bg-slate-100 border-slate-200 text-slate-600"
                  : "bg-[#08090E] border-white/10 text-zinc-400"
              }`}
            >
              <span
                className={`px-2 font-bold ${
                  isEmerald ? "text-slate-400" : "text-zinc-500"
                }`}
              >
                沉浸式:
              </span>
              {sceneNavItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavChange(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    isEmerald
                      ? "text-slate-600 hover:text-slate-900"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 移动端两行切换导轨 */}
        <div
          className={`lg:hidden mt-3 pt-2 border-t flex flex-col gap-2 ${
            isEmerald ? "border-slate-200" : "border-white/5"
          }`}
        >
          <div
            className={`grid grid-cols-3 sm:grid-cols-6 gap-1 p-1 rounded-xl border text-xs font-mono text-center ${
              isEmerald
                ? "bg-slate-100 border-slate-200"
                : "bg-[#08090E] border-white/10"
            }`}
          >
            {primaryNavItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavChange(item.id)}
                className={`py-1.5 px-1 rounded-lg font-medium transition-all truncate text-[12px] cursor-pointer ${
                  activeNav === item.id
                    ? isEmerald
                      ? "bg-[#059669] text-white font-bold"
                      : "bg-[#E5192D] text-white font-bold"
                    : isEmerald
                    ? "text-slate-600 hover:text-slate-900"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            className={`grid grid-cols-3 gap-1 p-1 rounded-xl border text-xs font-mono text-center sm:hidden ${
              isEmerald
                ? "bg-slate-100 border-slate-200"
                : "bg-[#08090E] border-white/10"
            }`}
          >
            {sceneNavItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavChange(item.id)}
                className={`py-1 px-1 rounded-lg font-medium transition-all truncate text-[12px] cursor-pointer ${
                  isEmerald
                    ? "text-slate-600 hover:text-slate-900"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 主展示区 */}
      <main className="flex-1 w-full p-4 sm:p-8 lg:p-10 flex flex-col">
        {children}
      </main>

      {/* 底部版权与元信息 */}
      <footer
        className={`border-t px-4 sm:px-8 py-3 flex flex-wrap gap-3 items-center justify-between text-xs font-mono select-none transition-colors duration-200 ${
          isEmerald
            ? "border-slate-200 bg-white/90 text-slate-500"
            : "border-white/[0.06] bg-[#020204]/90 text-zinc-500"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="font-bold">Sparx UI v2</span>
          <span>·</span>
          <span>设计公理框架与多风格实现（虚空绯红 / 皓白极翠）</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://channel.mikkoayaka.com"
            target="_blank"
            rel="noreferrer"
            className={`transition-colors flex items-center gap-1 ${
              isEmerald ? "hover:text-slate-800 text-slate-600" : "hover:text-zinc-300"
            }`}
          >
            <span>源频道在线 (Channel)</span>
            <ExternalLink
              className={`w-3 h-3 ${
                isEmerald ? "text-[#059669]" : "text-[#E5192D]"
              }`}
            />
          </a>
          <span className={isEmerald ? "text-slate-300" : "text-zinc-700"}>|</span>
          <span className={isEmerald ? "text-slate-600 font-medium" : "text-zinc-400"}>
            最小渲染字号 ≥ 12px · 全站杜绝衬线
          </span>
        </div>
      </footer>
    </div>
  );
};
