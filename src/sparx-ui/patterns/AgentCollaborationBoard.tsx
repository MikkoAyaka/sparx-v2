import React from "react";
import { clsx } from "clsx";
import { ArrowRight } from "lucide-react";
import { useSparxTheme } from "../tokens/colors";
import { StatusDot } from "../primitives/StatusDot";

export interface AgentMember {
  id: string;
  name: string;
  role: string;
  status: "idle" | "reasoning" | "executing" | "reviewing" | "done";
  currentTask?: string;
  model: string;
}

export interface AgentHandoffEvent {
  id: string;
  fromAgent: string;
  toAgent: string;
  action: string;
  timestamp: string;
}

export interface AgentCollaborationBoardProps {
  title?: string;
  agents: AgentMember[];
  activeAgentId?: string;
  onSelectAgent?: (id: string) => void;
  recentHandoffs?: AgentHandoffEvent[];
  /** 各 Agent 结果的一致程度，0 ~ 100 */
  consensusProgress?: number;
  className?: string;
}

const STATUS: Record<AgentMember["status"], { label: string; dot: "primary" | "info" | "warning" | "success" | "idle"; busy: boolean }> = {
  reasoning: { label: "思考中", dot: "primary", busy: true },
  executing: { label: "执行中", dot: "info", busy: true },
  reviewing: { label: "审查中", dot: "warning", busy: true },
  done: { label: "已完成", dot: "success", busy: false },
  idle: { label: "空闲", dot: "idle", busy: false },
};

/**
 * AgentCollaborationBoard：多智能体名单与任务交接记录。
 * 每一行是一个 Agent：角色、模型、状态和当前任务；正在工作的 Agent 左侧有强调色竖线。
 * 两种主题通用。
 */
export const AgentCollaborationBoard: React.FC<AgentCollaborationBoardProps> = ({
  title = "参与协作的 Agent",
  agents,
  activeAgentId,
  onSelectAgent,
  recentHandoffs = [],
  consensusProgress,
  className,
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";
  const busyCount = agents.filter((a) => STATUS[a.status].busy).length;

  return (
    <div
      className={clsx(
        "rounded-2xl border overflow-hidden",
        isEmerald ? "bg-white border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]" : "bg-[#06080F] border-white/10",
        className
      )}
    >
      <div
        className={clsx(
          "px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 border-b",
          isEmerald ? "border-slate-200" : "border-white/10"
        )}
      >
        <h3 className={clsx("text-sm font-bold", isEmerald ? "text-slate-900" : "text-white")}>{title}</h3>
        <span className={clsx("font-mono text-sm", isEmerald ? "text-slate-500" : "text-zinc-500")}>
          {busyCount} / {agents.length} 工作中
        </span>
      </div>

      <ul className={clsx("divide-y", isEmerald ? "divide-slate-100" : "divide-white/[0.06]")}>
        {agents.map((agent) => {
          const s = STATUS[agent.status];
          const selected = agent.id === activeAgentId;
          return (
            <li key={agent.id}>
              <button
                type="button"
                disabled={!onSelectAgent}
                onClick={() => onSelectAgent?.(agent.id)}
                className={clsx(
                  "relative w-full text-left px-4 sm:px-5 py-3.5 flex gap-3 transition-colors",
                  onSelectAgent && "cursor-pointer",
                  selected ? (isEmerald ? "bg-emerald-50/50" : "bg-white/[0.04]") : onSelectAgent && (isEmerald ? "hover:bg-slate-50" : "hover:bg-white/[0.02]")
                )}
              >
                {s.busy && (
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "absolute left-0 top-3 bottom-3 w-0.5 rounded-full",
                      isEmerald ? "bg-[#059669]" : "bg-[#E5192D] shadow-[0_0_8px_#E5192D]"
                    )}
                  />
                )}
                <span
                  className={clsx(
                    "w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-sm shrink-0 border",
                    s.busy
                      ? isEmerald
                        ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                        : "bg-[#E5192D]/15 border-[#E5192D]/30 text-red-200"
                      : isEmerald
                      ? "bg-slate-50 border-slate-200 text-slate-500"
                      : "bg-white/5 border-white/10 text-zinc-400"
                  )}
                >
                  {agent.name.slice(0, 2).toUpperCase()}
                </span>
                <span className="flex-1 min-w-0 space-y-1">
                  <span className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    <span className="flex items-baseline gap-2 min-w-0">
                      <span className={clsx("text-sm font-semibold truncate", isEmerald ? "text-slate-900" : "text-white")}>
                        {agent.name}
                      </span>
                      <span className={clsx("text-sm truncate", isEmerald ? "text-slate-500" : "text-zinc-500")}>{agent.role}</span>
                    </span>
                    <span className={clsx("flex items-center gap-1.5 text-sm shrink-0", isEmerald ? "text-slate-600" : "text-zinc-300")}>
                      <StatusDot variant={s.dot} pulse={s.busy} size="sm" />
                      {s.label}
                    </span>
                  </span>
                  {agent.currentTask && (
                    <span className={clsx("block text-sm leading-relaxed", isEmerald ? "text-slate-600" : "text-zinc-400")}>
                      {agent.currentTask}
                    </span>
                  )}
                  <span className={clsx("block font-mono text-sm", isEmerald ? "text-slate-400" : "text-zinc-600")}>{agent.model}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {(typeof consensusProgress === "number" || recentHandoffs.length > 0) && (
        <div className={clsx("px-4 sm:px-5 py-4 border-t space-y-4", isEmerald ? "border-slate-200 bg-slate-50/60" : "border-white/10 bg-black/20")}>
          {typeof consensusProgress === "number" && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className={isEmerald ? "text-slate-500" : "text-zinc-500"}>结果一致度</span>
                <span className={clsx("font-mono font-bold", isEmerald ? "text-slate-900" : "text-white")}>{consensusProgress}%</span>
              </div>
              <div className={clsx("h-1.5 rounded-full overflow-hidden", isEmerald ? "bg-slate-200" : "bg-white/10")}>
                <div
                  className={clsx("h-full rounded-full transition-[width] duration-500", isEmerald ? "bg-[#059669]" : "bg-[#E5192D]")}
                  style={{ width: `${consensusProgress}%` }}
                />
              </div>
            </div>
          )}

          {recentHandoffs.length > 0 && (
            <ol className="space-y-1.5">
              {recentHandoffs.map((h) => (
                <li key={h.id} className="flex items-center gap-2 text-sm font-mono min-w-0">
                  <span className={clsx("shrink-0", isEmerald ? "text-slate-400" : "text-zinc-600")}>{h.timestamp}</span>
                  <span className={clsx("shrink-0", isEmerald ? "text-slate-700" : "text-zinc-300")}>{h.fromAgent}</span>
                  <ArrowRight className={clsx("w-3.5 h-3.5 shrink-0", isEmerald ? "text-[#059669]" : "text-[#E5192D]")} />
                  <span className={clsx("shrink-0", isEmerald ? "text-slate-700" : "text-zinc-300")}>{h.toAgent}</span>
                  <span className={clsx("truncate font-sans", isEmerald ? "text-slate-500" : "text-zinc-500")}>{h.action}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
};
