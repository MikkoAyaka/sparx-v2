import React from "react";
import { clsx } from "clsx";
import { useSparxTheme } from "@/sparx-ui";

/** 文档页顶部的标题区：眉标、标题、说明和可选操作 */
export const PageIntro: React.FC<{
  eyebrow: string;
  icon?: React.ReactNode;
  title: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}> = ({ eyebrow, icon, title, children, actions, className }) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  return (
    <header className={clsx("space-y-4 pb-2", className)}>
      <div
        className={clsx(
          "flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider",
          isEmerald ? "text-[#059669]" : "text-[#E5192D]"
        )}
      >
        {icon}
        <span>{eyebrow}</span>
      </div>
      <h1
        className={clsx(
          "text-3xl sm:text-4xl font-black tracking-tight leading-tight",
          isEmerald ? "text-slate-900" : "text-white"
        )}
      >
        {title}
      </h1>
      {children && (
        <div
          className={clsx(
            "text-sm sm:text-base leading-relaxed max-w-3xl space-y-2",
            isEmerald ? "text-slate-600" : "text-zinc-300"
          )}
        >
          {children}
        </div>
      )}
      {actions && <div className="flex flex-wrap items-center gap-3 pt-2">{actions}</div>}
    </header>
  );
};

/** 页面内的二级标题，带可选说明 */
export const SectionHeading: React.FC<{
  id?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  aside?: React.ReactNode;
}> = ({ id, title, description, aside }) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";
  return (
    <div id={id} className="flex flex-wrap items-end justify-between gap-3 scroll-mt-24">
      <div className="space-y-1">
        <h2
          className={clsx(
            "text-xl sm:text-2xl font-bold tracking-tight",
            isEmerald ? "text-slate-900" : "text-white"
          )}
        >
          {title}
        </h2>
        {description && (
          <p className={clsx("text-sm leading-relaxed max-w-3xl", isEmerald ? "text-slate-500" : "text-zinc-400")}>
            {description}
          </p>
        )}
      </div>
      {aside}
    </div>
  );
};

/** 文档页中的普通内容面板 */
export const Panel: React.FC<{ children: React.ReactNode; className?: string; padded?: boolean }> = ({
  children,
  className,
  padded = true,
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";
  return (
    <div
      className={clsx(
        "rounded-2xl border transition-colors duration-200",
        padded && "p-5 sm:p-6",
        isEmerald
          ? "bg-white border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          : "bg-[#08090E] border-white/10",
        className
      )}
    >
      {children}
    </div>
  );
};
