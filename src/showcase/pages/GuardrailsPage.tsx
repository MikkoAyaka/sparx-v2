import React, { useState, useMemo } from "react";
import { Badge, useSparxTheme } from "@/sparx-ui";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Search,
  Sparkles,
  Layers,
  Flame,
  Layout,
  Eye,
} from "lucide-react";

export type GuardrailThemeScope = "emerald" | "flare" | "universal" | "all";

export interface GuardrailItem {
  id: string;
  scope: "emerald" | "flare" | "universal";
  category: "视觉美学" | "排印红线" | "空间拓扑" | "交互动效" | "长文展卷" | "响应式" | "性能工程";
  title: string;
  problem: string;
  solution: string;
  codeRef: string;
  highlightRule?: string;
}

const GUARDRAIL_ITEMS: GuardrailItem[] = [
  // ==========================================
  // 一、皓白极翠专属规约 (Glacial Emerald · 企业/稳态)
  // ==========================================
  {
    id: "E-01",
    scope: "emerald",
    category: "视觉美学",
    title: "切勿卡片嵌套卡片且多重外阴影叠加",
    highlightRule: "禁止盒中盒双重阴影",
    problem: "外层容器带有外阴影，内部子卡片又各自套了一层外阴影。层层叠加导致视觉浑浊、界面浮肿，严重破坏企业级界面的高清晰度与整洁感。",
    solution: "严格执行单层微阴影法则：若外层为卡片容器，内部子列表必须采用平铺单边分割线（divide-y divide-slate-100）或平铺无阴影底衬（bg-slate-50 border border-slate-200 shadow-none），严禁出现卡片套卡片且均带外阴影的情况。",
    codeRef: "showcase/pages/scenes/DeveloperTerminalScene.tsx",
  },
  {
    id: "E-02",
    scope: "emerald",
    category: "交互动效",
    title: "页面骨架保持绝对稳定，严禁卡片悬浮放大与脏绿描边",
    highlightRule: "严禁 hover:scale · 纯净透明度微调替代脏绿描边",
    problem: "鼠标悬浮在卡片上时使用 scale-[1.02] 放大突起造成页面骨架抖动；或者在浅色卡片上使用高饱和度绿色动态描边，导致视觉显得 dirty、粗糙且杂乱。",
    solution: "页面骨架始终保持磐石般的绝对稳定。浅色模式下杜绝突兀的绿色动态描边，统一采用优雅平滑的卡片整体透明度微调（hover:opacity-85 transition-opacity duration-200）与极淡背景微调，视觉体验更加舒适通透。",
    codeRef: "showcase/components/TokenSwatch.tsx",
  },
  {
    id: "E-03",
    scope: "emerald",
    category: "视觉美学",
    title: "肉眼初看近乎不可察觉的极致微阴影",
    highlightRule: "第一眼平整，细看有空气浮雕",
    problem: "在浅色白底上使用过浓、过大或带颜色的彩色光晕，使界面产生浓重的塑料污浊感。",
    solution: "将浅色模式下的阴影衰减至肉眼第一眼几乎无法感知的极致水平（shadow-[0_1px_2px_rgba(0,0,0,0.03)]）。第一眼平整雅致，细看方有清透的空气微浮雕感；依靠精密边框定义空间层级，杜绝任何霓虹散光。",
    codeRef: "src/index.css (--sparx-shadow-card)",
  },
  {
    id: "E-04",
    scope: "emerald",
    category: "视觉美学",
    title: "结构化 Outline 分级加粗与恒定描边稳定体系",
    highlightRule: "不同层级 Outline 差异化加粗 · 严禁 hover 改变 border-width 导致抖动",
    problem: "浅色模式若全部使用 1px 浅灰细线，关键元素缺乏重量感；若悬浮时随意增加 border-width（如 1px 变 2px）会导致卡片尺寸突增 2px，引发下游列表整体微移抖动；辅助按钮灰色描边过粗（如 2px）又显得蠢笨粗糙。",
    solution: "建立明确的 Outline 物理分级强调梯队：辅助操作按钮采用清爽 1px 浅灰描边（border border-slate-300）；重要强调与导航激活态采用 2px 极翠实线（border-2 border-[#059669]）；标准卡片使用 1px 边框，悬浮交互保持恒定尺寸，严禁滥用绿色动态描边，杜绝任何布局微移与视觉浑浊。",
    codeRef: "src/sparx-ui/primitives/Button.tsx",
  },
  {
    id: "E-05",
    scope: "emerald",
    category: "视觉美学",
    title: "对齐 Modrinth 浅色工业质感与沉稳底色",
    highlightRule: "对齐 Modrinth，纯净白底与高对比墨黑",
    problem: "浅色容易做成平庸简陋的“白纸黑字”，缺少现代开发者工具与游戏生态的高阶质感。",
    solution: "参考 Modrinth 浅色主题优秀基因：纯白独立卡片（#FFFFFF）置于清冷冰川底（#F8FAFC）、大标题高对比度墨黑（#0F172A）、高信噪比翡翠绿（#059669）、结合等宽代码与数据标识，在保留 Channel 个人主权特色的同时赋予其工业级产品的可靠感。",
    codeRef: "src/sparx-ui/tokens/colors.tsx",
  },
  {
    id: "E-06",
    scope: "emerald",
    category: "视觉美学",
    title: "语义配色和谐度红线：温润琥珀与矿物青绿",
    highlightRule: "杜绝亮紫与荧光青冲突",
    problem: "亮紫色、荧光青与绿色并列使用时色彩产生严重割裂与杂乱感，警告黄色过于刺眼廉价。",
    solution: "全面剔除突兀的亮紫与荧光青，警示统一采用高级温润的暖调蜜蜡琥珀（#D97706），信息提示统一采用天然相容的海洋矿物青绿（#0D9488），辅助中性采用板岩灰（#64748B），构建成熟协调的色谱体系。",
    codeRef: "src/sparx-ui/tokens/colors.tsx",
  },
  {
    id: "E-07",
    scope: "emerald",
    category: "空间拓扑",
    title: "组件浅色原生支持与切图杜绝黑闪",
    highlightRule: "全组件原生浅色支持",
    problem: "视频封面组件、演示终端、代码展示框与空背景在浅色下残留黑底、暗角或绯红色块，换景时产生突兀的黑屏闪烁。",
    solution: "所有组件与脊柱垫底图层完整接入 useSparxTheme()，在皓白极翠下渲染原生白底、淡灰过渡与极翠微光，消除任何黑斑遗留。",
    codeRef: "src/sparx-ui/atmosphere/StageMediaSpine.tsx",
  },

  // ==========================================
  // 二、虚空绯红专属规约 (Void Flare · 极客/前卫)
  // ==========================================
  {
    id: "V-01",
    scope: "flare",
    category: "视觉美学",
    title: "绝对暗房黑阶基底（深黑虚空）",
    highlightRule: "深黑暗房四层黑阶",
    problem: "采用泛灰、偏蓝或廉价的浅灰作为暗色底，破坏纯粹深黑的沉浸感与夜间信息信噪比。",
    solution: "严格采用暗房极黑梯队：视口画布基底（#020204）、主舞台大卡容器（#030406）、展卷正文画布（#050505）、悬浮控制坞（#08090E），黑色纯粹深邃。",
    codeRef: "src/sparx-ui/tokens/colors.tsx",
  },
  {
    id: "V-02",
    scope: "flare",
    category: "视觉美学",
    title: "激光绯红主权强调与克制光学弱辉光",
    highlightRule: "高对比度红 + 克制光学微发光",
    problem: "大面积滥用 32px 荧光高亮发光，导致文字周围产生光污染，造成视觉疲劳。",
    solution: "高对比度激光绯红（#E5192D / #FF2D55）仅作为关键行动点缀，发光阴影收敛至 shadow-[0_0_12px_rgba(229,25,45,0.35)]，锐利且内敛。",
    codeRef: "src/sparx-ui/tokens/colors.tsx",
  },
  {
    id: "V-03",
    scope: "flare",
    category: "视觉美学",
    title: "次像素级微透明白边框系统",
    highlightRule: "border-white/10 微弱边框",
    problem: "深色模式使用粗白线或浓灰线，边缘过于生硬刺眼。",
    solution: "标准分隔采用 border-white/10，次级后退采用 border-white/[0.06]，微弱显现又不喧宾夺主。",
    codeRef: "src/sparx-ui/primitives/GlassCard.tsx",
  },
  {
    id: "V-04",
    scope: "flare",
    category: "视觉美学",
    title: "散布暗房云图与 40px 几何深色网格",
    highlightRule: "暗房关键词氛围散布",
    problem: "深黑背景若完全空白显得单调平板，若放插画又干扰文字。",
    solution: "结合 40px 细微网格与 KeywordAtmosphere 算法排版关键词云图，营造极客工作室的探索仪式感。",
    codeRef: "src/sparx-ui/atmosphere/KeywordAtmosphere.tsx",
  },
  {
    id: "V-05",
    scope: "flare",
    category: "视觉美学",
    title: "暗夜暖金色琥珀警示色",
    highlightRule: "高清晰暖金琥珀 #E5A93C",
    problem: "黑底上的荧光黄反差过激且刺眼。",
    solution: "采用高雅的暖金琥珀（#E5A93C），在黑底上具备极高辨识度与温润质感。",
    codeRef: "src/sparx-ui/tokens/colors.tsx",
  },

  // ==========================================
  // 三、跨风格通用公理 (Universal Shared Axioms)
  // ==========================================
  {
    id: "U-01",
    scope: "universal",
    category: "排印红线",
    title: "强制渲染字号 ≥ 14px 与全站杜绝衬线体",
    highlightRule: "字号底线 14px · 严禁 Serif · 舒适内边距",
    problem: "小于 14px 的微小碎字导致小屏/标清屏无法看清产生严重锯齿，过窄紧凑的按钮内边距导致交互局促极端，衬线体破坏现代前卫与企业工程质感。",
    solution: "跨风格不可逾越的红线：全站最小渲染字号整体上调严格 ≥ 14px（即便是微型徽标与时间戳亦保证 ≥ 14px，正文 15~16px leading-[1.85]）。所有可交互小按钮（导航栏、主题切换、标签等）加大舒适内边距留白放缓紧凑感。全站严禁 Serif 衬线体。",
    codeRef: "src/sparx-ui/tokens/typography.ts",
  },
  {
    id: "U-02",
    scope: "universal",
    category: "空间拓扑",
    title: "100dvh 视口锁定大舞台，杜绝容器抖动",
    highlightRule: "100dvh 视口锁定 · 杜绝页面多余滚动",
    problem: "内容切换时页面高度跳跃，出现外层生硬粗暴的双重全局滚动条。",
    solution: "探索主页锁定 100dvh 视口外壳，内容超长由内层自适应吸收，外层彻底消除跳动与无意义页面滚动条。",
    codeRef: "src/sparx-ui/patterns/ChannelShell.tsx",
  },
  {
    id: "U-03",
    scope: "universal",
    category: "空间拓扑",
    title: "60% 宽度大图与横向渐变消融蒙版",
    highlightRule: "60% 画幅向右消融蒙版",
    problem: "主舞台图片展示截断生硬，与右侧排版衔接粗暴。",
    solution: "左侧图片宽度设为 60%，配合右向渐变蒙版在 58% 处完全融入舞台底色（暗黑或皓白），平滑进入右侧文字排版。",
    codeRef: "src/sparx-ui/atmosphere/AmbientDissolveMask.tsx",
  },
  {
    id: "U-04",
    scope: "universal",
    category: "长文展卷",
    title: "双轨解耦排版：35% 固定脊柱 + 65% 排版画布",
    highlightRule: "双轨解耦 · 视线联动换景",
    problem: "传统文章页封面和侧栏随正文向上滚出视线，视觉割裂。",
    solution: "左侧 35% 固定环境脊柱（严禁滚动，随焦点智能投射环境色） + 右侧 65% 无界排版画布（唯一正文滚动流），视线焦点滑入 45% 区域时自动融变换景。",
    codeRef: "src/sparx-ui/patterns/SplitMonograph.tsx",
  },
  {
    id: "U-05",
    scope: "universal",
    category: "视觉美学",
    title: "真实人本工程文案（真实、具体、克制、有温度）",
    highlightRule: "杜绝假大空伪词 · 扎根真实世界",
    problem: "充斥“在断裂带重建架构秩序”、“暗房虚空视界”、“光学微共鸣”等脱离物理现实的假大空生僻词。",
    solution: "文案全面回归真实世界工程实践与人本表达（如边缘计算发布、5秒推理延时微交互、Redis点赞协议），标题遵循“核心矛盾+具体解法”黄金公式。",
    codeRef: "showcase/pages/CopywritingGuidePage.tsx",
  },
  {
    id: "U-06",
    scope: "universal",
    category: "交互动效",
    title: "双图层 700ms 丝滑换图脊柱，杜绝黑白跳跃",
    highlightRule: "双图层缓冲换景",
    problem: "卡片切页时缺少过渡衔接动画，出现闪屏或跳变。",
    solution: "StageMediaSpine 双图层缓冲架构：老图在底层持续垫底，新图执行 700ms 丝滑淡入（spineMediaFadeIn），平滑过渡。",
    codeRef: "src/sparx-ui/atmosphere/StageMediaSpine.tsx",
  },
  {
    id: "U-07",
    scope: "universal",
    category: "交互动效",
    title: "主舞台视频静音循环自动内联播放",
    highlightRule: "视频内联静音自动播放",
    problem: "首页视频封面必须手动点击才能播放，打断展卷连贯体验。",
    solution: "主舞台视频注入 autoPlay、muted、loop、playsInline，实现无需点击的静音循环自动播放。",
    codeRef: "src/sparx-ui/atmosphere/StageMediaSpine.tsx",
  },
  {
    id: "U-08",
    scope: "universal",
    category: "性能工程",
    title: "相邻卡片空闲时段静默预加载",
    highlightRule: "requestIdleCallback 静默抓取相邻大图",
    problem: "漫游切换卡片时未浏览的大图加载卡顿白屏。",
    solution: "利用 requestIdleCallback 实现 scheduleAdjacentPreload，静默预抓取当前卡片前后 radius=1 的相邻大图。",
    codeRef: "src/sparx-ui/patterns/adjacentPreload.ts",
  },
  {
    id: "U-09",
    scope: "universal",
    category: "视觉美学",
    title: "彻底清除冗余手势与操作提示文案",
    highlightRule: "杜绝“按 1~5 切换”、“支持滚轮漫游”",
    problem: "界面残留“按 1~5 切换模块”、“支持滚轮漫游”等教学文字，破坏界面纯粹性。",
    solution: "彻底移除所有冗余操作说明，只保留自解释的分段导轨和数字指示。",
    codeRef: "src/sparx-ui/patterns/SegmentedRail.tsx",
  },
  {
    id: "U-10",
    scope: "universal",
    category: "长文展卷",
    title: "读者轻共鸣微反馈协议化落地",
    highlightRule: "无状态原子点赞替代重型评论区",
    problem: "传统评论区维护成本高、垃圾内容泛滥、侵犯读者隐私。",
    solution: "采用 FeedbackDock 四态轻共鸣按钮与 Upstash Redis 原子递增，提供零门槛、无负担、真实的读者情绪共鸣。",
    codeRef: "src/sparx-ui/patterns/FeedbackDock.tsx",
  },
];

