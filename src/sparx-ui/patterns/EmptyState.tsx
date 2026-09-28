import React from "react";
import { clsx } from "clsx";
import { useSparxTheme } from "../tokens/colors";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  /** 说明这里是什么，例如“还没有审批单” */
  title: string;
  /** 说明怎样填满它 */
  description?: React.ReactNode;
  /** 一个明确的下一步操作 */
  action?: React.ReactNode;
  compact?: boolean;
  className?: string;
}

/**
 * EmptyState：空状态。说明这里是什么、为什么是空的，并给出一个下一步操作。
 * 两种主题通用。
 */
export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action, compact, className }) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center text-center",
        compact ? "py-8 px-4 gap-2" : "py-14 px-6 gap-3",
        className
      )}
    >
      {icon && (
        <span
          className={clsx(
            "w-11 h-11 rounded-xl border flex items-center justify-center mb-1",
            isEmerald ? "bg-slate-50 border-slate-200 text-slate-400" : "bg-white/5 border-white/10 text-zinc-500"
          )}
        >
          {icon}
        </span>
      )}
      <p className={clsx("text-base font-semibold", isEmerald ? "text-slate-900" : "text-white")}>{title}</p>
      {description && (
        <p className={clsx("text-sm leading-relaxed max-w-sm", isEmerald ? "text-slate-500" : "text-zinc-400")}>
          {description}
        </p>
      )}
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
};
