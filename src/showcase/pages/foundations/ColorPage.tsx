import React from "react";
import { clsx } from "clsx";
import { Droplet } from "lucide-react";
import { sparxThemes, useSparxTheme } from "@/sparx-ui";
import { PageIntro, SectionHeading } from "../../components/PageIntro";
import { TokenSwatch } from "../../components/TokenSwatch";

const Grid: React.FC<{ children: React.ReactNode; cols?: 2 | 3 }> = ({ children, cols = 3 }) => (
  <div className={clsx("grid grid-cols-1 sm:grid-cols-2 gap-3", cols === 3 && "lg:grid-cols-3")}>{children}</div>
);

export const ColorPage: React.FC = () => {
  const { themeId, theme } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";
  const flare = sparxThemes["void-flare"];
  const emerald = sparxThemes["glacial-emerald"];

  const compare: { name: string; token: string; v: string; e: string }[] = [
    { name: "视口画布", token: "bg.canvas", v: flare.bg.canvas, e: emerald.bg.canvas },
    { name: "主舞台", token: "bg.stage", v: flare.bg.stage, e: emerald.bg.stage },
    { name: "次级卡片", token: "bg.card", v: flare.bg.card, e: emerald.bg.card },
    { name: "强调色", token: "accent.core", v: flare.accent.core, e: emerald.accent.core },
    { name: "强调色悬停", token: "accent.hover", v: flare.accent.hover, e: emerald.accent.hover },
    { name: "成功", token: "semantics.success", v: flare.semantics.success, e: emerald.semantics.success },
    { name: "警告", token: "semantics.warning", v: flare.semantics.warning, e: emerald.semantics.warning },
    { name: "错误", token: "semantics.error", v: flare.semantics.error, e: emerald.semantics.error },
    { name: "标题文字", token: "text.primary", v: flare.text.primary, e: emerald.text.primary },
    { name: "正文文字", token: "text.secondary", v: flare.text.secondary, e: emerald.text.secondary },
  ];

  const chip = (c: string) => (
    <span className="inline-flex items-center gap-2 font-mono">
      <span className="w-4 h-4 rounded border border-black/10 shrink-0" style={{ background: c }} />
      {c}
    </span>
  );

  return (
    <div className="space-y-14">
      <PageIntro eyebrow="Color · 色彩" icon={<Droplet className="w-4 h-4" />} title="色彩">
        <p>
          下面的色值以当前主题（{theme.name}）为准，切换右上角的主题，这一页会同步变化。点击任意色块可以复制色值。页面底部有两种主题的并排对照。
        </p>
      </PageIntro>

      <section className="space-y-5">
        <SectionHeading
          title="底色"
          description={
            isEmerald
              ? "浅灰白的画布上放白色卡片，卡片之间用 1px 边框区分，不靠阴影。"
              : "四级接近纯黑的底色按层级递进：画布最深，悬浮的导航栏和卡片逐级变浅。不要用发灰、偏蓝的深灰。"
          }
        />
        <Grid>
          <TokenSwatch name="bg.canvas" value={theme.bg.canvas} description="视口画布" />
          <TokenSwatch name="bg.stage" value={theme.bg.stage} description="主舞台卡片" />
          <TokenSwatch name="bg.reading" value={theme.bg.reading} description="长文阅读区" />
          <TokenSwatch name="bg.dock" value={theme.bg.dock} description="悬浮导航栏" />
          <TokenSwatch name="bg.card" value={theme.bg.card} description="次级卡片、代码区" />
          <TokenSwatch name="bg.muted" value={theme.bg.muted} description="辅助面板" />
        </Grid>
      </section>

      <section className="space-y-5">
        <SectionHeading
          title="强调色"
          description={
            isEmerald
              ? "翡翠绿只用于主操作按钮、选中状态和进度。一个页面里的强调色面积越小，用户越容易找到主操作。"
              : "绯红只用在最关键的操作上，一屏里出现一到两处。激活状态可以加一层轻微发光，其他元素不发光。"
          }
        />
        <Grid cols={2}>
          <TokenSwatch name="accent.core" value={theme.accent.core} description="主操作、选中状态" />
          <TokenSwatch name="accent.hover" value={theme.accent.hover} description="悬停状态" />
          <TokenSwatch name="accent.subtle" value={theme.accent.subtle} description="选中行、标签的浅底色" />
          <TokenSwatch name="accent.border" value={theme.accent.border} description="强调边框" />
        </Grid>
      </section>

      <section className="space-y-5">
        <SectionHeading
          title="语义色"
          description="语义色只表达状态，不用来装饰。警告用琥珀色而不是亮黄色，信息用青绿色而不是荧光青。"
        />
        <Grid>
          <TokenSwatch name="semantics.success" value={theme.semantics.success} description="成功、已完成、合格" />
          <TokenSwatch name="semantics.info" value={theme.semantics.info} description="信息、进行中、复检" />
          <TokenSwatch name="semantics.warning" value={theme.semantics.warning} description="警告、待处理、接近阈值" />
          <TokenSwatch name="semantics.error" value={theme.semantics.error} description="错误、驳回、阻断" />
          <TokenSwatch name="semantics.neutral" value={theme.semantics.neutral} description="中性、空闲、已跳过" />
        </Grid>
      </section>

      <section className="space-y-5">
        <SectionHeading title="文字与边框" />
        <Grid cols={2}>
          <TokenSwatch name="text.primary" value={theme.text.primary} description="标题" />
          <TokenSwatch name="text.secondary" value={theme.text.secondary} description="正文" />
          <TokenSwatch name="text.muted" value={theme.text.muted} description="次要说明" />
          <TokenSwatch name="text.dim" value={theme.text.dim} description="占位文字、禁用状态" />
          <TokenSwatch name="borders.standard" value={theme.borders.standard} description="卡片、输入框的标准边框" type="border" />
          <TokenSwatch name="borders.focus" value={theme.borders.focus} description="键盘焦点" type="border" />
        </Grid>
      </section>

      <section className="space-y-5">
        <SectionHeading title="两种主题对照" />
        <div className={clsx("rounded-2xl border overflow-x-auto", isEmerald ? "bg-white border-slate-200" : "bg-[#08090E] border-white/10")}>
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className={clsx("border-b text-left", isEmerald ? "border-slate-200 text-slate-500" : "border-white/10 text-zinc-500")}>
                <th className="p-3.5 font-medium">用途</th>
                <th className="p-3.5 font-medium">令牌</th>
                <th className="p-3.5 font-mono font-bold text-[#E5192D]">✦ 虚空绯红</th>
                <th className="p-3.5 font-mono font-bold text-[#059669]">◈ 皓白极翠</th>
              </tr>
            </thead>
            <tbody className={clsx("divide-y", isEmerald ? "divide-slate-100 text-slate-700" : "divide-white/[0.06] text-zinc-300")}>
              {compare.map((r) => (
                <tr key={r.token}>
                  <td className={clsx("p-3.5", isEmerald ? "text-slate-900" : "text-white")}>{r.name}</td>
                  <td className="p-3.5 font-mono">{r.token}</td>
                  <td className="p-3.5">{chip(r.v)}</td>
                  <td className="p-3.5">{chip(r.e)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
