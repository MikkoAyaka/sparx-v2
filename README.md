# Sparx UI v2 · 界面系统与 Agent 提示词规范

> 基于 **Mikko Ayaka 个人频道（Channel · channel.mikkoayaka.com）**精心打磨的深黑出版设计系统、通用源码组件库与面向 Agent 的高信号提示词规范。

---

## 🌟 设计起源与核心美学（Design Origin & Philosophy）

Sparx UI v2 源自对个人主权出版产品（Channel）视觉风格的极致凝练。彻底摆脱大众化灰底与粗暴垂直长卷的廉价感，在深黑暗房中为严肃创作者构筑兼具信息密度与仪式感的展卷剧场。

- **极深虚空与绯红激光 (Void & Flare Spectrum)**：视口画布底色 `#020204`、舞台底层 `#030406`、展卷正文 `#050505`，以高压激光绯红 `#E5192D` / `#FF2D55` 配合光学辉光阴影（`shadow-[0_0_16px_rgba(229,25,45,0.45)]`）提供主权强调。
- **不可逾越的排印红线 (Strict Typographic Guardrails)**：
  1. **全站最小渲染字号强制 ≥ 12px**（杜绝微小碎字）。
  2. **全站严格禁止衬线体（Serif）**，标题使用 `Space Grotesk`，正文使用出版级舒缓排印（15px leading-[1.85] text-neutral-300），元数据与代码使用 `IBM Plex Mono`。
- **100dvh 视口锁定大舞台 (Viewport-Locked Horizon Stage)**：主页探索采用居中 100dvh 大舞台，左侧 60% 画幅媒体通过渐变蒙版平滑消融进 `#030406`，结合阻尼滚轮漫游（Wheel Deceleration）与多列分段指示导轨。
- **双轨解耦长文排版 (Split Monograph)**：左侧 35% 固定环境脊柱（严禁滚动，随阅读焦点动态融变） + 右侧 65% 无界排版画布（唯一正文滚动流）。

> **关于与 Sparx-v1 的关系**：本仓库参考了 [Sparx-v1](https://ui.mikkoayaka.com/) 规范化的组件库组织形式（原语 Primitives / 模式 Patterns / 沉浸式场景 Examples / 属性试验场），但**完全杜绝受其旧版美术风格的影响**，全面继承并升华了 Channel 的暗房舞台与激光发光美学。

---

## 🤖 面向 AI Agent 的标准化设计系统提示词 (Agent Prompt)

本仓库特别提炼了一份精炼、高专业术语密度、可直接置入 Claude、ChatGPT、DeepSeek、Antigravity、Cursor 等 AI 编码助手的 System Prompt。

详见根目录下独立文档：[`AGENT_PROMPT.md`](./AGENT_PROMPT.md)，或直接调用源码导出：

```typescript
import { SPARX_V2_AGENT_PROMPT_ZH, SPARX_V2_AGENT_PROMPT_EN, getAgentPrompt } from "@/sparx-ui";

// 在你的 Agent 工具链或程序中获取提示词
const prompt = getAgentPrompt("zh");
```

---

## 📦 UI / UX 通用库源码结构 (`src/sparx-ui/`)

所有组件均为纯 TypeScript + React 19 + Tailwind CSS 实现，以源码形式直接共享，无黑盒打包阻碍：

```
src/sparx-ui/
├── index.ts                # 统一聚合导出
├── tokens/                 # 设计令牌常量
│   ├── colors.ts           # Void Spectrum, Flare Core, Semantic 色系
│   ├── typography.ts       # 字体栈定义、字阶与 >=12px 底线
│   └── motion.ts           # 700ms 平滑融变曲线与动效时长
├── primitives/             # 基础交互原语
│   ├── Button.tsx          # 绯红激光、幽灵、毛玻璃等形态，带 hover 箭头动效
│   ├── Badge.tsx           # 状态胶囊、分类徽标、等宽元数据标签
│   ├── Tag.tsx             # 文章标签、主题 Chip
│   ├── StatusDot.tsx       # 绯红/青色/翠绿/琥珀发光状态点
│   ├── ReadingGauge.tsx    # 动态 SVG 环形阅读节奏刻度规
│   ├── PillDock.tsx        # 悬浮毛玻璃胶囊导航槽
│   ├── GlassCard.tsx       # 暗房毛玻璃卡片（双层细边框与悬浮景深）
│   └── CodeBlock.tsx       # 高信号代码终端窗口（带复制反馈与语法着色容器）
├── atmosphere/             # 环境光影与媒体原语
│   ├── KeywordAtmosphere.tsx # 算法排版关键词散布暗房云图
│   ├── StageMediaSpine.tsx   # 700ms 丝滑过渡无黑屏媒体脊柱
│   ├── AmbientDissolveMask.tsx# 60% 横向消融渐变蒙版
│   ├── VideoTitleCard.tsx    # 视频封面海报徽标卡片
│   └── GridPattern.tsx       # 40px 经典暗房网格背景
└── patterns/               # 复合场景模式
    ├── ChannelShell.tsx    # 100dvh 视口锁定全局外壳与双端自适应顶栏
    ├── StageHeroCard.tsx   # 主舞台大卡片（消融大图、阅读规、导轨）
    ├── SplitMonograph.tsx  # 双轨解耦展卷阅读视图（35% 脊柱 + 65% 画布）
    ├── FeedbackDock.tsx    # 读者轻共鸣/微反馈胶囊互动坞（乐观计数器）
    └── SegmentedRail.tsx   # 底部标尺导轨与键盘/滚轮步进控制器
```

---

## 🚀 启动 Web 演示项目

```bash
# 1. 安装依赖
npm install

# 2. 启动本地开发服务 (默认端口 3043)
npm run dev

# 3. 类型检查与生产构建
npm run lint
npm run build
```

访问 `http://localhost:3043` 即可浏览：
1. **概览**：设计系统理念与规范溯源
2. **Agent 提示词**：一键复制中英文 Agent System Prompt 与 Token 矩阵可视化
3. **基础原语**：Button、Badge、ReadingGauge、StatusDot、CodeBlock 实时属性调节
4. **环境氛围**：StageMediaSpine 700ms 融变、KeywordAtmosphere 散布云图试验场
5. **复合模式**：ChannelShell、FeedbackDock、SegmentedRail 交互调试
6. **沉浸式场景**：100dvh 主舞台漫游、双轨展卷长文、开放终端真实运行模拟
