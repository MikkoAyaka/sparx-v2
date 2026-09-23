import React, { useState } from "react";
import {
  getAgentPrompt,
  useSparxTheme,
  sparxThemes,
  type SparxStyleTheme,
  typographyScale,
} from "@/sparx-ui";
import { TokenSwatch } from "../components/TokenSwatch";
import { Button } from "@/sparx-ui/primitives/Button";
import { Copy, Check, Sparkles, Sliders } from "lucide-react";

export const AgentPromptPage: React.FC = () => {
  const { themeId, setThemeId } = useSparxTheme();
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [copied, setCopied] = useState(false);

  const isEmerald = themeId === "glacial-emerald";
  const currentTheme = sparxThemes[themeId];
  const promptContent = getAgentPrompt(themeId, lang);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(promptContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleSelectStyle = (style: SparxStyleTheme) => {
    setThemeId(style);
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-16">
      {/* 头部说明 */}
      <section className="space-y-3">
        <div
          className={`flex items-center gap-2 text-xs font-mono font-bold ${
            isEmerald ? "text-[#059669]" : "text-[#E5192D]"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>MULTI-STYLE STANDARDIZED AGENT PROMPTS · 多风格智能体系统提示词</span>
        </div>
        <h1
          className={`text-2xl sm:text-4xl font-black tracking-tight ${
            isEmerald ? "text-slate-900" : "text-white"
          }`}
        >
          面向 AI Agent 的设计体系标准化提示词
        </h1>
        <p
          className={`text-xs sm:text-sm max-w-3xl leading-relaxed ${
            isEmerald ? "text-slate-600" : "text-zinc-300"
          }`}
        >
          本规范提炼自 Channel 视觉哲学与 Sparx UI v2 多风格工程架构。涵盖面向个人前卫场景的<strong>「虚空绯红」</strong>与面向企业稳态业务的<strong>「皓白极翠」</strong>两套高信噪比 Prompt，指导大模型（ChatGPT、Claude、DeepSeek、Antigravity、Cursor 等）在不产生幻觉的前提下 100% 严谨复现界面。
        </p>

        {/* 风格快速选择导轨 */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <span
            className={`text-xs font-mono font-bold ${
              isEmerald ? "text-slate-500" : "text-zinc-400"
            }`}
          >
            切换风格分支:
          </span>
          <div
            className={`flex items-center p-1 rounded-xl border text-xs font-mono ${
              isEmerald ? "bg-white border-slate-200" : "bg-[#08090E] border-white/10"
            }`}
          >
            <button
              type="button"
              onClick={() => handleSelectStyle("void-flare")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
                themeId === "void-flare"
                  ? "bg-[#E5192D] text-white font-bold shadow-[0_0_10px_rgba(229,25,45,0.4)]"
                  : isEmerald
                  ? "text-slate-600 hover:text-slate-900"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span>✦</span>
              <span>虚空绯红 (Void Flare · 极客/前卫)</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectStyle("glacial-emerald")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
                themeId === "glacial-emerald"
                  ? "bg-[#059669] text-white font-bold shadow-[0_0_10px_rgba(16,185,129,0.35)]"
                  : isEmerald
                  ? "text-slate-600 hover:text-slate-900"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span>◈</span>
              <span>皓白极翠 (Glacial Emerald · 企业/稳态)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 提示词卡片与复制器 */}
      <section
        className={`rounded-2xl sm:rounded-3xl border overflow-hidden shadow-2xl transition-colors duration-200 ${
          isEmerald ? "bg-white border-slate-200" : "bg-[#030406] border-white/10"
        }`}
      >
        <div
          className={`flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b ${
            isEmerald
              ? "border-slate-200 bg-slate-50/50"
              : "border-white/10 bg-white/[0.02]"
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isEmerald ? "bg-[#059669]" : "bg-[#E5192D]"
              }`}
            />
            <span
              className={`font-mono text-xs font-bold ${
                isEmerald ? "text-slate-800" : "text-white"
              }`}
            >
              PROMPT_{themeId.toUpperCase().replace("-", "_")}.md
            </span>
            <span
              className={`text-[12px] font-mono px-2 py-0.5 rounded-full border ${
                isEmerald
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-red-500/10 border-red-500/20 text-red-300"
              }`}
            >
              {currentTheme.name} ({currentTheme.badge})
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* 语言切换 */}
            <div
              className={`flex items-center p-1 rounded-xl border text-xs font-mono ${
                isEmerald ? "bg-slate-100 border-slate-200" : "bg-[#08090E] border-white/10"
              }`}
            >
              <button
                type="button"
                onClick={() => setLang("zh")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-medium ${
                  lang === "zh"
                    ? isEmerald
                      ? "bg-[#059669] text-white font-bold shadow-[0_0_10px_rgba(16,185,129,0.35)]"
                      : "bg-[#E5192D] text-white font-bold shadow-[0_0_10px_rgba(229,25,45,0.4)]"
                    : isEmerald
                    ? "text-slate-600 hover:text-slate-900"
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
                    ? isEmerald
                      ? "bg-[#059669] text-white font-bold shadow-[0_0_10px_rgba(16,185,129,0.35)]"
                      : "bg-[#E5192D] text-white font-bold shadow-[0_0_10px_rgba(229,25,45,0.4)]"
                    : isEmerald
                    ? "text-slate-600 hover:text-slate-900"
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
                  <span>一键复制此风格提示词</span>
                </>
              )}
            </Button>
          </div>
        </div>

        <div
          className={`p-6 sm:p-8 overflow-x-auto subtle-scroll font-mono text-xs sm:text-sm leading-relaxed select-text transition-colors duration-200 ${
            isEmerald
              ? "bg-[#F8FAFC] text-slate-800"
              : "bg-[#050505] text-zinc-200"
          }`}
        >
          <pre className="whitespace-pre-wrap font-mono">
            {promptContent}
          </pre>
        </div>
      </section>

      {/* Design Token 可视化矩阵 */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Sliders
            className={`w-4 h-4 ${isEmerald ? "text-[#059669]" : "text-[#E5192D]"}`}
          />
          <h2
            className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isEmerald ? "text-slate-900" : "text-white"
            }`}
          >
            当前风格设计令牌（Tokens）参数矩阵 · {currentTheme.name}
          </h2>
        </div>

        {/* 视口与容器基底 */}
        <div className="space-y-3">
          <h3
            className={`text-xs font-mono uppercase tracking-wider font-bold ${
              isEmerald ? "text-slate-600" : "text-zinc-400"
            }`}
          >
            {isEmerald ? "皓白基底光谱 (Glacial Spectrum)" : "虚空暗房基底 (Void Spectrum)"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <TokenSwatch
              name="theme.bg.canvas"
              value={currentTheme.bg.canvas}
              description="视口最底层画布基底"
            />
            <TokenSwatch
              name="theme.bg.stage"
              value={currentTheme.bg.stage}
              description="主舞台大卡容器底色"
            />
            <TokenSwatch
              name="theme.bg.reading"
              value={currentTheme.bg.reading}
              description="展卷阅读正文画布底色"
            />
            <TokenSwatch
              name="theme.bg.dock"
              value={currentTheme.bg.dock}
              description="悬浮控制器坞、导航胶囊底色"
            />
            <TokenSwatch
              name="theme.bg.card"
              value={currentTheme.bg.card}
              description="次级抬升卡片与代码区"
            />
            <TokenSwatch
              name="theme.bg.muted"
              value={currentTheme.bg.muted}
              description="辅助面板底色"
            />
          </div>
        </div>

        {/* 核心高压与强调色 */}
        <div className="space-y-3">
          <h3
            className={`text-xs font-mono uppercase tracking-wider font-bold ${
              isEmerald ? "text-[#059669]" : "text-[#E5192D]"
            }`}
          >
            {isEmerald ? "稳态极翠强调 (Sovereign Emerald & Semantics)" : "绯红激光强调 (Laser Flare & Semantics)"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <TokenSwatch
              name="theme.accent.core"
              value={currentTheme.accent.core}
              description={`核心交互主色 (${currentTheme.accent.core})`}
            />
            <TokenSwatch
              name="theme.accent.neon"
              value={currentTheme.accent.neon}
              description={`高能高光强调 (${currentTheme.accent.neon})`}
            />
            <TokenSwatch
              name="semantic.active"
              value="#10B981"
              description="在线/就绪状态 (Emerald 500)"
            />
            <TokenSwatch
              name="semantic.radar"
              value="#06B6D4"
              description="实时情报/雷达 (Cyan 500)"
            />
            <TokenSwatch
              name="semantic.caution"
              value="#F59E0B"
              description="警示/重试状态 (Amber 500)"
            />
            <TokenSwatch
              name="semantic.arch"
              value="#8B5CF6"
              description="底层架构/深度 (Violet 500)"
            />
          </div>
        </div>

        {/* 发光阴影 */}
        <div className="space-y-3">
          <h3
            className={`text-xs font-mono uppercase tracking-wider font-bold ${
              isEmerald ? "text-slate-600" : "text-zinc-400"
            }`}
          >
            光学发光阴影 (Glow Luminescence)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TokenSwatch
              name="theme.glow.md"
              value={currentTheme.glow.md}
              description="行动按钮与激活标签标准发光"
              type="shadow"
            />
            <TokenSwatch
              name="theme.glow.lg"
              value={currentTheme.glow.lg}
              description="大舞台焦点元素高强发光"
              type="shadow"
            />
          </div>
        </div>

        {/* 排印字阶与 >=12px 底线 */}
        <div className="space-y-3">
          <h3
            className={`text-xs font-mono uppercase tracking-wider font-bold ${
              isEmerald ? "text-slate-600" : "text-zinc-400"
            }`}
          >
            排印字阶与红线保障 (Typographic Scale · MIN 12px)
          </h3>
          <div
            className={`rounded-2xl border overflow-hidden transition-colors duration-200 ${
              isEmerald
                ? "bg-white border-slate-200"
                : "bg-[#08090E] border-white/10"
            }`}
          >
            <table className="w-full text-left text-xs font-mono">
              <thead
                className={`border-b ${
                  isEmerald
                    ? "bg-slate-50 border-slate-200 text-slate-600"
                    : "bg-white/5 border-white/10 text-zinc-400"
                }`}
              >
                <tr>
                  <th className="p-3">级别</th>
                  <th className="p-3">字号</th>
                  <th className="p-3">行高</th>
                  <th className="p-3">说明</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  isEmerald
                    ? "divide-slate-200 text-slate-700"
                    : "divide-white/5 text-zinc-300"
                }`}
              >
                <tr>
                  <td
                    className={`p-3 font-bold ${
                      isEmerald ? "text-slate-900" : "text-white"
                    }`}
                  >
                    Display
                  </td>
                  <td className="p-3">{typographyScale.display.size}</td>
                  <td className="p-3">{typographyScale.display.lineHeight}</td>
                  <td className={`p-3 ${isEmerald ? "text-slate-500" : "text-zinc-400"}`}>
                    大画幅英雄大标题
                  </td>
                </tr>
                <tr>
                  <td
                    className={`p-3 font-bold ${
                      isEmerald ? "text-slate-900" : "text-white"
                    }`}
                  >
                    H1
                  </td>
                  <td className="p-3">{typographyScale.h1.size}</td>
                  <td className="p-3">{typographyScale.h1.lineHeight}</td>
                  <td className={`p-3 ${isEmerald ? "text-slate-500" : "text-zinc-400"}`}>
                    文章大标题与主舞台标题
                  </td>
                </tr>
                <tr>
                  <td
                    className={`p-3 font-bold ${
                      isEmerald ? "text-slate-900" : "text-white"
                    }`}
                  >
                    Body
                  </td>
                  <td
                    className={`p-3 font-bold ${
                      isEmerald ? "text-[#059669]" : "text-[#E5192D]"
                    }`}
                  >
                    1rem (15~16px)
                  </td>
                  <td
                    className={`p-3 font-bold ${
                      isEmerald ? "text-[#059669]" : "text-[#E5192D]"
                    }`}
                  >
                    1.85
                  </td>
                  <td className={`p-3 ${isEmerald ? "text-slate-500" : "text-zinc-400"}`}>
                    正文出版级舒缓排印（清晰易读，兼顾标准屏与 4K）
                  </td>
                </tr>
                <tr>
                  <td
                    className={`p-3 font-bold ${
                      isEmerald ? "text-slate-900" : "text-white"
                    }`}
                  >
                    Caption
                  </td>
                  <td
                    className={`p-3 font-mono ${
                      isEmerald ? "text-slate-800" : "text-white"
                    }`}
                  >
                    0.875rem (13.5~14px)
                  </td>
                  <td className="p-3">1.6</td>
                  <td className={`p-3 ${isEmerald ? "text-slate-500" : "text-zinc-400"}`}>
                    次级说明、标签文本、按钮基准
                  </td>
                </tr>
                <tr className={isEmerald ? "bg-emerald-50/70" : "bg-[#E5192D]/5"}>
                  <td
                    className={`p-3 font-bold ${
                      isEmerald ? "text-[#059669]" : "text-[#FF2D55]"
                    }`}
                  >
                    Meta Mono (Floor)
                  </td>
                  <td
                    className={`p-3 font-bold ${
                      isEmerald ? "text-[#059669]" : "text-[#FF2D55]"
                    }`}
                  >
                    0.75rem (12px)
                  </td>
                  <td className="p-3">1.5</td>
                  <td
                    className={`p-3 ${
                      isEmerald ? "text-emerald-800" : "text-red-300"
                    }`}
                  >
                    全站不可逾越的最小字号底线（微型时间戳、状态点）
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
