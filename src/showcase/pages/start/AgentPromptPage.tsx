import React, { useState } from "react";
import {
  Button,
  getAgentPrompt,
  useSparxTheme,
  sparxThemes,
  type SparxStyleTheme,
} from "@/sparx-ui";
import { Copy, Check, Sparkles } from "lucide-react";

export const AgentPromptPage: React.FC = () => {
  const { themeId, setThemeId } = useSparxTheme();
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  const isEmerald = themeId === "glacial-emerald";
  const currentTheme = sparxThemes[themeId];
  const promptContent = getAgentPrompt(themeId, lang);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(promptContent);
      setCopyState("copied");
    } catch {
      // 浏览器拒绝访问剪贴板（例如非 HTTPS 环境）时，提示用户手动复制
      setCopyState("failed");
    }
    setTimeout(() => setCopyState("idle"), 2500);
  };

  const handleSelectStyle = (style: SparxStyleTheme) => {
    setThemeId(style);
  };

  return (
    <div className="w-full min-w-0 space-y-10">
      {/* 头部说明 */}
      <section className="space-y-3">
        <div
          className={`flex items-center gap-2 text-xs font-mono font-bold ${
            isEmerald ? "text-[#059669]" : "text-[#E5192D]"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AGENT PROMPTS · 设计系统提示词</span>
        </div>
        <h1
          className={`text-2xl sm:text-4xl font-black tracking-tight ${
            isEmerald ? "text-slate-900" : "text-white"
          }`}
        >
          给 AI 编码助手的设计系统提示词
        </h1>
        <p
          className={`text-xs sm:text-sm max-w-3xl leading-relaxed ${
            isEmerald ? "text-slate-600" : "text-zinc-300"
          }`}
        >
          这两份提示词整理自 Channel 的视觉风格和 Sparx UI v2 的组件规范，分别对应面向个人站点的<strong>「虚空绯红」</strong>和面向企业应用的<strong>「皓白极翠」</strong>。把它放进 Claude、ChatGPT、DeepSeek、Cursor 等工具的系统提示词，生成的界面会遵守同一套颜色、字号和布局规则。
        </p>

        {/* 主题切换 */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <span
            className={`text-xs font-mono font-bold ${
              isEmerald ? "text-slate-500" : "text-zinc-400"
            }`}
          >
            主题：
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
              <span>虚空绯红（Void Flare · 个人）</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectStyle("glacial-emerald")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
                themeId === "glacial-emerald"
                  ? "bg-[#059669] text-white font-bold"
                  : isEmerald
                  ? "text-slate-600 hover:text-slate-900"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span>◈</span>
              <span>皓白极翠（Glacial Emerald · 企业）</span>
            </button>
          </div>
        </div>
      </section>

      {/* 提示词卡片与复制器 */}
      <section
        className={`rounded-2xl sm:rounded-3xl border overflow-hidden transition-colors duration-200 ${
          isEmerald
            ? "bg-white border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
            : "bg-[#030406] border-white/10 shadow-2xl"
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
              className={`text-sm font-mono px-2 py-0.5 rounded-full border ${
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
                      ? "bg-[#059669] text-white font-bold"
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
                      ? "bg-[#059669] text-white font-bold"
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
              className="gap-1.5 shrink-0 whitespace-nowrap"
            >
              {copyState === "copied" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>已复制</span>
                </>
              ) : copyState === "failed" ? (
                <span>无法访问剪贴板，请手动选中文本复制</span>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>复制提示词</span>
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

    </div>
  );
};
