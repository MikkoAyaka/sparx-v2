import React, { useState } from "react";
import { Badge, StatusDot } from "@/sparx-ui";
import { ShieldCheck, AlertTriangle, CheckCircle2, Search } from "lucide-react";

interface GuardrailItem {
  id: number;
  category: "视觉美学" | "排印红线" | "空间拓扑" | "交互动效" | "长文展卷" | "响应式" | "性能工程";
  title: string;
  problem: string;
  solution: string;
  codeRef: string;
}

const GUARDRAIL_ITEMS: GuardrailItem[] = [
  {
    id: 1,
    category: "视觉美学",
    title: "虚空暗房基底与激光发光体系",
    problem: "初始方案太素或太架空科幻，缺乏工业质感与沉浸感。",
    solution: "统一采用绝对暗房黑阶（#020204 视口画布、#030406 舞台、#050505 展卷画布），交互核心使用高压绯红激光（#E5192D / #FF2D55）与光学发光阴影。",
    codeRef: "src/sparx-ui/tokens/colors.ts",
  },
  {
    id: 2,
    category: "排印红线",
    title: "强制字号 ≥ 12px 与全站杜绝衬线体",
    problem: "界面存在小于 12px 的微小碎字导致阅读费眼，衬线体破坏前卫工业质感。",
    solution: "确立全站不可逾越的排印红线：最小渲染字号严格 ≥ 12px（底线仅留给微型时间戳/状态点，常规辅助提升至 13~14px，正文提升至 15~16px 舒适阅读阶），全站严禁 Serif 衬线体，正文使用 Space Grotesk + MiSans，代码与元数据使用 IBM Plex Mono。",
    codeRef: "src/sparx-ui/tokens/typography.ts",
  },
  {
    id: 3,
    category: "视觉美学",
    title: "收敛可视化原语，去除复杂图表",
    problem: "多边形雷达图、折线图等复杂可视化不直观、不收敛，造成信息膨胀。",
    solution: "彻底去除无用复杂图表，仅保留最基础、高收敛的可视化原语（如 SVG 环形阅读节奏刻度规 ReadingGauge）。",
    codeRef: "src/sparx-ui/primitives/ReadingGauge.tsx",
  },
  {
    id: 4,
    category: "视觉美学",
    title: "清理自述文案与作品集模板味",
    problem: "原型中出现“画廊巨幕 · 80%+ 留白 · 基础收敛组件”等向评委展示的文字，装饰英文泛滥。",
    solution: "全面清理自述性质文案与空洞装饰英文，回归纯粹严肃的内容出版语义（架构哨所、独立出版、实时情报）。",
    codeRef: "showcase/pages/OverviewPage.tsx",
  },
  {
    id: 5,
    category: "空间拓扑",
    title: "100dvh 视口锁定，杜绝容器抖动",
    problem: "元素变化时容器高度跳动导致页面不稳定，出现意外的全局滚动条。",
    solution: "锁定 100dvh 视口外壳，内容超长由内层网格自适应吸收，外层彻底消除跳动与无意义页面滚动条。",
    codeRef: "src/sparx-ui/patterns/ChannelShell.tsx",
  },
  {
    id: 6,
    category: "空间拓扑",
    title: "60% 宽度大图与横向渐变消融蒙版",
    problem: "主舞台卡片左侧图片展示宽度截断生硬，和右侧文字衔接不自然。",
    solution: "左侧图片宽度设为 60%，配合右向渐变蒙版在 58% 处完全融入 #030406 暗底，平滑进入右侧排版列。",
    codeRef: "src/sparx-ui/atmosphere/AmbientDissolveMask.tsx",
  },
  {
    id: 7,
    category: "交互动效",
    title: "双图层 700ms 丝滑换图脊柱，杜绝黑屏",
    problem: "主舞台卡片翻页时左侧图像区域缺少衔接动画，切图存在生硬黑屏跳动感。",
    solution: "StageMediaSpine 双图层缓冲架构：老图在底层持续垫底，新图执行 700ms 丝滑淡入（spineMediaFadeIn），平滑过渡。",
    codeRef: "src/sparx-ui/atmosphere/StageMediaSpine.tsx",
  },
  {
    id: 8,
    category: "交互动效",
    title: "主舞台视频静音自动内联播放",
    problem: "首页视频封面必须手动点击才能播放，打断了展卷连贯体验。",
    solution: "在主舞台状态下注入 autoPlay、muted、loop、playsInline，实现无需点击的静音循环自动播放。",
    codeRef: "src/sparx-ui/atmosphere/StageMediaSpine.tsx",
  },
  {
    id: 9,
    category: "长文展卷",
    title: "双轨解耦排版：35% 脊柱 + 65% 画布",
    problem: "传统文章页封面和侧栏随正文向上滚出视线，导致空间割裂。",
    solution: "左侧 35% 固定环境脊柱（严禁滚动，随焦点智能投射环境色） + 右侧 65% 无界排版画布（唯一正文滚动流）。",
    codeRef: "src/sparx-ui/patterns/SplitMonograph.tsx",
  },
  {
    id: 10,
    category: "长文展卷",
    title: "读者视线焦点联动左侧环境背景换景",
    problem: "多图长文左侧图片永远停在第一张，无法随阅读进度反馈视觉。",
    solution: "监听右侧画布滚动，当图片/章节滑入 45% 视线注视区时，左侧固定脊柱背景通过 700ms 丝滑融变同步切换。",
    codeRef: "src/showcase/pages/scenes/SplitMonographScene.tsx",
  },
  {
    id: 11,
    category: "长文展卷",
    title: "消除文章右侧滚动盲区",
    problem: "内容区域右侧还有一部分空间鼠标滚动无效。",
    solution: "优化 Flex/Grid 弹性布局与内边距，确保右侧全部视觉宽度均能正常触发滚轮事件。",
    codeRef: "src/sparx-ui/patterns/SplitMonograph.tsx",
  },
  {
    id: 12,
    category: "长文展卷",
    title: "内嵌沙箱留白，避免滚轮陷阱",
    problem: "内嵌 HTML/代码无外层 padding，上下滑动意外进入深层 iframe 滚动被卡住。",
    solution: "为嵌入内容提供统一外层安全 padding、微弱边框与交互遮罩，保证页面整体滚动通畅。",
    codeRef: "src/sparx-ui/primitives/CodeBlock.tsx",
  },
  {
    id: 13,
    category: "长文展卷",
    title: "文章底部换篇按钮杜绝拥挤换行",
    problem: "底部上一篇/下一篇按钮空间不足，文字发生不美观的折行。",
    solution: "重构底部导航布局，设置安全最小宽度与弹性间隔，移动端采用自适应分段指示条。",
    codeRef: "src/sparx-ui/patterns/SplitMonograph.tsx",
  },
  {
    id: 14,
    category: "交互动效",
    title: "定制 6px 隐形式微型细滚动条",
    problem: "原生浏览器灰色粗滚动条破坏暗房无界沉浸感。",
    solution: "封装 .subtle-scroll 工具类（6px 宽度、极淡半透明滑块、hover 绯红微弱发光），舞台彻底隐藏滚动条。",
    codeRef: "src/index.css (.subtle-scroll)",
  },
  {
    id: 15,
    category: "交互动效",
    title: "展卷阅读按钮悬浮微动效与辉光放大",
    problem: "重要行动按钮（CTA）缺少微交互，悬浮状态呆板。",
    solution: "鼠标悬浮时箭头向右微移（group-hover:translate-x-1），激光发光阴影同步放大增强（glow-flare-lg）。",
    codeRef: "src/sparx-ui/primitives/Button.tsx",
  },
  {
    id: 16,
    category: "交互动效",
    title: "修正滚轮与按键翻页方向逻辑",
    problem: "上一篇与下一篇逻辑反向（向右成了上一篇）。",
    solution: "严格遵从人体工学：右键/下滚轮为“下一篇”，左键/上滚轮为“上一篇”。",
    codeRef: "src/sparx-ui/patterns/StageHeroCard.tsx",
  },
  {
    id: 17,
    category: "视觉美学",
    title: "彻底清除冗余手势提示文案",
    problem: "“按 1~5 切换模块”、“支持滚轮或 ←/→ 漫游”、“篇章 01”等说明文案破坏纯粹感。",
    solution: "彻底移除所有冗余操作说明，只保留自解释的分段导轨和数字指示。",
    codeRef: "src/sparx-ui/patterns/SegmentedRail.tsx",
  },
  {
    id: 18,
    category: "交互动效",
    title: "友链列表路由级随机洗牌",
    problem: "固定排序的友人链接对靠后博主曝光不公。",
    solution: "采用 Fisher-Yates 洗牌算法，结合路由访问键（visitKey）在每次进入时公平乱序呈现。",
    codeRef: "src/sparx-ui/patterns/StageHeroCard.tsx",
  },
  {
    id: 19,
    category: "空间拓扑",
    title: "情报流社交化重构，降低认知负荷",
    problem: "资讯页面信息密集杂乱，列表层级繁重。",
    solution: "将领域分类映射为专业博主（大模型情报所、黑客松前线等），采用社交媒体帖子流与即时搜索栏。",
    codeRef: "src/showcase/pages/scenes/DeveloperTerminalScene.tsx",
  },
  {
    id: 20,
    category: "交互动效",
    title: "平滑滚动定位与渐褪高亮脉冲",
    problem: "外部跳转时弹出的“已定位”提示框遮挡视野，滚动生硬。",
    solution: "移除弹窗，通过 scrollIntoView 实现纯视觉平滑滚动，并附加 1.5 秒高亮脉冲动画自然褪去。",
    codeRef: "src/index.css (animate-importing-pulse)",
  },
  {
    id: 21,
    category: "空间拓扑",
    title: "开放终端单屏长方形大卡化",
    problem: "终端页面信息零散，代码水平滚动轴必须滑到底部才能看到。",
    solution: "重构为单屏长方形大卡片，四大对称端点卡片，代码区支持多语言（cURL/JS/Python/Go/Rust）切换与一键复制。",
    codeRef: "src/showcase/pages/scenes/DeveloperTerminalScene.tsx",
  },
  {
    id: 22,
    category: "响应式",
    title: "全分辨率适配与移动端双层紧凑导航",
    problem: "非 4K 屏幕（1K/2K/移动端）排版崩溃，组件被挤压变形，字太小或间距丢失。",
    solution: "移动端导航重构为双层（上层品牌+极简简历文字，下层 4 等分分段触控规），主舞台自动转为单列垂直紧凑居中。",
    codeRef: "src/sparx-ui/patterns/ChannelShell.tsx",
  },
  {
    id: 23,
    category: "长文展卷",
    title: "阅读量与轻共鸣热度提升至显著位置",
    problem: "文章阅读量和读者反馈热度埋没在底部，不易被察觉。",
    solution: "在文章标题上方的头部锚点区布置醒目的热度火焰徽章（Flame Badge）与预计阅读时长组合。",
    codeRef: "src/sparx-ui/patterns/SplitMonograph.tsx",
  },
  {
    id: 24,
    category: "性能工程",
    title: "相邻卡片空闲时段静默预加载",
    problem: "用户漫游切换卡片时，未浏览的封面大图加载明显卡顿跳白。",
    solution: "利用 requestIdleCallback 实现 scheduleAdjacentPreload 算法，静默预抓取当前卡片前后 radius=1 的相邻大图。",
    codeRef: "src/sparx-ui/patterns/adjacentPreload.ts",
  },
  {
    id: 25,
    category: "性能工程",
    title: "仓库纯粹性与废弃原型彻底清理",
    problem: "多轮探索后残留大量废弃原型、死代码和失效端点，干扰架构演进。",
    solution: "彻底清理无用探索组件、遗留分支与废弃端点，保持主分支代码绝对纯粹、严密可维护。",
    codeRef: "README.md / .gitignore",
  },
];

