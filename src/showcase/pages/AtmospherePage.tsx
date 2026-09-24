import React, { useState } from "react";
import {
  KeywordAtmosphere,
  AmbientDissolveMask,
  StageMediaSpine,
  VideoTitleCard,
  DEFAULT_KEYWORD_WORDS,
  useSparxTheme,
} from "@/sparx-ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CloudRain } from "lucide-react";

const DARK_SAMPLE_COVERS = [
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

const LIGHT_SAMPLE_COVERS = [
  {
    sourceUrl: "cover-a-light",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    title: "高可用企业出版架构",
  },
  {
    sourceUrl: "cover-b-light",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
    title: "生产级工程研发生态",
  },
  {
    sourceUrl: "cover-c-light",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
    title: "皓白极翠极简工学",
  },
];

export const AtmospherePage: React.FC = () => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";
  const [activeCoverIdx, setActiveCoverIdx] = useState(0);

  const sampleCovers = isEmerald ? LIGHT_SAMPLE_COVERS : DARK_SAMPLE_COVERS;

  return (
    <div className="w-full min-w-0 space-y-12 max-w-5xl mx-auto pb-16">
      {/* 头部说明 */}
      <section className="space-y-3">
        <div
          className={`flex items-center gap-2 text-xs font-mono font-bold ${
            isEmerald ? "text-[#059669]" : "text-[#E5192D]"
          }`}
        >
          <CloudRain className="w-4 h-4" />
          <span>ATMOSPHERE · 环境氛围与媒体处理</span>
        </div>
        <h1
          className={`text-2xl sm:text-4xl font-black tracking-tight ${
            isEmerald ? "text-slate-900" : "text-white"
          }`}
        >
          {isEmerald ? "明朗白昼与 60% 渐变皓白消融机制" : "暗房光影与 60% 渐变消融机制"}
        </h1>
        <p
          className={`text-xs sm:text-sm max-w-3xl leading-relaxed ${
            isEmerald ? "text-slate-600" : "text-zinc-300"
          }`}
        >
          Channel 与 Sparx UI 视觉质感的核心之一在于高阶的景深光晕与平滑媒体过渡：包括 700ms 丝滑换图脊柱、60% 横向消融蒙版（暗黑与皓白自适应）、算法散布关键词云图。
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
              {sampleCovers.map((c, i) => (
                <button
                  key={c.sourceUrl}
                  type="button"
                  onClick={() => setActiveCoverIdx(i)}
                  className={`px-3 py-1 rounded text-xs font-mono cursor-pointer transition-all ${
                    activeCoverIdx === i
                      ? isEmerald
                        ? "bg-[#059669] text-white font-bold"
                        : "bg-[#E5192D] text-white font-bold"
                      : isEmerald
                      ? "bg-slate-100 text-slate-600 hover:text-slate-900"
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
      sourceUrl: "${sampleCovers[activeCoverIdx]?.sourceUrl}",
      imageUrl: "${sampleCovers[activeCoverIdx]?.imageUrl}",
      title: "${sampleCovers[activeCoverIdx]?.title}",
    }}
  />
</div>`}
      >
        <div
          className={`relative w-full max-w-xl h-72 sm:h-80 rounded-2xl overflow-hidden border ${
            isEmerald ? "border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]" : "border-white/10 shadow-2xl"
          }`}
        >
          <StageMediaSpine cover={sampleCovers[activeCoverIdx]} />
          <div
            className={`absolute bottom-4 left-4 z-10 px-3 py-1 rounded-full border text-xs font-mono backdrop-blur-md ${
              isEmerald
                ? "bg-white/80 border-slate-200 text-slate-800"
                : "bg-black/60 border-white/10 text-white"
            }`}
          >
            当前处于: {sampleCovers[activeCoverIdx]?.title} (点击上方按钮观察平滑淡入)
          </div>
        </div>
      </ComponentPreview>

      {/* 2. KeywordAtmosphere 关键词散布云图 */}
      <ComponentPreview
        title="KeywordAtmosphere 算法排版关键词散布云图"
        description="当篇章无头图或处于概念阐述时，以算法计算散布的无衬线与等宽大字，叠合 40px 网格纹理与弱径向晕光。"
        code={`import { KeywordAtmosphere } from "@/sparx-ui";

<div className="relative w-full h-80 rounded-2xl overflow-hidden">
  <KeywordAtmosphere mode="stage" />
</div>`}
      >
        <div
          className={`relative w-full max-w-xl h-72 sm:h-80 rounded-2xl overflow-hidden border ${
            isEmerald ? "border-slate-200 bg-slate-50 shadow-[0_1px_2px_rgba(0,0,0,0.03)]" : "border-white/10 bg-black shadow-2xl"
          }`}
        >
          <KeywordAtmosphere mode="stage" words={DEFAULT_KEYWORD_WORDS} />
        </div>
      </ComponentPreview>

      {/* 3. AmbientDissolveMask 60% 横向消融蒙版 */}
      <ComponentPreview
        title="AmbientDissolveMask 60% 自适应消融蒙版"
        description="针对双风格深度定制：暗黑模式下深黑大图柔和隐入暗房；浅色模式下采用高调（High-key）明朗建筑视觉，配合平滑阿尔法渐变，轻盈消融进纯白底色，彻底杜绝死黑硬溶造成的污浊灰泥感。"
        code={`import { AmbientDissolveMask } from "@/sparx-ui";

<div className="relative w-full h-64 rounded-2xl overflow-hidden bg-cover bg-center">
  <AmbientDissolveMask />
  <div className="relative z-10 p-6 flex justify-end">
    <span className="text-sm font-bold">右侧平滑融进背景</span>
  </div>
</div>`}
      >
        <div
          className={`relative w-full max-w-xl h-64 rounded-2xl overflow-hidden border ${
            isEmerald ? "border-slate-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]" : "border-white/10 bg-[#030406] shadow-2xl"
          }`}
        >
          <img
            src={
              isEmerald
                ? "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85"
                : "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=85"
            }
            alt="Preview"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <AmbientDissolveMask />
          <div className="relative z-10 h-full flex items-center justify-end pr-8">
            <div className="max-w-xs text-right space-y-1">
              <span
                className={`text-xs font-mono font-bold ${
                  isEmerald ? "text-[#059669]" : "text-[#E5192D]"
                }`}
              >
                60% DISSOLVE
              </span>
              <p className={`text-xs ${isEmerald ? "text-slate-600" : "text-zinc-300"}`}>
                {isEmerald
                  ? "浅色高调极简建筑摄影，经过精密阿尔法消融曲线，在 58% 处轻盈融进纯白 (#FFFFFF) 卡片底色，透气自然。"
                  : "暗色极客大图在 58% 宽度处柔和消融进暗室 (#030406) 底色。"}
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
        <div
          className={`relative w-full max-w-xl h-64 rounded-2xl overflow-hidden border ${
            isEmerald ? "border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]" : "border-white/10 shadow-2xl"
          }`}
        >
          <VideoTitleCard provider="BILIBILI" onPlay={() => alert("触发视频播放")} />
        </div>
      </ComponentPreview>
    </div>
  );
};
