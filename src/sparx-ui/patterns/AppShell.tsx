import React from "react";
import { clsx } from "clsx";
import { useSparxTheme } from "../tokens/colors";

export interface AppShellNavItem<T extends string = string> {
  id: T;
  label: string;
  icon?: React.ReactNode;
  /** 右侧计数，例如待处理数量 */
  count?: number;
  group?: string;
}

export interface AppShellProps<T extends string = string> {
  product: { name: string; logo?: React.ReactNode; subtitle?: string };
  nav: AppShellNavItem<T>[];
  activeId: T;
  onNavigate: (id: T) => void;
  user?: { name: string; role?: string };
  /** 顶栏内容：面包屑、搜索框、操作按钮等 */
  topbar?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * AppShell：企业应用的外框。左侧固定侧栏，右侧顶栏加内容区，只有内容区滚动。
 * 推荐主题：皓白极翠。布局稳定、层级靠边框区分，适合长时间使用的后台。
 */
export function AppShell<T extends string = string>({
  product,
  nav,
  activeId,
  onNavigate,
  user,
  topbar,
  children,
  className,
}: AppShellProps<T>) {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  const groups: { name?: string; items: AppShellNavItem<T>[] }[] = [];
  nav.forEach((item) => {
    const last = groups[groups.length - 1];
    if (last && last.name === item.group) last.items.push(item);
    else groups.push({ name: item.group, items: [item] });
  });

  const initials = user?.name.slice(0, 1) ?? "";

  return (
    <div
      className={clsx(
        "h-full w-full flex overflow-hidden",
        isEmerald ? "bg-[#F8FAFC] text-slate-900" : "bg-[#030406] text-white",
        className
      )}
    >
      {/* 侧栏 */}
      <aside
        className={clsx(
          "hidden md:flex w-60 shrink-0 flex-col border-r",
          isEmerald ? "bg-white border-slate-200" : "bg-[#06080F] border-white/10"
        )}
      >
        <div
          className={clsx(
            "h-14 shrink-0 px-4 flex items-center gap-2.5 border-b",
            isEmerald ? "border-slate-200" : "border-white/10"
          )}
        >
          <span
            className={clsx(
              "w-7 h-7 rounded-lg flex items-center justify-center text-sm font-black text-white shrink-0",
              isEmerald ? "bg-[#059669]" : "bg-[#E5192D]"
            )}
          >
            {product.logo ?? product.name.slice(0, 1)}
          </span>
          <div className="min-w-0">
            <div className="text-sm font-bold truncate">{product.name}</div>
            {product.subtitle && (
              <div className={clsx("text-xs truncate", isEmerald ? "text-slate-500" : "text-zinc-500")}>
                {product.subtitle}
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto subtle-scroll p-3 space-y-4" aria-label={product.name}>
          {groups.map((g, gi) => (
            <div key={gi} className="space-y-0.5">
              {g.name && (
                <div
                  className={clsx(
                    "px-2.5 pb-1 text-xs font-medium",
                    isEmerald ? "text-slate-400" : "text-zinc-500"
                  )}
                >
                  {g.name}
                </div>
              )}
              {g.items.map((item) => {
                const active = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors cursor-pointer text-left",
                      active
                        ? isEmerald
                          ? "bg-emerald-50 text-emerald-800 font-semibold"
                          : "bg-[#E5192D]/12 text-white font-semibold"
                        : isEmerald
                        ? "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {item.icon && (
                      <span
                        className={clsx(
                          "shrink-0",
                          active ? (isEmerald ? "text-[#059669]" : "text-[#E5192D]") : "opacity-70"
                        )}
                      >
                        {item.icon}
                      </span>
                    )}
                    <span className="flex-1 truncate">{item.label}</span>
                    {typeof item.count === "number" && item.count > 0 && (
                      <span
                        className={clsx(
                          "min-w-6 px-1.5 rounded-md text-center text-xs font-mono",
                          active
                            ? isEmerald
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-[#E5192D] text-white"
                            : isEmerald
                            ? "bg-slate-100 text-slate-600"
                            : "bg-white/10 text-zinc-300"
                        )}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {user && (
          <div
            className={clsx(
              "shrink-0 p-3 border-t flex items-center gap-2.5",
              isEmerald ? "border-slate-200" : "border-white/10"
            )}
          >
            <span
              className={clsx(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                isEmerald ? "bg-slate-100 text-slate-700" : "bg-white/10 text-zinc-200"
              )}
            >
              {initials}
            </span>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">{user.name}</div>
              {user.role && (
                <div className={clsx("text-xs truncate", isEmerald ? "text-slate-500" : "text-zinc-500")}>
                  {user.role}
                </div>
              )}
            </div>
          </div>
        )}
      </aside>

      {/* 主区域 */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div
          className={clsx(
            "h-14 shrink-0 px-4 sm:px-6 flex items-center gap-3 border-b",
            isEmerald ? "bg-white border-slate-200" : "bg-[#06080F] border-white/10"
          )}
        >
          <span className="md:hidden text-sm font-bold shrink-0">{product.name}</span>
          <div className="flex-1 min-w-0 flex items-center gap-3">{topbar}</div>
        </div>

        {/* 窄屏：侧栏导航改为横向标签 */}
        <nav
          className={clsx(
            "md:hidden shrink-0 flex gap-1.5 overflow-x-auto no-scrollbar px-3 py-2 border-b",
            isEmerald ? "bg-white border-slate-200" : "bg-[#06080F] border-white/10"
          )}
          aria-label={product.name}
        >
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={clsx(
                "shrink-0 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap cursor-pointer",
                item.id === activeId
                  ? isEmerald
                    ? "bg-emerald-50 text-emerald-800 font-semibold"
                    : "bg-[#E5192D]/15 text-white font-semibold"
                  : isEmerald
                  ? "text-slate-600"
                  : "text-zinc-400"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <main className="flex-1 min-h-0 overflow-y-auto subtle-scroll">{children}</main>
      </div>
    </div>
  );
}
