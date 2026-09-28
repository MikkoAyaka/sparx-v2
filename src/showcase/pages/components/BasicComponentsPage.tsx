import React, { useState } from "react";
import {
  Button,
  Badge,
  Tag,
  StatusDot,
  ReadingGauge,
  PillDock,
  GlassCard,
  CodeBlock,
  MetricStatCard,
  DataTable,
  DataTableStatusBadge,
  Select,
  TelemetryGauge,
  type StatusDotProps,
  useSparxTheme,
} from "@/sparx-ui";
import { Box, Database } from "lucide-react";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PageIntro } from "../../components/PageIntro";

export const BasicComponentsPage: React.FC = () => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  // Button controls
  const [btnVariant, setBtnVariant] = useState<"flare" | "outline" | "ghost" | "glass" | "subtle">("flare");
  const [btnSize, setBtnSize] = useState<"sm" | "md" | "lg">("md");
  const [btnArrow, setBtnArrow] = useState(true);
  const [btnGlow, setBtnGlow] = useState(true);

  // StatusDot controls
  const [dotStatus, setDotStatus] = useState<StatusDotProps["status"]>("live");
  const [dotPulse, setDotPulse] = useState(true);

  // Select controls
  const [selectSize, setSelectSize] = useState<"sm" | "md" | "lg">("md");
  const [selectVariant, setSelectVariant] = useState<"default" | "ghost" | "glass">("default");
  const [selectedModel, setSelectedModel] = useState("claude-3-5-sonnet");

  // ReadingGauge controls
  const [gaugeMinutes, setGaugeMinutes] = useState(7);

  // PillDock controls
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full min-w-0 space-y-12">
      <PageIntro eyebrow="Components · 基础组件" icon={<Box className="w-4 h-4" />} title="基础组件">
        <p>按钮、下拉选择、标签、状态点、导航、卡片和代码块。每个组件都会读取当前主题，切换右上角的主题可以对比两种效果。示例上方可以调整参数，“代码”标签页里是对应的写法。</p>
      </PageIntro>

      {/* 1. Button 按钮 */}
      <ComponentPreview
        title="Button 按钮"
        description="提供主色、线框、幽灵、毛玻璃等形态，可选悬停时右移的箭头和发光效果。"
        controls={
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400">形态：</span>
              <Select
                size="sm"
                value={btnVariant}
                onChange={(val) => setBtnVariant(val as any)}
                options={[
                  { value: "flare", label: `flare (主色)` },
                  { value: "outline", label: "outline (线框)" },
                  { value: "ghost", label: "ghost (幽灵)" },
                  { value: "glass", label: "glass (毛玻璃)" },
                  { value: "subtle", label: "subtle (次级表面)" },
                ]}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400">尺寸：</span>
              <Select
                size="sm"
                value={btnSize}
                onChange={(val) => setBtnSize(val as any)}
                options={[
                  { value: "sm", label: "sm" },
                  { value: "md", label: "md" },
                  { value: "lg", label: "lg" },
                ]}
              />
            </div>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={btnArrow}
                onChange={(e) => setBtnArrow(e.target.checked)}
                className={isEmerald ? "accent-[#059669]" : "accent-[#E5192D]"}
              />
              <span>显示箭头</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={btnGlow}
                onChange={(e) => setBtnGlow(e.target.checked)}
                className={isEmerald ? "accent-[#059669]" : "accent-[#E5192D]"}
              />
              <span>发光效果</span>
            </label>
          </div>
        }
        code={`import { Button } from "@/sparx-ui";

<Button
  variant="${btnVariant}"
  size="${btnSize}"
  withArrow={${btnArrow}}
  glow={${btnGlow}}
  onClick={() => console.log("Clicked")}
>
  阅读全文
</Button>`}
      >
        <Button
          variant={btnVariant}
          size={btnSize}
          withArrow={btnArrow}
          glow={btnGlow}
        >
          阅读全文
        </Button>
      </ComponentPreview>

      {/* 2. Select 下拉选择器 */}
      <ComponentPreview
        title="Select 下拉选择器"
        description="替代浏览器原生下拉框：展开时箭头旋转，浮层带毛玻璃效果，支持键盘操作，并适配两种主题。"
        controls={
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400">尺寸：</span>
              <Select
                size="sm"
                value={selectSize}
                onChange={(val) => setSelectSize(val as any)}
                options={[
                  { value: "sm", label: "sm (紧凑)" },
                  { value: "md", label: "md (标准)" },
                  { value: "lg", label: "lg (大型)" },
                ]}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400">形态：</span>
              <Select
                size="sm"
                value={selectVariant}
                onChange={(val) => setSelectVariant(val as any)}
                options={[
                  { value: "default", label: "default (标准)" },
                  { value: "ghost", label: "ghost (线框)" },
                  { value: "glass", label: "glass (毛玻璃)" },
                ]}
              />
            </div>
          </div>
        }
        code={`import { Select } from "@/sparx-ui";

<Select
  label="模型"
  size="${selectSize}"
  variant="${selectVariant}"
  value="${selectedModel}"
  onChange={(val) => setSelectedModel(val)}
  options={[
    { value: "claude-3-5-sonnet", label: "Claude 3.5 Sonnet", badge: "默认", description: "适合写代码和长文" },
    { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro", badge: "2M 上下文", description: "支持 200 万 token 上下文和图像输入" },
    { value: "deepseek-v3", label: "DeepSeek V3", badge: "高吞吐", description: "推理成本低，吞吐量高" },
    { value: "gpt-4o", label: "GPT-4o", description: "支持实时语音和图像输入" },
  ]}
/>`}
      >
        <div className="w-full max-w-sm">
          <Select
            label="模型"
            size={selectSize}
            variant={selectVariant}
            value={selectedModel}
            onChange={setSelectedModel}
            options={[
              { value: "claude-3-5-sonnet", label: "Claude 3.5 Sonnet", badge: "默认", description: "适合写代码和长文" },
              { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro", badge: "2M 上下文", description: "支持 200 万 token 上下文和图像输入" },
              { value: "deepseek-v3", label: "DeepSeek V3", badge: "高吞吐", description: "推理成本低，吞吐量高" },
              { value: "gpt-4o", label: "GPT-4o", description: "支持实时语音和图像输入" },
            ]}
          />
        </div>
      </ComponentPreview>

      {/* 3. ReadingGauge 阅读时长 */}
      <ComponentPreview
        title="ReadingGauge 环形阅读时长"
        description="在文章卡片和主舞台上显示预计阅读时长。用 SVG 圆环表示，数值变化时平滑过渡。"
        controls={
          <div className="flex items-center gap-3">
            <span>预计阅读时长：{gaugeMinutes} 分钟</span>
            <input
              type="range"
              min="1"
              max="20"
              value={gaugeMinutes}
              onChange={(e) => setGaugeMinutes(Number(e.target.value))}
              className={isEmerald ? "accent-[#059669] cursor-pointer" : "accent-[#E5192D] cursor-pointer"}
            />
          </div>
        }
        code={`import { ReadingGauge } from "@/sparx-ui";

<ReadingGauge
  minutes={${gaugeMinutes}}
  maxMinutes={15}
  size="md"
  label="预计阅读时长"
/>`}
      >
        <ReadingGauge minutes={gaugeMinutes} />
      </ComponentPreview>

      {/* 4. StatusDot & Badge */}
      <ComponentPreview
        title="StatusDot 状态点 & Badge / Tag 标签"
        description="状态点用颜色区分在线、监测、警告等状态；标签使用等宽字体，字号不小于 14px（Rule U-01）。"
        controls={
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400">状态：</span>
              <Select
                size="sm"
                value={dotStatus}
                onChange={(val) => setDotStatus(val as any)}
                options={[
                  { value: "live", label: "live (主色)" },
                  { value: "radar", label: "radar (监测中/青色)" },
                  { value: "caution", label: "caution (警告/琥珀)" },
                  { value: "arch", label: "arch (架构/紫色)" },
                  { value: "idle", label: "idle (空闲/中性)" },
                ]}
              />
            </div>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={dotPulse}
                onChange={(e) => setDotPulse(e.target.checked)}
                className={isEmerald ? "accent-[#059669]" : "accent-[#E5192D]"}
              />
              <span>脉冲动画</span>
            </label>
          </div>
        }
        code={`import { StatusDot, Badge, Tag } from "@/sparx-ui";

<div className="flex items-center gap-3">
  <StatusDot status="${dotStatus}" pulse={${dotPulse}} />
  <Badge variant="${isEmerald ? "emerald" : "flare"}" dot>独立出版</Badge>
  <Badge variant="emerald" dot>在线运行</Badge>
  <Tag prefixHash>架构设计</Tag>
  <Tag prefixHash active>设计系统</Tag>
</div>`}
      >
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <StatusDot status={dotStatus} pulse={dotPulse} size="md" />
          <Badge variant={isEmerald ? "emerald" : "flare"} dot>
            独立出版
          </Badge>
          <Badge variant="emerald" dot>
            在线运行
          </Badge>
          <Badge variant="cyan" dot>
            消息队列
          </Badge>
          <Tag prefixHash>分布式架构</Tag>
          <Tag prefixHash active>
            {isEmerald ? "企业应用" : "独立站点"}
          </Tag>
        </div>
      </ComponentPreview>

      {/* 5. PillDock 胶囊导航 */}
      <ComponentPreview
        title="PillDock 胶囊导航"
        description="用于顶部导航和多选项切换，切换时高亮块平滑移动。"
        code={`import { PillDock } from "@/sparx-ui";

<PillDock
  items={[
    { id: "overview", label: "文章" },
    { id: "friends", label: "友链" },
    { id: "updates", label: "动态" },
    { id: "terminal", label: "终端" },
  ]}
  activeId="${activeTab}"
  onChange={(id) => setActiveTab(id)}
  size="md"
/>`}
      >
        <PillDock
          items={[
            { id: "overview", label: "文章" },
            { id: "friends", label: "友链" },
            { id: "updates", label: "动态" },
            { id: "terminal", label: "终端" },
          ]}
          activeId={activeTab}
          onChange={setActiveTab}
          size="md"
        />
      </ComponentPreview>

      {/* 6. GlassCard 卡片 */}
      <ComponentPreview
        title="GlassCard 卡片"
        description="提供 stage、elevated、receding、translucent 四种层级，分别对应底层、抬升、内凹和半透明的卡片。"
        code={`import { GlassCard } from "@/sparx-ui";

<GlassCard variant="elevated" hoverEffect className="p-6">
  <h4 className="font-bold text-base">最近更新</h4>
  <p className="text-xs mt-2">
    本周发布了 3 篇文章，修复了 RSS 输出中的日期格式问题。
  </p>
</GlassCard>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <GlassCard variant="stage" hoverEffect className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-mono font-bold ${
                  isEmerald ? "text-[#059669]" : "text-[#E5192D]"
                }`}
              >
                TIER 1 · STAGE
              </span>
              <span className="text-xs font-mono opacity-60">底层卡片</span>
            </div>
            <h4
              className={`font-bold text-sm ${
                isEmerald ? "text-slate-900" : "text-white"
              }`}
            >
              主舞台卡片
            </h4>
            <p className={`text-xs ${isEmerald ? "text-slate-500" : "text-zinc-400"}`}>
              用作主舞台的大卡片，是页面上最底层的表面。
            </p>
          </GlassCard>

          <GlassCard variant="elevated" hoverEffect className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-500 font-bold">TIER 2 · ELEVATED</span>
              <span className="text-xs font-mono opacity-60">抬升</span>
            </div>
            <h4
              className={`font-bold text-sm ${
                isEmerald ? "text-slate-900" : "text-white"
              }`}
            >
              抬升卡片
            </h4>
            <p className={`text-xs ${isEmerald ? "text-slate-500" : "text-zinc-400"}`}>
              带明显的阴影和双层边框，用于可交互的卡片和浮动窗口。
            </p>
          </GlassCard>

          <GlassCard variant="receding" hoverEffect className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-500 font-bold">TIER 3 · RECEDING</span>
              <span className="text-xs font-mono opacity-60">内凹</span>
            </div>
            <h4
              className={`font-bold text-sm ${
                isEmerald ? "text-slate-900" : "text-white"
              }`}
            >
              内凹面板
            </h4>
            <p className={`text-xs ${isEmerald ? "text-slate-500" : "text-zinc-400"}`}>
              带轻微内阴影，看起来比周围低一层，适合放代码、状态信息或嵌套的侧栏。
            </p>
          </GlassCard>

          <GlassCard variant="translucent" hoverEffect className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-500 font-bold">TIER 4 · TRANSLUCENT</span>
              <span className="text-xs font-mono opacity-60">毛玻璃</span>
            </div>
            <h4
              className={`font-bold text-sm ${
                isEmerald ? "text-slate-900" : "text-white"
              }`}
            >
              半透明浮层
            </h4>
            <p className={`text-xs ${isEmerald ? "text-slate-500" : "text-zinc-400"}`}>
              背景模糊加半透明边框，适合悬浮在内容上方的导航栏和弹出层。
            </p>
          </GlassCard>
        </div>
      </ComponentPreview>

      {/* 7. CodeBlock 代码块 */}
      <ComponentPreview
        title="CodeBlock 代码块"
        description="带 macOS 风格窗口按钮、语言和文件名标签、状态标记、行号，以及复制按钮。"
        code={`import { CodeBlock } from "@/sparx-ui";

<CodeBlock
  filename="channel-arch.ts"
  language="typescript"
  status="200 OK · Edge"
  showLineNumbers
  code={\`// 抓取并解析文章元数据流
const response = await fetch("https://channel.mikkoayaka.com/feed.json");
const feed = await response.json();
console.log("频道标题:", feed.title);\`}
/>`}
      >
        <div className="w-full max-w-xl">
          <CodeBlock
            filename="channel-arch.ts"
            language="typescript"
            status="200 OK · Edge"
            showLineNumbers
            code={`// 抓取并解析文章元数据流
const response = await fetch("https://channel.mikkoayaka.com/feed.json");
const feed = await response.json();
console.log("频道标题:", feed.title);`}
          />
        </div>
      </ComponentPreview>

    </div>
  );
};
