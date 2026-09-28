import React, { useState } from "react";
import {
  KeywordAtmosphere,
  AmbientDissolveMask,
  StageMediaSpine,
  VideoTitleCard,
  DEFAULT_KEYWORD_WORDS,
  useSparxTheme,
} from "@/sparx-ui";
import { ComponentPreview } from "../../components/ComponentPreview";
import { CloudRain } from "lucide-react";

const DARK_SAMPLE_COVERS = [
  {
    sourceUrl: "cover-a",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=85",
    title: "个人站点的边缘部署",
  },
  {
    sourceUrl: "cover-b",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
    title: "长推理模型的等待体验",
  },
  {
    sourceUrl: "cover-c",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=85",
    title: "深色界面的配色层级",
  },
];

const LIGHT_SAMPLE_COVERS = [
  {
    sourceUrl: "cover-a-light",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    title: "企业知识库的发布流程",
  },
  {
    sourceUrl: "cover-b-light",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
    title: "研发团队的代码评审规范",
  },
  {
    sourceUrl: "cover-c-light",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
    title: "浅色界面的阴影与边框",
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
          <span>ATMOSPHERE · 背景与媒体过渡</span>
        </div>
        <h1
          className={`text-2xl sm:text-4xl font-black tracking-tight ${
            isEmerald ? "text-slate-900" : "text-white"
          }`}
        >
          {isEmerald ? "背景、媒体过渡与 60% 横向渐变（浅色）" : "背景、媒体过渡与 60% 横向渐变（深色）"}
        </h1>
        <p
          className={`text-xs sm:text-sm max-w-3xl leading-relaxed ${
            isEmerald ? "text-slate-600" : "text-zinc-300"
          }`}
        >
          这一页的组件负责背景和图片过渡：700ms 的双图层换图、60% 横向渐变蒙版（自动适配深色和浅色主题），以及用于无封面页面的关键词散布背景。
        </p>
      </section>

      {/* 1. StageMediaSpine 700ms 双图层换图 */}
      <ComponentPreview
        title="StageMediaSpine 双图层换图"
        description="切换图片时，旧图留在底层，新图在上层用 700ms 淡入，中间不会出现黑屏或跳变。"
        controls={
          <div className="flex items-center gap-2">
            <span>封面：</span>
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
            {sampleCovers[activeCoverIdx]?.title}
          </div>
        </div>
      </ComponentPreview>

      {/* 2. KeywordAtmosphere 关键词散布背景 */}
      <ComponentPreview
        title="KeywordAtmosphere 关键词散布背景"
        description="文章没有封面图时使用：把关键词以不同字号和字体散布在背景上，叠加 40px 网格和微弱的径向光晕。"
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

      {/* 3. AmbientDissolveMask 60% 横向渐变蒙版 */}
      <ComponentPreview
        title="AmbientDissolveMask 60% 横向渐变蒙版"
        description="深色主题下，图片向右渐变过渡到深色底；浅色主题下，配合明亮的图片，用平滑的透明度渐变过渡到白色底。浅色主题不能直接用黑色渐变，否则过渡区域会发灰发脏。"
        code={`import { AmbientDissolveMask } from "@/sparx-ui";

<div className="relative w-full h-64 rounded-2xl overflow-hidden bg-cover bg-center">
  <AmbientDissolveMask />
  <div className="relative z-10 p-6 flex justify-end">
    <span className="text-sm font-bold">右侧过渡到背景色</span>
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
            alt="渐变蒙版示例图"
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
                  ? "浅色建筑照片在 58% 宽度处完全过渡到白色（#FFFFFF）卡片底色。"
                  : "深色图片在 58% 宽度处完全过渡到舞台底色（#030406）。"}
              </p>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* 4. VideoTitleCard 视频卡片 */}
      <ComponentPreview
        title="VideoTitleCard 视频封面卡片"
        description="视频没有封面图时的占位卡片，带播放按钮和视频平台标记。"
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
          <VideoTitleCard provider="BILIBILI" onPlay={() => alert("开始播放视频")} />
        </div>
      </ComponentPreview>
    </div>
  );
};
