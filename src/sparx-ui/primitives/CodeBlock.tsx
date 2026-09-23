import React, { useState } from "react";
import { clsx } from "clsx";
import { Check, Copy } from "lucide-react";

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
        "rounded-2xl border border-white/10 bg-[#08090E] overflow-hidden shadow-2xl font-mono text-xs sm:text-sm select-text",
        className
      )}
    >
      {/* 终端头部 */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          {filename && <span className="text-zinc-400 font-mono text-xs ml-2">{filename}</span>}
          {language && !filename && (
            <span className="text-xs uppercase tracking-wider text-[#E5192D] font-bold">
              {language}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {status && (
            <span className="text-xs text-zinc-500 hidden sm:inline-block">
              {status}
            </span>
          )}
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all active:scale-95 cursor-pointer text-xs"
            aria-label="复制代码"
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
        </div>
      </div>

      {/* 代码内容 */}
      <div className="p-4 sm:p-5 overflow-x-auto subtle-scroll leading-relaxed text-zinc-300">
        <pre className="flex">
          {showLineNumbers && (
            <div className="select-none pr-4 text-zinc-600 text-right shrink-0">
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