export const GuardrailsPage: React.FC = () => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  // 默认根据当前全局主题智能隔离选区
  const [selectedScope, setSelectedScope] = useState<GuardrailThemeScope>(
    isEmerald ? "emerald" : "flare"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");
  const [searchQuery, setSearchQuery] = useState("");

  const scopeTabs: { id: GuardrailThemeScope; label: string; icon: string; count: number }[] = useMemo(() => {
    return [
      {
        id: "emerald",
        label: "皓白极翠专属规约",
        icon: "◈",
        count: GUARDRAIL_ITEMS.filter((i) => i.scope === "emerald").length,
      },
      {
        id: "flare",
        label: "虚空绯红专属规约",
        icon: "✦",
        count: GUARDRAIL_ITEMS.filter((i) => i.scope === "flare").length,
      },
      {
        id: "universal",
        label: "跨风格通用公理",
        icon: "❖",
        count: GUARDRAIL_ITEMS.filter((i) => i.scope === "universal").length,
      },
      {
        id: "all",
        label: "全量规约索引",
        icon: "≡",
        count: GUARDRAIL_ITEMS.length,
      },
    ];
  }, []);

  const categories = ["全部", "视觉美学", "排印红线", "空间拓扑", "交互动效", "长文展卷", "性能工程"];

  const filteredItems = useMemo(() => {
    return GUARDRAIL_ITEMS.filter((item) => {
      const matchScope = selectedScope === "all" || item.scope === selectedScope;
      const matchCat = selectedCategory === "全部" || item.category === selectedCategory;
      const matchQuery =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.solution.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.highlightRule && item.highlightRule.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchScope && matchCat && matchQuery;
    });
  }, [selectedScope, selectedCategory, searchQuery]);

  return (
    <div className="w-full min-w-0 space-y-8 max-w-5xl mx-auto pb-16">
      {/* 头部说明 */}
      <section className="space-y-3">
        <div
          className={`flex items-center gap-2 text-xs font-mono font-bold ${
            isEmerald ? "text-[#059669]" : "text-[#E5192D]"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>DESIGN GUARDRAILS & AXIOMS · 风格规约隔离指南</span>
        </div>
        <h1
          className={`text-2xl sm:text-4xl font-black tracking-tight ${
            isEmerald ? "text-slate-900" : "text-white"
          }`}
        >
          双风格独立规约与通用公理体系
        </h1>
        <p
          className={`text-xs sm:text-sm max-w-3xl leading-relaxed ${
            isEmerald ? "text-slate-600" : "text-zinc-300"
          }`}
        >
          系统将<strong>「皓白极翠（企业稳态）」</strong>与<strong>「虚空绯红（极客前卫）」</strong>的设计红线物理隔离，
          分别确立严苛的阴影、边框、骨架稳定度与色彩法则，同时共享排印红线与视口锁定等通用公理。
        </p>
      </section>

      {/* 核心第一层：风格隔离选择器 (Primary Scope Switcher) */}
      <section
        className={`p-2 rounded-2xl border transition-colors ${
          isEmerald
            ? "bg-slate-100/90 border-slate-200"
            : "bg-[#08090E] border-white/10"
        }`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-mono text-sm">
          {scopeTabs.map((tab) => {
            const isActive = selectedScope === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedScope(tab.id)}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                  isActive
                    ? isEmerald
                      ? "bg-white text-emerald-800 border-2 border-[#059669] shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                      : "bg-[#E5192D] text-white shadow-[0_0_10px_rgba(229,25,45,0.4)]"
                    : isEmerald
                    ? "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full ${
                    isActive
                      ? isEmerald
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-white/20 text-white"
                      : isEmerald
                      ? "bg-slate-200/80 text-slate-600"
                      : "bg-white/10 text-zinc-400"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 选区当前定位说明条 */}
      <div
        className={`px-4 py-3 rounded-xl border text-sm font-mono flex items-center justify-between flex-wrap gap-2 ${
          selectedScope === "emerald"
            ? "bg-emerald-50/60 border-emerald-200 text-emerald-900"
            : selectedScope === "flare"
            ? "bg-red-950/20 border-red-900/40 text-red-200"
            : selectedScope === "universal"
            ? isEmerald
              ? "bg-teal-50/60 border-teal-200 text-teal-900"
              : "bg-white/5 border-white/10 text-zinc-300"
            : isEmerald
            ? "bg-slate-50 border-slate-200 text-slate-700"
            : "bg-white/5 border-white/10 text-zinc-300"
        }`}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>
            {selectedScope === "emerald" && "正在检视：皓白极翠专属规约（严禁卡片嵌套双重阴影 · 严禁 hover 放大 · 极致微阴影 · 2px Outline 加粗强调）"}
            {selectedScope === "flare" && "正在检视：虚空绯红专属规约（暗房极黑四层黑阶 · 激光微发光 · 次像素白边框 · 散布网格云图）"}
            {selectedScope === "universal" && "正在检视：跨风格通用公理（字号 ≥ 14px · 严禁衬线 · 100dvh 视口锁定 · 真实人本文案 · 700ms 丝滑换景）"}
            {selectedScope === "all" && "正在检视：全量设计规约总索引"}
          </span>
        </div>
        <span className="font-bold">共 {filteredItems.length} 项</span>
      </div>

      {/* 搜索与分类过滤器 */}
      <section
        className={`flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border transition-colors ${
          isEmerald ? "bg-white border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.02)]" : "bg-[#08090E] border-white/10"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2 text-sm font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer font-medium ${
                selectedCategory === cat
                  ? isEmerald
                    ? "bg-[#059669] text-white font-bold"
                    : "bg-[#E5192D] text-white font-bold shadow-[0_0_10px_rgba(229,25,45,0.4)]"
                  : isEmerald
                  ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="搜索规约条款或痛点..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-48 sm:w-64 px-3.5 py-2 pl-9 rounded-xl border text-sm focus:outline-none transition-colors ${
              isEmerald
                ? "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-[#059669]"
                : "bg-white/5 border-white/10 text-white placeholder-zinc-500 focus:border-[#E5192D]/60"
            }`}
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>
      </section>

      {/* 规约详细卡片列表 */}
      <section className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`p-5 sm:p-6 rounded-2xl border transition-colors duration-150 space-y-4 ${
              isEmerald
                ? "bg-white border-slate-200 hover:opacity-85 transition-opacity duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                : "bg-[#030406] border-white/10 hover:border-white/25 shadow-md"
            }`}
          >
            {/* 卡片头部 */}
            <div
              className={`flex flex-wrap items-center justify-between gap-2 border-b pb-3 ${
                isEmerald ? "border-slate-100" : "border-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`font-mono text-sm font-bold px-2.5 py-1 rounded-md border ${
                    item.scope === "emerald"
                      ? isEmerald
                        ? "text-[#059669] bg-emerald-50 border-emerald-200"
                        : "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                      : item.scope === "flare"
                      ? "text-[#E5192D] bg-[#E5192D]/10 border-[#E5192D]/25"
                      : isEmerald
                      ? "text-[#0D9488] bg-teal-50 border-teal-200"
                      : "text-sky-400 bg-sky-500/10 border-sky-500/20"
                  }`}
                >
                  {item.id}
                </span>

                <h3
                  className={`text-base font-bold tracking-tight ${
                    isEmerald ? "text-slate-900" : "text-white"
                  }`}
                >
                  {item.title}
                </h3>

                {item.highlightRule && (
                  <span
                    className={`hidden md:inline-block text-sm font-mono px-2.5 py-0.5 rounded border ${
                      isEmerald
                        ? "bg-slate-100 border-slate-200 text-slate-700"
                        : "bg-white/5 border-white/10 text-zinc-300"
                    }`}
                  >
                    ★ {item.highlightRule}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-mono px-2.5 py-1 rounded-md border ${
                    item.scope === "emerald"
                      ? isEmerald
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200 font-bold"
                        : "bg-emerald-950/40 text-emerald-300 border-emerald-800/40"
                      : item.scope === "flare"
                      ? "bg-red-950/40 text-red-300 border-red-800/40 font-bold"
                      : isEmerald
                      ? "bg-slate-100 text-slate-700 border-slate-200 font-bold"
                      : "bg-white/10 text-zinc-300 border-white/15"
                  }`}
                >
                  {item.scope === "emerald"
                    ? "皓白极翠专属"
                    : item.scope === "flare"
                    ? "虚空绯红专属"
                    : "跨风格通用"}
                </span>

                <Badge variant={isEmerald ? "emerald" : "flare"} mono>
                  {item.category}
                </Badge>
                <span
                  className={`text-sm font-mono hidden lg:inline-block ${
                    isEmerald ? "text-slate-400" : "text-zinc-500"
                  }`}
                >
                  {item.codeRef}
                </span>
              </div>
            </div>

            {/* 痛点与解法（严格无内嵌阴影，纯粹边框分区） */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm leading-relaxed">
              {/* 历史问题/陷阱 */}
              <div
                className={`p-3.5 rounded-xl border space-y-1.5 shadow-none ${
                  isEmerald
                    ? "bg-amber-50/40 border-amber-200/70 text-amber-950"
                    : "bg-red-950/20 border-red-500/20 text-zinc-300"
                }`}
              >
                <div
                  className={`flex items-center gap-1.5 font-mono font-bold ${
                    isEmerald ? "text-[#D97706]" : "text-red-400"
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>历史痛点 / 避坑警告：</span>
                </div>
                <p className={isEmerald ? "text-slate-700" : "text-zinc-300"}>{item.problem}</p>
              </div>

              {/* 规范解决方案 */}
              <div
                className={`p-3.5 rounded-xl border space-y-1.5 shadow-none ${
                  isEmerald
                    ? "bg-emerald-50/40 border-emerald-200/70 text-emerald-950"
                    : "bg-emerald-950/20 border-emerald-500/20 text-zinc-200"
                }`}
              >
                <div
                  className={`flex items-center gap-1.5 font-mono font-bold ${
                    isEmerald ? "text-[#059669]" : "text-emerald-400"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Sparx v2 规约解法：</span>
                </div>
                <p className={isEmerald ? "text-slate-700" : "text-zinc-200"}>{item.solution}</p>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div
            className={`p-12 text-center font-mono text-sm rounded-2xl border ${
              isEmerald ? "bg-white border-slate-200 text-slate-400" : "bg-[#08090E] border-white/10 text-zinc-500"
            }`}
          >
            未检索到匹配当前选区与关键词的规约项
          </div>
        )}
      </section>
    </div>
  );
};
