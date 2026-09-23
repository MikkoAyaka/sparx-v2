import React, { useState } from "react";
import {
  FeedbackDock,
  SegmentedRail,
  Button,
  useSparxTheme,
} from "@/sparx-ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { LayoutGrid } from "lucide-react";

export const PatternsPage: React.FC<{ onNavigateTo: (id: string) => void }> = ({
  onNavigateTo,
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";
  const [railIndex, setRailIndex] = useState(0);

  const mockRailItems = [
    { id: "1", title: "高可用出版架构", meta: "09-18" },
    { id: "2", title: "智能体环境感知", meta: "09-12" },
    { id: "3", title: "暗房虚空美学", meta: "09-08" },
    { id: "4", title: "微反馈协议落地", meta: "08-30" },
  ];

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-16">
      {/* 头部说明 */}
      <section className="space-y-3">
        <div
          className={`flex items-center gap-2 text-xs font-mono font-bold ${
            isEmerald ? "text-[#059669]" : "text-[#E5192D]"
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>PATTERNS · 复合场景模式</span>
        </div>
        <h1
          className={`text-2xl sm:text-4xl font-black tracking-tight ${
            isEmerald ? "text-slate-900" : "text-white"
          }`}
        >
          开箱即用的高阶出版与阅读模式
        </h1>
        <p
          className={`text-xs sm:text-sm max-w-3xl leading-relaxed ${
            isEmerald ? "text-slate-600" : "text-zinc-300"
          }`}
        >
          将原语与氛围原件装配为标准场景模式，兼顾 100dvh 视口锁定、阻尼滚轮漫游、双轨解耦阅读与轻共鸣反馈协议。
        </p>
      </section>

      {/* 快捷跳转至独立全屏体验 */}
      <section
        className={`p-6 rounded-2xl border flex flex-wrap items-center justify-between gap-4 transition-all duration-200 ${
          isEmerald
            ? "border-emerald-200 bg-gradient-to-r from-emerald-50/80 via-white to-slate-50 text-slate-900 shadow-md"
            : "border-[#E5192D]/30 bg-gradient-to-r from-[#E5192D]/10 via-[#08090E] to-[#030406] text-white"
        }`}
      >
        <div className="space-y-1">
          <h3 className="text-base font-bold flex items-center gap-2 font-mono">
            <span
              className={`w-2 h-2 rounded-full ${
                isEmerald ? "bg-[#059669]" : "bg-[#E5192D]"
              }`}
            />
            <span>独立全屏体验与实时漫游</span>
          </h3>
          <p className={`text-xs ${isEmerald ? "text-slate-600" : "text-zinc-300"}`}>
            我们准备了三个完整独立可交互的真实体验场景，支持键盘、手势与阻尼滚轮漫游。
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="flare"
            size="sm"
            withArrow
            onClick={() => onNavigateTo("stage-scene")}
          >
            主舞台沉浸场景
          </Button>
          <Button
            variant="glass"
            size="sm"
            onClick={() => onNavigateTo("monograph-scene")}
          >
            双轨展卷阅读场景
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigateTo("terminal-scene")}
          >
            开放终端场景
          </Button>
        </div>
      </section>

      {/* 1. FeedbackDock 轻共鸣微反馈坞 */}
      <ComponentPreview
        title="FeedbackDock 读者轻共鸣反馈坞"
        description="摒弃冗杂低质的评论输入框，采用四态轻共鸣按钮与匿名凭据乐观计数器。"
        code={`import { FeedbackDock } from "@/sparx-ui";

<FeedbackDock
  options={[
    { id: "insightful", label: "透彻深邃", emoji: "⚡", count: 42 },
    { id: "inspiring", label: "深有启发", emoji: "✦", count: 28 },
    { id: "arguable", label: "引发论证", emoji: "◈", count: 15 },
    { id: "aesthetic", label: "审美享受", emoji: "❖", count: 64 },
  ]}
  onSelectReaction={(id) => console.log("Reacted:", id)}
/>`}
      >
        <div className="w-full max-w-xl">
          <FeedbackDock
            options={[
              { id: "insightful", label: "透彻深邃", emoji: "⚡", count: 42 },
              { id: "inspiring", label: "深有启发", emoji: "✦", count: 28 },
              { id: "arguable", label: "引发论证", emoji: "◈", count: 15 },
              { id: "aesthetic", label: "审美享受", emoji: "❖", count: 64 },
            ]}
          />
        </div>
      </ComponentPreview>

      {/* 2. SegmentedRail 底部导览名录导轨 */}
      <ComponentPreview
        title="SegmentedRail 文章名录标尺导轨"
        description="双端自适应导轨：桌面端为高信噪比卡片网格，移动端为左右箭头与分段指示条。"
        code={`import { SegmentedRail } from "@/sparx-ui";

<SegmentedRail
  items={[
    { id: "1", title: "高可用出版架构", meta: "09-18" },
    { id: "2", title: "智能体环境感知", meta: "09-12" },
    { id: "3", title: "暗房虚空美学", meta: "09-08" },
    { id: "4", title: "微反馈协议落地", meta: "08-30" },
  ]}
  activeIndex={${railIndex}}
  onSelect={(idx) => setRailIndex(idx)}
/>`}
      >
        <div
          className={`w-full max-w-2xl p-4 rounded-2xl border transition-colors ${
            isEmerald ? "bg-white border-slate-200" : "bg-[#030406] border-white/10"
          }`}
        >
          <SegmentedRail
            items={mockRailItems}
            activeIndex={railIndex}
            onSelect={setRailIndex}
          />
        </div>
      </ComponentPreview>
    </div>
  );
};
