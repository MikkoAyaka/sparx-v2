import React, { useState } from "react";
import { clsx } from "clsx";
import { Check, Copy } from "lucide-react";
import { useSparxTheme } from "../tokens/colors";

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  status?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "bash",
  filename,
  status,
  showLineNumbers = false,
  className,
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";
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

  const lines = code.trim().split("\n");

  return (
    <div
      className={clsx(
        "rounded-2xl border overflow-hidden font-mono text-xs sm:text-sm select-text transition-colors duration-200",
        isEmerald
          ? "bg-slate-50 border-slate-200 text-slate-800 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          : "bg-[#08090E] border-white/10 text-zinc-300 shadow-xl",
        className
      )}
    >
      {/* 终端头部 */}
      <div
        className={clsx(
          "flex items-center justify-between px-4 py-2.5 border-b",
          isEmerald ? "border-slate-200 bg-white/70" : "border-white/10 bg-white/[0.02]"
        )}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          </div>
          {filename && (
            <span
              className={clsx(
                "font-mono text-xs ml-2",
                isEmerald ? "text-slate-600" : "text-zinc-400"
              )}
            >
              {filename}
            </span>
          )}
          {language && !filename && (
            <span
              className={clsx(
                "text-xs uppercase tracking-wider font-bold",
                isEmerald ? "text-[#059669]" : "text-[#E5192D]"
              )}
            >
              {language}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {status && (
            <span
              className={clsx(
                "text-xs hidden sm:inline-block font-mono",
                isEmerald ? "text-slate-500" : "text-zinc-500"
              )}
            >
              {status}
            </span>
          )}
          <button
            type="button"
            onClick={handleCopy}
            className={clsx(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all active:scale-95 cursor-pointer text-xs",
              isEmerald
                ? "bg-white hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900"
                : "bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300 hover:text-white"
            )}
            aria-label="复制代码"
          >
            {copied ? (
              <>
                <Check
                  className={clsx(
                    "w-3.5 h-3.5",
                    isEmerald ? "text-[#059669]" : "text-emerald-400"
                  )}
                />
                <span
                  className={clsx(
                    "font-bold",
                    isEmerald ? "text-[#059669]" : "text-emerald-400"
                  )}
                >
                  已复制
                </span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>复制</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 代码内容 */}
      <div
        className={clsx(
          "p-4 sm:p-5 overflow-x-auto subtle-scroll leading-relaxed",
          isEmerald ? "text-slate-800" : "text-zinc-300"
        )}
      >
        <pre className="flex">
          {showLineNumbers && (
            <div
              className={clsx(
                "select-none pr-4 text-right shrink-0",
                isEmerald ? "text-slate-400" : "text-zinc-600"
              )}
            >
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}
          <code className="flex-1">{code}</code>
        </pre>
      </div>
    </div>
  );
};
