import React from "react";
import { clsx } from "clsx";
import { Type } from "lucide-react";
import { MIN_FONT_SIZE_PX, PageHeader, SparxThemeScope, fontFamilies, typographyScale, useSparxTheme } from "@/sparx-ui";
import { PageIntro, SectionHeading } from "../../components/PageIntro";

const SCALE: { key: keyof typeof typographyScale; label: string; use: string; sample: string }[] = [
  { key: "display", label: "Display", use: "页首大标题、主舞台标题", sample: "一套规范，两种主题" },
  { key: "h1", label: "H1", use: "文章标题", sample: "摆脱被动投喂" },
  { key: "h2", label: "H2", use: "章节标题", sample: "为什么离开平台" },
  { key: "h3", label: "H3", use: "卡片标题", sample: "待我审批" },
  { key: "bodyLarge", label: "Body L", use: "导语、长文首段", sample: "在内容平台上，一篇文章能被多少人看到，取决于推荐算法。" },
  { key: "body", label: "Body", use: "正文", sample: "左栏固定不动，显示封面、目录和阅读进度；右栏是唯一的滚动区域。" },
  { key: "caption", label: "Caption", use: "次要说明、按钮、标签", sample: "数据更新于 09-28 09:00" },
  { key: "metaMono", label: "Meta", use: "时间戳、编号、状态（等宽）", sample: "PO-20260927-01 · 09-27 10:12" },
];

export const TypographyPage: React.FC = () => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";
  const card = isEmerald ? "bg-white border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]" : "bg-[#08090E] border-white/10";
  const muted = isEmerald ? "text-slate-500" : "text-zinc-500";
  const strong = isEmerald ? "text-slate-900" : "text-white";

  return (
    <div className="space-y-14">
      <PageIntro eyebrow="Typography · 排版" icon={<Type className="w-4 h-4" />} title="排版">
        <p>
          两条硬性规则对两种主题都适用：所有文字不小于 <strong>{MIN_FONT_SIZE_PX}px</strong>，不使用衬线体。样式文件会把 text-xs、text-[12px]、text-[13px] 自动提升到 14px，防止在低分辨率屏幕上出现看不清的小字。
        </p>
      </PageIntro>

      <section className="space-y-5">
        <SectionHeading title="字体" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Space Grotesk", role: "标题与正文", sample: "Sparx 设计系统 Aa 0123", family: fontFamilies.sans },
            { name: "IBM Plex Mono", role: "编号、时间戳、代码", sample: "SKU-8842-B 09:00", family: fontFamilies.mono },
            { name: "Noto Sans SC / MiSans", role: "中文回退字体", sample: "永和九年，岁在癸丑", family: fontFamilies.sans },
          ].map((f) => (
            <div key={f.name} className={clsx("rounded-2xl border p-5 space-y-4", card)}>
              <div className={clsx("text-2xl font-bold leading-snug", strong)} style={{ fontFamily: f.family }}>
                {f.sample}
              </div>
              <div>
                <div className={clsx("text-sm font-semibold", strong)}>{f.name}</div>
                <div className={clsx("text-sm", muted)}>{f.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading title="字号层级" description="字号、字重和行高来自 typographyScale。正文使用 1rem（15~16px）和 1.85 倍行高，适合长时间阅读。" />
        <div className={clsx("rounded-2xl border divide-y", card, isEmerald ? "divide-slate-100" : "divide-white/[0.06]")}>
          {SCALE.map((s) => {
            const t = typographyScale[s.key] as { size: string; weight: string; lineHeight: string; letterSpacing?: string };
            return (
              <div key={s.key} className="grid grid-cols-1 md:grid-cols-[10rem_1fr] gap-2 md:gap-6 p-5 items-start">
                <div className="space-y-0.5">
                  <div className={clsx("text-sm font-semibold", strong)}>{s.label}</div>
                  <div className={clsx("font-mono text-sm", muted)}>
                    {s.key === "display" ? "clamp 32–56px" : s.key === "h1" ? "clamp 28–40px" : t.size} · {t.weight}
                  </div>
                  <div className={clsx("text-sm", muted)}>{s.use}</div>
                </div>
                <div
                  className={clsx("min-w-0 break-words", strong, s.key === "metaMono" && "font-mono")}
                  style={{ fontSize: t.size, fontWeight: Number(t.weight), lineHeight: t.lineHeight, letterSpacing: t.letterSpacing }}
                >
                  {s.sample}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading
          title="两种主题的用法"
          description="字号层级相同，但用法不同：虚空绯红拉大标题和正文的差距来制造张力；皓白极翠收小差距，靠位置和字重区分层级，让信息密集的页面保持平静。"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <SparxThemeScope theme="void-flare">
            <div className="h-full rounded-2xl border border-white/10 bg-[#030406] p-6 sm:p-8 space-y-4">
              <div className="font-mono text-sm font-bold text-[#E5192D]">✦ 虚空绯红</div>
              <div className="flex items-end gap-3 pt-3">
                <span className="text-6xl sm:text-7xl font-black leading-[0.8] text-transparent" style={{ WebkitTextStroke: "1.5px #E5192D" }}>
                  03
                </span>
                <span className="font-mono text-sm text-zinc-500 pb-1">/ 04</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black tracking-tight leading-[1.08] text-white">告别无限滚动</div>
              <p className="text-base leading-[1.85] text-neutral-300">
                标题用 font-black 和紧凑的字距，编号用描边大字。正文保持 16px，靠颜色把它压到次要位置。
              </p>
            </div>
          </SparxThemeScope>
          <SparxThemeScope theme="glacial-emerald">
            <div className="h-full rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 sm:p-8 space-y-5">
              <div className="font-mono text-sm font-bold text-[#059669]">◈ 皓白极翠</div>
              <PageHeader breadcrumbs={[{ label: "运营中台" }, { label: "经营看板" }]} title="经营看板" description="2026 年第三季度 · 数据更新于 09-28 09:00" />
              <div className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100 text-sm">
                {[
                  ["SKU-8842-B", "多层滤光镀膜片", "640 件"],
                  ["SKU-3120-C", "低功耗 NPU 推理模块", "12,500 件"],
                ].map((r) => (
                  <div key={r[0]} className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-3 px-4 py-2.5">
                    <span className="font-mono font-semibold text-slate-900">{r[0]}</span>
                    <span className="text-slate-600 truncate">{r[1]}</span>
                    <span className="font-mono text-slate-900 text-right">{r[2]}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-slate-600">页面标题不超过 2xl。编号和数字使用等宽字体并右对齐，方便纵向比较。</p>
            </div>
          </SparxThemeScope>
        </div>
      </section>

      <section className="space-y-3">
        <SectionHeading title="中英文混排" />
        <ul className={clsx("space-y-2 text-sm sm:text-base leading-relaxed list-disc pl-5", isEmerald ? "text-slate-600" : "text-zinc-300")}>
          <li>中文与英文、数字之间加一个半角空格：“Redis 缓存”“100dvh 视口”。</li>
          <li>中文正文使用全角标点；代码、路径和英文句子使用半角标点。</li>
          <li>不使用全角英文和数字。更多规则见“文案规范”。</li>
        </ul>
      </section>
    </div>
  );
};
