import React, { useState } from "react";
import { clsx } from "clsx";
import { MessageCircleMore, CheckCheck } from "lucide-react";

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
        "border-t border-white/10 pt-8 mt-12 text-xs font-mono select-none",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-4 text-zinc-400">
        <div className="flex items-center gap-2">
          <MessageCircleMore className="w-4 h-4 text-[#E5192D]" />
          <span>{title}</span>
        </div>

        {selectedId && (
          <div className="flex items-center gap-1.5 text-zinc-400">
            <CheckCheck className="w-3.5 h-3.5 text-[#E5192D]" />
            <span>{statusText}</span>
          </div>
        )}
      </div>

      {activeOption && (
        <div className="mb-4 flex justify-end">
          <div className="rounded-2xl rounded-br-sm border border-[#E5192D]/30 bg-gradient-to-br from-[#E5192D]/15 to-white/5 px-4 py-2.5 text-sm text-white shadow-xl">
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
                  ? "border-[#E5192D]/40 bg-[#E5192D]/15 text-white shadow-[0_0_12px_rgba(229,25,45,0.35)]"
                  : "border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20"
              )}
            >
              {option.emoji && <span>{option.emoji}</span>}
              <span>{option.label}</span>
              <span className="font-mono text-zinc-500 font-bold ml-0.5">
                {option.count}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
