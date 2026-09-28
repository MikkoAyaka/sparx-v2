import React from "react";
import { clsx } from "clsx";
import { useSparxTheme } from "../tokens/colors";

export interface DescriptionItem {
  label: string;
  value: React.ReactNode;
  /** 占据的列数，默认 1 */
  span?: 1 | 2 | 3;
  mono?: boolean;
}

export interface DescriptionListProps {
  items: DescriptionItem[];
  columns?: 2 | 3;
  className?: string;
}

/**
 * DescriptionList：键值对详情。用于单据、订单、用户资料等详情页。
 * 推荐主题：皓白极翠。标签统一放在值的上方，便于扫读。列数跟随容器宽度：窄 1 列，≥ 448px 2 列，≥ 672px 3 列。
 */
export const DescriptionList: React.FC<DescriptionListProps> = ({ items, columns = 3, className }) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  const spanClass = (span?: number) =>
    span === 3 ? "@md:col-span-2 @2xl:col-span-3" : span === 2 ? "@md:col-span-2" : "";

  return (
    <div className={clsx("@container", className)}>
    <dl
      className={clsx(
        "grid grid-cols-1 @md:grid-cols-2 gap-x-6 gap-y-4",
        columns === 3 && "@2xl:grid-cols-3"
      )}
    >
      {items.map((item) => (
        <div key={item.label} className={clsx("min-w-0 space-y-1", spanClass(item.span))}>
          <dt className={clsx("text-sm", isEmerald ? "text-slate-500" : "text-zinc-500")}>{item.label}</dt>
          <dd
            className={clsx(
              "text-sm break-words",
              item.mono && "font-mono",
              isEmerald ? "text-slate-900" : "text-zinc-100"
            )}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
    </div>
  );
};
