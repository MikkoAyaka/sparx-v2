import React, { useEffect, useMemo, useRef, useState } from "react";
import { clsx } from "clsx";
import { Play, RotateCcw, Square } from "lucide-react";
import {
  AgentCollaborationBoard,
  AgentThoughtChain,
  Button,
  CodeBlock,
  EmptyState,
  StatusDot,
  TelemetryGauge,
  type AgentHandoffEvent,
  type AgentMember,
  type ThoughtStep,
} from "@/sparx-ui";

type AgentKey = "architect" | "retriever" | "implementer" | "critic";

interface ScriptStep extends Omit<ThoughtStep, "status"> {
  agent: AgentKey;
  tokens: number;
  handoff?: string;
}

const AGENTS: Record<AgentKey, Omit<AgentMember, "status" | "currentTask"> & { busy: AgentMember["status"] }> = {
  architect: { id: "architect", name: "Architect", role: "拆解需求，设计接口", model: "claude-sonnet-5", busy: "reasoning" },
  retriever: { id: "retriever", name: "Retriever", role: "检索仓库代码", model: "claude-haiku-4-5", busy: "executing" },
  implementer: { id: "implementer", name: "Implementer", role: "编写代码", model: "claude-sonnet-5", busy: "executing" },
  critic: { id: "critic", name: "Critic", role: "测试与审查", model: "claude-opus-5-5", busy: "reviewing" },
};

const SCRIPT: ScriptStep[] = [
  {
    id: "s1",
    agent: "architect",
    title: "拆解需求",
    type: "thought",
    durationMs: 1320,
    tokens: 820,
    content: "接口要做三件事：记录四种反应的计数；同一读者改选时旧选项减一；不保存任何个人数据。去重键使用加盐哈希后的匿名凭据。",
  },
  {
    id: "s2",
    agent: "retriever",
    title: "检索现有代码",
    type: "retrieval",
    durationMs: 640,
    tokens: 460,
    toolName: "search_repo",
    toolArgs: { query: "feedback reaction counter", top_k: 3 },
    toolResult: { matches: 3, files: ["api/feedback.ts", "lib/kv.ts", "lib/hash.ts"] },
    handoff: "提交检索结果",
  },
  {
    id: "s3",
    agent: "architect",
    title: "设计数据结构",
    type: "thought",
    durationMs: 980,
    tokens: 610,
    content: "每篇文章用一个 Redis Hash 保存计数，键为 post:{slug}:reactions；读者的选择存为 vote:{slug}:{hash}，180 天后过期。",
    handoff: "交付接口设计",
  },
  {
    id: "s4",
    agent: "implementer",
    title: "编写接口代码",
    type: "tool_call",
    durationMs: 2140,
    tokens: 1240,
    toolName: "write_file",
    toolArgs: { path: "api/reaction.ts", lines: 21 },
    toolResult: { ok: true },
    handoff: "请求审查",
  },
  {
    id: "s5",
    agent: "critic",
    title: "运行测试",
    type: "tool_call",
    durationMs: 1810,
    tokens: 380,
    toolName: "run_tests",
    toolArgs: { suite: "reaction" },
    toolResult: { passed: 12, failed: 0, duration: "1.8s" },
  },
  {
    id: "s6",
    agent: "critic",
    title: "检查并发与边界",
    type: "validation",
    durationMs: 760,
    tokens: 290,
    content: "改选在同一个 MULTI 事务里先减后加，计数不会小于 0；凭据哈希加了盐，无法反推出读者 IP。",
  },
];

const OUTPUT = `export async function POST(req: Request) {
  const { slug, reaction, token } = await req.json();
  if (!REACTIONS.includes(reaction)) {
    return Response.json({ error: "未知的反应类型" }, { status: 400 });
  }

  const voter = await hash(token, SALT);
  const voteKey = \`vote:\${slug}:\${voter}\`;
  const countKey = \`post:\${slug}:reactions\`;

  const previous = await redis.get<string>(voteKey);
  if (previous === reaction) return Response.json({ ok: true });

  const tx = redis.multi();
  if (previous) tx.hincrby(countKey, previous, -1);
  tx.hincrby(countKey, reaction, 1);
  tx.set(voteKey, reaction, { ex: 60 * 60 * 24 * 180 });
  await tx.exec();

  return Response.json({ ok: true });
}`;

