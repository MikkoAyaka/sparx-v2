import React from "react";
import { clsx } from "clsx";
import { useSparxTheme } from "../tokens/colors";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  prefixHash?: boolean;
  active?: boolean;
  children: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({
  prefixHash = true,
  active = false,
  className,
  children,
  ...props
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  return (
    <span
      className={clsx(
        "inline-flex items-center text-xs font-mono px-2.5 py-0.5 rounded-full border transition-colors select-none",
        active
          ? isEmerald
            ? "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-[0_0_8px_rgba(16,185,129,0.2)]"
            : "bg-[#E5192D]/15 border-[#E5192D]/40 text-red-200 shadow-[0_0_10px_rgba(229,25,45,0.25)]"
          : isEmerald
          ? "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
          : "bg-white/5 border-white/10 text-zinc-400 hover:text-zinc-200 hover:bg-white/10",
        className
      )}
      {...props}
    >
      {prefixHash && <span className="opacity-60 mr-0.5">#</span>}
      <span>{children}</span>
    </span>
  );
};
