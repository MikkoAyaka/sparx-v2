import React from "react";
import { clsx } from "clsx";
import { useSparxTheme } from "../tokens/colors";

export interface ActivityItem {
  id: string;
  actor: string;
  /** 动作描述，例如“批准了申请” */
  action: React.ReactNode;
  time: string;
  /** 附言或补充说明 */
  comment?: React.ReactNode;
  tone?: "default" | "success" | "warning" | "error";
}

export interface ActivityTimelineProps {
  items: ActivityItem[];
  className?: string;
}

/**
 * ActivityTimeline：操作记录。按时间顺序列出谁在什么时候做了什么，可附带说明。
 * 推荐主题：皓白极翠。审批、工单、审计日志都适用。
 */
export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ items, className }) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  const dot = (tone: ActivityItem["tone"]) => {
    switch (tone) {
      case "success":
        return isEmerald ? "bg-[#059669]" : "bg-emerald-400";
      case "warning":
        return isEmerald ? "bg-[#D97706]" : "bg-[#E5A93C]";
      case "error":
        return isEmerald ? "bg-[#E11D48]" : "bg-rose-400";
      default:
        return isEmerald ? "bg-slate-300" : "bg-zinc-600";
    }
  };

  return (
    <ol className={clsx("relative", className)}>
      {items.map((item, i) => (
        <li key={item.id} className="relative flex gap-3 pb-5 last:pb-0">
          {i < items.length - 1 && (
            <span
              aria-hidden="true"
              className={clsx("absolute left-[5px] top-4 bottom-0 w-px", isEmerald ? "bg-slate-200" : "bg-white/10")}
            />
          )}
          <span className={clsx("relative mt-1.5 w-[11px] h-[11px] rounded-full shrink-0 ring-4", dot(item.tone), isEmerald ? "ring-white" : "ring-[#06080F]")} />
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 text-sm">
              <span className={isEmerald ? "text-slate-700" : "text-zinc-300"}>
                <span className={clsx("font-semibold", isEmerald ? "text-slate-900" : "text-white")}>{item.actor}</span>{" "}
                {item.action}
              </span>
              <time className={clsx("font-mono text-sm shrink-0", isEmerald ? "text-slate-400" : "text-zinc-500")}>
                {item.time}
              </time>
            </div>
            {item.comment && (
              <div
                className={clsx(
                  "text-sm leading-relaxed rounded-lg border px-3 py-2",
                  isEmerald ? "bg-slate-50 border-slate-200 text-slate-700" : "bg-white/[0.03] border-white/10 text-zinc-300"
                )}
              >
                {item.comment}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
};
