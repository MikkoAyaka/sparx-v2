import React, { useState } from "react";
import { clsx } from "clsx";
import { Layers3, RotateCcw } from "lucide-react";
import { Button, GlassCard, durations, easings, useSparxTheme } from "@/sparx-ui";
import { PageIntro, SectionHeading } from "../../components/PageIntro";
import { TokenSwatch } from "../../components/TokenSwatch";

const SURFACES: { variant: "stage" | "elevated" | "receding" | "translucent"; name: string; use: string }[] = [
  { variant: "stage", name: "stage · 底层", use: "页面上最底层的大卡片，例如主舞台。" },
  { variant: "elevated", name: "elevated · 抬升", use: "可交互的卡片和浮动窗口。" },
  { variant: "receding", name: "receding · 内凹", use: "代码、状态信息、嵌套的侧栏。" },
  { variant: "translucent", name: "translucent · 半透明", use: "悬浮在内容上方的导航栏和弹出层。" },
];

const RADII = [
  { cls: "rounded-lg", px: "8px", use: "侧栏导航项、小按钮、输入框内的标签" },
  { cls: "rounded-xl", px: "12px", use: "输入框、面板、企业场景的卡片" },
  { cls: "rounded-2xl", px: "16px", use: "文档页的卡片、代码块" },
  { cls: "rounded-3xl", px: "24px", use: "主舞台、大型展示卡片" },
  { cls: "rounded-full", px: "9999px", use: "按钮、徽标、标签" },
];

export const SurfacesPage: React.FC = () => {
  const { themeId, theme } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";
  const [replay, setReplay] = useState(0);

  const card = isEmerald ? "bg-white border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]" : "bg-[#08090E] border-white/10";
  const muted = isEmerald ? "text-slate-500" : "text-zinc-400";
  const strong = isEmerald ? "text-slate-900" : "text-white";

  return (
    <div className="space-y-14">
      <PageIntro eyebrow="Surfaces & Motion · 层级与动效" icon={<Layers3 className="w-4 h-4" />} title="层级与动效">
        <p>
          {isEmerald
            ? "皓白极翠的层级主要靠 1px 边框和留白区分，阴影浅到第一眼几乎看不出来。动效只做透明度和背景色过渡，任何元素在悬停时都不改变尺寸。"
            : "虚空绯红的层级靠明暗区分：越靠上的表面越亮一点。发光只留给激活状态，动效可以更有表现力，但每次只动一个重点。"}
        </p>
      </PageIntro>

      <section className="space-y-5">
        <SectionHeading title="表面层级" description="GlassCard 提供四种层级，从底到顶依次叠放。不要在带阴影的卡片里再放带阴影的卡片。" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SURFACES.map((s) => (
            <GlassCard key={s.variant} variant={s.variant} className="p-5 space-y-1.5">
              <div className={clsx("font-mono text-sm font-bold", isEmerald ? "text-[#059669]" : "text-[#E5192D]")}>{s.name}</div>
              <p className={clsx("text-sm", muted)}>{s.use}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading
          title="阴影与发光"
          description={
            isEmerald
              ? "浅色主题没有真正的“发光”，glow 令牌是一组极浅的阴影，只用来让白卡片和浅灰底色分开。"
              : "发光只用于激活状态：当前导航项、主按钮、正在运行的步骤。同一屏里发光的元素不超过两个。"
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TokenSwatch name="glow.md" value={theme.glow.md} description="主按钮、激活标签" type="shadow" />
          <TokenSwatch name="glow.lg" value={theme.glow.lg} description="主舞台上的焦点元素" type="shadow" />
          <TokenSwatch name="shadow.card" value={theme.shadow.card} description="普通卡片" type="shadow" />
          <TokenSwatch name="shadow.floating" value={theme.shadow.floating} description="浮层、下拉菜单" type="shadow" />
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading title="圆角" />
        <div className={clsx("rounded-2xl border divide-y", card, isEmerald ? "divide-slate-100" : "divide-white/[0.06]")}>
          {RADII.map((r) => (
            <div key={r.cls} className="flex items-center gap-5 p-4">
              <div
                className={clsx(
                  "w-14 h-10 shrink-0 border-2",
                  r.cls,
                  isEmerald ? "border-[#059669] bg-emerald-50" : "border-[#E5192D] bg-[#E5192D]/10"
                )}
              />
              <div className="min-w-0">
                <div className={clsx("font-mono text-sm font-semibold", strong)}>
                  {r.cls} <span className={muted}>· {r.px}</span>
                </div>
                <div className={clsx("text-sm", muted)}>{r.use}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading
          title="动效"
          description="系统设置了“减少动态效果”时，样式文件会关闭所有入场动画。"
          aside={
            <Button variant="outline" size="sm" icon={<RotateCcw className="w-3.5 h-3.5" />} onClick={() => setReplay((n) => n + 1)}>
              重播示例
            </Button>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={clsx("rounded-2xl border p-5 space-y-4", card)}>
            <div className={clsx("text-sm font-semibold", strong)}>内容切换：animate-rise</div>
            <div key={replay} className="animate-rise space-y-2">
              <div className={clsx("text-2xl font-black tracking-tight", strong)}>摆脱被动投喂</div>
              <p className={clsx("text-sm", muted)}>主舞台翻篇、文档切换接口时，新内容上浮 10px 并淡入，时长 520ms。</p>
            </div>
          </div>
          <div className={clsx("rounded-2xl border p-5 space-y-3", card)}>
            <div className={clsx("text-sm font-semibold", strong)}>两种主题的边界</div>
            <ul className={clsx("space-y-2 text-sm leading-relaxed", muted)}>
              <li>
                <strong className={strong}>虚空绯红：</strong>可以用上浮淡入、状态脉冲、箭头右移和 700ms 的图片交叉淡入。
              </li>
              <li>
                <strong className={strong}>皓白极翠：</strong>只用透明度和背景色过渡（150~200ms）。不用 hover:scale，不在悬停时改变边框宽度。
              </li>
            </ul>
          </div>
        </div>

        <div className={clsx("rounded-2xl border overflow-x-auto", card)}>
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className={clsx("border-b text-left", isEmerald ? "border-slate-200 text-slate-500" : "border-white/10 text-zinc-500")}>
                <th className="p-3.5 font-medium">令牌</th>
                <th className="p-3.5 font-medium">值</th>
                <th className="p-3.5 font-medium">用途</th>
              </tr>
            </thead>
            <tbody className={clsx("divide-y font-mono", isEmerald ? "divide-slate-100 text-slate-700" : "divide-white/[0.06] text-zinc-300")}>
              {[
                ["durations.instant", `${durations.instant}ms`, "按钮按下、颜色变化"],
                ["durations.fast", `${durations.fast}ms`, "悬停、主题切换"],
                ["durations.normal", `${durations.normal}ms`, "展开、收起"],
                ["durations.spineDissolve", `${durations.spineDissolve}ms`, "封面图交叉淡入"],
                ["easings.smoothOut", easings.smoothOut, "入场动画"],
                ["easings.standard", easings.standard, "一般过渡"],
              ].map(([k, v, u]) => (
                <tr key={k}>
                  <td className={clsx("p-3.5", strong)}>{k}</td>
                  <td className="p-3.5">{v}</td>
                  <td className="p-3.5 font-sans">{u}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
