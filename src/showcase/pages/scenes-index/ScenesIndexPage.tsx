import React from "react";
import { clsx } from "clsx";
import { ArrowRight, MonitorPlay } from "lucide-react";
import { SparxThemeScope, useSparxTheme, type SparxStyleTheme } from "@/sparx-ui";
import { PageIntro } from "../../components/PageIntro";
import { SceneThumb } from "../../components/SceneThumb";
import { SCENES, THEME_LABELS, type RouteId, type SceneMeta } from "../../routes";

const THEME_FIT: Record<SparxStyleTheme, string> = {
  "void-flare": "个人站点、独立出版、开发者工具和 AI 实验产品。用超大字号、全幅媒体和绯红强调制造张力。",
  "glacial-emerald": "企业中后台、审批与工单、开发者文档。布局固定、层级靠边框区分，适合每天长时间使用。",
};

const SceneCard: React.FC<{ scene: SceneMeta; onOpen: () => void }> = ({ scene, onOpen }) => {
  const dark = scene.theme === "void-flare";
  return (
    <SparxThemeScope theme={scene.theme} className="h-full">
      <button
        type="button"
        onClick={onOpen}
        className={clsx(
          "group h-full w-full text-left rounded-2xl border overflow-hidden flex flex-col cursor-pointer transition-colors",
          dark
            ? "bg-[#06080F] border-white/10 hover:border-[#E5192D]/50"
            : "bg-white border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-slate-300"
        )}
      >
        <div className={clsx("relative aspect-[16/10] overflow-hidden border-b", dark ? "border-white/10" : "border-slate-200")}>
          <SceneThumb id={scene.id} cover={scene.cover} />
        </div>
        <div className="flex-1 flex flex-col p-5 gap-3">
          <div className="flex items-center justify-between gap-3">
            <h3 className={clsx("text-lg font-bold", dark ? "text-white" : "text-slate-900")}>{scene.title}</h3>
            <ArrowRight
              className={clsx(
                "w-4 h-4 transition-transform group-hover:translate-x-1",
                dark ? "text-[#E5192D]" : "text-[#059669]"
              )}
            />
          </div>
          <p className={clsx("text-sm leading-relaxed flex-1", dark ? "text-zinc-400" : "text-slate-600")}>{scene.summary}</p>
          <div className="flex flex-wrap gap-1.5">
            {scene.uses.map((u) => (
              <span
                key={u}
                className={clsx(
                  "font-mono text-xs px-2 py-0.5 rounded border",
                  dark ? "border-white/10 text-zinc-500" : "border-slate-200 text-slate-500 bg-slate-50"
                )}
              >
                {u}
              </span>
            ))}
          </div>
        </div>
      </button>
    </SparxThemeScope>
  );
};

export const ScenesIndexPage: React.FC<{ onNavigate: (id: RouteId) => void }> = ({ onNavigate }) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  return (
    <div className="space-y-14">
      <PageIntro eyebrow="Scenes · 场景" icon={<MonitorPlay className="w-4 h-4" />} title="场景">
        <p>
          场景把组件和复合模式组合成完整的页面，用来说明两种主题各自适合做什么。每个场景只针对一种主题设计，打开后会固定在这个主题上，不受右上角主题切换的影响。
        </p>
      </PageIntro>

      {(["void-flare", "glacial-emerald"] as SparxStyleTheme[]).map((theme) => {
        const label = THEME_LABELS[theme];
        return (
          <section key={theme} className="space-y-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div className="space-y-1.5">
                <h2 className={clsx("text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2.5", isEmerald ? "text-slate-900" : "text-white")}>
                  <span className={theme === "void-flare" ? "text-[#E5192D]" : "text-[#059669]"}>{label.icon}</span>
                  {label.name}
                  <span className={clsx("text-base font-normal", isEmerald ? "text-slate-500" : "text-zinc-500")}>· {label.trait}</span>
                </h2>
                <p className={clsx("text-sm leading-relaxed max-w-3xl", isEmerald ? "text-slate-500" : "text-zinc-400")}>
                  适合{THEME_FIT[theme]}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {SCENES.filter((s) => s.theme === theme).map((s) => (
                <SceneCard key={s.id} scene={s} onOpen={() => onNavigate(s.id)} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};
