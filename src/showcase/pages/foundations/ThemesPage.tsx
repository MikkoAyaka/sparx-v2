import React from "react";
import { clsx } from "clsx";
import { Check, Palette, X } from "lucide-react";
import {
  Badge,
  Button,
  MetricStatCard,
  SparxThemeScope,
  StatusDot,
  Tag,
  useSparxTheme,
  type SparxStyleTheme,
} from "@/sparx-ui";
import { PageIntro, SectionHeading } from "../../components/PageIntro";
import { SCENES, THEME_LABELS, type RouteId } from "../../routes";

const COMPARISON: { dim: string; void: string; emerald: string }[] = [
  { dim: "目标", void: "让人记住一篇文章、一个作品或一个观点", emerald: "让人高效、放心地完成每天的工作" },
  {
    dim: "典型场景",
    void: "个人站点、独立出版、作品集、发布页、开发者工具、AI 实验产品",
    emerald: "企业中后台、审批与工单、数据看板、知识库、设置页",
  },
  { dim: "底色", void: "接近纯黑（#020204），用四级黑色区分层级", emerald: "浅灰白（#F8FAFC）上放白色卡片" },
  { dim: "强调色", void: "绯红 #E5192D，只用在最关键的操作上，可以带轻微发光", emerald: "翡翠绿 #059669，只用于主操作和选中状态，不发光" },
  { dim: "字号对比", void: "大：标题可以到 5xl 以上，编号用描边大字", emerald: "小：页面标题 xl 到 2xl，靠字重和位置区分层级" },
  { dim: "布局", void: "非对称、铺满全屏，一屏只有一个重点", emerald: "固定侧栏加网格，每个页面的结构相同" },
  { dim: "层级", void: "明暗对比和发光", emerald: "1px 边框，阴影浅到几乎看不见" },
  { dim: "动效", void: "可以有：内容上浮淡入、状态脉冲、箭头右移", emerald: "克制：只做透明度和背景色过渡，不缩放、不改变尺寸" },
  { dim: "文案语气", void: "第一人称，观点鲜明，可以有态度", emerald: "第三人称，写指标、步骤和边界条件" },
];

const DOS: Record<SparxStyleTheme, { do: string[]; dont: string[] }> = {
  "void-flare": {
    do: [
      "一屏只放一个重点，其余信息退到次要位置",
      "标题敢用大字号，用字重和明暗制造层次",
      "绯红在一屏里只出现一到两处",
      "让图片或视频占满画面，再向背景渐变过渡",
    ],
    dont: [
      "把绯红铺满整个区块，或让多个元素同时发光",
      "用在需要长时间录入数据的表单和后台",
      "用深色主题做信息密集的数据表格",
      "在界面上写“按 1~5 切换”之类的操作说明",
    ],
  },
  "glacial-emerald": {
    do: [
      "每个页面使用相同的标题区、面包屑和操作按钮位置",
      "用 1px 边框和留白区分层级",
      "数字右对齐，使用等宽字体",
      "错误提示写在出错的位置旁边，并说明怎么改",
    ],
    dont: [
      "悬停时放大卡片，或加一圈绿色描边",
      "卡片里再嵌套带阴影的卡片",
      "为了“有设计感”加渐变、发光或大面积强调色",
      "在同一个页面里同时使用多种强调色",
    ],
  },
};

