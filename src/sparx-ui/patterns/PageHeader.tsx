import React from "react";
import { clsx } from "clsx";
import { ChevronRight } from "lucide-react";
import { useSparxTheme } from "../tokens/colors";

export interface PageHeaderTab<T extends string = string> {
  id: T;
  label: string;
  count?: number;
}

export interface PageHeaderProps<T extends string = string> {
  breadcrumbs?: { label: string; onClick?: () => void }[];
  title: React.ReactNode;
  description?: React.ReactNode;
  /** 标题右侧的状态标签等 */
  meta?: React.ReactNode;
  actions?: React.ReactNode;
  tabs?: PageHeaderTab<T>[];
  activeTab?: T;
  onTabChange?: (id: T) => void;
  className?: string;
}

/**
 * PageHeader：页面标题区。面包屑、标题、说明、操作按钮和下划线标签页。
 * 推荐主题：皓白极翠。所有页面使用同一结构，用户在任何页面都能在同一位置找到主要操作。
 */
export function PageHeader<T extends string = string>({
  breadcrumbs,
  title,
  description,
  meta,
  actions,
  tabs,
  activeTab,
  onTabChange,
  className,
}: PageHeaderProps<T>) {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  return (
    <div className={clsx("space-y-3", tabs && "border-b", isEmerald ? "border-slate-200" : "border-white/10", className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="面包屑" className="flex flex-wrap items-center gap-1 text-sm">
          {breadcrumbs.map((b, i) => {
            const last = i === breadcrumbs.length - 1;
            return (
              <React.Fragment key={i}>
                {b.onClick && !last ? (
                  <button
                    type="button"
                    onClick={b.onClick}
                    className={clsx(
                      "cursor-pointer transition-colors",
                      isEmerald ? "text-slate-500 hover:text-slate-900" : "text-zinc-500 hover:text-white"
                    )}
                  >
                    {b.label}
                  </button>
                ) : (
                  <span
                    aria-current={last ? "page" : undefined}
                    className={last ? (isEmerald ? "text-slate-700" : "text-zinc-300") : isEmerald ? "text-slate-500" : "text-zinc-500"}
                  >
                    {b.label}
                  </span>
                )}
                {!last && <ChevronRight className={clsx("w-3.5 h-3.5", isEmerald ? "text-slate-300" : "text-zinc-600")} />}
              </React.Fragment>
            );
          })}
        </nav>
      )}

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className={clsx("text-xl sm:text-2xl font-bold tracking-tight", isEmerald ? "text-slate-900" : "text-white")}>
              {title}
            </h1>
            {meta}
          </div>
          {description && (
            <p className={clsx("text-sm leading-relaxed max-w-2xl", isEmerald ? "text-slate-500" : "text-zinc-400")}>
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div>}
      </div>

      {tabs && tabs.length > 0 && (
        <div role="tablist" className="flex gap-5 overflow-x-auto no-scrollbar -mb-px pt-1">
          {tabs.map((t) => {
            const active = t.id === activeTab;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onTabChange?.(t.id)}
                className={clsx(
                  "shrink-0 flex items-center gap-1.5 pb-2.5 border-b-2 text-sm transition-colors cursor-pointer whitespace-nowrap",
                  active
                    ? isEmerald
                      ? "border-[#059669] text-slate-900 font-semibold"
                      : "border-[#E5192D] text-white font-semibold"
                    : isEmerald
                    ? "border-transparent text-slate-500 hover:text-slate-900"
                    : "border-transparent text-zinc-500 hover:text-white"
                )}
              >
                {t.label}
                {typeof t.count === "number" && (
                  <span
                    className={clsx(
                      "px-1.5 rounded text-xs font-mono",
                      active
                        ? isEmerald
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-[#E5192D]/20 text-red-200"
                        : isEmerald
                        ? "bg-slate-100 text-slate-500"
                        : "bg-white/10 text-zinc-400"
                    )}
                  >
                    {t.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
