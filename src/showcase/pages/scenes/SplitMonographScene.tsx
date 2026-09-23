import React, { useState, useRef } from "react";
import {
  SplitMonograph,
  FeedbackDock,
  CodeBlock,
  type FeedbackOption,
  type StageMediaCover,
} from "@/sparx-ui";

const MOCK_FEEDBACK_OPTIONS: FeedbackOption[] = [
  { id: "insightful", label: "透彻深邃", emoji: "⚡", count: 42 },
  { id: "inspiring", label: "深有启发", emoji: "✦", count: 28 },
  { id: "arguable", label: "引发论证", emoji: "◈", count: 15 },
  { id: "aesthetic", label: "审美享受", emoji: "❖", count: 64 },
];

const SECTION_COVERS: Record<string, StageMediaCover> = {
  header: {
    sourceUrl: "cover-header",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=85",
    title: "高可用出版架构",
  },
  section1: {
    sourceUrl: "cover-section1",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
    title: "100dvh 暗室与视口锁定",
  },
  section2: {
    sourceUrl: "cover-section2",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=85",
    title: "双轨解耦与环境光脊柱",
  },
};

export const SplitMonographScene: React.FC<{ onBackToStage?: () => void }> = ({
  onBackToStage,
}) => {
  const [feedbackOptions, setFeedbackOptions] = useState(MOCK_FEEDBACK_OPTIONS);
  const [activeCover, setActiveCover] = useState<StageMediaCover>(SECTION_COVERS.header);

  // 监听右侧阅读画布的滚动流，根据用户当前所阅读的最下方的图片/视频媒体流畅切换左侧背景 (Item 10)
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    if (scrollTop < 80) {
      if (activeCover.sourceUrl !== SECTION_COVERS.header.sourceUrl) {
        setActiveCover(SECTION_COVERS.header);
      }
    } else if (scrollTop >= 80 && scrollTop < 350) {
      if (activeCover.sourceUrl !== SECTION_COVERS.section1.sourceUrl) {
        setActiveCover(SECTION_COVERS.section1);
      }
    } else {
      if (activeCover.sourceUrl !== SECTION_COVERS.section2.sourceUrl) {
        setActiveCover(SECTION_COVERS.section2);
      }
    }
  };

  return (
    <div className="w-full h-full">
      <SplitMonograph
        title="在断裂带重建架构秩序：高可用出版与个人频段"
        summary="当我们谈论个人主权出版时，我们在谈论摆脱公域算法的被动投喂。本文探讨如何基于边缘函数、无界暗房与静态离线回退，搭建永久在线的数字讲台。"
        date="2026-09-18"
        category="架构哨所"
        readingMinutes={7}
        readingHeat={98}
        tags={["架构哲学", "分布式系统", "独立出版", "边缘计算"]}
        cover={activeCover}
        onBack={onBackToStage}
        backText="返回出版舞台"
        onScroll={handleScroll}
        spineFooter={
          <div className="text-[12px] font-mono text-zinc-500 flex items-center justify-between">
            <span>视线联动：随着右侧正文滚动自动换景</span>
            <span className="text-zinc-600">·</span>
            <span className="text-[#E5192D]">700ms 丝滑融变</span>
          </div>
        }
      >
        {/* 正文排版内容：严格遵循 Channel Editorial 规约 */}
        <section className="space-y-6">
          <p className="text-[15px] leading-[1.85] text-neutral-300">
            在现代互联网的工业化流水线上，文字与思想正在被平台切碎为算法饲料。
            每一次推荐机制的刷新，都是对长期思考者注意力的无情稀释。
            建立属于个人独立主权的出版频段，不仅是一次前端界面的重新设计，更是创作者在信息断裂带中夺回认知主权的宣誓。
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-white mt-10 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E5192D]" />
            <span>一、暗房视界与沉浸式 100dvh 舞台</span>
          </h2>

          <p className="text-[15px] leading-[1.85] text-neutral-300">
            大多数博客系统默认采用无限流的垂直长卷，这在本质上沿袭了信息流产品的“刷动”隐喻。
            相反，我们将主舞台锁定为 <code className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[#E5192D] text-xs">100dvh</code> 的画廊暗室。
            读者进入时，视线不会被无休止的滚动条所诱惑，而是沉浸在一幅由 60% 横向消融大图、高压激光绯红刻度与精炼文字构成的单幅展卷之中。
          </p>

          <blockquote className="my-8 border-l-2 border-[#E5192D]/60 pl-6 text-[15px] leading-[1.85] text-neutral-400 bg-white/[0.015] py-3 rounded-r-xl">
            “一个好的界面应当像深夜的美术馆展厅：四周是消退的虚空，只有高信噪比的作品在精准的光束下呼吸。”
          </blockquote>

          <h2 className="text-2xl font-bold tracking-tight text-white mt-10 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E5192D]" />
            <span>二、双轨解耦：环境脊柱与排版画布</span>
          </h2>

          <p className="text-[15px] leading-[1.85] text-neutral-300">
            传统文章页往往让标题与侧边栏随正文一同向上滚出视线。在我们的双轨拓扑中，
            左侧 35% 的环境脊柱（Ambient Spine）被物理锁定在视口内，严禁滚动。
            它始终静默守候，显示当前篇章的元信息、动态阅读时长刻度规，并随读者阅读位置智能投射环境光影；
            右侧 65% 则作为纯粹的无界排版画布，给予读者极致纯粹的文字沉浸。
          </p>

          <div className="my-8">
            <CodeBlock
              filename="channel-arch.ts"
              status="200 OK · Edge"
              code={`// 边缘读取模型与读者轻共鸣协议
export async function getArticleFeed(slug: string): Promise<ChannelArticle> {
  const cacheKey = \`channel:post:\${slug}\`;
  const cached = await edgeKV.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const article = await readCanonicalMarkdown(slug);
  await edgeKV.set(cacheKey, JSON.stringify(article), { ex: 3600 });
  return article;
}`}
            />
          </div>

          <p className="text-[15px] leading-[1.85] text-neutral-300">
            通过这样一套严丝合缝的原语与协议，无论是大模型 Agent 还是人类开发者，
            都能在最短时间内组装出具有顶级视觉质感与沉浸交互的下一代数字出版物。
          </p>

          {/* 读者轻共鸣反馈坞 */}
          <FeedbackDock
            options={feedbackOptions}
            onSelectReaction={(id) => {
              console.log("Selected feedback:", id);
            }}
          />
        </section>
      </SplitMonograph>
    </div>
  );
};
