import React, { useState } from "react";
import { clsx } from "clsx";
import { Code, Eye, Copy, Check } from "lucide-react";

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
        "rounded-2xl sm:rounded-3xl border border-white/10 bg-[#030406] overflow-hidden shadow-2xl transition-all",
        className
      )}
    >
      {/* 头部标题与视图切换 */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
        <div className="space-y-0.5">
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D]" />
            <span>{title}</span>
          </h3>
          {description && (
            <p className="text-xs text-zinc-400 font-light max-w-xl">
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Tab 切换 */}
          <div className="flex items-center bg-[#08090E] p-1 rounded-xl border border-white/10 text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={clsx(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium",
                activeTab === "preview"
                  ? "bg-[#E5192D] text-white shadow-[0_0_10px_rgba(229,25,45,0.4)]"
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
                  ? "bg-[#E5192D] text-white shadow-[0_0_10px_rgba(229,25,45,0.4)]"
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono transition-all active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">已复制</span>
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
        <div className="px-5 py-2.5 bg-[#08090E]/80 border-b border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
          <span className="text-zinc-500 font-bold">属性控制:</span>
          {controls}
        </div>
      )}

      {/* 主展示区 */}
      {activeTab === "preview" ? (
        <div className="p-6 sm:p-10 flex items-center justify-center min-h-[160px] bg-gradient-to-b from-[#020204]/60 to-[#030406] relative overflow-hidden">
          {children}
        </div>
      ) : (
        <div className="p-5 bg-[#050505] overflow-x-auto subtle-scroll text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed">
          <pre>
            <code>{code.trim()}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
