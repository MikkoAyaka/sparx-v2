import React from "react";
import { Button, useSparxTheme } from "@/sparx-ui";
import { Sparkles, Terminal, Layers, ShieldCheck, Compass } from "lucide-react";

export const OverviewPage: React.FC<{ onNavigateTo: (id: string) => void }> = ({
  onNavigateTo,
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-16">
      {/* 英雄头图区域 */}
      <section
        className={`relative rounded-3xl border p-8 sm:p-12 overflow-hidden shadow-2xl transition-colors duration-200 ${
          isEmerald ? "bg-white border-slate-200" : "bg-[#030406] border-white/10"
        }`}
      >
        <div
          className={`absolute inset-0 pointer-events-none ${
            isEmerald
              ? "bg-[radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.12),transparent_50%),linear-gradient(135deg,rgb(248,250,252),rgb(255,255,255))]"
              : "bg-[radial-gradient(circle_at_70%_20%,rgba(229,25,45,0.18),transparent_50%),linear-gradient(135deg,rgb(14,15,22),rgb(3,4,6))]"
          }`}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-3xl">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isEmerald
                  ? "bg-[#059669] shadow-[0_0_12px_#059669]"
                  : "bg-[#E5192D] shadow-[0_0_12px_#E5192D]"
              }`}
            />
            <span
              className={`text-xs font-mono tracking-widest font-bold uppercase ${
                isEmerald ? "text-[#059669]" : "text-[#E5192D]"
              }`}
            >
              MULTI-STYLE DESIGN AXIOMS · 界面系统 V2
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${
              isEmerald ? "text-slate-900" : "text-white"
            }`}
          >
            {isEmerald
              ? "皓白极翠稳态与企业级数字出版"
              : "暗房虚空视界与主权出版美学"}
          </h1>

          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isEmerald ? "text-slate-600" : "text-zinc-300"
            }`}
          >
            Sparx UI v2 是基于 <span className={isEmerald ? "text-slate-900 font-semibold" : "text-white font-semibold"}>Mikko Ayaka 个人频道（Channel）</span>精心打磨的统一设计公理框架、组件库与面向 Agent 的设计提示词体系。
            系统同时支持面向个人前卫极客的<span className={isEmerald ? "text-[#059669] font-mono font-bold" : "text-[#E5192D] font-mono font-bold"}>「虚空绯红」</span>与面向企业中后台稳态的<span className="text-[#059669] font-mono font-bold">「皓白极翠」</span>两套具体实现。
            彻底摒弃平庸长卷，以 <span className="font-mono font-bold">100dvh 视口锁定舞台</span>、<span className="font-mono">60% 横向消融</span>与严谨排印红线为高信噪比产品构筑沉浸式舞台。
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              variant="flare"
              glow
              withArrow
              onClick={() => onNavigateTo("prompt")}
            >
              获取 Agent 提示词
            </Button>
            <Button
              variant="glass"
              onClick={() => onNavigateTo("stage-scene")}
            >
              体验 100dvh 舞台
            </Button>
            <Button
              variant="outline"
              onClick={() => onNavigateTo("primitives")}
            >
              检视通用原语
            </Button>
          </div>
        </div>
      </section>

      {/* 核心公理与设计边界 */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className={`w-4 h-4 ${isEmerald ? "text-[#059669]" : "text-[#E5192D]"}`} />
          <h2
            className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isEmerald ? "text-slate-900" : "text-white"
            }`}
          >
            设计体系四大核心公理（跨风格共享不变）
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            className={`p-6 rounded-2xl border space-y-3 shadow-xl transition-colors duration-200 ${
              isEmerald
                ? "bg-white border-slate-200 text-slate-800"
                : "bg-[#08090E] border-white/10 text-white"
            }`}
          >
            <div className="flex items-center gap-2.5 text-sm font-bold">
              <span
                className={`p-1.5 rounded-lg border ${
                  isEmerald
                    ? "bg-emerald-50 border-emerald-200 text-[#059669]"
                    : "bg-white/5 border-white/10 text-[#E5192D]"
                }`}
              >
                <Layers className="w-4 h-4" />
              </span>
              <span className={isEmerald ? "text-slate-900" : "text-white"}>
                1. 纯粹表面与主权强调（Surface & Accents）
              </span>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed ${isEmerald ? "text-slate-600" : "text-zinc-400"}`}>
              {isEmerald
                ? "企业模式采用纯净高亮的皓白极翠底色（#F8FAFC 视口、#FFFFFF 纯白舞台卡片），以沉稳高信噪比的翡翠绿（#059669 / #10B981）作为核心交互，辅以精密灰阶边框。"
                : "极客模式基底绝不采用廉价泛白的深灰，而是采用绝对暗房黑阶（#020204 视口画布、#030406 舞台、#050505 展卷画布）。核心交互全部使用绯红激光（#E5192D / #FF2D55）辅以精确的光学发光阴影。"}
            </p>
          </div>

          <div
            className={`p-6 rounded-2xl border space-y-3 shadow-xl transition-colors duration-200 ${
              isEmerald
                ? "bg-white border-slate-200 text-slate-800"
                : "bg-[#08090E] border-white/10 text-white"
            }`}
          >
            <div className="flex items-center gap-2.5 text-sm font-bold">
              <span
                className={`p-1.5 rounded-lg border ${
                  isEmerald
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                    : "bg-white/5 border-white/10 text-emerald-400"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
              </span>
              <span className={isEmerald ? "text-slate-900" : "text-white"}>
                2. 严格排印红线（Typographic Rigor）
              </span>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed ${isEmerald ? "text-slate-600" : "text-zinc-400"}`}>
              跨风格不可逾越的护栏：<strong className={isEmerald ? "text-slate-900 font-semibold" : "text-white font-semibold"}>渲染字号必须大于等于 12px</strong>（严禁任何小于 12px 的碎字，微型时间戳/状态点专享 12px，常规辅助提升至 13~14px）；<strong className={isEmerald ? "text-slate-900 font-semibold" : "text-white font-semibold"}>全站严格杜绝衬线体（Serif）</strong>。正文采用出版级 15~16px (1rem) leading-[1.85]。
            </p>
          </div>

          <div
            className={`p-6 rounded-2xl border space-y-3 shadow-xl transition-colors duration-200 ${
              isEmerald
                ? "bg-white border-slate-200 text-slate-800"
                : "bg-[#08090E] border-white/10 text-white"
            }`}
          >
            <div className="flex items-center gap-2.5 text-sm font-bold">
              <span
                className={`p-1.5 rounded-lg border ${
                  isEmerald
                    ? "bg-cyan-50 border-cyan-200 text-cyan-600"
                    : "bg-white/5 border-white/10 text-cyan-400"
                }`}
              >
                <Compass className="w-4 h-4" />
              </span>
              <span className={isEmerald ? "text-slate-900" : "text-white"}>
                3. 100dvh 视口锁定与横向消融
              </span>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed ${isEmerald ? "text-slate-600" : "text-zinc-400"}`}>
              探索式主页拒绝全局滚动条，采用自适应视口的 100dvh 独立大舞台。左侧 60% 铺陈大画幅媒体或视频，通过渐变蒙版柔和消融进背景（暗黑或皓白）；结合平滑阻尼滚轮漫游与触控手势。
            </p>
          </div>

          <div
            className={`p-6 rounded-2xl border space-y-3 shadow-xl transition-colors duration-200 ${
              isEmerald
                ? "bg-white border-slate-200 text-slate-800"
                : "bg-[#08090E] border-white/10 text-white"
            }`}
          >
            <div className="flex items-center gap-2.5 text-sm font-bold">
              <span
                className={`p-1.5 rounded-lg border ${
                  isEmerald
                    ? "bg-amber-50 border-amber-200 text-amber-600"
                    : "bg-white/5 border-white/10 text-amber-400"
                }`}
              >
                <Terminal className="w-4 h-4" />
              </span>
              <span className={isEmerald ? "text-slate-900" : "text-white"}>
                4. 双轨解耦展卷阅读（Split Monograph）
              </span>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed ${isEmerald ? "text-slate-600" : "text-zinc-400"}`}>
              长文阅读采用左侧 35% 固定环境脊柱（严禁滚动，随视线焦点智能投射环境色）与右侧 65% 无界排版画布（唯一正文滚动流），配合环形 SVG 阅读刻度规与读者轻共鸣协议。
            </p>
          </div>
        </div>
      </section>

      {/* 与 Sparx-v1 的关系对比说明 */}
      <section
        className={`p-6 sm:p-8 rounded-2xl border space-y-4 transition-colors duration-200 ${
          isEmerald
            ? "bg-white border-slate-200 text-slate-800 shadow-md"
            : "bg-[#08090E] border-white/10 text-white"
        }`}
      >
        <h3
          className={`text-base font-bold flex items-center gap-2 font-mono ${
            isEmerald ? "text-slate-900" : "text-white"
          }`}
        >
          <span className={isEmerald ? "text-[#059669]" : "text-[#E5192D]"}>✦</span>
          <span>与 Sparx-v1 项目的关系定位</span>
        </h3>
        <p
          className={`text-xs sm:text-sm leading-relaxed ${
            isEmerald ? "text-slate-600" : "text-zinc-300"
          }`}
        >
          在本次设计中，我们参考了 <a href="https://ui.mikkoayaka.com/" target="_blank" rel="noreferrer" className={`${isEmerald ? "text-[#059669]" : "text-[#E5192D]"} underline font-semibold`}>Sparx-v1</a> 优秀的<strong>组件库组织形式</strong>（规范化分类体系、原语/模式/示例三层结构、交互式预览试验场与代码展示），但<strong>坚决杜绝受其旧版美术风格的影响</strong>。
          Sparx-v2 全面采纳并升华了 <strong className={isEmerald ? "text-slate-900" : "text-white"}>Channel（个人频道）</strong>的核心公理，并扩展出企业级稳态分支，是一套兼顾极客前卫与企业生产的下一代多风格设计系统。
        </p>
      </section>
    </div>
  );
};
