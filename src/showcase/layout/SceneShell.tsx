import React, { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { ArrowLeft, Check, ChevronDown } from "lucide-react";
import { SparxThemeScope } from "@/sparx-ui";
import { SCENES, THEME_LABELS, type RouteId, type SceneId } from "../routes";

interface SceneShellProps {
  scene: SceneId;
  onNavigate: (id: RouteId) => void;
  children: React.ReactNode;
}

/**
 * 全屏场景外框。场景锁定在自己的目标主题上（SparxThemeScope），不受全局主题切换影响；
 * 顶部只保留一条细的演示栏：返回、场景名、所属主题、切换场景。
 */
export const SceneShell: React.FC<SceneShellProps> = ({ scene, onNavigate, children }) => {
  const meta = SCENES.find((s) => s.id === scene)!;
  const isEmerald = meta.theme === "glacial-emerald";
  const themeLabel = THEME_LABELS[meta.theme];

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [menuOpen]);

  return (
    <SparxThemeScope
      theme={meta.theme}
      className={clsx(
        "h-[100dvh] w-full flex flex-col overflow-hidden",
        isEmerald
          ? "bg-[#F8FAFC] text-slate-900 selection:bg-[#059669] selection:text-white"
          : "bg-[#020204] text-white selection:bg-[#E5192D] selection:text-white"
      )}
    >
      <div
        className={clsx(
          "shrink-0 h-11 px-3 sm:px-4 flex items-center justify-between gap-3 border-b text-sm z-50",
          isEmerald ? "bg-slate-100 border-slate-200" : "bg-black border-white/10"
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => onNavigate("scenes")}
            className={clsx(
              "flex items-center gap-1.5 font-mono shrink-0 cursor-pointer transition-colors",
              isEmerald ? "text-slate-600 hover:text-slate-900" : "text-zinc-400 hover:text-white"
            )}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>返回场景列表</span>
          </button>
          <span className={isEmerald ? "text-slate-300" : "text-zinc-700"}>|</span>
          <span className={clsx("font-bold truncate", isEmerald ? "text-slate-900" : "text-white")}>
            {meta.title}
          </span>
          <span
            className={clsx(
              "hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border font-mono shrink-0",
              isEmerald
                ? "bg-white border-slate-200 text-emerald-700"
                : "bg-[#E5192D]/10 border-[#E5192D]/30 text-red-300"
            )}
          >
            {themeLabel.icon} {themeLabel.name} · {themeLabel.trait}
          </span>
        </div>

        <div ref={menuRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className={clsx(
              "flex items-center gap-1.5 px-3 py-1 rounded-lg border font-mono cursor-pointer transition-colors",
              isEmerald
                ? "bg-white border-slate-200 text-slate-700 hover:text-slate-900"
                : "bg-white/5 border-white/10 text-zinc-300 hover:text-white"
            )}
          >
            切换场景
            <ChevronDown className={clsx("w-3.5 h-3.5 transition-transform", menuOpen && "rotate-180")} />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className={clsx(
                "absolute right-0 top-full mt-2 w-64 rounded-xl border p-1.5 shadow-2xl",
                isEmerald ? "bg-white border-slate-200" : "bg-[#08090E] border-white/15"
              )}
            >
              {(["void-flare", "glacial-emerald"] as const).map((theme) => (
                <div key={theme} className="py-1">
                  <div
                    className={clsx(
                      "px-2.5 py-1 text-xs font-mono font-bold",
                      isEmerald ? "text-slate-400" : "text-zinc-500"
                    )}
                  >
                    {THEME_LABELS[theme].icon} {THEME_LABELS[theme].name}
                  </div>
                  {SCENES.filter((s) => s.theme === theme).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setMenuOpen(false);
                        onNavigate(s.id);
                      }}
                      className={clsx(
                        "w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left cursor-pointer transition-colors",
                        s.id === scene
                          ? isEmerald
                            ? "bg-emerald-50 text-emerald-800 font-bold"
                            : "bg-[#E5192D]/15 text-white font-bold"
                          : isEmerald
                          ? "text-slate-700 hover:bg-slate-100"
                          : "text-zinc-300 hover:bg-white/5"
                      )}
                    >
                      <span>{s.title}</span>
                      {s.id === scene && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 relative">{children}</div>
    </SparxThemeScope>
  );
};
