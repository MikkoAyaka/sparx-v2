import React from "react";
import { Button, Badge, StatusDot } from "@/sparx-ui";
import { Sparkles, Terminal, Layers, ShieldCheck, Flame, Compass } from "lucide-react";

export const OverviewPage: React.FC<{ onNavigateTo: (id: string) => void }> = ({
  onNavigateTo,
}) => {
  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-16">
      {/* 英雄头图区域 */}
      <section className="relative rounded-3xl border border-white/10 bg-[#030406] p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(229,25,45,0.18),transparent_50%),linear-gradient(135deg,rgb(14,15,22),rgb(3,4,6))] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-3xl">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5192D] shadow-[0_0_12px_#E5192D]" />
            <span className="text-xs font-mono tracking-widest text-[#E5192D] font-bold uppercase">
              SOVEREIGN EDITORIAL SYSTEM · 界面系统 V2
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            暗房虚空视界与主权出版美学
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
            Sparx UI v2 是基于 <span className="text-white font-semibold">Mikko Ayaka 个人频道（Channel）</span>精心打磨的深黑出版设计系统、通用源码库与面向 Agent 的设计提示词体系。
            彻底摒弃平庸灰底与粗暴长卷，以 <span className="text-[#E5192D] font-mono font-bold">100dvh 视口锁定舞台</span>、<span className="text-white font-mono">60% 横向消融</span>与<span className="text-[#FF2D55] font-mono font-bold">高压绯红激光强调</span>，为严肃创作者和高信噪比产品构筑沉浸式舞台。
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
          <Sparkles className="w-4 h-4 text-[#E5192D]" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            设计体系四大核心公理
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl border border-white/10 bg-[#08090E] space-y-3 shadow-xl">
            <div className="flex items-center gap-2.5 text-sm font-bold text-white">
              <span className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#E5192D]">
                <Layers className="w-4 h-4" />
              </span>
              <span>1. 极深虚空与绯红激光（Void & Flare）</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              基底绝不采用廉价泛白的深灰，而是采用绝对暗房黑阶（#020204 视口画布、#030406 舞台、#050505 展卷画布）。核心交互全部使用绯红激光（#E5192D / #FF2D55）辅以精确的光学发光阴影，形成极高视觉反差。
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#08090E] space-y-3 shadow-xl">
            <div className="flex items-center gap-2.5 text-sm font-bold text-white">
              <span className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <span>2. 严格排印红线（Typographic Rigor）</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              两条绝对不可逾越的护栏：<strong className="text-white font-semibold">渲染字号必须大于等于 12px</strong>（严禁任何小于 12px 的碎字）；<strong className="text-white font-semibold">全站严格杜绝衬线体（Serif）</strong>。正文严格为 15px leading-[1.85] text-neutral-300。
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#08090E] space-y-3 shadow-xl">
            <div className="flex items-center gap-2.5 text-sm font-bold text-white">
              <span className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-cyan-400">
                <Compass className="w-4 h-4" />
              </span>
              <span>3. 100dvh 视口锁定与横向消融</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              探索式主页拒绝全局滚动条，采用自适应视口的 100dvh 独立大舞台。左侧 60% 铺陈大画幅媒体或视频，通过渐变蒙版柔和消融进暗色背景；结合平滑阻尼滚轮漫游与触控手势。
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#08090E] space-y-3 shadow-xl">
            <div className="flex items-center gap-2.5 text-sm font-bold text-white">
              <span className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-amber-400">
                <Terminal className="w-4 h-4" />
              </span>
              <span>4. 双轨解耦展卷阅读（Split Monograph）</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              长文阅读采用左侧 35% 固定环境脊柱（严禁滚动，随视线焦点智能投射环境色）与右侧 65% 无界排版画布（唯一正文滚动流），配合环形 SVG 阅读刻度规与读者轻共鸣协议。
            </p>
          </div>
        </div>
      </section>

      {/* 与 Sparx-v1 的关系对比说明 */}
      <section className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#08090E] space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
          <span className="text-[#E5192D]">✦</span>
          <span>与 Sparx-v1 项目的关系定位</span>
        </h3>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
          在本次设计中，我们参考了 <a href="https://ui.mikkoayaka.com/" target="_blank" rel="noreferrer" className="text-[#E5192D] underline">Sparx-v1</a> 优秀的<strong>组件库组织形式</strong>（规范化分类体系、原语/模式/示例三层结构、交互式预览试验场与代码展示），但<strong>坚决杜绝受其旧版美术风格的影响</strong>。
          Sparx-v2 全面采纳并升华了 <strong className="text-white">Channel（个人频道）</strong>的影院暗房、激光高压发光、60% 消融蒙版与无衬线排印红线，是一套独立完整的下一代设计系统。
        </p>
      </section>
    </div>
  );
};
