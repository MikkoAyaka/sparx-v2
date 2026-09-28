import type { SparxStyleTheme } from "@/sparx-ui";

/**
 * 展示站点的路由表。
 * 站点分为四个部分：开始使用、设计规范、组件、场景。
 * 前三部分是文档页面，跟随全局主题；场景是全屏演示，锁定在各自的目标主题上。
 */

export type SectionId = "start" | "foundations" | "components" | "scenes";

export type PageId =
  | "overview"
  | "quick-start"
  | "agent-prompt"
  | "themes"
  | "color"
  | "typography"
  | "surfaces"
  | "guardrails"
  | "copywriting"
  | "components-basic"
  | "components-data"
  | "atmosphere"
  | "patterns-publishing"
  | "patterns-enterprise"
  | "scenes";

export type SceneId =
  | "scene-editorial"
  | "scene-monograph"
  | "scene-agent-lab"
  | "scene-dashboard"
  | "scene-approvals"
  | "scene-docs";

export type RouteId = PageId | SceneId;

export interface PageMeta {
  id: PageId;
  label: string;
  group?: string;
}

export interface SectionMeta {
  id: SectionId;
  label: string;
  description: string;
  pages: PageMeta[];
}

export const SECTIONS: SectionMeta[] = [
  {
    id: "start",
    label: "开始使用",
    description: "了解 Sparx UI，把它接入项目，或者交给 AI 编码助手使用。",
    pages: [
      { id: "overview", label: "概览" },
      { id: "quick-start", label: "快速上手" },
      { id: "agent-prompt", label: "Agent 提示词" },
    ],
  },
  {
    id: "foundations",
    label: "设计规范",
    description: "两种主题的定位、设计令牌，以及实现时必须遵守的规则。",
    pages: [
      { id: "themes", label: "主题定位", group: "主题" },
      { id: "color", label: "色彩", group: "设计令牌" },
      { id: "typography", label: "排版", group: "设计令牌" },
      { id: "surfaces", label: "层级与动效", group: "设计令牌" },
      { id: "guardrails", label: "设计规则", group: "规则" },
      { id: "copywriting", label: "文案规范", group: "规则" },
    ],
  },
  {
    id: "components",
    label: "组件",
    description: "基础组件、背景与媒体组件，以及由它们组合而成的复合模式。",
    pages: [
      { id: "components-basic", label: "基础组件", group: "组件" },
      { id: "components-data", label: "数据组件", group: "组件" },
      { id: "atmosphere", label: "背景与媒体", group: "组件" },
      { id: "patterns-publishing", label: "出版与表达", group: "复合模式" },
      { id: "patterns-enterprise", label: "企业应用", group: "复合模式" },
    ],
  },
  {
    id: "scenes",
    label: "场景",
    description: "用组件和复合模式搭出的完整页面，每个场景针对一种主题设计。",
    pages: [{ id: "scenes", label: "全部场景" }],
  },
];

export interface SceneMeta {
  id: SceneId;
  title: string;
  theme: SparxStyleTheme;
  summary: string;
  uses: string[];
  cover: string;
}

