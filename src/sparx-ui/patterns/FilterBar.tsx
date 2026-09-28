import React from "react";
import { clsx } from "clsx";
import { Search, X } from "lucide-react";
import { useSparxTheme } from "../tokens/colors";

export interface FilterBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  /** 搜索框的无障碍标签，占位文字只作示例 */
  searchLabel?: string;
  placeholder?: string;
  /** 其他筛选控件，例如 Select */
  filters?: React.ReactNode;
  resultCount?: number;
  /** 有筛选条件时显示“清除筛选” */
  onReset?: () => void;
  /** 替换搜索框的默认宽度（w-full sm:w-64），例如在窄侧栏里设为 w-full */
  searchClassName?: string;
  className?: string;
}

/**
 * FilterBar：列表上方的搜索与筛选条。左侧搜索，中间筛选控件，右侧结果数与清除按钮。
 * 推荐主题：皓白极翠。
 */
export const FilterBar: React.FC<FilterBarProps> = ({
  query,
  onQueryChange,
  searchLabel = "搜索",
  placeholder,
  filters,
  resultCount,
  onReset,
  searchClassName,
  className,
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  return (
    <div className={clsx("flex flex-wrap items-center gap-2.5", className)}>
      <div className={clsx("relative", searchClassName ?? "w-full sm:w-64")}>
        <Search
          className={clsx(
            "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none",
            isEmerald ? "text-slate-400" : "text-zinc-500"
          )}
        />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label={searchLabel}
          placeholder={placeholder}
          className={clsx(
            "w-full h-9 pl-9 pr-3 rounded-lg border text-sm outline-none transition-colors",
            isEmerald
              ? "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#059669] focus:ring-2 focus:ring-emerald-100"
              : "bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-[#E5192D]/60"
          )}
        />
      </div>

      {filters}

      <div className="flex items-center gap-3 ml-auto text-sm">
        {typeof resultCount === "number" && (
          <span className={clsx("font-mono", isEmerald ? "text-slate-500" : "text-zinc-500")}>
            共 {resultCount} 条
          </span>
        )}
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className={clsx(
              "flex items-center gap-1 cursor-pointer transition-colors",
              isEmerald ? "text-slate-600 hover:text-slate-900" : "text-zinc-400 hover:text-white"
            )}
          >
            <X className="w-3.5 h-3.5" />
            清除筛选
          </button>
        )}
      </div>
    </div>
  );
};
