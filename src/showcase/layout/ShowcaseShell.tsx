import React from "react";
import { PillDock, type PillDockItem } from "@/sparx-ui";
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

  // 沉浸式全屏场景体验模式（参考 sparx-v1 交互结构：纯粹 100dvh 视口锁定，顶部悬浮轻量控制条）
  if (isSceneMode) {
    return (
      <div className="h-[100dvh] w-full flex flex-col bg-[#020204] text-white overflow-hidden selection:bg-[#E5192D] selection:text-white">
        {/* 顶部悬浮控制浮层 */}
        <header className="shrink-0 bg-[#020204]/95 backdrop-blur-xl border-b border-white/10 px-3 sm:px-6 py-2 sm:py-2.5 z-50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavChange("overview")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 shrink-0"
            >
              ← 返回设计文档
            </button>
            <span className="hidden sm:inline-block text-xs font-mono text-zinc-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D]" />
              <span>全屏沉浸模式 · 支持滚轮阻尼漫游与键盘 ← / → 方向键</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#08090E] p-1 rounded-xl border border-white/10 text-xs font-mono">
              {sceneNavItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavChange(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeNav === item.id
                      ? "bg-[#E5192D] text-white font-bold shadow-[0_0_10px_rgba(229,25,45,0.4)]"
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
    <div className="min-h-[100dvh] w-full flex flex-col bg-[#020204] text-white selection:bg-[#E5192D] selection:text-white">
      {/* 顶部全局导航栏 */}
      <header className="sticky top-0 z-50 bg-[#020204]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3">
        <div className="max-w-[96rem] 2xl:max-w-[110rem] mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* 左侧品牌 */}
          <div
            onClick={() => onNavChange("overview")}
            className="flex items-center gap-3 select-none cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-[#E5192D] flex items-center justify-center font-black text-white text-sm shadow-[0_0_16px_rgba(229,25,45,0.45)] group-hover:shadow-[0_0_24px_rgba(229,25,45,0.7)] transition-all">
              ✦
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                <span>SPARX UI</span>
                <span className="text-zinc-600 font-normal">/</span>
                <span className="text-[#E5192D] font-mono text-xs font-bold">V2</span>
              </div>
              <div className="text-[12px] text-zinc-400">
                Channel 视觉规范与通用设计系统
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

          {/* 右侧沉浸式场景切换入口 */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center bg-[#08090E] p-1 rounded-xl border border-white/10 text-xs font-mono">
              <span className="px-2 text-zinc-500 font-bold">沉浸式场景:</span>
              {sceneNavItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavChange(item.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-zinc-400 hover:text-white transition-all cursor-pointer"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 移动端两行切换导轨 */}
        <div className="lg:hidden mt-3 pt-2 border-t border-white/5 flex flex-col gap-2">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 p-1 bg-[#08090E] rounded-xl border border-white/10 text-xs font-mono text-center">
            {primaryNavItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavChange(item.id)}
                className={`py-1.5 px-1 rounded-lg font-medium transition-all truncate text-[12px] cursor-pointer ${
                  activeNav === item.id
                    ? "bg-[#E5192D] text-white font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-1 p-1 bg-[#08090E] rounded-xl border border-white/10 text-xs font-mono text-center sm:hidden">
            {sceneNavItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavChange(item.id)}
                className="py-1 px-1 rounded-lg font-medium transition-all truncate text-[12px] text-zinc-400 hover:text-white cursor-pointer"
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
      <footer className="border-t border-white/[0.06] bg-[#020204]/90 px-4 sm:px-8 py-3 flex flex-wrap gap-3 items-center justify-between text-xs font-mono text-zinc-500 select-none">
        <div className="flex items-center gap-2">
          <span>Sparx UI v2</span>
          <span>·</span>
          <span>基于 Mikko Ayaka 个人频道美学体系</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://channel.mikkoayaka.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-300 transition-colors flex items-center gap-1"
          >
            <span>源频道在线 (Channel)</span>
            <ExternalLink className="w-3 h-3 text-[#E5192D]" />
          </a>
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-400">最小渲染字号 ≥ 12px · 全站杜绝衬线</span>
        </div>
      </footer>
    </div>
  );
};
