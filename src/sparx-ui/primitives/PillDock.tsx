import React from "react";
import { clsx } from "clsx";
import { useSparxTheme } from "../tokens/colors";

export interface PillDockItem<T extends string = string> {
  id: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export interface PillDockProps<T extends string = string> {
  items: PillDockItem<T>[];
  activeId: T;
  onChange: (id: T) => void;
  size?: "sm" | "md";
  className?: string;
}

export function PillDock<T extends string = string>({
  items,
  activeId,
  onChange,
  size = "md",
  className,
}: PillDockProps<T>) {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  const sizeStyles = {
    sm: "p-1.5 gap-1.5 text-sm",
    md: "p-2 gap-2 text-sm",
  };

  const itemSizeStyles = {
    sm: "px-4 py-2 rounded-lg",
    md: "px-5 py-2.5 rounded-lg",
  };

  return (
    <nav
      className={clsx(
        "inline-flex items-center rounded-xl font-mono select-none backdrop-blur-xl transition-colors duration-200 border",
        isEmerald
          ? "bg-white/95 border-slate-200 text-slate-700 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          : "bg-[#08090E] border-white/10 text-zinc-400 shadow-xl",
        sizeStyles[size],
        className
      )}
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={clsx(
              "flex items-center gap-2 font-medium transition-all duration-200 cursor-pointer whitespace-nowrap",
              itemSizeStyles[size],
              isActive
                ? isEmerald
                  ? "bg-[#059669] text-white font-bold"
                  : "bg-[#E5192D] text-white font-bold shadow-[0_0_14px_rgba(229,25,45,0.45)]"
                : isEmerald
                ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            )}
          >
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
            {item.badge && <span className="shrink-0">{item.badge}</span>}
          </button>
        );
      })}
    </nav>
  );
}
