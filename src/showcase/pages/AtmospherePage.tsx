import React, { useState } from "react";
import {
  KeywordAtmosphere,
  AmbientDissolveMask,
  StageMediaSpine,
  VideoTitleCard,
  GridPattern,
  Button,
  DEFAULT_KEYWORD_WORDS,
} from "@/sparx-ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CloudRain } from "lucide-react";

const SAMPLE_COVERS = [
  {
    sourceUrl: "cover-a",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=85",
    title: "高可用出版架构",
  },
  {
    sourceUrl: "cover-b",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
    title: "智能体环境感知",
  },
  {
    sourceUrl: "cover-c",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=85",
    title: "暗房虚空美学",
  },
];

export const AtmospherePage: React.FC = () => {
  const [activeCoverIdx, setActiveCoverIdx] = useState(0);

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-16">
      {/* 头部说明 */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[#E5192D] font-bold">
          <CloudRain className="w-4 h-4" />
          <span>ATMOSPHERE · 环境氛围与媒体处理</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          暗房光影与 60% 渐变消融机制
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
          Channel 视觉质感的核心之一在于高阶的暗房光晕与平滑媒体过渡：包括 700ms 丝滑换图脊柱、60% 横向消融蒙版、算法散布关键词云图。
        </p>
      </section>

      {/* 1. StageMediaSpine 700ms 平滑融变脊柱 */}
      <ComponentPreview
        title="StageMediaSpine 平滑融变媒体脊柱"
        description="双层图层缓冲架构：切图时底层老图持续垫底，顶层新图执行 700ms 丝滑淡入，彻底消除黑屏与生硬跳变。"
        controls={
          <div className="flex items-center gap-2">
            <span>切换封面图:</span>
            <div className="flex items-center gap-1.5">
              {SAMPLE_COVERS.map((c, i) => (
                <button
                  key={c.sourceUrl}
                  type="button"
                  onClick={() => setActiveCoverIdx(i)}
                  className={`px-3 py-1 rounded text-xs font-mono cursor-pointer transition-all ${
                    activeCoverIdx === i
                      ? "bg-[#E5192D] text-white font-bold"
                      : "bg-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  封面 {i + 1}
                </button>
              ))}
            </div>
          </div>
        }
        code={`import { StageMediaSpine } from "@/sparx-ui";

<div className="relative w-full h-80 rounded-2xl overflow-hidden">
  <StageMediaSpine
    cover={{
      sourceUrl: "${SAMPLE_COVERS[activeCoverIdx].sourceUrl}",
      imageUrl: "${SAMPLE_COVERS[activeCoverIdx].imageUrl}",
      title: "${SAMPLE_COVERS[activeCoverIdx].title}",
    }}
  />
</div>`}
      >
        <div className="relative w-full max-w-xl h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <StageMediaSpine cover={SAMPLE_COVERS[activeCoverIdx]} />
          <div className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-xs font-mono text-white backdrop-blur-md">
            当前处于: {SAMPLE_COVERS[activeCoverIdx].title} (点击上方按钮观察平滑淡入)
          </div>
        </div>
      </ComponentPreview>

      {/* 2. KeywordAtmosphere 关键词暗房散布云图 */}
      <ComponentPreview
        title="KeywordAtmosphere 算法排版关键词散布暗房云图"
        description="当篇章无头图或处于概念阐述时，以算法计算散布的无衬线与等宽大字，叠合 40px 网格纹理与绯红弱径向晕光。"
        code={`import { KeywordAtmosphere } from "@/sparx-ui";

<div className="relative w-full h-80 rounded-2xl overflow-hidden">
  <KeywordAtmosphere mode="stage" />
</div>`}
      >
        <div className="relative w-full max-w-xl h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <KeywordAtmosphere mode="stage" words={DEFAULT_KEYWORD_WORDS} />
        </div>
      </ComponentPreview>

      {/* 3. AmbientDissolveMask 60% 横向消融蒙版 */}
      <ComponentPreview
        title="AmbientDissolveMask 60% 消融蒙版"
        description="将左侧 60% 大画幅图片在向右延展至 58% 处完全融入 #030406 暗房基底，桌面端与移动端双向响应。"
        code={`import { AmbientDissolveMask } from "@/sparx-ui";

<div className="relative w-full h-64 rounded-2xl overflow-hidden bg-cover bg-center" style={{ backgroundImage: 'url(...) '}}>
  <AmbientDissolveMask />
  <div className="relative z-10 p-6 flex justify-end">
    <span className="text-white text-sm font-bold">右侧平滑融进纯黑背景</span>
  </div>
</div>`}
      >
        <div className="relative w-full max-w-xl h-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900">
          <img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=85"
            alt="Preview"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <AmbientDissolveMask />
          <div className="relative z-10 h-full flex items-center justify-end pr-8">
            <div className="max-w-xs text-right space-y-1">
              <span className="text-xs font-mono text-[#E5192D] font-bold">60% DISSOLVE</span>
              <p className="text-xs text-zinc-300">
                左侧图片经过精心校准的渐变梯度，在 58% 宽度处柔和消融进 #030406 暗底。
              </p>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* 4. VideoTitleCard 视频卡片 */}
      <ComponentPreview
        title="VideoTitleCard 视频封面卡片"
        description="用于无海报视频封面的展卷占位，带呼吸播放按钮徽标与提供方标记。"
        code={`import { VideoTitleCard } from "@/sparx-ui";

<div className="relative w-full h-64 rounded-2xl overflow-hidden">
  <VideoTitleCard provider="BILIBILI" onPlay={() => console.log("Play")} />
</div>`}
      >
        <div className="relative w-full max-w-xl h-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <VideoTitleCard provider="BILIBILI" onPlay={() => alert("触发视频播放")} />
        </div>
      </ComponentPreview>
    </div>
  );
};
