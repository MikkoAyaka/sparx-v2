import React from "react";
import { Badge, useSparxTheme } from "@/sparx-ui";
import {
  FileText,
  CheckCircle2,
  XCircle,
  Sparkles,
  ShieldCheck,
  Compass,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

interface ContrastExample {
  bad: string;
  good: string;
  reason: string;
  category: string;
}

const CONTRAST_EXAMPLES: ContrastExample[] = [
  {
    category: "文章主标题",
    bad: "在断裂带重建架构秩序：高可用出版与个人频段",
    good: "摆脱被动投喂：基于边缘计算的独立出版系统实践",
    reason: "“断裂带”、“架构秩序”属于空洞的宏大叙事，让人不知所云；正例明确交代了问题背景（摆脱被动投喂）与技术手段（边缘计算、独立出版）。",
  },
  {
    category: "视觉美学阐述",
    bad: "暗房虚空视界：为什么深黑舞台能带来最高信息信噪比",
    good: "极黑舞台与横向消融：构建高沉浸度视觉界面的工程思考",
    reason: "“虚空视界”脱离物理世界；正例直接指出“极黑舞台”与“横向消融蒙版”两项具体视觉设计决策及其工程目的。",
  },
  {
    category: "大模型交互",
    bad: "智能体环境感知与推理延时边界评测：光学微共鸣与流式阻尼",
    good: "长思考链模型的等待体验：如何用微交互缓解 5 秒以上的推理延时",
    reason: "“光学微共鸣”、“流式阻尼”为生造词，制造虚假专业壁垒；正例直击长推理模型的痛点（5秒以上延时）与界面微交互解法。",
  },
  {
    category: "微反馈协议",
    bad: "从单向广播到读者轻共鸣：微反馈的协议化落地在虚空留痕",
    good: "去中心化的微反馈设计：基于 Upstash Redis 的无状态点赞方案",
    reason: "“在虚空留痕”带有无病呻吟的科幻感；正例清晰说明了无状态设计思想与技术选型（Upstash Redis）。",
  },
  {
    category: "接口端点描述",
    bad: "技术情报流多源事件总线与大模型分析快照",
    good: "文章聚合指标快照：全量阅读统计与共鸣分布汇总",
    reason: "“技术情报流”、“多源事件总线”过于虚浮且过度定义场景；正例如实陈述接口输出的数据实体与用途。",
  },
  {
    category: "按钮与交互",
    bad: "启动认知脉冲 / 宣誓认知主权",
    good: "阅读全文 / 复制提示词 / 订阅源",
    reason: "交互控件的核心是行动预期明确，杜绝将功能按钮包装为伪哲学口号。",
  },
  {
    category: "状态与异常提示",
    bad: "引力锚点失效，神经元链路断开",
    good: "网络请求超时，已启用本地离线缓存（30 秒后重试）",
    reason: "状态提示必须告知用户“发生了什么”与“如何恢复”，禁止用架空科幻词汇掩盖真实系统状态。",
  },
  {
    category: "关于与理念",
    bad: "以绝对虚空黑阶与高压激光脉冲，重构严肃创作者的展卷剧场",
    good: "以 100dvh 视口锁定与清晰排印红线，为深度读者提供无干扰的纯净展卷",
    reason: "“高压激光脉冲”过于中二且刺眼；正例强调真实体验：视口控制、排印红线、无干扰阅读。",
  },
];

export const CopywritingGuidePage: React.FC = () => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  return (
    <div className="w-full min-w-0 max-w-5xl mx-auto space-y-12 pb-16">
      {/* 页首介绍 */}
      <section
        className={`relative rounded-3xl border p-8 sm:p-12 overflow-hidden transition-colors duration-200 ${
          isEmerald
            ? "bg-white border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
            : "bg-[#030406] border-white/10 shadow-sm"
        }`}
      >
        <div
          className={`absolute inset-0 pointer-events-none ${
            isEmerald
              ? "bg-[radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.08),transparent_50%),linear-gradient(135deg,rgb(248,250,252),rgb(255,255,255))]"
              : "bg-[radial-gradient(circle_at_70%_20%,rgba(229,25,45,0.12),transparent_50%),linear-gradient(135deg,rgb(14,15,22),rgb(3,4,6))]"
          }`}
        />

        <div className="relative z-10 space-y-6 max-w-3xl">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isEmerald ? "bg-[#059669]" : "bg-[#E5192D]"
              }`}
            />
            <span
              className={`text-xs font-mono tracking-widest font-bold uppercase ${
                isEmerald ? "text-[#059669]" : "text-[#E5192D]"
              }`}
            >
              COPYWRITING GUIDE · 文案规范
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${
              isEmerald ? "text-slate-900" : "text-white"
            }`}
          >
            文案规范
          </h1>

          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isEmerald ? "text-slate-600" : "text-zinc-300"
            }`}
          >
            界面好不好用，文字和像素、间距一样重要。
            Sparx UI v2 的文案不用空洞的科幻词，也不用拼凑出来的生僻词，而是追求<strong>真实、具体、克制、有温度</strong>：读者读完就知道发生了什么、接下来该做什么。
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Badge variant={isEmerald ? "emerald" : "flare"}>真实具体</Badge>
            <Badge variant="outline">不用伪哲学术语</Badge>
            <Badge variant="outline">中英文混排规范</Badge>
            <Badge variant="outline">两种主题的语气</Badge>
          </div>
        </div>
      </section>

      {/* 四条基本原则 */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className={`w-4 h-4 ${isEmerald ? "text-[#059669]" : "text-[#E5192D]"}`} />
          <h2
            className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isEmerald ? "text-slate-900" : "text-white"
            }`}
          >
            四条基本原则
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            className={`p-6 rounded-2xl border space-y-3 transition-colors duration-200 ${
              isEmerald
                ? "bg-white border-slate-200 text-slate-800 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                : "bg-[#08090E] border-white/10 text-white shadow-sm"
            }`}
          >
            <div className="flex items-center gap-2.5 text-sm font-bold">
              <span
                className={`p-1.5 rounded-lg border ${
                  isEmerald
                    ? "bg-emerald-50 border-emerald-200 text-[#059669]"
                    : "bg-white/5 border-white/10 text-[#E5192D]"
                }`}
              >
                <Compass className="w-4 h-4" />
              </span>
              <span className={isEmerald ? "text-slate-900" : "text-white"}>
                1. 真实（Authentic）
              </span>
            </div>
            <p className={`text-sm sm:text-base leading-relaxed ${isEmerald ? "text-slate-600" : "text-zinc-400"}`}>
              内容必须立足于真实的人类工程实践与生活观察。个人频道的文章能打动读者，是因为讨论的是具体的“MC 游戏机制吐槽”、“螺丝刀与教育流水线寓言”、“清晰字号渲染”。不使用看起来高深、实际空洞的词。
            </p>
          </div>

          <div
            className={`p-6 rounded-2xl border space-y-3 transition-colors duration-200 ${
              isEmerald
                ? "bg-white border-slate-200 text-slate-800 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                : "bg-[#08090E] border-white/10 text-white shadow-sm"
            }`}
          >
            <div className="flex items-center gap-2.5 text-sm font-bold">
              <span
                className={`p-1.5 rounded-lg border ${
                  isEmerald
                    ? "bg-teal-50 border-teal-200 text-[#0D9488]"
                    : "bg-white/5 border-white/10 text-teal-400"
                }`}
              >
                <FileText className="w-4 h-4" />
              </span>
              <span className={isEmerald ? "text-slate-900" : "text-white"}>
                2. 具体（Concrete）
              </span>
            </div>
            <p className={`text-sm sm:text-base leading-relaxed ${isEmerald ? "text-slate-600" : "text-zinc-400"}`}>
              使用准确的技术实体与物理量代替模糊概括。写“Upstash Redis 原子递增”而不是“微共鸣在虚空留痕”；写“100dvh 视口锁定与 60% 渐变横向消融”而不是“无界暗房虚空视界”。写得具体，才经得起推敲。
            </p>
          </div>

          <div
            className={`p-6 rounded-2xl border space-y-3 transition-colors duration-200 ${
              isEmerald
                ? "bg-white border-slate-200 text-slate-800 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                : "bg-[#08090E] border-white/10 text-white shadow-sm"
            }`}
          >
            <div className="flex items-center gap-2.5 text-sm font-bold">
              <span
                className={`p-1.5 rounded-lg border ${
                  isEmerald
                    ? "bg-amber-50 border-amber-200 text-[#D97706]"
                    : "bg-white/5 border-white/10 text-[#E5192D]"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
              </span>
              <span className={isEmerald ? "text-slate-900" : "text-white"}>
                3. 克制（Restrained）
              </span>
            </div>
            <p className={`text-sm sm:text-base leading-relaxed ${isEmerald ? "text-slate-600" : "text-zinc-400"}`}>
              不讨好读者，不做营销吹嘘，不滥用感叹号。不追网络热梗，不堆砌形容词。删掉不起作用的字，读者才能更快抓住重点。
            </p>
          </div>

          <div
            className={`p-6 rounded-2xl border space-y-3 transition-colors duration-200 ${
              isEmerald
                ? "bg-white border-slate-200 text-slate-800 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                : "bg-[#08090E] border-white/10 text-white shadow-sm"
            }`}
          >
            <div className="flex items-center gap-2.5 text-sm font-bold">
              <span
                className={`p-1.5 rounded-lg border ${
                  isEmerald
                    ? "bg-rose-50 border-rose-200 text-[#E11D48]"
                    : "bg-white/5 border-white/10 text-rose-400"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
              </span>
              <span className={isEmerald ? "text-slate-900" : "text-white"}>
                4. 有温度（Empathetic）
              </span>
            </div>
            <p className={`text-sm sm:text-base leading-relaxed ${isEmerald ? "text-slate-600" : "text-zinc-400"}`}>
              考虑读者的阅读负担，从读者的实际处境出发解释技术取舍。把枯燥的技术指标讲成读者能理解的判断，保留作者自己的思考和语气，而不是读起来像机器生成的文字。
            </p>
          </div>
        </div>
      </section>

      {/* 反例与正例对比库 */}
      <section className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-1">
            <h2
              className={`text-xl sm:text-2xl font-bold tracking-tight ${
                isEmerald ? "text-slate-900" : "text-white"
              }`}
            >
              反例与正例（Bad vs Good）
            </h2>
            <p className={`text-sm ${isEmerald ? "text-slate-500" : "text-zinc-400"}`}>
              常见的空洞写法和改写后的版本。修改全站文案时，以这些例子为准
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {CONTRAST_EXAMPLES.map((item, index) => (
            <div
              key={index}
              className={`p-5 rounded-2xl border transition-all space-y-3 ${
                isEmerald
                  ? "bg-white border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                  : "bg-[#08090E] border-white/10 shadow-md"
              }`}
            >
              <div className="flex items-center justify-between gap-2 border-b pb-2">
                <span
                  className={`text-sm font-mono font-bold px-3 py-1 rounded-md border ${
                    isEmerald
                      ? "bg-slate-100 border-slate-200 text-slate-700"
                      : "bg-white/5 border-white/10 text-zinc-300"
                  }`}
                >
                  {item.category}
                </span>
                <span className="text-sm font-mono text-zinc-500">
                  CASE #{index + 1}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {/* 反例 */}
                <div
                  className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 ${
                    isEmerald
                      ? "bg-slate-50/70 border-slate-200 text-slate-800"
                      : "bg-white/[0.02] border-white/10 text-zinc-200"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="text-sm font-mono font-bold text-rose-600">
                        反例
                      </div>
                      <div className="text-sm font-semibold">{item.bad}</div>
                    </div>
                  </div>
                </div>

                {/* 正例 */}
                <div
                  className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 ${
                    isEmerald
                      ? "bg-slate-50/70 border-slate-200 text-slate-800"
                      : "bg-white/[0.02] border-white/10 text-zinc-200"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="text-sm font-mono font-bold text-emerald-600">
                        正例
                      </div>
                      <div className="text-sm font-semibold">{item.good}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 原因 */}
              <div
                className={`text-sm pt-2 flex items-start gap-2 ${
                  isEmerald ? "text-slate-600" : "text-zinc-400"
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-500" />
                <span>
                  <strong>原因：</strong>
                  {item.reason}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 标题与摘要的写法 */}
      <section
        className={`p-6 sm:p-8 rounded-2xl border space-y-6 transition-colors duration-200 ${
          isEmerald ? "bg-white border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]" : "bg-[#08090E] border-white/10"
        }`}
      >
        <div className="space-y-1">
          <h3
            className={`text-lg font-bold tracking-tight ${
              isEmerald ? "text-slate-900" : "text-white"
            }`}
          >
            标题与摘要的写法
          </h3>
          <p className={`text-sm ${isEmerald ? "text-slate-500" : "text-zinc-400"}`}>
            读者只看标题和摘要，就应该知道这篇文章讲什么
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <h4
              className={`text-sm font-mono font-bold uppercase tracking-wider ${
                isEmerald ? "text-[#059669]" : "text-[#E5192D]"
              }`}
            >
              文章标题的结构
            </h4>
            <div
              className={`p-4 rounded-xl border text-sm leading-relaxed space-y-2 ${
                isEmerald ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/10"
              }`}
            >
              <div className="font-bold text-sm">
                [核心矛盾 / 现实痛点] + [冒号 / 破折号] + [具体解法与工程实践]
              </div>
              <p className={isEmerald ? "text-slate-600" : "text-zinc-400"}>
                示例：<em>“摆脱被动投喂：基于边缘计算的独立出版系统实践”</em>
                <br />
                反例：<em>“在断裂带重建架构秩序”</em>（无痛点、无具体解法）。
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4
              className={`text-sm font-mono font-bold uppercase tracking-wider ${
                isEmerald ? "text-[#059669]" : "text-[#E5192D]"
              }`}
            >
              文章摘要的结构（80~120 字）
            </h4>
            <div
              className={`p-4 rounded-xl border text-sm leading-relaxed space-y-2 ${
                isEmerald ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/10"
              }`}
            >
              <div className="font-bold text-sm">
                [现状问题] + [技术选型与关键原语] + [可达成的真实效果与权衡]
              </div>
              <p className={isEmerald ? "text-slate-600" : "text-zinc-400"}>
                示例：<em>“当我们建立独立内容站点时，核心目标是摆脱公域算法的流量分配与格式审查。本文探讨如何基于边缘函数、静态 Markdown 与无状态缓存，构建一个轻量、可靠且永久受控的个人发布系统。”</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 两种主题的语气 */}
      <section
        className={`p-6 sm:p-8 rounded-2xl border space-y-6 transition-colors duration-200 ${
          isEmerald ? "bg-white border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]" : "bg-[#08090E] border-white/10"
        }`}
      >
        <div className="space-y-1">
          <h3
            className={`text-lg font-bold tracking-tight ${
              isEmerald ? "text-slate-900" : "text-white"
            }`}
          >
            两种主题的语气（Tone）
          </h3>
          <p className={`text-sm ${isEmerald ? "text-slate-500" : "text-zinc-400"}`}>
            个人站点和企业应用面对的读者不同，语气也不同
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            className={`p-5 rounded-xl border space-y-3 ${
              isEmerald ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/10"
            }`}
          >
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-[#E5192D]">
              <span>✦</span>
              <span>虚空绯红 · 个人站点</span>
            </div>
            <ul className={`text-sm space-y-2.5 ${isEmerald ? "text-slate-700" : "text-zinc-300"}`}>
              <li>• <strong>第一人称与个性观点：</strong>可以用“我”或“我们”，直接表达观点，也可以指出主流做法的问题。</li>
              <li>• <strong>生活与游戏隐喻：</strong>用生活里的比喻（如 Minecraft 战斗机制、超市货架、螺丝刀）解释抽象的技术问题。</li>
              <li>• <strong>观点鲜明，但不轻浮：</strong>批评要有工程上的理由，不是单纯发泄情绪。</li>
            </ul>
          </div>

          <div
            className={`p-5 rounded-xl border space-y-3 ${
              isEmerald ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/10"
            }`}
          >
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-[#059669]">
              <span>◈</span>
              <span>皓白极翠 · 企业应用</span>
            </div>
            <ul className={`text-sm space-y-2.5 ${isEmerald ? "text-slate-700" : "text-zinc-300"}`}>
              <li>• <strong>客观第三人称陈述：</strong>以系统、服务、用户和边界条件为主语，陈述可以核实的事实。</li>
              <li>• <strong>可量化指标优先：</strong>写明 QPS、P99 延时、缓存命中率和故障恢复步骤，让读者照着就能操作。</li>
              <li>• <strong>不用营销腔：</strong>不使用“颠覆性”、“最强”、“革命性”这类空洞的修饰词，技术文档才能长期让人信任。</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 排版细节 */}
      <section
        className={`p-6 sm:p-8 rounded-2xl border space-y-4 transition-colors duration-200 ${
          isEmerald ? "bg-white border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]" : "bg-[#08090E] border-white/10"
        }`}
      >
        <h3
          className={`text-base font-bold flex items-center gap-2 font-mono ${
            isEmerald ? "text-slate-900" : "text-white"
          }`}
        >
          <span className={isEmerald ? "text-[#059669]" : "text-[#E5192D]"}>#</span>
          <span>排版细节</span>
        </h3>

        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm ${isEmerald ? "text-slate-700" : "text-zinc-300"}`}>
          <div className={`space-y-1 p-3 rounded-lg border ${isEmerald ? "border-slate-200 bg-slate-50/60" : "border-white/10 bg-white/[0.02]"}`}>
            <div className="font-bold">1. 盘古之白（中英文空格）</div>
            <p className={isEmerald ? "text-slate-500" : "text-zinc-400"}>
              中文与英文、数字之间加一个半角空格，例如：<code>Redis 缓存</code>、<code>100dvh 视口</code>。
            </p>
          </div>

          <div className={`space-y-1 p-3 rounded-lg border ${isEmerald ? "border-slate-200 bg-slate-50/60" : "border-white/10 bg-white/[0.02]"}`}>
            <div className="font-bold">2. 标点符号规范</div>
            <p className={isEmerald ? "text-slate-500" : "text-zinc-400"}>
              中文正文使用全角标点（，。！？：）；代码、API 路径和英文正文使用半角标点。
            </p>
          </div>

          <div className={`space-y-1 p-3 rounded-lg border ${isEmerald ? "border-slate-200 bg-slate-50/60" : "border-white/10 bg-white/[0.02]"}`}>
            <div className="font-bold">3. 不使用全角英文和数字</div>
            <p className={isEmerald ? "text-slate-500" : "text-zinc-400"}>
              不要使用 <code>ＡＰＩ</code> 或 <code>１２ｐｘ</code> 等全角英文和数字，统一使用半角 ASCII 字符。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
