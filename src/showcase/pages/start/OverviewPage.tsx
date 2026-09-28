import React from "react";
import { clsx } from "clsx";
import { ArrowRight, BookOpen, Layers, MonitorPlay } from "lucide-react";
import { Button, SparxThemeScope, useSparxTheme } from "@/sparx-ui";
import { SECTIONS, SCENES, type RouteId } from "../../routes";

const THEME_CARDS = [
  {
    theme: "void-flare" as const,
    icon: "✦",
    name: "虚空绯红",
    trait: "大胆、前卫",
    headline: "把一篇文章当作一场发布。",
    fit: "个人站点、独立出版、开发者工具、AI 实验产品",
    traits: ["超大字号和强烈的明暗对比", "全幅媒体，向背景渐变过渡", "绯红只用在最关键的操作上"],
    scene: "scene-editorial" as RouteId,
    sceneLabel: "打开出版首页",
  },
  {
    theme: "glacial-emerald" as const,
    icon: "◈",
    name: "皓白极翠",
    trait: "稳定、规范",
    headline: "让每天都要用的系统，始终保持同一个样子。",
    fit: "企业中后台、审批与工单、知识库和开发者文档",
    traits: ["固定的侧栏、网格和标题区", "用 1px 边框区分层级，阴影几乎看不见", "翡翠绿只用于主操作和选中状态"],
    scene: "scene-dashboard" as RouteId,
    sceneLabel: "打开经营看板",
  },
];

