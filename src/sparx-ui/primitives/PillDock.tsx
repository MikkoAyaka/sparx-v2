import React from "react";
import { clsx } from "clsx";

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
  const sizeStyles = {
    sm: "p-1 gap-1 text-xs",
    md: "p-1.5 gap-1.5 text-xs sm:text-sm",
  };

  const itemSizeStyles = {
    sm: "px-3 py-1.5 rounded-lg",
    md: "px-4 py-2 rounded-lg",
  };

  return (
    <nav
      className={clsx(
        "inline-flex items-center bg-[#08090E] border border-white/10 rounded-xl font-mono select-none shadow-xl backdrop-blur-xl",
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
                ? "bg-[#E5192D] text-white font-bold shadow-[0_0_14px_rgba(229,25,45,0.45)]"
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
