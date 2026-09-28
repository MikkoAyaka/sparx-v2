import React, { useState } from "react";
import { clsx } from "clsx";
import { Check } from "lucide-react";
import { useSparxTheme } from "../tokens/colors";

export interface FeedbackOption {
  id: string;
  label: string;
  emoji?: string;
  count: number;
}

export interface FeedbackDockProps {
  options: FeedbackOption[];
  onSelectReaction?: (id: string) => void;
  title?: string;
  /** 选择后显示的确认文字 */
  statusText?: string;
  /** 是否显示每个选项的计数 */
  showCounts?: boolean;
  className?: string;
}

/**
 * FeedbackDock：文末的读者反馈。读者点一个最接近自己感受的选项，计数立即加一（乐观更新），
 * 再次点另一个选项会改选。不需要登录，也不需要评论框。两种主题通用。
 */
export const FeedbackDock: React.FC<FeedbackDockProps> = ({
  options: initialOptions,
  onSelectReaction,
  title = "你觉得这篇文章怎么样？",
  statusText = "已记录，谢谢你的反馈",
  showCounts = true,
  className,
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [options, setOptions] = useState<FeedbackOption[]>(initialOptions);

  const choose = (id: string) => {
    if (selectedId === id) return;
    setOptions((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, count: o.count + 1 } : o.id === selectedId ? { ...o, count: Math.max(0, o.count - 1) } : o
      )
    );
    setSelectedId(id);
    onSelectReaction?.(id);
  };

  return (
    <section
      aria-label={title}
      className={clsx(
        "rounded-2xl border p-5 sm:p-6 space-y-4",
        isEmerald ? "bg-slate-50 border-slate-200" : "bg-white/[0.02] border-white/10",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className={clsx("text-base font-bold", isEmerald ? "text-slate-900" : "text-white")}>{title}</h3>
        <p
          role="status"
          className={clsx(
            "flex items-center gap-1.5 text-sm transition-opacity",
            selectedId ? "opacity-100" : "opacity-0",
            isEmerald ? "text-[#059669]" : "text-emerald-400"
          )}
        >
          <Check className="w-4 h-4" />
          {statusText}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
        {options.map((o) => {
          const selected = o.id === selectedId;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={selected}
              onClick={() => choose(o.id)}
              className={clsx(
                "flex items-center justify-center sm:justify-start gap-2 px-4 py-2 rounded-xl border text-sm transition-colors cursor-pointer",
                selected
                  ? isEmerald
                    ? "border-[#059669] bg-white text-emerald-800 font-semibold ring-1 ring-[#059669]"
                    : "border-[#E5192D] bg-[#E5192D]/15 text-white font-semibold shadow-[0_0_14px_rgba(229,25,45,0.35)]"
                  : isEmerald
                  ? "border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300"
                  : "border-white/10 bg-transparent text-zinc-400 hover:text-white hover:border-white/25"
              )}
            >
              {o.emoji && <span aria-hidden="true">{o.emoji}</span>}
              <span>{o.label}</span>
              {showCounts && (
                <span
                  className={clsx(
                    "font-mono",
                    selected ? (isEmerald ? "text-emerald-700" : "text-red-200") : isEmerald ? "text-slate-400" : "text-zinc-600"
                  )}
                >
                  {o.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};
