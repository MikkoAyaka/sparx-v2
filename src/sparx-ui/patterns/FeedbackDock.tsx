import React, { useState } from "react";
import { clsx } from "clsx";
import { MessageCircleMore, CheckCheck } from "lucide-react";
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
  statusText?: string;
  className?: string;
}

export const FeedbackDock: React.FC<FeedbackDockProps> = ({
  options: initialOptions,
  onSelectReaction,
  title = "给作者留下一份轻共鸣",
  statusText = "已就地记录",
  className,
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [options, setOptions] = useState<FeedbackOption[]>(initialOptions);

  const handleClick = (id: string) => {
    if (selectedId === id) return;

    setOptions((prev) =>
      prev.map((opt) => {
        if (opt.id === id) return { ...opt, count: opt.count + 1 };
        if (opt.id === selectedId) return { ...opt, count: Math.max(0, opt.count - 1) };
        return opt;
      })
    );

    setSelectedId(id);
    onSelectReaction?.(id);
  };

  const activeOption = options.find((o) => o.id === selectedId);

  return (
    <section
      className={clsx(
        "border-t pt-8 mt-12 text-xs font-mono select-none transition-colors duration-200",
        isEmerald ? "border-slate-200 text-slate-600" : "border-white/10 text-zinc-400",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <MessageCircleMore
            className={clsx("w-4 h-4", isEmerald ? "text-[#059669]" : "text-[#E5192D]")}
          />
          <span className={isEmerald ? "text-slate-700 font-medium" : "text-zinc-300"}>
            {title}
          </span>
        </div>

        {selectedId && (
          <div className="flex items-center gap-1.5">
            <CheckCheck
              className={clsx("w-3.5 h-3.5", isEmerald ? "text-[#059669]" : "text-[#E5192D]")}
            />
            <span className={isEmerald ? "text-slate-600" : "text-zinc-400"}>
              {statusText}
            </span>
          </div>
        )}
      </div>

      {activeOption && (
        <div className="mb-4 flex justify-end">
          <div
            className={clsx(
              "rounded-2xl rounded-br-sm border px-4 py-2.5 text-sm transition-all duration-200",
              isEmerald
                ? "border-emerald-500/30 bg-gradient-to-br from-emerald-50 to-slate-50 text-slate-800 shadow-md"
                : "border-[#E5192D]/30 bg-gradient-to-br from-[#E5192D]/15 to-white/5 text-white shadow-xl"
            )}
          >
            {activeOption.emoji && <span className="mr-1.5">{activeOption.emoji}</span>}
            <span>你选择了「{activeOption.label}」</span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-end gap-2">
        {options.map((option) => {
          const isSelected = option.id === selectedId;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleClick(option.id)}
              className={clsx(
                "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer active:scale-95 text-xs",
                isSelected
                  ? isEmerald
                    ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-900 font-bold shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                    : "border-[#E5192D]/40 bg-[#E5192D]/15 text-white shadow-[0_0_12px_rgba(229,25,45,0.35)]"
                  : isEmerald
                  ? "border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-300"
                  : "border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20"
              )}
            >
              {option.emoji && <span>{option.emoji}</span>}
              <span>{option.label}</span>
              <span
                className={clsx(
                  "font-mono font-bold ml-0.5",
                  isEmerald ? "text-slate-400" : "text-zinc-500"
                )}
              >
                {option.count}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
