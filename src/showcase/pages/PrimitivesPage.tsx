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
  type StatusDotProps,
  useSparxTheme,
} from "@/sparx-ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { Layers } from "lucide-react";

export const PrimitivesPage: React.FC = () => {
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

  // ReadingGauge controls
  const [gaugeMinutes, setGaugeMinutes] = useState(7);

  // PillDock controls
  const [activeTab, setActiveTab] = useState("overview");

  const selectClass = isEmerald
    ? "bg-slate-100 border border-slate-300 rounded px-2 py-0.5 text-slate-800 text-xs"
    : "bg-black/60 border border-white/20 rounded px-2 py-0.5 text-white text-xs";

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-16">
      {/* 头部说明 */}
      <section className="space-y-3">
        <div
          className={`flex items-center gap-2 text-xs font-mono font-bold ${
            isEmerald ? "text-[#059669]" : "text-[#E5192D]"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>PRIMITIVES · 基础交互原语</span>
        </div>
        <h1
          className={`text-2xl sm:text-4xl font-black tracking-tight ${
            isEmerald ? "text-slate-900" : "text-white"
          }`}
        >
          轻量、高对比度的界面基本粒度
        </h1>
        <p
          className={`text-xs sm:text-sm max-w-3xl leading-relaxed ${
            isEmerald ? "text-slate-600" : "text-zinc-300"
          }`}
        >
          所有原语均严格遵循无衬线字体约束、≥12px 最小安全字号、双风格表面适配（虚空暗房 / 皓白极翠）与高压主色发光体系，支持一键复制代码与参数联动调试。
        </p>
      </section>

      {/* 1. Button 按钮 */}
      <ComponentPreview
        title="Button 按钮原语"
        description="支持核心激光/稳态极翠、幽灵、毛玻璃等形态，具备 hover translate 箭头与光学辉光。"
        controls={
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <span>形态:</span>
              <select
                value={btnVariant}
                onChange={(e) => setBtnVariant(e.target.value as any)}
                className={selectClass}
              >
                <option value="flare">flare ({isEmerald ? "核心极翠" : "核心激光"})</option>
                <option value="outline">outline (线框)</option>
                <option value="ghost">ghost (幽灵)</option>
                <option value="glass">glass (毛玻璃)</option>
                <option value="subtle">subtle (次级表面)</option>
              </select>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <span>尺寸:</span>
              <select
                value={btnSize}
                onChange={(e) => setBtnSize(e.target.value as any)}
                className={selectClass}
              >
                <option value="sm">sm</option>
                <option value="md">md</option>
                <option value="lg">lg</option>
              </select>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={btnArrow}
                onChange={(e) => setBtnArrow(e.target.checked)}
                className={isEmerald ? "accent-[#059669]" : "accent-[#E5192D]"}
              />
              <span>微动效箭头</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={btnGlow}
                onChange={(e) => setBtnGlow(e.target.checked)}
                className={isEmerald ? "accent-[#059669]" : "accent-[#E5192D]"}
              />
              <span>光学发光</span>
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
  展卷阅读
</Button>`}
      >
        <Button
          variant={btnVariant}
          size={btnSize}
          withArrow={btnArrow}
          glow={btnGlow}
        >
          展卷阅读
        </Button>
      </ComponentPreview>

      {/* 2. ReadingGauge 阅读刻度规 */}
      <ComponentPreview
        title="ReadingGauge 环形阅读节奏刻度规"
        description="用于文章导读与主舞台的动态预计阅读耗时计算，动态 SVG 笔刷绘制与平滑过渡。"
        controls={
          <div className="flex items-center gap-3">
            <span>预计分钟数: {gaugeMinutes} 分钟</span>
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
  label="预计阅读耗时"
/>`}
      >
        <ReadingGauge minutes={gaugeMinutes} />
      </ComponentPreview>

      {/* 3. StatusDot & Badge */}
      <ComponentPreview
        title="StatusDot 发光状态点 & Badge / Tag 标签"
        description="具备雷达、架构、在线等语义色彩，严格保持 >=12px 等宽字体排印。"
        controls={
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <span>状态模式:</span>
              <select
                value={dotStatus}
                onChange={(e) => setDotStatus(e.target.value as any)}
                className={selectClass}
              >
                <option value="live">live (核心主色)</option>
                <option value="radar">radar (实时雷达/青色)</option>
                <option value="caution">caution (警戒/琥珀)</option>
                <option value="arch">arch (架构/紫色)</option>
                <option value="idle">idle (休眠/中性)</option>
              </select>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={dotPulse}
                onChange={(e) => setDotPulse(e.target.checked)}
                className={isEmerald ? "accent-[#059669]" : "accent-[#E5192D]"}
              />
              <span>扩散呼吸动效</span>
            </label>
          </div>
        }
        code={`import { StatusDot, Badge, Tag } from "@/sparx-ui";

<div className="flex items-center gap-3">
  <StatusDot status="${dotStatus}" pulse={${dotPulse}} />
  <Badge variant="${isEmerald ? "emerald" : "flare"}" dot>独立出版</Badge>
  <Badge variant="emerald" dot>在线运行</Badge>
  <Tag prefixHash>架构哲学</Tag>
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
            情报总线
          </Badge>
          <Tag prefixHash>分布式架构</Tag>
          <Tag prefixHash active>
            {isEmerald ? "皓白极翠稳态" : "暗房虚空视界"}
          </Tag>
        </div>
      </ComponentPreview>

      {/* 4. PillDock 悬浮胶囊控制坞 */}
      <ComponentPreview
        title="PillDock 悬浮胶囊导航槽"
        description="用于全站导航与多状态切换规，双层极简结构与平滑焦点切换。"
        code={`import { PillDock } from "@/sparx-ui";

<PillDock
  items={[
    { id: "overview", label: "出版舞台" },
    { id: "friends", label: "友人网络" },
    { id: "updates", label: "实时情报" },
    { id: "terminal", label: "开放终端" },
  ]}
  activeId="${activeTab}"
  onChange={(id) => setActiveTab(id)}
  size="md"
/>`}
      >
        <PillDock
          items={[
            { id: "overview", label: "出版舞台" },
            { id: "friends", label: "友人网络" },
            { id: "updates", label: "实时情报" },
            { id: "terminal", label: "开放终端" },
          ]}
          activeId={activeTab}
          onChange={setActiveTab}
          size="md"
        />
      </ComponentPreview>

      {/* 5. GlassCard 毛玻璃卡片 */}
      <ComponentPreview
        title="GlassCard 层次卡片容器"
        description="提供 stage、elevated、translucent 多层景深表面，内嵌精密细边框。"
        code={`import { GlassCard } from "@/sparx-ui";

<GlassCard variant="elevated" hoverEffect className="p-6 max-w-md">
  <h4 className="font-bold text-base">高可用出版讲台</h4>
  <p className="text-xs mt-2">
    基于统一设计公理，为高信噪比思考留出安静框架。
  </p>
</GlassCard>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <GlassCard variant="stage" hoverEffect className="p-6 space-y-2">
            <span
              className={`text-xs font-mono font-bold ${
                isEmerald ? "text-[#059669]" : "text-[#E5192D]"
              }`}
            >
              VARIANT: STAGE
            </span>
            <h4
              className={`font-bold text-sm ${
                isEmerald ? "text-slate-900" : "text-white"
              }`}
            >
              主舞台大卡容器 ({isEmerald ? "#FFFFFF" : "#030406"})
            </h4>
            <p className={`text-xs ${isEmerald ? "text-slate-500" : "text-zinc-400"}`}>
              用于首页与沉浸式独立视口的主舞台容器。
            </p>
          </GlassCard>

          <GlassCard variant="elevated" hoverEffect className="p-6 space-y-2">
            <span className="text-xs font-mono text-cyan-500 font-bold">VARIANT: ELEVATED</span>
            <h4
              className={`font-bold text-sm ${
                isEmerald ? "text-slate-900" : "text-white"
              }`}
            >
              悬浮抬升表面 ({isEmerald ? "#FFFFFF" : "#08090E"})
            </h4>
            <p className={`text-xs ${isEmerald ? "text-slate-500" : "text-zinc-400"}`}>
              用于浮动卡片、控制坞与代码容器。
            </p>
          </GlassCard>
        </div>
      </ComponentPreview>

      {/* 6. CodeBlock 代码终端窗口 */}
      <ComponentPreview
        title="CodeBlock 高信号代码终端窗口"
        description="带 macOS 窗口点缀、语言/文件名徽标、状态标记、行号与一键复制反馈。"
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
