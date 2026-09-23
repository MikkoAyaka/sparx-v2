import React, { useState } from "react";
import {
  SPARX_V2_AGENT_PROMPT_ZH,
  SPARX_V2_AGENT_PROMPT_EN,
  voidColors,
  flareColors,
  semanticColors,
  glowShadows,
  typographyScale,
} from "@/sparx-ui";
import { TokenSwatch } from "../components/TokenSwatch";
import { Button } from "@/sparx-ui/primitives/Button";
import { Copy, Check, Sparkles, Sliders } from "lucide-react";

export const AgentPromptPage: React.FC = () => {
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [copied, setCopied] = useState(false);

  const promptContent = lang === "zh" ? SPARX_V2_AGENT_PROMPT_ZH : SPARX_V2_AGENT_PROMPT_EN;

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(promptContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-16">
      {/* 头部说明 */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[#E5192D] font-bold">
          <Sparkles className="w-4 h-4" />
          <span>STANDARDIZED AGENT PROMPT · 智能体系统提示词</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          面向 AI Agent 的设计系统标准化提示词
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed font-light">
          本提示词旨在以极高信息密度和精确的专业设计术语，指导 AI 助手（如 ChatGPT、Claude、DeepSeek、Antigravity、Cursor 等）在不产生幻觉的前提下，100% 严谨复现 Channel 级的高信噪比界面。
        </p>
      </section>

      {/* 提示词卡片与复制器 */}
      <section className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#030406] overflow-hidden shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E5192D]" />
            <span className="font-mono text-xs text-white font-bold">
              SYSTEM_PROMPT.md
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* 语言切换 */}
            <div className="flex items-center bg-[#08090E] p-1 rounded-xl border border-white/10 text-xs font-mono">
              <button
                type="button"
                onClick={() => setLang("zh")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-medium ${
                  lang === "zh"
                    ? "bg-[#E5192D] text-white font-bold shadow-[0_0_10px_rgba(229,25,45,0.4)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                中文版
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-medium ${
                  lang === "en"
                    ? "bg-[#E5192D] text-white font-bold shadow-[0_0_10px_rgba(229,25,45,0.4)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                English
              </button>
            </div>

            <Button
              variant="flare"
              size="sm"
              glow
              onClick={handleCopyPrompt}
              className="gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>已复制提示词</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>一键复制提示词</span>
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-[#050505] overflow-x-auto subtle-scroll font-mono text-xs sm:text-sm text-zinc-200 leading-relaxed select-text">
          <pre className="whitespace-pre-wrap font-mono">
            {promptContent}
          </pre>
        </div>
      </section>

      {/* Design Token 可视化矩阵 */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#E5192D]" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            设计令牌（Tokens）参数矩阵
          </h2>
        </div>

        {/* 虚空色系 */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold">
            虚空暗房基底 (Void Spectrum)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <TokenSwatch
              name="voidColors.canvas"
              value={voidColors.canvas}
              description="视口最底层虚空暗房底色"
            />
            <TokenSwatch
              name="voidColors.stage"
              value={voidColors.stage}
              description="主舞台大卡容器底色"
            />
            <TokenSwatch
              name="voidColors.reading"
              value={voidColors.reading}
              description="展卷阅读正文画布底色"
            />
            <TokenSwatch
              name="voidColors.dock"
              value={voidColors.dock}
              description="悬浮控制器坞、导航胶囊底色"
            />
            <TokenSwatch
              name="voidColors.card"
              value={voidColors.card}
              description="次级抬升卡片与代码区"
            />
            <TokenSwatch
              name="voidColors.muted"
              value={voidColors.muted}
              description="辅助面板底色"
            />
          </div>
        </div>

        {/* 绯红激光与语义点缀 */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono text-[#E5192D] uppercase tracking-wider font-bold">
            绯红激光与语义强调 (Laser Flare & Semantics)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <TokenSwatch
              name="flareColors.core"
              value={flareColors.core}
              description="核心激光强调主色 (#E5192D)"
            />
            <TokenSwatch
              name="flareColors.neon"
              value={flareColors.neon}
              description="高能光学霓虹强调 (#FF2D55)"
            />
            <TokenSwatch
              name="semanticColors.active"
              value={semanticColors.active}
              description="在线/就绪状态 (Emerald 500)"
            />
            <TokenSwatch
              name="semanticColors.radar"
              value={semanticColors.radar}
              description="实时情报/雷达 (Cyan 500)"
            />
            <TokenSwatch
              name="semanticColors.caution"
              value={semanticColors.caution}
              description="警示/重试状态 (Amber 500)"
            />
            <TokenSwatch
              name="semanticColors.arch"
              value={semanticColors.arch}
              description="底层架构/哲学 (Violet 500)"
            />
          </div>
        </div>

        {/* 发光阴影 */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold">
            光学发光阴影 (Glow Luminescence)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TokenSwatch
              name="glowShadows.flareMd"
              value={glowShadows.flareMd}
              description="行动按钮与激活标签标准发光"
              type="shadow"
            />
            <TokenSwatch
              name="glowShadows.flareLg"
              value={glowShadows.flareLg}
              description="大舞台焦点元素高强发光"
              type="shadow"
            />
          </div>
        </div>

        {/* 排印字阶与 >=12px 底线 */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold">
            排印字阶与红线保障 (Typographic Scale · MIN 12px)
          </h3>
          <div className="rounded-2xl border border-white/10 bg-[#08090E] overflow-hidden">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-white/5 border-b border-white/10 text-zinc-400">
                <tr>
                  <th className="p-3">级别</th>
                  <th className="p-3">字号</th>
                  <th className="p-3">行高</th>
                  <th className="p-3">说明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                <tr>
                  <td className="p-3 font-bold text-white">Display</td>
                  <td className="p-3">{typographyScale.display.size}</td>
                  <td className="p-3">{typographyScale.display.lineHeight}</td>
                  <td className="p-3 text-zinc-400">大画幅英雄大标题</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">H1</td>
                  <td className="p-3">{typographyScale.h1.size}</td>
                  <td className="p-3">{typographyScale.h1.lineHeight}</td>
                  <td className="p-3 text-zinc-400">文章大标题与主舞台标题</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Body</td>
                  <td className="p-3 text-[#E5192D] font-bold">15px (0.9375rem)</td>
                  <td className="p-3 font-bold text-[#E5192D]">1.85</td>
                  <td className="p-3 text-zinc-400">正文出版级舒缓排印（Channel 独创）</td>
                </tr>
                <tr className="bg-[#E5192D]/5">
                  <td className="p-3 font-bold text-[#FF2D55]">Meta Mono (Floor)</td>
                  <td className="p-3 font-bold text-[#FF2D55]">12px (0.75rem)</td>
                  <td className="p-3">1.5</td>
                  <td className="p-3 text-red-300">全站不可逾越的最小字号底线</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
