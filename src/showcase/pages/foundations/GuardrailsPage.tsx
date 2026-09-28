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
  category: "视觉" | "排版" | "布局" | "交互与动效" | "长文阅读" | "性能";
  title: string;
  problem: string;
  solution: string;
  codeRef: string;
  highlightRule?: string;
}

const GUARDRAIL_ITEMS: GuardrailItem[] = [
  // ==========================================
  // 一、皓白极翠专属规则 (Glacial Emerald · 企业)
  // ==========================================
  {
    id: "E-01",
    scope: "emerald",
    category: "视觉",
    title: "不要嵌套带阴影的卡片",
    highlightRule: "外层有阴影，内层就不加",
    problem: "外层容器带阴影，里面的子卡片又各自带一层阴影。阴影层层叠加，界面显得发灰、臃肿，层级也看不清。",
    solution: "阴影只加在一层。外层是卡片时，内部列表改用分割线（divide-y divide-slate-100）或无阴影的浅底色面板（bg-slate-50 border border-slate-200 shadow-none）。",
    codeRef: "src/showcase/scenes/enterprise/shared.tsx (OpsCard)",
  },
  {
    id: "E-02",
    scope: "emerald",
    category: "交互与动效",
    title: "悬停时不放大卡片，也不加绿色描边",
    highlightRule: "不用 hover:scale · 用透明度变化代替描边",
    problem: "悬停时用 scale-[1.02] 放大卡片，周围的布局会跟着抖动；在浅色卡片上加高饱和度的绿色描边，看起来又脏又乱。",
    solution: "悬停时不改变任何元素的尺寸。浅色主题下的悬停反馈只用透明度变化（hover:opacity-85 transition-opacity duration-200）和很浅的背景色。",
    codeRef: "src/showcase/components/TokenSwatch.tsx",
  },
  {
    id: "E-03",
    scope: "emerald",
    category: "视觉",
    title: "阴影要浅到几乎看不出来",
    highlightRule: "shadow-[0_1px_2px_rgba(0,0,0,0.03)]",
    problem: "在白底上使用过浓、过大或带颜色的阴影，界面会显得像廉价塑料。",
    solution: "浅色主题的卡片阴影统一为 shadow-[0_1px_2px_rgba(0,0,0,0.03)]。第一眼看上去是平的，细看才有一点层次；层级主要靠边框区分，不使用彩色光晕。",
    codeRef: "src/sparx-ui/styles.css (--sparx-shadow-card)",
  },
  {
    id: "E-04",
    scope: "emerald",
    category: "视觉",
    title: "按层级区分描边粗细，悬停时不改变边框宽度",
    highlightRule: "激活态 2px · 其余 1px · 悬停不变宽",
    problem: "全部使用 1px 浅灰细线，重要元素没有分量；悬停时把边框从 1px 改成 2px，卡片会变大 2px，下方列表跟着位移；次要按钮用 2px 灰色描边，又显得笨重。",
    solution: "次要按钮用 1px 浅灰描边（border border-slate-300）；重要操作和导航激活态用 2px 翡翠绿（border-2 border-[#059669]）；普通卡片用 1px 边框，悬停时边框宽度和元素尺寸都不变，也不加绿色描边。",
    codeRef: "src/sparx-ui/primitives/Button.tsx",
  },
  {
    id: "E-05",
    scope: "emerald",
    category: "视觉",
    title: "参考 Modrinth 的浅色主题配色",
    highlightRule: "白卡片 + 浅灰底 + 深色标题",
    problem: "浅色主题容易做得过于单调，只有白底黑字，缺少层次。",
    solution: "参考 Modrinth 的浅色主题：白色卡片（#FFFFFF）放在浅灰底色（#F8FAFC）上，大标题用深色（#0F172A），强调色用翡翠绿（#059669），数据和代码用等宽字体标注。",
    codeRef: "src/sparx-ui/tokens/colors.tsx",
  },
  {
    id: "E-06",
    scope: "emerald",
    category: "视觉",
    title: "警告用琥珀色，信息用青绿色",
    highlightRule: "不用亮紫和荧光青",
    problem: "亮紫、荧光青和绿色放在一起时颜色冲突，显得杂乱；亮黄色的警告在白底上刺眼。",
    solution: "去掉亮紫和荧光青。警告统一用琥珀色（#D97706），信息提示统一用青绿色（#0D9488），次要信息用板岩灰（#64748B）。",
    codeRef: "src/sparx-ui/tokens/colors.tsx",
  },
  {
    id: "E-07",
    scope: "emerald",
    category: "布局",
    title: "所有组件都要支持浅色，切换时不能闪黑屏",
    highlightRule: "每个组件都有浅色样式",
    problem: "视频封面、演示终端、代码框和空背景在浅色主题下仍残留黑底、暗角或绯红色块，切换卡片时出现黑屏闪烁。",
    solution: "所有组件（包括媒体背景层）都通过 useSparxTheme() 读取当前主题，在皓白极翠下使用白底和浅灰过渡，不留深色块。",
    codeRef: "src/sparx-ui/atmosphere/StageMediaSpine.tsx",
  },

  // ==========================================
  // 二、虚空绯红专属规则 (Void Flare · 个人)
  // ==========================================
  {
    id: "V-01",
    scope: "flare",
    category: "视觉",
    title: "深色底用接近纯黑的四级黑色",
    highlightRule: "#020204 / #030406 / #050505 / #08090E",
    problem: "用发灰、偏蓝的深灰做深色底，画面发闷，夜间阅读时对比度也不够。",
    solution: "按层级使用四种接近纯黑的颜色：视口画布 #020204，主舞台卡片 #030406，长文阅读区 #050505，悬浮导航栏 #08090E。",
    codeRef: "src/sparx-ui/tokens/colors.tsx",
  },
  {
    id: "V-02",
    scope: "flare",
    category: "视觉",
    title: "绯红只用于关键操作，发光要克制",
    highlightRule: "发光半径不超过 12px",
    problem: "大面积使用 32px 的发光效果，文字周围一圈光晕，看久了眼睛累。",
    solution: "绯红（#E5192D / #FF2D55）只用在关键操作上，发光效果收敛到 shadow-[0_0_12px_rgba(229,25,45,0.35)]。",
    codeRef: "src/sparx-ui/tokens/colors.tsx",
  },
  {
    id: "V-03",
    scope: "flare",
    category: "视觉",
    title: "深色主题使用半透明白色细边框",
    highlightRule: "border-white/10",
    problem: "深色主题下使用粗白线或浅灰实线，边缘生硬刺眼。",
    solution: "标准边框用 border-white/10，需要弱化的边框用 border-white/[0.06]。",
    codeRef: "src/sparx-ui/primitives/GlassCard.tsx",
  },
  {
    id: "V-04",
    scope: "flare",
    category: "视觉",
    title: "空背景用 40px 网格和关键词散布图填充",
    highlightRule: "KeywordAtmosphere + 40px 网格",
    problem: "纯黑背景完全留空会显得单调；放插画又会干扰文字阅读。",
    solution: "在背景叠加 40px 细网格和 KeywordAtmosphere 关键词散布图，填充空白但不抢文字的注意力。",
    codeRef: "src/sparx-ui/atmosphere/KeywordAtmosphere.tsx",
  },
  {
    id: "V-05",
    scope: "flare",
    category: "视觉",
    title: "深色主题的警告色用琥珀色",
    highlightRule: "#E5A93C",
    problem: "黑底上的荧光黄对比过强，很刺眼。",
    solution: "警告色使用琥珀色（#E5A93C），在黑底上足够醒目，又不刺眼。",
    codeRef: "src/sparx-ui/tokens/colors.tsx",
  },

  // ==========================================
  // 三、两种主题通用规则 (Shared)
  // ==========================================
  {
    id: "U-01",
    scope: "universal",
    category: "排版",
    title: "最小字号 14px，不使用衬线体",
    highlightRule: "最小 14px · 不用 Serif · 小按钮留足内边距",
    problem: "小于 14px 的文字在小屏和低分辨率屏幕上看不清，还有明显锯齿；按钮内边距太小，点击区域局促；衬线体和整体的无衬线风格不协调。",
    solution: "所有文字不小于 14px，包括时间戳和小标签；正文 15~16px，行高 leading-[1.85]。导航、主题切换、标签等小按钮要留足内边距。不使用衬线体（Serif）。",
    codeRef: "src/sparx-ui/tokens/typography.ts",
  },
  {
    id: "U-02",
    scope: "universal",
    category: "布局",
    title: "首页锁定在 100dvh，页面高度不跳动",
    highlightRule: "100dvh · 页面本身不滚动",
    problem: "切换内容时页面高度跟着变化，外层还会出现第二条滚动条。",
    solution: "首页外壳固定为 100dvh，超出的内容在内层区域滚动，外层不出现滚动条，页面高度保持不变。",
    codeRef: "src/showcase/layout/SceneShell.tsx",
  },
  {
    id: "U-03",
    scope: "universal",
    category: "布局",
    title: "主舞台图片占 60% 宽度，向右渐变过渡",
    highlightRule: "60% 宽度 + 向右渐变蒙版",
    problem: "主舞台图片边缘直接截断，和右侧文字之间没有过渡。",
    solution: "左侧图片宽度设为 60%，叠加一层向右的渐变蒙版，在 58% 处完全过渡到舞台底色（深色或浅色），再接右侧的文字区。",
    codeRef: "src/sparx-ui/atmosphere/AmbientDissolveMask.tsx",
  },
  {
    id: "U-04",
    scope: "universal",
    category: "长文阅读",
    title: "长文分两栏：左侧 35% 固定，右侧 65% 滚动",
    highlightRule: "左栏固定 · 随阅读位置切换背景",
    problem: "普通文章页的封面和侧栏会随着正文一起滚出屏幕，读到后面就看不到了。",
    solution: "左侧 35% 固定不滚动，显示封面和环境色；右侧 65% 是正文，也是唯一的滚动区域。当某个段落进入视口 45% 的位置时，左栏切换到对应的背景。",
    codeRef: "src/sparx-ui/patterns/SplitMonograph.tsx",
  },
  {
    id: "U-05",
    scope: "universal",
    category: "视觉",
    title: "文案要真实、具体、克制、有温度",
    highlightRule: "不写空洞的生造词",
    problem: "界面里充斥着“在断裂带重建架构秩序”、“暗房虚空视界”、“光学微共鸣”这类读不懂的生造词。",
    solution: "写真实的工程实践，给出具体的技术和数字（如边缘函数发布、5 秒推理延时的等待交互、基于 Redis 的点赞计数）。标题按“问题 + 具体做法”来写。详见文案规范页。",
    codeRef: "src/showcase/pages/foundations/CopywritingGuidePage.tsx",
  },
  {
    id: "U-06",
    scope: "universal",
    category: "交互与动效",
    title: "切换图片时用 700ms 双图层淡入，不闪屏",
    highlightRule: "双图层交叉淡入",
    problem: "切换卡片时没有过渡，图片直接跳变，或先闪一下黑屏或白屏。",
    solution: "StageMediaSpine 使用两个图层：旧图留在底层，新图在上层用 700ms 淡入（spineMediaFadeIn），淡入完成后再移除旧图。",
    codeRef: "src/sparx-ui/atmosphere/StageMediaSpine.tsx",
  },
  {
    id: "U-07",
    scope: "universal",
    category: "交互与动效",
    title: "主舞台视频静音循环自动播放",
    highlightRule: "autoPlay · muted · loop · playsInline",
    problem: "首页视频要手动点击才能播放。",
    solution: "给主舞台视频加上 autoPlay、muted、loop、playsInline，打开页面即静音循环播放。",
    codeRef: "src/sparx-ui/atmosphere/StageMediaSpine.tsx",
  },
  {
    id: "U-08",
    scope: "universal",
    category: "性能",
    title: "浏览器空闲时预加载相邻卡片的图片",
    highlightRule: "requestIdleCallback · radius=1",
    problem: "切换到还没看过的卡片时，大图还在加载，出现卡顿或白屏。",
    solution: "scheduleAdjacentPreload 在 requestIdleCallback 中预加载当前卡片前后各 1 张（radius=1）大图。",
    codeRef: "src/sparx-ui/patterns/adjacentPreload.ts",
  },
  {
    id: "U-09",
    scope: "universal",
    category: "视觉",
    title: "不要在界面上写操作说明",
    highlightRule: "不写“按 1~5 切换”、“支持滚轮漫游”",
    problem: "界面上残留“按 1~5 切换模块”、“支持滚轮漫游”之类的说明文字，占地方也显得啰嗦。",
    solution: "删除所有操作说明，用分段指示条和编号让用户自己看出可以切换。",
    codeRef: "src/sparx-ui/patterns/SegmentedRail.tsx",
  },
  {
    id: "U-10",
    scope: "universal",
    category: "长文阅读",
    title: "用轻量点赞代替评论区",
    highlightRule: "无状态计数，不做评论区",
    problem: "评论区维护成本高，容易被垃圾内容淹没，还要处理读者隐私。",
    solution: "使用 FeedbackDock 提供四种反应按钮，计数用 Upstash Redis 原子递增。读者不用登录就能表达态度，站点也不需要存储个人数据。",
    codeRef: "src/sparx-ui/patterns/FeedbackDock.tsx",
  },
  {
    id: "U-11",
    scope: "universal",
    category: "布局",
    title: "顶部导航始终只占一行",
    highlightRule: "窄屏也不折行",
    problem: "视口变窄时（笔记本、平板、分屏），顶部导航被挤得折成两行，页面内容整体下移，也占用了宝贵的垂直空间。",
    solution: "导航栏固定为单行（h-14/16 flex-nowrap）：左侧品牌收窄；中间主导航居中，放不下时可横向滑动且隐藏滚动条（overflow-x-auto no-scrollbar）；右侧的主题切换器窄屏时只显示图标；当前部分的页面列表在窄屏上改为横向标签。",
    codeRef: "src/showcase/layout/DocsShell.tsx",
  },
  {
    id: "U-12",
    scope: "universal",
    category: "布局",
    title: "组件按自身容器的宽度排版，而不是视口宽度",
    highlightRule: "@container 容器查询 · 表格最小宽度 560px",
    problem: "组件只看视口宽度：放进文档栏、侧栏或分栏详情里时，仍按宽屏排版，结果表格逐字换行、卡片互相覆盖、固定高度的舞台内容溢出。",
    solution: "复合模式都声明为容器（@container），用 @md、@2xl、@4xl 等容器断点排版；AppShell 的内容区是名为 main 的容器，页面内容用 @…/main: 断点。主舞台同时按高度收缩，高度不足时依次隐藏大编号、标签和摘要。数据表格默认最小宽度 560px，容器更窄时横向滚动。",
    codeRef: "src/sparx-ui/patterns/AppShell.tsx",
  },
];

