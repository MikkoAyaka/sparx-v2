import React from "react";
import { clsx } from "clsx";

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
  return (
    <span
      className={clsx(
        "inline-flex items-center text-xs font-mono px-2.5 py-0.5 rounded-full border transition-colors select-none",
        active
          ? "bg-[#E5192D]/15 border-[#E5192D]/40 text-red-200 shadow-[0_0_10px_rgba(229,25,45,0.25)]"
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