/** 在指定主题下渲染同一组组件 */
const SameComponents: React.FC<{ theme: SparxStyleTheme }> = ({ theme }) => {
  const dark = theme === "void-flare";
  const label = THEME_LABELS[theme];
  return (
    <SparxThemeScope theme={theme} className="h-full">
      <div
        className={clsx(
          "h-full rounded-2xl border p-5 sm:p-6 space-y-5",
          dark ? "bg-[#030406] border-white/10" : "bg-[#F8FAFC] border-slate-200"
        )}
      >
        <div className={clsx("font-mono text-sm font-bold", dark ? "text-[#E5192D]" : "text-[#059669]")}>
          {label.icon} {label.name}
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Button variant="flare" size="sm" glow withArrow>
            发布
          </Button>
          <Button variant="outline" size="sm">
            保存草稿
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="success" dot>
            已上线
          </Badge>
          <Badge variant="warning" dot>
            待审核
          </Badge>
          <Tag>设计系统</Tag>
          <span className={clsx("flex items-center gap-2 text-sm", dark ? "text-zinc-400" : "text-slate-500")}>
            <StatusDot variant="primary" />
            同步中
          </span>
        </div>
        <MetricStatCard
          title="本周阅读量"
          value="18,240"
          delta={{ value: "+12.4%", trend: "up", label: "环比" }}
          sparkline={[9, 11, 10, 13, 15, 16, 18]}
          subtitle="完成率 61%"
        />
      </div>
    </SparxThemeScope>
  );
};