export const GuardrailsPage: React.FC = () => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  // 默认显示当前主题的规则
  const [selectedScope, setSelectedScope] = useState<GuardrailThemeScope>(
    isEmerald ? "emerald" : "flare"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");
  const [searchQuery, setSearchQuery] = useState("");

  const scopeTabs: { id: GuardrailThemeScope; label: string; icon: string; count: number }[] = useMemo(() => {
    return [
      {
        id: "emerald",
        label: "皓白极翠",
        icon: "◈",
        count: GUARDRAIL_ITEMS.filter((i) => i.scope === "emerald").length,
      },
      {
        id: "flare",
        label: "虚空绯红",
        icon: "✦",
        count: GUARDRAIL_ITEMS.filter((i) => i.scope === "flare").length,
      },
      {
        id: "universal",
        label: "通用规则",
        icon: "❖",
        count: GUARDRAIL_ITEMS.filter((i) => i.scope === "universal").length,
      },
      {
        id: "all",
        label: "全部规则",
        icon: "≡",
        count: GUARDRAIL_ITEMS.length,
      },
    ];
  }, []);

  const categories = ["全部", "视觉", "排版", "布局", "交互与动效", "长文阅读", "性能"];

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
          <span>DESIGN GUARDRAILS · 设计规则与避坑清单</span>
        </div>
        <h1
          className={`text-2xl sm:text-4xl font-black tracking-tight ${
            isEmerald ? "text-slate-900" : "text-white"
          }`}
        >
          设计规则与常见错误
        </h1>
        <p
          className={`text-xs sm:text-sm max-w-3xl leading-relaxed ${
            isEmerald ? "text-slate-600" : "text-zinc-300"
          }`}
        >
          这里收集了开发中踩过的坑和对应的规则。<strong>「皓白极翠」</strong>和<strong>「虚空绯红」</strong>各有一组关于阴影、边框、悬停和配色的规则；字号、视口锁定、文案等规则两种主题通用。每条规则都注明了问题、做法和对应的源码文件。
        </p>
      </section>

      {/* 第一层筛选：按主题 */}
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

      {/* 当前筛选说明 */}
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
            {selectedScope === "emerald" && "皓白极翠专属规则：阴影层级、悬停反馈、描边粗细、浅色配色"}
            {selectedScope === "flare" && "虚空绯红专属规则：深色底色层级、绯红发光、半透明边框、背景网格"}
            {selectedScope === "universal" && "两种主题通用的规则：最小字号 14px、不用衬线体、100dvh 视口锁定、文案、700ms 图片过渡"}
            {selectedScope === "all" && "全部设计规则"}
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
            aria-label="搜索规则"
            placeholder="例如：阴影、14px、hover"
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

      {/* 规则列表 */}
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
                  className={`shrink-0 whitespace-nowrap font-mono text-sm font-bold px-2.5 py-1 rounded-md border ${
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
                    ? "皓白极翠"
                    : item.scope === "flare"
                    ? "虚空绯红"
                    : "通用"}
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

            {/* 问题与做法（内部面板不加阴影，只用边框区分） */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm leading-relaxed">
              {/* 问题 */}
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
                  <span>问题</span>
                </div>
                <p className={isEmerald ? "text-slate-700" : "text-zinc-300"}>{item.problem}</p>
              </div>

              {/* 做法 */}
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
                  <span>做法</span>
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
            <p>{searchQuery ? `没有与“${searchQuery}”匹配的规则` : "当前筛选条件下没有规则"}</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("全部");
                setSelectedScope("all");
              }}
              className={`mt-3 px-3.5 py-1.5 rounded-lg border font-medium cursor-pointer transition-colors ${
                isEmerald
                  ? "border-slate-300 text-slate-700 hover:bg-slate-100"
                  : "border-white/15 text-zinc-300 hover:bg-white/5"
              }`}
            >
              清除筛选
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
