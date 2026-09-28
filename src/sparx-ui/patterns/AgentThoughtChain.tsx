import React, { useState } from "react";
import { clsx } from "clsx";
import { AlertCircle, Brain, ChevronDown, Database, Loader2, ShieldCheck, Wrench } from "lucide-react";
import { useSparxTheme } from "../tokens/colors";
import { StatusDot } from "../primitives/StatusDot";

export interface ThoughtStep {
  id: string;
  title: string;
  type?: "thought" | "tool_call" | "retrieval" | "validation";
  content?: string;
  toolName?: string;
  toolArgs?: Record<string, unknown> | string;
  toolResult?: Record<string, unknown> | string;
  durationMs?: number;
  status: "pending" | "running" | "done" | "error";
}

export interface AgentThoughtChainProps {
  agentName?: string;
  modelName?: string;
  steps: ThoughtStep[];
  totalDurationMs?: number;
  tokenUsage?: { prompt?: number; completion?: number; total?: number };
  isStreaming?: boolean;
  defaultExpanded?: boolean;
  className?: string;
}

const TYPE_META: Record<NonNullable<ThoughtStep["type"]>, { label: string; icon: React.ReactNode }> = {
  thought: { label: "推理", icon: <Brain className="w-3.5 h-3.5" /> },
  tool_call: { label: "工具调用", icon: <Wrench className="w-3.5 h-3.5" /> },
  retrieval: { label: "检索", icon: <Database className="w-3.5 h-3.5" /> },
  validation: { label: "校验", icon: <ShieldCheck className="w-3.5 h-3.5" /> },
};

const formatMs = (ms: number) => (ms >= 1000 ? `${(ms / 1000).toFixed(2)}s` : `${ms}ms`);
const formatJson = (v: unknown) => (typeof v === "string" ? v : JSON.stringify(v, null, 2));

/**
 * AgentThoughtChain：Agent 的思考过程。按时间顺序列出推理、检索、工具调用和校验，
 * 每一步显示耗时，工具调用可以展开查看参数和返回值。支持逐步流式追加。
 * 两种主题通用；虚空绯红下运行中的步骤会带绯红脉冲。
 */
