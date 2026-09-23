import React, { useState } from "react";
import { clsx } from "clsx";
import { Code, Eye, Copy, Check } from "lucide-react";
import { useSparxTheme } from "@/sparx-ui";

export interface ComponentPreviewProps {
  title: string;
  description?: string;
  code: string;
  children: React.ReactNode;
  controls?: React.ReactNode;
  className?: string;
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  title,
  description,
  code,
  children,
  controls,
  className,
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div
      className={clsx(
        "rounded-2xl sm:rounded-3xl border overflow-hidden shadow-xl transition-all duration-200",
        isEmerald ? "bg-white border-slate-200" : "bg-[#030406] border-white/10",
        className
      )}
    >
      {/* 头部标题与视图切换 */}
      <div
        className={clsx(
          "flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b",
          isEmerald ? "border-slate-200 bg-slate-50/50" : "border-white/10 bg-white/[0.02]"
        )}
      >
        <div className="space-y-0.5">
          <h3
            className={clsx(
              "text-sm sm:text-base font-bold flex items-center gap-2",
              isEmerald ? "text-slate-900" : "text-white"
            )}
          >
            <span
              className={clsx(
                "w-1.5 h-1.5 rounded-full",
                isEmerald ? "bg-[#059669]" : "bg-[#E5192D]"
              )}
            />
            <span>{title}</span>
          </h3>
          {description && (
            <p
              className={clsx(
                "text-xs max-w-xl",
                isEmerald ? "text-slate-500" : "text-zinc-300"
              )}
            >
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Tab 切换 */}
          <div
            className={clsx(
              "flex items-center p-1 rounded-xl border text-xs font-mono",
              isEmerald ? "bg-slate-100 border-slate-200" : "bg-[#08090E] border-white/10"
            )}
          >
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={clsx(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium",
                activeTab === "preview"
                  ? isEmerald
                    ? "bg-[#059669] text-white shadow-[0_0_10px_rgba(16,185,129,0.35)]"
                    : "bg-[#E5192D] text-white shadow-[0_0_10px_rgba(229,25,45,0.4)]"
                  : isEmerald
                  ? "text-slate-600 hover:text-slate-900"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>预览</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("code")}
              className={clsx(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium",
                activeTab === "code"
                  ? isEmerald
                    ? "bg-[#059669] text-white shadow-[0_0_10px_rgba(16,185,129,0.35)]"
                    : "bg-[#E5192D] text-white shadow-[0_0_10px_rgba(229,25,45,0.4)]"
                  : isEmerald
                  ? "text-slate-600 hover:text-slate-900"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <Code className="w-3.5 h-3.5" />
              <span>代码</span>
            </button>
          </div>

          {activeTab === "code" && (
            <button
              type="button"
              onClick={handleCopy}
              className={clsx(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all active:scale-95 cursor-pointer",
                isEmerald
                  ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700"
                  : "bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300 hover:text-white"
              )}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-bold">已复制</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>复制</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* 控制项参数区 */}
      {controls && (
        <div
          className={clsx(
            "px-5 py-2.5 border-b flex flex-wrap items-center gap-4 text-xs font-mono",
            isEmerald
              ? "bg-slate-50 border-slate-200 text-slate-700"
              : "bg-[#08090E]/80 border-white/10 text-zinc-400"
          )}
        >
          <span className={isEmerald ? "text-slate-500 font-bold" : "text-zinc-500 font-bold"}>
            属性控制:
          </span>
          {controls}
        </div>
      )}

      {/* 主展示区 */}
      {activeTab === "preview" ? (
        <div
          className={clsx(
            "p-6 sm:p-10 flex items-center justify-center min-h-[160px] relative overflow-hidden",
            isEmerald
              ? "bg-gradient-to-b from-slate-50/80 to-white"
              : "bg-gradient-to-b from-[#020204]/60 to-[#030406]"
          )}
        >
          {children}
        </div>
      ) : (
        <div
          className={clsx(
            "p-5 overflow-x-auto subtle-scroll text-xs sm:text-sm font-mono leading-relaxed",
            isEmerald ? "bg-slate-50 text-slate-800" : "bg-[#050505] text-zinc-300"
          )}
        >
          <pre>
            <code>{code.trim()}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