export const ThemesPage: React.FC<{ onNavigate: (id: RouteId) => void }> = ({ onNavigate }) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  const cell = isEmerald ? "border-slate-200" : "border-white/10";

  return (
    <div className="space-y-16">
      <PageIntro eyebrow="Themes · 主题定位" icon={<Palette className="w-4 h-4" />} title="两种主题，两种性格">
        <p>
          两种主题共用同一套组件和规则，区别在于它们要解决的问题。<strong>虚空绯红</strong>面向激进、大胆、前卫的场景，目的是让人记住；
          <strong>皓白极翠</strong>面向稳定、克制、规范的企业场景，目的是让人高效、放心地完成工作。
        </p>
        <p>开始一个新页面前，先确定它属于哪一种，再决定布局、字号和动效。</p>
      </PageIntro>

      {/* 对比表 */}
      <section className="space-y-5">
        <SectionHeading title="逐项对比" />
        {/* 窄屏：每个维度一张卡片，两种主题上下对照 */}
        <div className={clsx("sm:hidden rounded-2xl border divide-y", cell, isEmerald ? "bg-white divide-slate-100" : "bg-[#08090E] divide-white/[0.06]")}>
          {COMPARISON.map((row) => (
            <div key={row.dim} className="p-4 space-y-2.5 text-sm">
              <div className={clsx("font-semibold", isEmerald ? "text-slate-900" : "text-white")}>{row.dim}</div>
              <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 leading-relaxed">
                <span className="font-mono font-bold text-[#E5192D]">✦</span>
                <span className={isEmerald ? "text-slate-600" : "text-zinc-300"}>{row.void}</span>
                <span className="font-mono font-bold text-[#059669]">◈</span>
                <span className={isEmerald ? "text-slate-600" : "text-zinc-300"}>{row.emerald}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={clsx("hidden sm:block rounded-2xl border overflow-x-auto", cell, isEmerald ? "bg-white" : "bg-[#08090E]")}>
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className={clsx("border-b text-left", cell)}>
                <th className={clsx("p-4 w-28 font-medium", isEmerald ? "text-slate-400" : "text-zinc-500")}>维度</th>
                <th className="p-4">
                  <span className="font-mono font-bold text-[#E5192D]">✦ 虚空绯红</span>
                  <span className={clsx("ml-2 font-normal", isEmerald ? "text-slate-400" : "text-zinc-500")}>大胆、前卫</span>
                </th>
                <th className="p-4">
                  <span className="font-mono font-bold text-[#059669]">◈ 皓白极翠</span>
                  <span className={clsx("ml-2 font-normal", isEmerald ? "text-slate-400" : "text-zinc-500")}>稳定、规范</span>
                </th>
              </tr>
            </thead>
            <tbody className={clsx("divide-y", isEmerald ? "divide-slate-100" : "divide-white/[0.06]")}>
              {COMPARISON.map((row) => (
                <tr key={row.dim} className="align-top">
                  <th scope="row" className={clsx("p-4 text-left font-semibold", isEmerald ? "text-slate-900" : "text-white")}>
                    {row.dim}
                  </th>
                  <td className={clsx("p-4 leading-relaxed", isEmerald ? "text-slate-600" : "text-zinc-300")}>{row.void}</td>
                  <td className={clsx("p-4 leading-relaxed", isEmerald ? "text-slate-600" : "text-zinc-300")}>{row.emerald}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 同一组组件 */}
      <section className="space-y-5">
        <SectionHeading
          title="同一组组件"
          description="下面两块区域渲染的是完全相同的代码。颜色、阴影和发光随主题变化，结构不变；两种主题真正的区别在于怎样组合这些组件。"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SameComponents theme="void-flare" />
          <SameComponents theme="glacial-emerald" />
        </div>
      </section>

      {/* 该做 / 不该做 */}
      <section className="space-y-5">
        <SectionHeading title="该做与不该做" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {(["void-flare", "glacial-emerald"] as SparxStyleTheme[]).map((theme) => {
            const label = THEME_LABELS[theme];
            return (
              <div
                key={theme}
                className={clsx("rounded-2xl border overflow-hidden", cell, isEmerald ? "bg-white" : "bg-[#08090E]")}
              >
                <div className={clsx("px-5 py-3.5 border-b font-mono text-sm font-bold", cell, theme === "void-flare" ? "text-[#E5192D]" : "text-[#059669]")}>
                  {label.icon} {label.name}
                </div>
                <div className={clsx("grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x", isEmerald ? "divide-slate-200" : "divide-white/10")}>
                  {[
                    { title: "该做", items: DOS[theme].do, ok: true },
                    { title: "不该做", items: DOS[theme].dont, ok: false },
                  ].map((col) => (
                    <div key={col.title} className="p-5 space-y-3">
                      <div className={clsx("text-sm font-bold", col.ok ? (isEmerald ? "text-[#059669]" : "text-emerald-400") : isEmerald ? "text-[#E11D48]" : "text-rose-400")}>
                        {col.title}
                      </div>
                      <ul className="space-y-2.5">
                        {col.items.map((t) => (
                          <li key={t} className={clsx("flex gap-2 text-sm leading-relaxed", isEmerald ? "text-slate-600" : "text-zinc-300")}>
                            {col.ok ? (
                              <Check className={clsx("w-4 h-4 mt-0.5 shrink-0", isEmerald ? "text-[#059669]" : "text-emerald-400")} />
                            ) : (
                              <X className={clsx("w-4 h-4 mt-0.5 shrink-0", isEmerald ? "text-[#E11D48]" : "text-rose-400")} />
                            )}
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 混用 */}
      <section className="space-y-5">
        <SectionHeading
          title="同一个产品需要两种主题时"
          description="比如一家企业既有内部后台，也要做一个产品发布页。"
        />
        <ul className={clsx("space-y-3 text-sm sm:text-base leading-relaxed", isEmerald ? "text-slate-600" : "text-zinc-300")}>
          <li>
            <strong className={isEmerald ? "text-slate-900" : "text-white"}>一个页面只用一种主题。</strong>
            后台用皓白极翠，发布页用虚空绯红，两者之间用普通的页面跳转衔接。
          </li>
          <li>
            <strong className={isEmerald ? "text-slate-900" : "text-white"}>需要在后台里预览发布页时，</strong>
            用 SparxThemeScope 把预览区域固定为虚空绯红，页面其余部分保持皓白极翠。
          </li>
          <li>
            <strong className={isEmerald ? "text-slate-900" : "text-white"}>两种主题的文案语气也要分开。</strong>
            发布页可以写“我们重做了编辑器”，后台的更新说明应该写“编辑器加载时间从 2.1 秒降到 0.8 秒”。
          </li>
        </ul>
      </section>

      {/* 场景入口 */}
      <section className="space-y-5">
        <SectionHeading title="在完整页面里看看" />
        <div className="flex flex-wrap gap-2.5">
          {SCENES.map((s) => (
            <Button key={s.id} variant="outline" size="sm" onClick={() => onNavigate(s.id)}>
              {THEME_LABELS[s.theme].icon} {s.title}
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
};
