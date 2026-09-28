# Sparx UI v2 · 设计系统与 Agent 提示词

> 从 Mikko Ayaka 个人频道（[channel.mikkoayaka.com](https://channel.mikkoayaka.com)）提炼的设计规范、React 组件库，以及可以直接交给 AI 编码助手的提示词。
>
> 在线演示（GitHub Pages）：[https://mikkoayaka.github.io/sparx-v2/](https://mikkoayaka.github.io/sparx-v2/)

---

## 一套规范，两种主题

两种主题共用同一套组件和规则，区别在于它们要解决的问题。

| | ✦ 虚空绯红（void-flare） | ◈ 皓白极翠（glacial-emerald） |
| :--- | :--- | :--- |
| 定位 | 激进、大胆、前卫 | 稳定、克制、规范 |
| 适合 | 个人站点、独立出版、作品集、发布页、开发者工具、AI 实验产品 | 企业中后台、审批与工单、数据看板、知识库、设置页 |
| 底色 / 强调色 | 接近纯黑 `#020204` / 绯红 `#E5192D` | 浅灰白 `#F8FAFC` / 翡翠绿 `#059669` |
| 版式 | 一屏一个重点，超大标题，全幅媒体 | 固定侧栏与网格，每页结构相同 |
| 层级 | 明暗对比与轻微发光 | 1px 边框，阴影几乎看不见 |

两种主题都遵守的规则：最小字号 14px，不使用衬线体，文案真实具体（见站点中的“设计规则”和“文案规范”）。

---

## 快速上手

组件以源码形式分发，没有 npm 包。

1. 把 `src/sparx-ui` 复制到你的项目，安装依赖：

   ```bash
   npm install clsx lucide-react
   npm install -D tailwindcss @tailwindcss/vite
   ```

2. 在主 CSS 中引入样式：

   ```css
   @import "tailwindcss";
   @import "./sparx-ui/styles.css";
   ```

3. 包一层主题 Provider，然后直接使用组件：

   ```tsx
   import { SparxThemeProvider, PageHeader, Button } from "./sparx-ui";

   <SparxThemeProvider defaultTheme="glacial-emerald">
     <PageHeader title="经营看板" actions={<Button>导出报表</Button>} />
   </SparxThemeProvider>
   ```

需要在某个区域固定使用另一种主题时，用 `SparxThemeScope` 包住它，不会影响页面其他部分。

---

## Agent 提示词

每种主题各有中英文两份提示词，见 [`AGENT_PROMPT.md`](./AGENT_PROMPT.md)，也可以从源码获取：

```typescript
import { getAgentPrompt } from "./sparx-ui";

const prompt = getAgentPrompt("glacial-emerald", "zh"); // 主题, 语言
```

---

## 源码结构（`src/sparx-ui/`）

```
src/sparx-ui/
├── index.ts                 # 统一导出
├── styles.css               # 两种主题的 CSS 变量、14px 字号下限、动画
├── tokens/                  # colors（主题、Provider、SparxThemeScope）、typography、motion
├── primitives/              # 基础组件
│   ├── Button · Select · Badge · Tag · StatusDot · PillDock
│   ├── GlassCard · CodeBlock · ReadingGauge
│   └── MetricStatCard · DataTable · TelemetryGauge
├── atmosphere/              # 背景与媒体：StageMediaSpine、AmbientDissolveMask、KeywordAtmosphere、VideoTitleCard、GridPattern
├── patterns/                # 复合模式
│   ├── 出版与表达（推荐虚空绯红）
│   │   SiteMasthead · StageHeroCard · SegmentedRail · SplitMonograph · useActiveSection
│   │   FeedbackDock · AgentThoughtChain · AgentCollaborationBoard · adjacentPreload
│   └── 企业应用（推荐皓白极翠）
│       AppShell · PageHeader · FilterBar · DescriptionList · ActivityTimeline · WorkflowPipeline · EmptyState
└── prompt/agentPrompt.ts    # Agent 提示词
```

---

## 本地运行

```bash
npm install
npm run dev      # http://localhost:3043
npm run lint     # 类型检查
npm run build    # 生产构建
```

展示站点分为四个部分：

1. **开始使用**：概览、快速上手、Agent 提示词
2. **设计规范**：主题定位、色彩、排版、层级与动效、设计规则、文案规范
3. **组件**：基础组件、数据组件、背景与媒体、出版与表达模式、企业应用模式
4. **场景**：六个完整页面，每个场景锁定在它的目标主题上
   - 虚空绯红：出版首页、长文阅读、Agent 实验室
   - 皓白极翠：经营看板、审批中心、开发者文档

旧版的 `?nav=` 链接会自动跳转到新页面。

> **与 Sparx-v1 的关系**：组件库的组织方式参考了 [Sparx-v1](https://ui.mikkoayaka.com/)，视觉风格没有沿用，而是来自 Channel 原站；企业用的浅色主题是在此基础上新增的。
