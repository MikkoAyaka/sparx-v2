import React, { useState } from "react";
import { clsx } from "clsx";
import { Check } from "lucide-react";
import { useSparxTheme } from "@/sparx-ui";

export interface TokenSwatchProps {
  name: string;
  value: string;
  description?: string;
  type?: "color" | "shadow" | "border" | "font";
  className?: string;
}

export const TokenSwatch: React.FC<TokenSwatchProps> = ({
  name,
  value,
  description,
  type = "color",
  className,
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback
    }
  };

  return (
    <div
      onClick={handleCopy}
      className={clsx(
        "group relative rounded-2xl border transition-colors duration-150 cursor-pointer p-4",
        isEmerald
          ? "bg-white border-slate-200 hover:opacity-85 hover:bg-slate-50/50 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          : "bg-[#08090E] border-white/10 hover:border-white/20 shadow-md",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="space-y-0.5">
          <div
            className={clsx(
              "text-xs font-mono font-bold transition-colors",
              isEmerald
                ? "text-slate-900 group-hover:text-emerald-700"
                : "text-white group-hover:text-red-400"
            )}
          >
            {name}
          </div>
          {description && (
            <div
              className={clsx(
                "text-[12px]",
                isEmerald ? "text-slate-500" : "text-zinc-300"
              )}
            >
              {description}
            </div>
          )}
        </div>

        <span
          className={clsx(
            "text-[12px] font-mono shrink-0",
            isEmerald ? "text-slate-400" : "text-zinc-500"
          )}
        >
          {copied ? (
            <span className="text-emerald-600 flex items-center gap-1 font-bold">
              <Check className="w-3 h-3" /> 已复制
            </span>
          ) : (
            "点击复制"
          )}
        </span>
      </div>

      {type === "color" && (
        <div className="flex items-center gap-3">
          <div
            className={clsx(
              "w-10 h-10 rounded-xl shrink-0 border",
              isEmerald ? "border-slate-300" : "border-white/15 shadow-sm"
            )}
            style={{ backgroundColor: value }}
          />
          <div
            className={clsx(
              "font-mono text-xs select-all",
              isEmerald ? "text-slate-700" : "text-zinc-300"
            )}
          >
            {value}
          </div>
        </div>
      )}

      {type === "shadow" && (
        <div className="space-y-2">
          <div
            className={clsx(
              "w-full h-8 rounded-lg flex items-center justify-center text-xs font-mono border",
              isEmerald
                ? "bg-slate-50 border-slate-200 text-slate-800"
                : "bg-neutral-900 border-white/10 text-white"
            )}
            style={{ boxShadow: value }}
          >
            Luminescence Glow
          </div>
          <div
            className={clsx(
              "font-mono text-[12px] truncate select-all",
              isEmerald ? "text-slate-500" : "text-zinc-400"
            )}
          >
            {value}
          </div>
        </div>
      )}

      {type === "font" && (
        <div className="space-y-1">
          <div
            className={clsx(
              "text-sm truncate",
              isEmerald ? "text-slate-800" : "text-zinc-200"
            )}
            style={{ fontFamily: value }}
          >
            The quick brown fox jumps over the lazy dog.
          </div>
          <div
            className={clsx(
              "font-mono text-[12px] select-all",
              isEmerald ? "text-slate-500" : "text-zinc-400"
            )}
          >
            {value}
          </div>
        </div>
      )}
    </div>
  );
};