const STEP_MS = 1300;
const TOKEN_BUDGET = 8000;
const TOTAL_MS = SCRIPT.reduce((n, s) => n + (s.durationMs ?? 0), 0);

const Panel: React.FC<{ title: string; aside?: React.ReactNode; children: React.ReactNode; className?: string }> = ({
  title,
  aside,
  children,
  className,
}) => (
  <section className={clsx("rounded-2xl border border-white/10 bg-[#06080F] flex flex-col xl:min-h-0", className)}>
    <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between gap-3 shrink-0">
      <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-zinc-400">{title}</h2>
      {aside}
    </div>
    <div className="xl:flex-1 xl:min-h-0 xl:overflow-y-auto subtle-scroll">{children}</div>
  </section>
);

/** 场景：Agent 实验室（虚空绯红） */
export const AgentLabScene: React.FC = () => {
  // completed = 已完成的步骤数；running 为 true 时，第 completed 步正在进行
  const [completed, setCompleted] = useState(SCRIPT.length);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(TOTAL_MS);
  const startRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    const tick = window.setInterval(() => setElapsed(performance.now() - startRef.current), 100);
    const advance = window.setInterval(() => setCompleted((c) => Math.min(c + 1, SCRIPT.length)), STEP_MS);
    return () => {
      window.clearInterval(tick);
      window.clearInterval(advance);
    };
  }, [running]);

  // 最后一步完成后停止计时
  useEffect(() => {
    if (running && completed >= SCRIPT.length) setRunning(false);
  }, [running, completed]);

  const start = () => {
    startRef.current = performance.now();
    setElapsed(0);
    setCompleted(0);
    setRunning(true);
  };

  const stop = () => setRunning(false);

  const finished = completed >= SCRIPT.length;
  const stopped = !running && !finished;

  const steps: ThoughtStep[] = SCRIPT.map((s, i) => ({
    ...s,
    status: i < completed ? "done" : i === completed && running ? "running" : "pending",
  }));

  const current = running ? SCRIPT[completed] : undefined;
  const tokens = SCRIPT.slice(0, completed).reduce((n, s) => n + s.tokens, 0);

  const agents: AgentMember[] = useMemo(
    () =>
      (Object.keys(AGENTS) as AgentKey[]).map((key) => {
        const a = AGENTS[key];
        const own = SCRIPT.map((s, i) => ({ s, i })).filter((x) => x.s.agent === key);
        const allDone = own.every((x) => x.i < completed);
        const isCurrent = current?.agent === key;
        return {
          id: a.id,
          name: a.name,
          role: a.role,
          model: a.model,
          status: isCurrent ? a.busy : allDone ? "done" : "idle",
          currentTask: isCurrent ? current!.title : allDone ? "本轮任务已完成" : "等待上游交付",
        };
      }),
    [completed, current]
  );

  const handoffs: AgentHandoffEvent[] = SCRIPT.slice(0, completed)
    .map((s, i) => ({ s, i }))
    .filter(({ s, i }) => s.handoff && SCRIPT[i + 1])
    .map(({ s, i }) => ({
      id: s.id,
      fromAgent: AGENTS[s.agent].name,
      toAgent: AGENTS[SCRIPT[i + 1].agent].name,
      action: s.handoff!,
      timestamp: `00:${(((i + 1) * STEP_MS) / 1000).toFixed(1).padStart(4, "0")}`,
    }))
    .slice(-3);

  const seconds = (elapsed / 1000).toFixed(2).padStart(5, "0");

  return (
    <div className="h-full overflow-y-auto xl:overflow-hidden subtle-scroll bg-[#020204] text-white">
      {/* xl 以上三栏铺满视口、各栏内部滚动；更窄时自然堆叠，由外层整体滚动 */}
      <div className="xl:h-full flex flex-col gap-4 p-4 sm:p-6">
        {/* 运行控制条 */}
        <div className="shrink-0 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2.5 font-mono text-sm">
              <StatusDot variant={running ? "primary" : finished ? "success" : "warning"} pulse={running} />
              <span className="text-[#E5192D] font-bold uppercase tracking-widest">Agent Lab</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400">run #0427</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">为博客实现一个无状态点赞接口</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="font-mono text-4xl sm:text-5xl font-black tracking-tighter tabular-nums leading-none">
                {seconds}
                <span className="text-lg text-zinc-600 ml-1">s</span>
              </div>
              <div className="font-mono text-sm text-zinc-500 mt-2.5">
                {running ? `第 ${completed + 1} / ${SCRIPT.length} 步` : finished ? "运行完成" : "已停止"}
              </div>
            </div>
            {running ? (
              <Button variant="outline" icon={<Square className="w-3.5 h-3.5" />} onClick={stop}>
                停止运行
              </Button>
            ) : (
              <Button
                variant="flare"
                glow
                icon={finished || stopped ? <RotateCcw className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                onClick={start}
              >
                重新运行
              </Button>
            )}
          </div>
        </div>

        {/* 三栏 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 xl:flex-1 xl:min-h-0">
          <div className="xl:col-span-3 flex flex-col gap-4 xl:min-h-0">
            <Panel title="任务" className="shrink-0">
              <div className="p-4 space-y-3 text-sm leading-relaxed">
                <p className="text-zinc-200">
                  为独立博客实现一个点赞接口：读者可以在四种反应中选一个，改选时旧选项减一。不保存任何个人数据。
                </p>
                <ul className="space-y-1.5 text-zinc-400">
                  {["运行在边缘函数上", "存储使用 Upstash Redis", "12 个现有测试必须通过"].map((c) => (
                    <li key={c} className="flex gap-2">
                      <span className="text-[#E5192D]">›</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Panel>
            <AgentCollaborationBoard
              title="Agent"
              agents={agents}
              recentHandoffs={handoffs}
              className="xl:flex-1 xl:min-h-0 xl:overflow-y-auto subtle-scroll"
            />
          </div>

          <div className="xl:col-span-5 xl:min-h-0 xl:overflow-y-auto subtle-scroll rounded-2xl">
            <AgentThoughtChain
              agentName="思考过程"
              modelName={current ? AGENTS[current.agent].name : "4 个 Agent"}
              steps={steps}
              isStreaming={running}
              totalDurationMs={finished ? TOTAL_MS : undefined}
              tokenUsage={{ total: tokens }}
            />
          </div>

          <div className="md:col-span-2 xl:col-span-4 flex flex-col gap-4 xl:min-h-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0">
              <TelemetryGauge
                label="GPU 利用率"
                value={running ? 78 + ((completed * 7) % 15) : 12}
                unit="%"
                type="circular"
                status={running ? "warning" : "normal"}
                quantization="FP16"
                iconType="cpu"
                subtext={running ? "推理中" : "空闲"}
              />
              <div className="rounded-2xl border border-white/10 bg-[#06080F] p-4 flex flex-col justify-between">
                <div className="font-mono text-sm text-zinc-500">Token 用量</div>
                <div>
                  <div className="font-mono text-3xl font-black tracking-tight tabular-nums">{tokens.toLocaleString()}</div>
                  <div className="h-1 mt-3 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-[#E5192D] transition-[width] duration-500"
                      style={{ width: `${(tokens / TOKEN_BUDGET) * 100}%` }}
                    />
                  </div>
                  <div className="font-mono text-sm text-zinc-600 mt-1.5">预算 {TOKEN_BUDGET.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <Panel title="产出" aside={finished && <span className="font-mono text-sm text-emerald-400">12 / 12 测试通过</span>} className="xl:flex-1">
              {finished ? (
                <div className="p-3">
                  <CodeBlock filename="api/reaction.ts" language="typescript" code={OUTPUT} showLineNumbers />
                </div>
              ) : (
                <EmptyState
                  compact
                  title={running ? "正在生成代码" : "运行已停止"}
                  description={running ? "测试全部通过后，生成的文件会显示在这里。" : "重新运行后，生成的文件会显示在这里。"}
                />
              )}
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
};
