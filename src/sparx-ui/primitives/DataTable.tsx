import React from "react";
import { clsx } from "clsx";
import { useSparxTheme } from "../tokens/colors";

export interface DataTableColumn<T = any> {
  key: string;
  header: React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (item: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T = any> {
  columns: DataTableColumn<T>[];
  data: T[];
  keyField?: string;
  selectedId?: string | number;
  onRowClick?: (item: T) => void;
  emptyText?: string;
  className?: string;
  compact?: boolean;
  /**
   * 表格的最小宽度（px）。容器比它窄时横向滚动，而不是把列挤到逐字换行。
   * 默认 560；列很少的表格可以调小，传 0 关闭。
   */
  minWidth?: number;
}

export type DataTableStatusVariant =
  | "emerald"
  | "amber"
  | "cyan"
  | "neutral"
  | "flare"
  | "success"
  | "warning"
  | "info"
  | "error";

export interface DataTableStatusBadgeProps {
  variant?: DataTableStatusVariant;
  dot?: boolean;
  pulse?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * DataTableStatusBadge - 专用于数据表格的高信噪比状态微徽标
 * 严格遵循 Rule E-04 / U-01 设计原则：
 * 1. 恒定 1px 规范描边，严禁裸写未经主题化约束的 ad-hoc border
 * 2. 渲染字号严格保持 ≥14px (Rule U-01, text-xs 等宽字体排印)
 * 3. 语义色彩在皓白极翠与虚空暗房下均拥有极高辨识度与通透感
 */
export const DataTableStatusBadge: React.FC<DataTableStatusBadgeProps> = ({
  variant = "neutral",
  dot = true,
  pulse = false,
  children,
  className,
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  const resolvedVariant: "emerald" | "amber" | "cyan" | "neutral" | "flare" =
    variant === "success"
      ? "emerald"
      : variant === "warning"
      ? "amber"
      : variant === "info"
      ? "cyan"
      : variant === "error"
      ? "flare"
      : variant;

  const variantStyles = {
    emerald: isEmerald
      ? "bg-emerald-50/90 border-emerald-200 text-emerald-800"
      : "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
    amber: isEmerald
      ? "bg-amber-50/90 border-amber-200 text-amber-800"
      : "bg-amber-500/15 border-amber-500/30 text-amber-300",
    cyan: isEmerald
      ? "bg-teal-50/90 border-teal-200 text-teal-800"
      : "bg-teal-500/15 border-teal-500/30 text-teal-300",
    flare: isEmerald
      ? "bg-rose-50/90 border-rose-200 text-rose-800"
      : "bg-[#E5192D]/15 border-[#E5192D]/35 text-red-200",
    neutral: isEmerald
      ? "bg-slate-100 border-slate-200 text-slate-700"
      : "bg-white/5 border-white/10 text-zinc-300",
  };

  const dotColors = {
    emerald: isEmerald ? "bg-[#059669]" : "bg-emerald-400 shadow-[0_0_8px_#34D399]",
    amber: isEmerald ? "bg-[#D97706]" : "bg-[#E5A93C] shadow-[0_0_8px_#E5A93C]",
    cyan: isEmerald ? "bg-[#0D9488]" : "bg-teal-400 shadow-[0_0_8px_#2DD4BF]",
    flare: isEmerald ? "bg-[#E11D48]" : "bg-[#E5192D] shadow-[0_0_8px_#E5192D]",
    neutral: isEmerald ? "bg-slate-400" : "bg-zinc-400",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-mono font-medium select-none transition-colors duration-200",
        variantStyles[resolvedVariant] || variantStyles.neutral,
        className
      )}
    >
      {dot && (
        <span className="relative flex items-center justify-center shrink-0">
          {pulse && (
            <span
              className={clsx(
                "absolute w-1.5 h-1.5 rounded-full opacity-60 animate-ping",
                dotColors[resolvedVariant] || dotColors.neutral
              )}
            />
          )}
          <span
            className={clsx(
              "w-1.5 h-1.5 rounded-full shrink-0",
              dotColors[resolvedVariant] || dotColors.neutral
            )}
            aria-hidden="true"
          />
        </span>
      )}
      <span className="truncate">{children}</span>
    </span>
  );
};

export function DataTable<T extends Record<string, any> = Record<string, any>>({
  columns,
  data,
  keyField = "id",
  selectedId,
  onRowClick,
  emptyText = "暂无数据",
  className,
  compact = false,
  minWidth = 560,
}: DataTableProps<T>) {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  const alignStyles = {
    left: "text-left justify-start",
    center: "text-center justify-center",
    right: "text-right justify-end",
  };

  return (
    <div
      className={clsx(
        "w-full rounded-2xl border overflow-hidden select-none",
        isEmerald
          ? "bg-white border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          : "bg-[#08090E] border-white/10",
        className
      )}
    >
      <div className="w-full overflow-x-auto subtle-scroll">
        <table className="w-full border-collapse font-mono text-xs" style={minWidth ? { minWidth } : undefined}>
          {/* 表头 */}
          <thead>
            <tr
              className={clsx(
                "border-b uppercase tracking-wider text-xs font-bold font-mono",
                isEmerald
                  ? "bg-slate-50/80 border-slate-200 text-slate-500"
                  : "bg-white/[0.02] border-white/10 text-zinc-400"
              )}
            >
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className={clsx(
                    "px-4 py-3 font-semibold whitespace-nowrap",
                    alignStyles[col.align || "left"]
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* 表体 */}
          <tbody
            className={clsx(
              "divide-y",
              isEmerald ? "divide-slate-100 text-slate-700" : "divide-white/[0.04] text-zinc-300"
            )}
          >
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 text-center text-zinc-500"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((row, index) => {
                const id = row[keyField] ?? index;
                const isSelected = selectedId !== undefined && selectedId === id;

                return (
                  <tr
                    key={id}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={clsx(
                      "transition-colors",
                      onRowClick && "cursor-pointer",
                      isSelected
                        ? isEmerald
                          ? "bg-emerald-50/80 text-emerald-950 font-medium"
                          : "bg-[#E5192D]/10 text-white font-medium"
                        : isEmerald
                        ? "hover:bg-slate-50/70"
                        : "hover:bg-white/[0.03]"
                    )}
                  >
                    {columns.map((col) => {
                      const cellContent = col.render
                        ? col.render(row, index)
                        : row[col.key];

                      return (
                        <td
                          key={col.key}
                          className={clsx(
                            "px-4 transition-all",
                            compact ? "py-2.5" : "py-3.5",
                            alignStyles[col.align || "left"]
                          )}
                        >
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
