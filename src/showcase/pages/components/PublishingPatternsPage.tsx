import React, { useRef, useState } from "react";
import { Newspaper } from "lucide-react";
import {
  AgentCollaborationBoard,
  AgentThoughtChain,
  Button,
  FeedbackDock,
  SegmentedRail,
  SiteMasthead,
  SplitMonograph,
  StageHeroCard,
  useActiveSection,
} from "@/sparx-ui";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PageIntro } from "../../components/PageIntro";
import { EDITORIAL_ENTRIES } from "../../scenes/EditorialScene";
import type { RouteId } from "../../routes";

const MONO_SECTIONS = [
  { id: "p-why", title: "为什么离开平台" },
  { id: "p-stage", title: "首页一屏只放一篇" },
  { id: "p-split", title: "左栏固定，右栏滚动" },
];

export const PublishingPatternsPage: React.FC<{ onNavigate: (id: RouteId) => void }> = ({ onNavigate }) => {
  const [stageIndex, setStageIndex] = useState(0);
  const [railIndex, setRailIndex] = useState(1);
  const [section, setSection] = useState<"posts" | "notes" | "about">("posts");
  const canvasRef = useRef<HTMLDivElement>(null);
  const { activeId, progress, scrollTo } = useActiveSection(canvasRef, MONO_SECTIONS.map((s) => s.id));

  return (
    <div className="w-full min-w-0 space-y-12">
      <PageIntro
        eyebrow="Patterns · 出版与表达"
        icon={<Newspaper className="w-4 h-4" />}
        title="出版与表达"
        actions={
          <>
            <Button variant="flare" size="sm" withArrow onClick={() => onNavigate("scene-editorial")}>
              打开出版首页场景
            </Button>
            <Button variant="outline" size="sm" onClick={() => onNavigate("scene-agent-lab")}>
              打开 Agent 实验室
            </Button>
          </>
        }
      >
        <p>
          这一组复合模式为需要张力的页面设计：一屏一个重点、超大标题、全幅媒体。推荐搭配虚空绯红使用；它们在皓白极翠下也能正常显示，但会失去大部分表现力。
        </p>
      </PageIntro>

      <ComponentPreview
        title="StageHeroCard 主舞台"
        recommend="void-flare"
        description="一屏只放一篇文章：左侧 60% 是封面，向右渐变过渡；右侧是描边大编号、标题和阅读入口；底部是分段导航。在独立页面里，滚轮和方向键可以翻篇；嵌在文档页时应关闭，避免抢走页面滚动。"
        bleed
        code={`import { StageHeroCard, SiteMasthead } from "@/sparx-ui";

<div className="h-[100dvh]">
  <StageHeroCard
    entries={entries}
    activeIndex={index}
    onChangeIndex={setIndex}
    onOpenEntry={(entry) => router.push(\`/posts/\${entry.id}\`)}
    header={<SiteMasthead brand="Mikko Ayaka" links={links} activeId="posts" />}
  />
</div>`}
      >
        <div className="h-[600px]">
          <StageHeroCard
            entries={EDITORIAL_ENTRIES}
            activeIndex={stageIndex}
            onChangeIndex={setStageIndex}
            enableWheel={false}
            enableKeyboard={false}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="SiteMasthead 刊头"
        recommend="void-flare"
        description="独立站点的顶部：品牌名用等宽大写字母，当前栏目下方有一条绯红短线。窄屏时隐藏栏目，只保留品牌和操作按钮。"
        code={`<SiteMasthead
  brand="Mikko Ayaka"
  tagline="写系统架构，也写被系统影响的人"
  links={[{ id: "posts", label: "文章" }, { id: "notes", label: "笔记" }, { id: "about", label: "关于" }]}
  activeId={section}
  onSelect={setSection}
  actions={<Button variant="outline" size="sm">订阅</Button>}
/>`}
      >
        <SiteMasthead
          className="w-full"
          brand="Mikko Ayaka"
          tagline="写系统架构，也写被系统影响的人"
          links={[
            { id: "posts", label: "文章" },
            { id: "notes", label: "笔记" },
            { id: "about", label: "关于" },
          ]}
          activeId={section}
          onSelect={setSection}
          actions={
            <Button variant="outline" size="sm">
              订阅
            </Button>
          }
        />
      </ComponentPreview>

      <ComponentPreview
        title="SegmentedRail 分段导航"
        recommend="void-flare"
        description="每一段代表一篇文章：编号、标题、日期。桌面端平铺全部分段；窄屏只显示当前编号、翻页按钮和分段条。"
        code={`<SegmentedRail
  items={[{ id: "1", title: "摆脱被动投喂", meta: "09-18" }, ...]}
  activeIndex={index}
  onSelect={setIndex}
/>`}
      >
        <SegmentedRail
          className="w-full"
          items={EDITORIAL_ENTRIES.map((e) => ({ id: e.id, title: e.title.split("：")[0], meta: e.date?.slice(5) }))}
          activeIndex={railIndex}
          onSelect={setRailIndex}
        />
      </ComponentPreview>

      <ComponentPreview
        title="SplitMonograph 双栏长文"
        recommend="void-flare"
        description="左侧 35% 固定，显示封面、目录和阅读进度；右侧 65% 是唯一的滚动区域。配合 useActiveSection，读到哪一节，左侧目录就高亮哪一节。可以在下方预览里滚动试试。"
        bleed
        code={`import { SplitMonograph, useActiveSection } from "@/sparx-ui";

const canvasRef = useRef<HTMLDivElement>(null);
const { activeId, progress, scrollTo } = useActiveSection(canvasRef, sections.map((s) => s.id));

<SplitMonograph
  title="摆脱被动投喂"
  sections={sections}
  activeSectionId={activeId}
  onSectionSelect={scrollTo}
  progress={progress}
  canvasRef={canvasRef}
>
  <h2 id="why">为什么离开平台</h2>
  ...
</SplitMonograph>`}
      >
        <div className="h-[560px]">
          <SplitMonograph
            title="摆脱被动投喂：基于边缘计算的独立出版系统实践"
            category="系统工程"
            date="2026-09-18"
            readingMinutes={7}
            cover={EDITORIAL_ENTRIES[0].cover}
            sections={MONO_SECTIONS}
            activeSectionId={activeId}
            onSectionSelect={scrollTo}
            progress={progress}
            canvasRef={canvasRef}
          >
            {MONO_SECTIONS.map((s, i) => (
              <section key={s.id} className="mb-10">
                <h2 id={s.id} className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-sm font-bold text-[#E5192D]">0{i + 1}</span>
                  <span className="text-2xl font-black tracking-tight">{s.title}</span>
                </h2>
                {[0, 1, 2].map((k) => (
                  <p key={k} className="text-base leading-[1.85] opacity-70 mb-4">
                    这是示例正文。左栏固定不动，右栏是唯一的滚动区域。某一节的标题越过右栏高度的 45% 时，左侧目录会切换到这一节，底部的进度条也会同步变化。
                  </p>
                ))}
              </section>
            ))}
          </SplitMonograph>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="FeedbackDock 读者反馈"
        recommend="both"
        description="文末的反应按钮。点一下计数立即加一，改选时旧选项减一；不需要登录，也不需要评论框。在皓白极翠的文档页里可以关闭计数，改成“有帮助 / 没有帮助”。"
        code={`<FeedbackDock
  options={[
    { id: "useful", label: "很有启发", emoji: "⚡", count: 42 },
    { id: "thinking", label: "引发思考", emoji: "✦", count: 28 },
  ]}
  onSelectReaction={(id) => fetch("/api/channel-feedback", { method: "POST", body: JSON.stringify({ slug, reactionId: id }) })}
/>`}
      >
        <FeedbackDock
          className="w-full max-w-2xl"
          options={[
            { id: "useful", label: "很有启发", emoji: "⚡", count: 42 },
            { id: "thinking", label: "引发思考", emoji: "✦", count: 28 },
            { id: "arguable", label: "值得商榷", emoji: "◈", count: 15 },
            { id: "design", label: "设计很好", emoji: "❖", count: 64 },
          ]}
        />
      </ComponentPreview>

      <ComponentPreview
        title="AgentThoughtChain 思考过程"
        recommend="both"
        description="按时间顺序展示推理、检索、工具调用和校验。步骤有未开始、进行中、完成、失败四种状态，可以逐步追加，适合展示流式运行；工具调用可以展开查看参数和返回值。"
        code={`<AgentThoughtChain
  agentName="Architect"
  modelName="claude-sonnet-5"
  isStreaming
  steps={[
    { id: "1", title: "拆解需求", type: "thought", status: "done", durationMs: 1320, content: "..." },
    { id: "2", title: "检索现有代码", type: "retrieval", status: "running", toolName: "search_repo" },
    { id: "3", title: "编写接口代码", type: "tool_call", status: "pending" },
  ]}
/>`}
      >
        <AgentThoughtChain
          className="w-full max-w-2xl"
          agentName="Architect"
          modelName="claude-sonnet-5"
          isStreaming
          tokenUsage={{ total: 1280 }}
          steps={[
            {
              id: "1",
              title: "拆解需求",
              type: "thought",
              status: "done",
              durationMs: 1320,
              content: "接口要记录四种反应的计数；同一读者改选时旧选项减一；不保存个人数据。",
            },
            {
              id: "2",
              title: "检索现有代码",
              type: "retrieval",
              status: "done",
              durationMs: 640,
              toolName: "search_repo",
              toolArgs: { query: "feedback reaction counter", top_k: 3 },
              toolResult: { matches: 3, files: ["api/feedback.ts", "lib/kv.ts"] },
            },
            { id: "3", title: "设计数据结构", type: "thought", status: "running" },
            { id: "4", title: "编写接口代码", type: "tool_call", status: "pending" },
          ]}
        />
      </ComponentPreview>

      <ComponentPreview
        title="AgentCollaborationBoard 多 Agent 名单"
        recommend="both"
        description="每行一个 Agent：角色、模型、状态和当前任务。正在工作的 Agent 左侧有一条强调色竖线；底部是任务交接记录。"
        code={`<AgentCollaborationBoard
  agents={[
    { id: "a1", name: "Architect", role: "拆解需求", status: "reasoning", model: "claude-sonnet-5", currentTask: "设计数据结构" },
    { id: "a2", name: "Implementer", role: "编写代码", status: "idle", model: "claude-sonnet-5" },
  ]}
  recentHandoffs={[{ id: "1", fromAgent: "Retriever", toAgent: "Architect", action: "提交检索结果", timestamp: "00:02.6" }]}
/>`}
      >
        <AgentCollaborationBoard
          className="w-full max-w-2xl"
          agents={[
            { id: "a1", name: "Architect", role: "拆解需求，设计接口", status: "reasoning", model: "claude-sonnet-5", currentTask: "设计数据结构" },
            { id: "a2", name: "Retriever", role: "检索仓库代码", status: "done", model: "claude-haiku-4-5", currentTask: "本轮任务已完成" },
            { id: "a3", name: "Implementer", role: "编写代码", status: "idle", model: "claude-sonnet-5", currentTask: "等待接口设计" },
          ]}
          recentHandoffs={[{ id: "1", fromAgent: "Retriever", toAgent: "Architect", action: "提交检索结果", timestamp: "00:02.6" }]}
        />
      </ComponentPreview>
    </div>
  );
};
