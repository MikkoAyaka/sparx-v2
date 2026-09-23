import React from "react";
import { clsx } from "clsx";
import { PillDock, type PillDockItem } from "../primitives/PillDock";

export interface ChannelShellProps {
  brandName?: string;
  brandSub?: string;
  brandTagline?: string;
  navItems: PillDockItem[];
  activeNavId: string;
  onNavChange: (id: string) => void;
  rightAction?: React.ReactNode;
  footerContent?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const ChannelShell: React.FC<ChannelShellProps> = ({
  brandName = "MIKKO AYAKA",
  brandSub = "CHANNEL",
  brandTagline = "独立思考 · 架构与出版 · 个人频段",
  navItems,
  activeNavId,
  onNavChange,
  rightAction,
  footerContent,
  children,
  className,
}) => {
  return (
    <div
      className={clsx(
        "h-[100dvh] w-full flex flex-col antialiased bg-[#020204] text-white overflow-hidden selection:bg-[#E5192D] selection:text-white",
        className
      )}
    >
      {/* 顶部全局导航栏 */}
      <header className="shrink-0 bg-[#020204]/95 backdrop-blur-xl border-b border-white/10 px-3 sm:px-6 py-2.5 shadow-2xl z-40">
        <div className="max-w-[96rem] 2xl:max-w-[110rem] mx-auto">
          {/* 桌面端：左品牌 · 中四主导航居中 · 右操作外链 */}
          <div className="hidden md:flex items-center justify-between gap-4 lg:gap-6">
            {/* 品牌标识 */}
            <div className="flex items-center gap-3 select-none shrink-0">
              <div className="w-8 h-8 rounded-lg bg-[#E5192D] flex items-center justify-center font-black text-white text-sm shadow-[0_0_16px_rgba(229,25,45,0.45)] hover:shadow-[0_0_22px_rgba(229,25,45,0.7)] transition-all">
                ✦
              </div>
              <div>
                <div className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                  <span>{brandName}</span>
                  <span className="text-zinc-600 font-normal">/</span>
                  <span className="text-zinc-400 font-mono text-xs">{brandSub}</span>
                </div>
                <div className="text-xs text-zinc-400">
                  {brandTagline}
                </div>
              </div>
            </div>

            {/* 居中导航槽 */}
            <PillDock
              items={navItems}
              activeId={activeNavId}
              onChange={onNavChange}
              size="md"
            />

            {/* 右侧外链/操作 */}
            <div className="shrink-0">
              {rightAction || (
                <div className="flex items-center bg-[#08090E] p-1.5 rounded-xl border border-white/10 text-xs font-mono">
                  <span className="px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer">
                    开放文档 ↗
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 移动端两层紧凑布局 */}
          <div className="flex flex-col gap-2 md:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 select-none">
                <div className="w-6 h-6 rounded-md bg-[#E5192D] flex items-center justify-center font-black text-white text-xs shadow-[0_0_10px_rgba(229,25,45,0.45)]">
                  ✦
                </div>
                <div className="text-xs font-bold tracking-tight text-white flex items-center gap-1">
                  <span>{brandName}</span>
                  <span className="text-zinc-600">/</span>
                  <span className="text-zinc-400 font-mono text-xs">{brandSub}</span>
                </div>
              </div>
              <div>{rightAction}</div>
            </div>

            {/* 移动端分段导轨 */}
            <div className="grid grid-cols-4 w-full gap-1 p-1 bg-[#08090E] rounded-xl border border-white/10 text-xs font-mono text-center select-none">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavChange(item.id)}
                  className={clsx(
                    "py-1.5 px-1 rounded-lg font-medium transition-all truncate text-xs cursor-pointer",
                    item.id === activeNavId
                      ? "bg-[#E5192D] text-white font-bold shadow-[0_0_10px_rgba(229,25,45,0.4)]"
                      : "text-zinc-400 hover:text-white"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* 主工作区：充满视口 */}
      <main className="flex-1 min-h-0 overflow-hidden max-w-[96rem] 2xl:max-w-[110rem] mx-auto w-full p-2 sm:p-4 lg:p-6 flex flex-col">
        {children}
      </main>

      {/* 底部微型注脚 */}
      <footer className="shrink-0 border-t border-white/[0.06] bg-[#020204]/90 px-3 sm:px-6 py-2 flex flex-wrap gap-2 items-center justify-between text-xs font-mono text-zinc-500 select-none z-30">
        <div>{footerContent || "由 MikkoAyaka 独立出版 · 影院暗房与主权排版"}</div>
        <div className="flex items-center gap-3 text-zinc-500">
          <span>SPARX-V2</span>
          <span>·</span>
          <span>100DVH 视口锁定</span>
        </div>
      </footer>
    </div>
  );
};