export const OverviewPage: React.FC<{ onNavigate: (id: RouteId) => void }> = ({ onNavigate }) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  const entries = [
    {
      id: "themes" as RouteId,
      icon: <BookOpen className="w-4 h-4" />,
      title: "设计规范",
      text: "两种主题的定位、色彩、排版、层级与动效，以及 24 条实现时必须遵守的规则。",
      meta: `${SECTIONS[1].pages.length} 页`,
    },
    {
      id: "components-basic" as RouteId,
      icon: <Layers className="w-4 h-4" />,
      title: "组件",
      text: "基础组件和数据组件，以及用它们组合出的出版类、企业类复合模式。每个都可以调参数、复制代码。",
      meta: `${SECTIONS[2].pages.length} 页`,
    },
    {
      id: "scenes" as RouteId,
      icon: <MonitorPlay className="w-4 h-4" />,
      title: "场景",
      text: "六个完整页面：三个深色的出版与实验场景，三个浅色的企业场景。每个场景都可以直接操作。",
      meta: `${SCENES.length} 个场景`,
    },
  ];

  return (
    <div className="space-y-16">
      {/* 页首 */}
      <section className="space-y-6 pt-2">
        <div className={clsx("font-mono text-sm font-bold uppercase tracking-widest", isEmerald ? "text-[#059669]" : "text-[#E5192D]")}>
          Sparx UI v2
        </div>
        <h1
          className={clsx(
            "text-4xl sm:text-6xl font-black tracking-tight leading-[1.08] max-w-4xl",
            isEmerald ? "text-slate-900" : "text-white"
          )}
        >
          一套设计规范，
          <br />
          两种主题。
        </h1>
        <p className={clsx("text-base sm:text-lg leading-relaxed max-w-3xl", isEmerald ? "text-slate-600" : "text-zinc-300")}>
          Sparx UI v2 是从 Mikko Ayaka 个人频道（Channel）提炼的设计规范和 React 组件库。同一套组件提供两种主题：虚空绯红用于需要张力的个人与创意场景，皓白极翠用于需要稳定的企业场景。
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Button variant="flare" glow withArrow onClick={() => onNavigate("quick-start")}>
            快速上手
          </Button>
          <Button variant="outline" onClick={() => onNavigate("themes")}>
            了解两种主题
          </Button>
          <Button variant="ghost" onClick={() => onNavigate("agent-prompt")}>
            获取 Agent 提示词
          </Button>
        </div>
      </section>

      {/* 两种主题：各自用自己的主题渲染 */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {THEME_CARDS.map((c) => {
          const dark = c.theme === "void-flare";
          return (
            <SparxThemeScope key={c.theme} theme={c.theme} className="h-full">
              <div
                className={clsx(
                  "relative h-full rounded-3xl border overflow-hidden p-7 sm:p-9 flex flex-col gap-6",
                  dark ? "bg-[#030406] border-white/10 text-white" : "bg-white border-slate-200 text-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                )}
              >
                {dark && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_85%_10%,rgba(229,25,45,0.22),transparent_45%)]"
                  />
                )}
                {dark && <div aria-hidden="true" className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />}

                <div className="relative flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 font-mono text-sm">
                    <span className={clsx("font-bold", dark ? "text-[#E5192D]" : "text-[#059669]")}>{c.icon}</span>
                    <span className="font-bold">{c.name}</span>
                    <span className={dark ? "text-zinc-500" : "text-slate-400"}>/ {c.trait}</span>
                  </div>
                </div>

                <h2
                  className={clsx(
                    "relative font-black tracking-tight leading-[1.1]",
                    dark ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl text-slate-900"
                  )}
                >
                  {c.headline}
                </h2>

                <ul className="relative space-y-2.5 flex-1">
                  {c.traits.map((t) => (
                    <li key={t} className={clsx("flex gap-3 text-sm sm:text-base", dark ? "text-zinc-300" : "text-slate-600")}>
                      <span className={clsx("mt-2.5 h-px w-4 shrink-0", dark ? "bg-[#E5192D]" : "bg-[#059669]")} />
                      {t}
                    </li>
                  ))}
                </ul>

                <div className={clsx("relative pt-5 border-t space-y-4", dark ? "border-white/10" : "border-slate-200")}>
                  <p className={clsx("text-sm", dark ? "text-zinc-500" : "text-slate-500")}>适合：{c.fit}</p>
                  <div className="flex flex-wrap gap-2.5">
                    <Button variant="flare" size="sm" glow={dark} withArrow onClick={() => onNavigate(c.scene)}>
                      {c.sceneLabel}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onNavigate("themes")}>
                      查看主题定位
                    </Button>
                  </div>
                </div>
              </div>
            </SparxThemeScope>
          );
        })}
      </section>

      {/* 站点结构 */}
      <section className="space-y-5">
        <h2 className={clsx("text-xl sm:text-2xl font-bold tracking-tight", isEmerald ? "text-slate-900" : "text-white")}>
          站点里有什么
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {entries.map((e) => (
            <button
              key={e.title}
              type="button"
              onClick={() => onNavigate(e.id)}
              className={clsx(
                "group text-left rounded-2xl border p-5 flex flex-col justify-start gap-3 cursor-pointer transition-colors",
                isEmerald
                  ? "bg-white border-slate-200 hover:border-slate-300 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                  : "bg-[#08090E] border-white/10 hover:border-white/25"
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className={clsx(
                    "w-8 h-8 rounded-lg border flex items-center justify-center",
                    isEmerald ? "bg-emerald-50 border-emerald-200 text-[#059669]" : "bg-[#E5192D]/10 border-[#E5192D]/25 text-[#E5192D]"
                  )}
                >
                  {e.icon}
                </span>
                <span className={clsx("font-mono text-sm", isEmerald ? "text-slate-400" : "text-zinc-500")}>{e.meta}</span>
              </div>
              <div className={clsx("flex items-center gap-2 text-base font-bold", isEmerald ? "text-slate-900" : "text-white")}>
                {e.title}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
              <p className={clsx("text-sm leading-relaxed", isEmerald ? "text-slate-600" : "text-zinc-400")}>{e.text}</p>
            </button>
          ))}
        </div>
      </section>

      {/* 与 v1 的关系 */}
      <section
        className={clsx(
          "rounded-2xl border p-5 sm:p-6 text-sm leading-relaxed",
          isEmerald ? "bg-slate-50 border-slate-200 text-slate-600" : "bg-white/[0.02] border-white/10 text-zinc-400"
        )}
      >
        <strong className={isEmerald ? "text-slate-900" : "text-white"}>与 Sparx-v1 的关系：</strong>
        组件库的组织方式（原语、模式、示例三层，交互式预览和代码展示）参考了{" "}
        <a
          href="https://ui.mikkoayaka.com/"
          target="_blank"
          rel="noreferrer"
          className={clsx("underline underline-offset-2", isEmerald ? "text-[#059669]" : "text-[#E5192D]")}
        >
          Sparx-v1
        </a>
        ，视觉风格没有沿用，而是来自 Channel 原站；企业用的浅色主题是在此基础上新增的。
      </section>
    </div>
  );
};
