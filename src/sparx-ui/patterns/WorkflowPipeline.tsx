import React from "react";
import { clsx } from "clsx";
import { Check, Loader2, Minus, X } from "lucide-react";
import { useSparxTheme } from "../tokens/colors";

export interface PipelineNode {
  id: string;
  name: string;
  description?: string;
  status: "completed" | "in_progress" | "pending" | "failed" | "skipped";
  /** 负责人 */
  assignee?: string;
  /** 完成时间或耗时，例如“09-27 14:20”或“0.4s” */
  duration?: string;
  /** 该步骤留下的意见 */
  comment?: string;
}

export interface WorkflowPipelineProps {
  title?: string;
  nodes: PipelineNode[];
  activeNodeId?: string;
  onSelectNode?: (nodeId: string) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const STATUS_TEXT: Record<PipelineNode["status"], string> = {
  completed: "已完成",
  in_progress: "进行中",
  pending: "未开始",
  failed: "未通过",
  skipped: "已跳过",
};

/**
 * WorkflowPipeline：多步骤流程的进度。横向用于顶部概览，纵向用于详情页侧栏。
 * 两种主题通用；皓白极翠下用于审批与工单，虚空绯红下用于构建与发布流程。
 */
export const WorkflowPipeline: React.FC<WorkflowPipelineProps> = ({
  title,
  nodes,
  activeNodeId,
  onSelectNode,
  orientation = "horizontal",
  className,
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";
  const accent = isEmerald ? "#059669" : "#E5192D";
  const done = nodes.filter((n) => n.status === "completed").length;

  const marker = (node: PipelineNode, index: number) => {
    const base = "relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-mono font-bold border-2 transition-colors";
    switch (node.status) {
      case "completed":
        return (
          <span className={clsx(base, "text-white")} style={{ background: accent, borderColor: accent }}>
            <Check className="w-4 h-4" strokeWidth={3} />
          </span>
        );
      case "in_progress":
        return (
          <span
            className={clsx(base, isEmerald ? "bg-white" : "bg-[#030406] shadow-[0_0_12px_rgba(229,25,45,0.45)]")}
            style={{ borderColor: accent, color: accent }}
          >
            <Loader2 className="w-4 h-4 animate-spin" />
          </span>
        );
      case "failed":
        return (
          <span className={clsx(base, isEmerald ? "bg-rose-50 border-[#E11D48] text-[#E11D48]" : "bg-rose-500/10 border-rose-400 text-rose-300")}>
            <X className="w-4 h-4" strokeWidth={3} />
          </span>
        );
      case "skipped":
        return (
          <span className={clsx(base, isEmerald ? "bg-slate-50 border-slate-200 text-slate-400" : "bg-white/5 border-white/10 text-zinc-500")}>
            <Minus className="w-4 h-4" />
          </span>
        );
      default:
        return (
          <span className={clsx(base, isEmerald ? "bg-white border-slate-200 text-slate-400" : "bg-[#030406] border-white/15 text-zinc-500")}>
            {index + 1}
          </span>
        );
    }
  };

  const statusColor = (s: PipelineNode["status"]) =>
    s === "in_progress"
      ? isEmerald
        ? "text-[#059669]"
        : "text-[#FF2D55]"
      : s === "failed"
      ? isEmerald
        ? "text-[#E11D48]"
        : "text-rose-300"
      : isEmerald
      ? "text-slate-500"
      : "text-zinc-500";

  const lineDone = (i: number) => nodes[i].status === "completed";

  const header = title && (
    <div className="flex items-center justify-between gap-3 mb-5">
      <h3 className={clsx("text-sm font-bold", isEmerald ? "text-slate-900" : "text-white")}>{title}</h3>
      <span className={clsx("text-sm font-mono", isEmerald ? "text-slate-500" : "text-zinc-500")}>
        {done} / {nodes.length} 已完成
      </span>
    </div>
  );

  if (orientation === "vertical") {
    return (
      <div className={className}>
        {header}
        <ol>
          {nodes.map((node, i) => {
            const selected = node.id === activeNodeId;
            return (
              <li key={node.id} className="relative flex gap-3.5 pb-6 last:pb-0">
                {i < nodes.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[15px] top-8 bottom-0 w-0.5"
                    style={{ background: lineDone(i) ? accent : isEmerald ? "#E2E8F0" : "rgba(255,255,255,0.1)" }}
                  />
                )}
                {marker(node, i)}
                <button
                  type="button"
                  disabled={!onSelectNode}
                  onClick={() => onSelectNode?.(node.id)}
                  className={clsx(
                    "flex-1 min-w-0 text-left space-y-1 pt-1 rounded-lg",
                    onSelectNode && "cursor-pointer",
                    selected && (isEmerald ? "bg-emerald-50/60 -mx-2 px-2 pb-2" : "bg-white/5 -mx-2 px-2 pb-2")
                  )}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <span className={clsx("text-sm font-semibold", isEmerald ? "text-slate-900" : "text-white", node.status === "pending" && "opacity-60")}>
                      {node.name}
                    </span>
                    <span className={clsx("text-sm", statusColor(node.status))}>{STATUS_TEXT[node.status]}</span>
                  </div>
                  {(node.assignee || node.duration) && (
                    <div className={clsx("text-sm", isEmerald ? "text-slate-500" : "text-zinc-500")}>
                      {[node.assignee, node.duration].filter(Boolean).join(" · ")}
                    </div>
                  )}
                  {node.description && (
                    <p className={clsx("text-sm leading-relaxed", isEmerald ? "text-slate-600" : "text-zinc-400")}>{node.description}</p>
                  )}
                  {node.comment && (
                    <p
                      className={clsx(
                        "text-sm leading-relaxed border-l-2 pl-3",
                        isEmerald ? "border-slate-200 text-slate-600" : "border-white/15 text-zinc-300"
                      )}
                    >
                      {node.comment}
                    </p>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  return (
    <div className={className}>
      {header}
      <div className="overflow-x-auto no-scrollbar">
        <ol className="flex min-w-max sm:min-w-0">
          {nodes.map((node, i) => (
            <li key={node.id} className="relative flex-1 min-w-36 pr-4 last:pr-0">
              {i < nodes.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-10 right-2 top-[15px] h-0.5"
                  style={{ background: lineDone(i) ? accent : isEmerald ? "#E2E8F0" : "rgba(255,255,255,0.1)" }}
                />
              )}
              <button
                type="button"
                disabled={!onSelectNode}
                onClick={() => onSelectNode?.(node.id)}
                className={clsx("text-left space-y-2", onSelectNode && "cursor-pointer")}
              >
                {marker(node, i)}
                <div className="space-y-0.5 pr-2">
                  <div className={clsx("text-sm font-semibold", isEmerald ? "text-slate-900" : "text-white", node.status === "pending" && "opacity-60")}>
                    {node.name}
                  </div>
                  <div className={clsx("text-sm", statusColor(node.status))}>
                    {node.status === "completed" && node.duration ? node.duration : STATUS_TEXT[node.status]}
                  </div>
                  {node.assignee && (
                    <div className={clsx("text-sm", isEmerald ? "text-slate-500" : "text-zinc-500")}>{node.assignee}</div>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