export const SCENES: SceneMeta[] = [
  {
    id: "scene-editorial",
    title: "出版首页",
    theme: "void-flare",
    summary: "独立作者的站点首页。一屏只放一篇文章，超大标题、全幅封面和绯红编号，用滚轮或方向键翻篇。",
    uses: ["SiteMasthead", "StageHeroCard", "SegmentedRail"],
    cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "scene-monograph",
    title: "长文阅读",
    theme: "void-flare",
    summary: "双栏长文页。左栏固定显示封面、目录和阅读进度，右栏是唯一的滚动区域，读到哪一节，左栏就切到哪一节。",
    uses: ["SplitMonograph", "useActiveSection", "FeedbackDock"],
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "scene-agent-lab",
    title: "Agent 实验室",
    theme: "void-flare",
    summary: "给多个 Agent 下达一个任务，实时看它们分工、推理、调用工具，最后产出代码。",
    uses: ["AgentThoughtChain", "AgentCollaborationBoard", "TelemetryGauge"],
    cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "scene-dashboard",
    title: "经营看板",
    theme: "glacial-emerald",
    summary: "企业中后台首页。侧边栏导航、关键指标、可筛选的库存表和待办事项，信息密集但层级清楚。",
    uses: ["AppShell", "PageHeader", "FilterBar", "MetricStatCard", "DataTable"],
    cover: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "scene-approvals",
    title: "审批中心",
    theme: "glacial-emerald",
    summary: "左侧是审批单列表，右侧是单据详情、审批进度和操作记录。可以直接批准或填写原因后驳回。",
    uses: ["AppShell", "WorkflowPipeline", "DescriptionList", "ActivityTimeline", "EmptyState"],
    cover: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "scene-docs",
    title: "开发者文档",
    theme: "glacial-emerald",
    summary: "三栏 API 文档：左侧接口目录，中间参数说明和多语言示例，右侧本页目录。",
    uses: ["PageHeader", "DataTable", "CodeBlock", "FeedbackDock"],
    cover: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
  },
];

export const THEME_LABELS: Record<SparxStyleTheme, { name: string; trait: string; icon: string }> = {
  "void-flare": { name: "虚空绯红", trait: "大胆、前卫", icon: "✦" },
  "glacial-emerald": { name: "皓白极翠", trait: "稳定、规范", icon: "◈" },
};

/** 旧版 ?nav= 链接到新路由的映射，保证已分享出去的链接仍然可用 */
export const LEGACY_NAV: Record<string, RouteId> = {
  overview: "overview",
  prompt: "agent-prompt",
  guardrails: "guardrails",
  copywriting: "copywriting",
  primitives: "components-basic",
  atmosphere: "atmosphere",
  patterns: "patterns-publishing",
  "stage-scene": "scene-editorial",
  "monograph-scene": "scene-monograph",
  "terminal-scene": "scene-docs",
  "agent-scene": "scene-agent-lab",
  "enterprise-scene": "scene-dashboard",
  "edge-scene": "scenes",
};

export const ALL_PAGE_IDS: PageId[] = SECTIONS.flatMap((s) => s.pages.map((p) => p.id));
export const ALL_SCENE_IDS: SceneId[] = SCENES.map((s) => s.id);

export function isSceneId(id: RouteId): id is SceneId {
  return (ALL_SCENE_IDS as string[]).includes(id);
}

export function isRouteId(id: string | null): id is RouteId {
  return !!id && ((ALL_PAGE_IDS as string[]).includes(id) || (ALL_SCENE_IDS as string[]).includes(id));
}

export function sectionOf(id: RouteId): SectionMeta {
  if (isSceneId(id)) return SECTIONS[SECTIONS.length - 1];
  return SECTIONS.find((s) => s.pages.some((p) => p.id === id)) ?? SECTIONS[0];
}

export function pageLabel(id: RouteId): string {
  if (isSceneId(id)) return SCENES.find((s) => s.id === id)?.title ?? id;
  return ALL_PAGE_IDS.includes(id) ? SECTIONS.flatMap((s) => s.pages).find((p) => p.id === id)!.label : id;
}

/** 文档页的线性阅读顺序，用于页面底部的“上一页 / 下一页” */
export function neighbors(id: PageId): { prev?: PageMeta; next?: PageMeta } {
  const flat = SECTIONS.flatMap((s) => s.pages);
  const idx = flat.findIndex((p) => p.id === id);
  return { prev: idx > 0 ? flat[idx - 1] : undefined, next: idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : undefined };
}

export function readRouteFromUrl(): RouteId {
  if (typeof window === "undefined") return "overview";
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");
  if (isRouteId(page)) return page;
  const legacy = params.get("nav");
  if (legacy && LEGACY_NAV[legacy]) return LEGACY_NAV[legacy];
  const hash = window.location.hash.replace("#", "");
  if (isRouteId(hash)) return hash;
  return "overview";
}
