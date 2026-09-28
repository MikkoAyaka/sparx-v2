import React from "react";
import { clsx } from "clsx";
import { useSparxTheme } from "../tokens/colors";

export interface SiteMastheadLink<T extends string = string> {
  id: T;
  label: string;
}

export interface SiteMastheadProps<T extends string = string> {
  brand: string;
  tagline?: string;
  links: SiteMastheadLink<T>[];
  activeId?: T;
  onSelect?: (id: T) => void;
  actions?: React.ReactNode;
  className?: string;
}

/**
 * SiteMasthead：独立站点的刊头。左侧品牌与一句话介绍，中间栏目，右侧操作。
 * 推荐主题：虚空绯红。品牌名用等宽大写字母，当前栏目用绯红短横线标出。
 */
export function SiteMasthead<T extends string = string>({
  brand,
  tagline,
  links,
  activeId,
  onSelect,
  actions,
  className,
}: SiteMastheadProps<T>) {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  return (
    <header className={clsx("flex items-center justify-between gap-4 min-w-0", className)}>
      <div className="flex items-center gap-3 min-w-0">
        <span
          aria-hidden="true"
          className={clsx(
            "w-2.5 h-2.5 rounded-full shrink-0",
            isEmerald ? "bg-[#059669]" : "bg-[#E5192D] shadow-[0_0_10px_#E5192D]"
          )}
        />
        <span
          className={clsx(
            "font-mono font-bold tracking-[0.2em] uppercase text-sm whitespace-nowrap",
            isEmerald ? "text-slate-900" : "text-white"
          )}
        >
          {brand}
        </span>
        {tagline && (
          <span className={clsx("hidden xl:inline text-sm truncate", isEmerald ? "text-slate-500" : "text-zinc-500")}>
            {tagline}
          </span>
        )}
      </div>

      <nav className="hidden md:flex items-center gap-7" aria-label="栏目">
        {links.map((link) => {
          const active = link.id === activeId;
          return (
            <button
              key={link.id}
              type="button"
              onClick={() => onSelect?.(link.id)}
              aria-current={active ? "page" : undefined}
              className={clsx(
                "relative py-1.5 text-sm font-medium transition-colors cursor-pointer",
                active
                  ? isEmerald
                    ? "text-slate-900"
                    : "text-white"
                  : isEmerald
                  ? "text-slate-500 hover:text-slate-900"
                  : "text-zinc-500 hover:text-white"
              )}
            >
              {link.label}
              <span
                aria-hidden="true"
                className={clsx(
                  "absolute left-0 -bottom-0.5 h-0.5 rounded-full transition-all duration-300",
                  active ? "w-full" : "w-0",
                  isEmerald ? "bg-[#059669]" : "bg-[#E5192D] shadow-[0_0_8px_#E5192D]"
                )}
              />
            </button>
          );
        })}
      </nav>

      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </header>
  );
}