export const GuardrailsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["全部", "视觉美学", "排印红线", "空间拓扑", "交互动效", "长文展卷", "响应式", "性能工程"];

  const filteredItems = GUARDRAIL_ITEMS.filter((item) => {
    const matchCat = selectedCategory === "全部" || item.category === selectedCategory;
    const matchQuery =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.solution.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* 头部说明 */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[#E5192D] font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>DESIGN GUARDRAILS & LESSONS · 设计规约与避坑指南</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          源自个人频道实战迭代的 25 条设计红线
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
          本页面完整沉淀了我们在 Channel 真实业务开发中用户明确反馈、深入推敲并最终解决的 25 项关键细节。
          所有规则均已在 Sparx UI v2 通用组件库中原生内建，杜绝历史问题再次复发。
        </p>
      </section>

      {/* 搜索与分类过滤器 */}
      <section className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-white/10 bg-[#08090E]">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#E5192D] text-white font-bold shadow-[0_0_10px_rgba(229,25,45,0.4)]"
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
            placeholder="检索规约关键字..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-48 sm:w-64 px-3 py-1.5 pl-8 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E5192D]/60"
          />
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2.5 pointer-events-none" />
        </div>
      </section>

      {/* 25 条规约详细列表 */}
      <section className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-[#030406] hover:border-white/20 transition-all space-y-4 shadow-xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#E5192D] bg-[#E5192D]/10 px-2 py-0.5 rounded-md border border-[#E5192D]/25">
                  #{String(item.id).padStart(2, "0")}
                </span>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="flare" mono>
                  {item.category}
                </Badge>
                <span className="text-[12px] font-mono text-zinc-500 hidden sm:inline-block">
                  {item.codeRef}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
              {/* 历史问题/陷阱 */}
              <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/20 space-y-1.5">
                <div className="flex items-center gap-1.5 text-red-400 font-mono font-bold">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>历史痛点 / 避坑提示：</span>
                </div>
                <p className="text-zinc-300">{item.problem}</p>
              </div>

              {/* 规范解决方案 */}
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Sparx v2 规范解法：</span>
                </div>
                <p className="text-zinc-200">{item.solution}</p>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="p-12 text-center text-zinc-500 font-mono text-xs">
            未检索到匹配的规约项
          </div>
        )}
      </section>
    </div>
  );
};
