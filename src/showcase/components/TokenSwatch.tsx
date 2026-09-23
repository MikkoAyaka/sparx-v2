import React, { useState } from "react";
import { clsx } from "clsx";
import { Check } from "lucide-react";

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
        "group relative rounded-2xl border border-white/10 bg-[#08090E] p-4 transition-all duration-200 hover:border-white/20 hover:scale-[1.02] cursor-pointer shadow-lg",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="space-y-0.5">
          <div className="text-xs font-mono font-bold text-white group-hover:text-red-400 transition-colors">
            {name}
          </div>
          {description && (
            <div className="text-[12px] text-zinc-300">{description}</div>
          )}
        </div>

        <span className="text-[12px] font-mono text-zinc-500 shrink-0">
          {copied ? (
            <span className="text-emerald-400 flex items-center gap-1 font-bold">
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
            className="w-10 h-10 rounded-xl border border-white/15 shrink-0 shadow-md"
            style={{ backgroundColor: value }}
          />
          <div className="font-mono text-xs text-zinc-300 select-all">{value}</div>
        </div>
      )}

      {type === "shadow" && (
        <div className="space-y-2">
          <div
            className="w-full h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-xs font-mono text-white"
            style={{ boxShadow: value }}
          >
            Luminescence Glow
          </div>
          <div className="font-mono text-[12px] text-zinc-400 truncate select-all">{value}</div>
        </div>
      )}

      {type === "font" && (
        <div className="space-y-1">
          <div className="text-sm text-zinc-200 truncate" style={{ fontFamily: value }}>
            The quick brown fox jumps over the lazy dog.
          </div>
          <div className="font-mono text-[12px] text-zinc-400 select-all">{value}</div>
        </div>
      )}
    </div>
  );
};
