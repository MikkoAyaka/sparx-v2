import React, { useState } from "react";
import {
  SplitMonograph,
  FeedbackDock,
  CodeBlock,
  type FeedbackOption,
  type StageMediaCover,
  useSparxTheme,
} from "@/sparx-ui";

const MOCK_FEEDBACK_OPTIONS: FeedbackOption[] = [
  { id: "insightful", label: "很有启发", emoji: "⚡", count: 42 },
  { id: "inspiring", label: "引发思考", emoji: "✦", count: 28 },
  { id: "arguable", label: "值得商榷", emoji: "◈", count: 15 },
  { id: "aesthetic", label: "设计精妙", emoji: "❖", count: 64 },
];

const DARK_SECTION_COVERS: Record<string, StageMediaCover> = {
  header: {
    sourceUrl: "cover-header-dark",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=85",
    title: "边缘计算发布架构",
  },
  section1: {
    sourceUrl: "cover-section1-dark",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
    title: "100dvh 视口与视觉聚焦",
  },
  section2: {
    sourceUrl: "cover-section2-dark",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=85",
    title: "双轨解耦与环境光联动",
  },
};

const LIGHT_SECTION_COVERS: Record<string, StageMediaCover> = {
  header: {
    sourceUrl: "cover-header-light",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    title: "边缘计算发布架构",
  },
  section1: {
    sourceUrl: "cover-section1-light",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
    title: "100dvh 视口与视觉聚焦",
  },
  section2: {
    sourceUrl: "cover-section2-light",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
    title: "双轨解耦与环境光联动",
  },
};

export const SplitMonographScene: React.FC<{ onBackToStage?: () => void }> = ({
  onBackToStage,
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  const sectionCovers = isEmerald ? LIGHT_SECTION_COVERS : DARK_SECTION_COVERS;
  const [feedbackOptions] = useState(MOCK_FEEDBACK_OPTIONS);
  const [activeKey, setActiveKey] = useState<"header" | "section1" | "section2">("header");

  // 监听右侧阅读画布的滚动流，根据用户当前所阅读的最下方的图片/视频媒体流畅切换左侧背景
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    if (scrollTop < 80) {
      if (activeKey !== "header") {
        setActiveKey("header");
      }
    } else if (scrollTop >= 80 && scrollTop < 350) {
      if (activeKey !== "section1") {
        setActiveKey("section1");
      }
    } else {
      if (activeKey !== "section2") {
        setActiveKey("section2");
      }
    }
  };

  return (
    <div className="w-full h-full">
      <SplitMonograph
        title="摆脱被动投喂：基于边缘计算的独立出版系统实践"
        summary="当我们建立独立内容站点时，核心目标是摆脱公域算法的流量分配与格式审查。本文探讨如何基于边缘函数、静态 Markdown 与无状态缓存，构建一个轻量、可靠且永久受控的个人发布系统。"
        date="2026-09-18"
        category="系统工程"
        readingMinutes={7}
        readingHeat={98}
        tags={["边缘计算", "独立出版", "无状态架构", "Markdown"]}
        cover={sectionCovers[activeKey]}
        onBack={onBackToStage}
        backText="返回出版舞台"
        onScroll={handleScroll}
        spineFooter={
          <div
            className={`text-[12px] font-mono flex items-center justify-between ${
              isEmerald ? "text-slate-500" : "text-zinc-500"
            }`}
          >
            <span>视线联动：随着右侧正文滚动自动换景</span>
            <span className={isEmerald ? "text-slate-300" : "text-zinc-600"}>·</span>
            <span className={isEmerald ? "text-[#059669] font-bold" : "text-[#E5192D] font-bold"}>
              700ms 丝滑融变
            </span>
          </div>
        }
      >
        {/* 正文排版内容：严格遵循 Editorial 规约 */}
        <section className="space-y-6">
          <p
            className={`text-base sm:text-[16px] leading-[1.85] ${
              isEmerald ? "text-slate-700" : "text-neutral-300"
            }`}
          >
            在现代互联网的工业化流水线上，文字与观点容易被各大平台按照点击率拆碎。
            每一次推荐机制的刷新，都在用短期多巴胺刺激代替长周期的深度阅读与思考。
            建立属于个人独立主权的出版系统，不仅是一次前端界面的重新设计，更是创作者在信息过载时代为自己和读者保留的一片纯净阅读空间。
          </p>

          <h2
            className={`text-2xl font-bold tracking-tight mt-10 mb-4 flex items-center gap-2 ${
              isEmerald ? "text-slate-900" : "text-white"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isEmerald ? "bg-[#059669]" : "bg-[#E5192D]"
              }`}
            />
            <span>一、视口锁定与沉浸式 100dvh 舞台</span>
          </h2>

          <p
            className={`text-base sm:text-[16px] leading-[1.85] ${
              isEmerald ? "text-slate-700" : "text-neutral-300"
            }`}
          >
            大多数博客系统默认采用无限流的垂直长卷，这在本质上沿袭了社交媒体信息流的“刷动”模式。
            相反，我们将主舞台锁定为 <code className={`px-1.5 py-0.5 rounded font-mono text-xs ${
              isEmerald ? "bg-slate-100 text-[#059669]" : "bg-white/10 text-[#E5192D]"
            }`}>100dvh</code> 的画廊展卷。
            读者进入时，视线不会被无休止的滚动条分散，而是沉浸在一幅由 60% 横向消融大图、阅读时间刻度规与精炼文字构成的单幅展卷之中。
          </p>

          <blockquote
            className={`my-8 border-l-2 pl-6 text-base sm:text-[16px] leading-[1.85] py-3 rounded-r-xl ${
              isEmerald
                ? "border-[#059669]/60 text-slate-600 bg-slate-50"
                : "border-[#E5192D]/60 text-neutral-400 bg-white/[0.015]"
            }`}
          >
            “一个好的界面应当像深夜的美术馆展厅：四周是消退的背景，只有高信噪比的内容在精准的光束下呼吸。”
          </blockquote>

          <h2
            className={`text-2xl font-bold tracking-tight mt-10 mb-4 flex items-center gap-2 ${
              isEmerald ? "text-slate-900" : "text-white"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isEmerald ? "bg-[#059669]" : "bg-[#E5192D]"
              }`}
            />
            <span>二、双轨解耦：固定环境脊柱与排版画布</span>
          </h2>

          <p
            className={`text-base sm:text-[16px] leading-[1.85] ${
              isEmerald ? "text-slate-700" : "text-neutral-300"
            }`}
          >
            传统文章页往往让标题与侧边栏随正文一同向上滚出视线。在我们的双轨拓扑中，
            左侧 35% 的环境脊柱（Ambient Spine）被物理锁定在视口内，严禁滚动。
            它始终静默守候，显示当前篇章的元信息、动态阅读时长刻度规，并随读者阅读位置智能投射环境色；
            右侧 65% 则作为纯粹的排版画布，给予读者极致纯粹的文字沉浸。
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

          <p
            className={`text-base sm:text-[16px] leading-[1.85] ${
              isEmerald ? "text-slate-700" : "text-neutral-300"
            }`}
          >
            通过这样一套严丝合缝的原语与协议，无论是独立创作者还是团队技术文档，
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
