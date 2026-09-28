import React, { useState, useRef, useEffect, useId } from "react";
import { clsx } from "clsx";
import { ChevronDown, Check } from "lucide-react";
import { useSparxTheme } from "../tokens/colors";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string;
}

export interface SelectProps<T extends string = string> {
  options: SelectOption<T>[];
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "ghost" | "glass";
  className?: string;
  menuClassName?: string;
  prefixIcon?: React.ReactNode;
  name?: string;
  id?: string;
}

export function Select<T extends string = string>({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "请选择",
  label,
  disabled = false,
  size = "md",
  variant = "default",
  className,
  menuClassName,
  prefixIcon,
  name,
  id,
}: SelectProps<T>) {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";
  const generatedId = useId();
  const selectId = id || generatedId;

  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<T | undefined>(
    value !== undefined ? value : defaultValue ?? options[0]?.value
  );
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const currentValue = value !== undefined ? value : internalValue;
  const selectedOption = options.find((opt) => opt.value === currentValue);

  // 点击外部自动收起
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // 键盘快捷交互
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
        const currentIndex = options.findIndex((opt) => opt.value === currentValue);
        setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => {
          let next = prev + 1;
          while (next < options.length && options[next]?.disabled) {
            next++;
          }
          return next < options.length ? next : prev;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => {
          let next = prev - 1;
          while (next >= 0 && options[next]?.disabled) {
            next--;
          }
          return next >= 0 ? next : prev;
        });
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < options.length) {
          const opt = options[highlightedIndex];
          if (opt && !opt.disabled) {
            selectOption(opt.value);
          }
        }
        break;
      default:
        break;
    }
  };

  const selectOption = (optValue: T) => {
    if (value === undefined) {
      setInternalValue(optValue);
    }
    onChange?.(optValue);
    setIsOpen(false);
  };

  const sizeStyles = {
    sm: "h-8 px-2.5 text-xs rounded-lg gap-1.5",
    md: "h-9 sm:h-10 px-3 py-1.5 text-xs sm:text-sm rounded-xl gap-2",
    lg: "h-11 sm:h-12 px-4 py-2 text-sm sm:text-base rounded-xl gap-2.5",
  };

  const triggerVariantStyles = {
    default: isEmerald
      ? clsx(
          "bg-white border text-slate-800",
          isOpen
            ? "border-[#059669] ring-2 ring-[#059669]/20"
            : "border-slate-200 hover:border-slate-300 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
        )
      : clsx(
          "bg-[#08090E] border text-white",
          isOpen
            ? "border-[#E5192D] ring-2 ring-[#E5192D]/20 shadow-[0_0_12px_rgba(229,25,45,0.25)]"
            : "border-white/10 hover:border-white/20"
        ),
    ghost: isEmerald
      ? clsx(
          "bg-transparent border border-transparent text-slate-800",
          isOpen
            ? "bg-slate-100 border-slate-200"
            : "hover:bg-slate-100 hover:border-slate-200"
        )
      : clsx(
          "bg-transparent border border-transparent text-white",
          isOpen
            ? "bg-white/10 border-white/15"
            : "hover:bg-white/5 hover:border-white/10"
        ),
    glass: isEmerald
      ? clsx(
          "bg-white/80 backdrop-blur-md border border-slate-200/80 text-slate-800",
          isOpen
            ? "border-[#059669] ring-2 ring-[#059669]/20"
            : "hover:border-slate-300 shadow-sm"
        )
      : clsx(
          "bg-white/[0.04] backdrop-blur-md border border-white/[0.12] text-white",
          isOpen
            ? "border-[#E5192D] ring-2 ring-[#E5192D]/20 shadow-[0_0_12px_rgba(229,25,45,0.25)]"
            : "hover:border-white/25"
        ),
  };

  return (
    <div
      ref={containerRef}
      className={clsx("relative inline-block text-left select-none", className)}
      onKeyDown={handleKeyDown}
    >
      {label && (
        <label
          htmlFor={selectId}
          className={clsx(
            "block font-mono text-xs font-semibold mb-1.5",
            isEmerald ? "text-slate-600" : "text-zinc-400"
          )}
        >
          {label}
        </label>
      )}

      {/* 触发器按键 */}
      <button
        id={selectId}
        type="button"
        name={name}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={clsx(
          "w-full flex items-center justify-between font-mono font-medium transition-all duration-200 outline-none cursor-pointer",
          sizeStyles[size],
          triggerVariantStyles[variant],
          disabled && "opacity-40 cursor-not-allowed pointer-events-none"
        )}
      >
        <div className="flex items-center gap-2 truncate">
          {prefixIcon && <span className="shrink-0 text-current opacity-70">{prefixIcon}</span>}
          {selectedOption ? (
            <div className="flex items-center gap-1.5 truncate">
              {selectedOption.icon && (
                <span className="shrink-0">{selectedOption.icon}</span>
              )}
              <span className="truncate">{selectedOption.label}</span>
            </div>
          ) : (
            <span className={clsx("truncate", isEmerald ? "text-slate-400" : "text-zinc-500")}>
              {placeholder}
            </span>
          )}
        </div>

        <ChevronDown
          className={clsx(
            "w-3.5 h-3.5 shrink-0 transition-transform duration-200",
            isOpen ? "rotate-180" : "rotate-0",
            isEmerald ? "text-slate-400" : "text-zinc-400"
          )}
        />
      </button>

      {/* 悬浮磨砂弹窗列表 (Popup List Menu) */}
      {isOpen && (
        <div
          ref={menuRef}
          role="listbox"
          tabIndex={-1}
          className={clsx(
            "absolute z-50 mt-1.5 w-full min-w-[180px] max-h-64 overflow-y-auto subtle-scroll rounded-xl p-1 shadow-2xl backdrop-blur-2xl border transition-all duration-150 animate-in fade-in zoom-in-95",
            isEmerald
              ? "bg-white/95 border-slate-200 text-slate-800 shadow-[0_16px_36px_rgba(15,23,42,0.12)]"
              : "bg-[#0D0F18]/95 border-white/15 text-white shadow-[0_20px_48px_rgba(0,0,0,0.85)]",
            menuClassName
          )}
        >
          {options.length === 0 ? (
            <div
              className={clsx(
                "px-3 py-2.5 text-xs text-center font-mono",
                isEmerald ? "text-slate-400" : "text-zinc-500"
              )}
            >
              没有可选项
            </div>
          ) : (
            options.map((option, index) => {
              const isSelected = option.value === currentValue;
              const isHighlighted = index === highlightedIndex;

              return (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled}
                  onClick={() => !option.disabled && selectOption(option.value)}
                  onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
                  className={clsx(
                    "flex items-center justify-between px-3 py-2 rounded-lg text-xs sm:text-sm font-mono transition-colors duration-150 cursor-pointer select-none",
                    option.disabled && "opacity-35 cursor-not-allowed pointer-events-none",
                    isSelected
                      ? isEmerald
                        ? "bg-emerald-50 text-[#059669] font-bold border border-emerald-200/70"
                        : "bg-[#E5192D]/15 text-white font-bold border border-[#E5192D]/40"
                      : isHighlighted
                      ? isEmerald
                        ? "bg-slate-100/90 text-slate-900"
                        : "bg-white/10 text-white"
                      : isEmerald
                      ? "text-slate-700 hover:bg-slate-100/70 hover:text-slate-900"
                      : "text-zinc-300 hover:bg-white/[0.06] hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-2 truncate">
                    {option.icon && <span className="shrink-0">{option.icon}</span>}
                    <div className="truncate">
                      <div className="truncate">{option.label}</div>
                      {option.description && (
                        <div
                          className={clsx(
                            "text-xs font-normal truncate mt-0.5",
                            isEmerald ? "text-slate-500" : "text-zinc-400"
                          )}
                        >
                          {option.description}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 ml-2 shrink-0">
                    {option.badge && (
                      <span
                        className={clsx(
                          "px-1.5 py-0.5 text-xs rounded font-semibold",
                          isEmerald
                            ? "bg-slate-100 text-slate-600"
                            : "bg-white/10 text-zinc-300"
                        )}
                      >
                        {option.badge}
                      </span>
                    )}
                    {isSelected && (
                      <Check
                        className={clsx(
                          "w-3.5 h-3.5 shrink-0",
                          isEmerald ? "text-[#059669]" : "text-[#E5192D]"
                        )}
                      />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