export const AgentThoughtChain: React.FC<AgentThoughtChainProps> = ({
  agentName = "Agent",
  modelName,
  steps,
  totalDurationMs,
  tokenUsage,
  isStreaming = false,
  defaultExpanded = true,
  className,
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [openTools, setOpenTools] = useState<Record<string, boolean>>({});

  const doneCount = steps.filter((s) => s.status === "done").length;
  const accent = isEmerald ? "text-[#059669]" : "text-[#E5192D]";

  const node = (step: ThoughtStep) => {
    const base = "relative z-10 w-7 h-7 rounded-full border flex items-center justify-center shrink-0";
    if (step.status === "running")
      return (
        <span
          className={clsx(
            base,
            isEmerald ? "bg-white border-[#059669] text-[#059669]" : "bg-[#E5192D] border-[#E5192D] text-white shadow-[0_0_14px_rgba(229,25,45,0.6)]"
          )}
        >
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        </span>
      );
    if (step.status === "error")
      return (
        <span className={clsx(base, isEmerald ? "bg-rose-50 border-rose-300 text-[#E11D48]" : "bg-rose-500/15 border-rose-400/50 text-rose-300")}>
          <AlertCircle className="w-3.5 h-3.5" />
        </span>
      );
    if (step.status === "done")
      return (
        <span className={clsx(base, isEmerald ? "bg-emerald-50 border-emerald-200 text-[#059669]" : "bg-white/5 border-white/15 text-zinc-200")}>
          {TYPE_META[step.type ?? "thought"].icon}
        </span>
      );
    return (
      <span className={clsx(base, "border-dashed", isEmerald ? "bg-white border-slate-300 text-slate-300" : "bg-transparent border-white/15 text-zinc-700")}>
        {TYPE_META[step.type ?? "thought"].icon}
      </span>
    );
  };

  return (
    <div
      className={clsx(
        "@container rounded-2xl border overflow-hidden",
        isEmerald ? "bg-white border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]" : "bg-[#06080F] border-white/10",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className={clsx(
          "w-full px-4 sm:px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b text-left cursor-pointer transition-colors",
          isEmerald ? "border-slate-200 hover:bg-slate-50" : "border-white/10 hover:bg-white/[0.02]"
        )}
      >
        <span className="flex items-center gap-2.5 min-w-0">
          <StatusDot variant={isStreaming ? "primary" : "idle"} pulse={isStreaming} />
          <span className={clsx("font-bold text-sm truncate", isEmerald ? "text-slate-900" : "text-white")}>{agentName}</span>
          {modelName && (
            <span
              className={clsx(
                "font-mono text-sm px-2 py-0.5 rounded border shrink-0",
                isEmerald ? "bg-slate-50 border-slate-200 text-slate-600" : "bg-white/5 border-white/10 text-zinc-400"
              )}
            >
              {modelName}
            </span>
          )}
        </span>
        <span className={clsx("flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-sm", isEmerald ? "text-slate-500" : "text-zinc-500")}>
          <span>
            <span className={clsx("font-bold", isEmerald ? "text-slate-900" : "text-white")}>{doneCount}</span> / {steps.length} 步
          </span>
          {typeof totalDurationMs === "number" && <span>{formatMs(totalDurationMs)}</span>}
          {tokenUsage?.total !== undefined && <span>{tokenUsage.total.toLocaleString()} tokens</span>}
          <ChevronDown className={clsx("w-4 h-4 transition-transform", expanded && "rotate-180")} />
        </span>
      </button>

      {expanded && (
        <ol className="p-4 sm:p-5">
          {steps.map((step, i) => {
            const meta = TYPE_META[step.type ?? "thought"];
            const hasTool = Boolean(step.toolName);
            const toolOpen = openTools[step.id] ?? false;
            const pending = step.status === "pending";
            return (
              <li key={step.id} className={clsx("relative flex gap-3.5 pb-5 last:pb-0", pending && "opacity-45")}>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "absolute left-[13px] top-7 bottom-0 w-px",
                      step.status === "done"
                        ? isEmerald
                          ? "bg-emerald-200"
                          : "bg-white/20"
                        : isEmerald
                        ? "bg-slate-200"
                        : "bg-white/[0.07]"
                    )}
                  />
                )}
                {node(step)}
                <div className="flex-1 min-w-0 space-y-2 pt-0.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    <div className="flex items-baseline gap-2.5 min-w-0">
                      <span className={clsx("text-sm font-semibold", isEmerald ? "text-slate-900" : "text-white")}>{step.title}</span>
                      <span className={clsx("font-mono text-sm shrink-0", step.status === "running" ? accent : isEmerald ? "text-slate-400" : "text-zinc-600")}>
                        {step.status === "running" ? "进行中" : meta.label}
                      </span>
                    </div>
                    {typeof step.durationMs === "number" && step.status === "done" && (
                      <span className={clsx("font-mono text-sm", isEmerald ? "text-slate-400" : "text-zinc-500")}>{formatMs(step.durationMs)}</span>
                    )}
                  </div>

                  {step.content && !pending && (
                    <p className={clsx("text-sm leading-relaxed", isEmerald ? "text-slate-600" : "text-zinc-400")}>{step.content}</p>
                  )}

                  {hasTool && !pending && (
                    <div className={clsx("rounded-lg border overflow-hidden", isEmerald ? "border-slate-200" : "border-white/10")}>
                      <button
                        type="button"
                        onClick={() => setOpenTools((p) => ({ ...p, [step.id]: !toolOpen }))}
                        aria-expanded={toolOpen}
                        className={clsx(
                          "w-full flex items-center justify-between gap-2 px-3 py-2 font-mono text-sm cursor-pointer transition-colors",
                          isEmerald ? "bg-slate-50 text-slate-700 hover:bg-slate-100" : "bg-white/[0.03] text-zinc-300 hover:bg-white/[0.06]"
                        )}
                      >
                        <span className="truncate">
                          <span className={accent}>›</span> {step.toolName}()
                        </span>
                        <span className={clsx("flex items-center gap-1 shrink-0", isEmerald ? "text-slate-400" : "text-zinc-500")}>
                          <span className="hidden @md:inline">{toolOpen ? "收起" : "查看参数与返回值"}</span>
                          <ChevronDown className={clsx("w-3.5 h-3.5 transition-transform", toolOpen && "rotate-180")} />
                        </span>
                      </button>
                      {toolOpen && (
                        <div className={clsx("grid @xl:grid-cols-2 divide-y @xl:divide-y-0 @xl:divide-x font-mono text-sm", isEmerald ? "divide-slate-200" : "divide-white/10")}>
                          {[
                            { label: "参数", value: step.toolArgs },
                            { label: "返回值", value: step.toolResult },
                          ].map((b) => (
                            <div key={b.label} className="p-3 min-w-0">
                              <div className={clsx("mb-1.5", isEmerald ? "text-slate-400" : "text-zinc-500")}>{b.label}</div>
                              <pre className={clsx("whitespace-pre-wrap break-all leading-relaxed", isEmerald ? "text-slate-700" : "text-zinc-300")}>
                                {b.value === undefined ? "—" : formatJson(b.value)}
                              </pre>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};
