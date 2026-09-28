import React from "react";
import { clsx } from "clsx";
import { Rocket } from "lucide-react";
import { Button, CodeBlock, useSparxTheme } from "@/sparx-ui";
import { PageIntro } from "../../components/PageIntro";
import type { RouteId } from "../../routes";

const Step: React.FC<{ n: number; title: string; children: React.ReactNode }> = ({ n, title, children }) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";
  return (
    <li className="relative grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3.5rem_1fr] gap-x-3 sm:gap-x-5 pb-12 last:pb-0">
      <span
        className={clsx(
          "font-mono font-black text-2xl sm:text-3xl leading-none pt-0.5",
          isEmerald ? "text-[#059669]" : "text-[#E5192D]"
        )}
      >
        {String(n).padStart(2, "0")}
      </span>
      <div className="min-w-0 space-y-3">
        <h2 className={clsx("text-lg sm:text-xl font-bold", isEmerald ? "text-slate-900" : "text-white")}>{title}</h2>
        <div className={clsx("space-y-3 text-sm sm:text-base leading-relaxed", isEmerald ? "text-slate-600" : "text-zinc-300")}>
          {children}
        </div>
      </div>
    </li>
  );
};

const Code: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { themeId } = useSparxTheme();
  return (
    <code
      className={clsx(
        "px-1.5 py-0.5 rounded font-mono text-sm",
        themeId === "glacial-emerald" ? "bg-slate-100 text-slate-800" : "bg-white/10 text-zinc-100"
      )}
    >
      {children}
    </code>
  );
};

export const QuickStartPage: React.FC<{ onNavigate: (id: RouteId) => void }> = ({ onNavigate }) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  return (
    <div className="space-y-12">
      <PageIntro eyebrow="Quick start · 快速上手" icon={<Rocket className="w-4 h-4" />} title="五步接入 Sparx UI">
        <p>
          Sparx UI 以源码形式分发，没有 npm 包。把组件目录复制进项目，引入一份样式文件，再包一层主题 Provider 就可以使用。
        </p>
      </PageIntro>

      <ol>
        <Step n={1} title="复制源码，安装依赖">
          <p>
            把本仓库的 <Code>src/sparx-ui</Code> 目录复制到你的项目里。组件只依赖 React、clsx、lucide-react 和 Tailwind CSS v4。
          </p>
          <CodeBlock language="bash" code={`npm install clsx lucide-react\nnpm install -D tailwindcss @tailwindcss/vite`} />
        </Step>

        <Step n={2} title="引入样式">
          <p>
            在项目的主 CSS 文件里，先引入 Tailwind，再引入 Sparx UI 的样式。这份样式包含两种主题的 CSS 变量、14px 最小字号限制和几个动画。
          </p>
          <CodeBlock filename="src/index.css" language="css" code={`@import "tailwindcss";\n@import "./sparx-ui/styles.css";`} />
        </Step>

        <Step n={3} title="选择主题，包一层 Provider">
          <p>
            <Code>defaultTheme</Code> 决定首次打开时的主题。用户切换后，选择会保存在 localStorage；链接里的 <Code>?theme=</Code> 参数优先级最高。
          </p>
          <CodeBlock
            filename="src/main.tsx"
            language="tsx"
            code={`import { SparxThemeProvider } from "./sparx-ui";

root.render(
  <SparxThemeProvider defaultTheme="glacial-emerald">
    <App />
  </SparxThemeProvider>
);`}
          />
          <div
            className={clsx(
              "rounded-xl border p-4 text-sm space-y-2",
              isEmerald ? "bg-slate-50 border-slate-200" : "bg-white/[0.03] border-white/10"
            )}
          >
            <div className={clsx("font-semibold", isEmerald ? "text-slate-900" : "text-white")}>不确定选哪个主题？</div>
            <p>
              用户要在这个界面里连续工作几个小时，选 <strong>皓白极翠</strong>；页面的任务是让人记住一篇文章、一个作品或一个观点，选{" "}
              <strong>虚空绯红</strong>。
            </p>
            <button
              type="button"
              onClick={() => onNavigate("themes")}
              className={clsx("font-semibold underline underline-offset-2 cursor-pointer", isEmerald ? "text-[#059669]" : "text-[#E5192D]")}
            >
              阅读主题定位
            </button>
          </div>
        </Step>

        <Step n={4} title="使用组件">
          <p>组件会自动读取当前主题，不需要传颜色。</p>
          <CodeBlock
            filename="src/App.tsx"
            language="tsx"
            showLineNumbers
            code={`import { Button, MetricStatCard, PageHeader } from "./sparx-ui";

export function App() {
  return (
    <main className="p-8 space-y-6">
      <PageHeader title="经营看板" actions={<Button>导出报表</Button>} />
      <MetricStatCard
        title="毛利率"
        value="48.6"
        unit="%"
        delta={{ value: "+3.8%", trend: "up", label: "同比" }}
      />
    </main>
  );
}`}
          />
        </Step>

        <Step n={5} title="切换主题，或在局部固定主题">
          <p>
            <Code>useSparxTheme()</Code> 返回当前主题和切换方法。需要在一个区域里固定使用某个主题时（比如在浅色后台里嵌一张深色的发布预览卡片），用{" "}
            <Code>SparxThemeScope</Code> 包住这个区域，它不会影响页面其他部分。
          </p>
          <CodeBlock
            language="tsx"
            code={`import { SparxThemeScope, useSparxTheme } from "./sparx-ui";

function ThemeToggle() {
  const { themeId, setThemeId } = useSparxTheme();
  return (
    <button onClick={() => setThemeId(themeId === "void-flare" ? "glacial-emerald" : "void-flare")}>
      切换主题
    </button>
  );
}

<SparxThemeScope theme="void-flare">
  <LaunchPreviewCard />
</SparxThemeScope>`}
          />
        </Step>
      </ol>

      <div
        className={clsx(
          "rounded-2xl border p-6 flex flex-wrap items-center justify-between gap-4",
          isEmerald ? "bg-white border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]" : "bg-[#08090E] border-white/10"
        )}
      >
        <div className="space-y-1">
          <div className={clsx("font-bold", isEmerald ? "text-slate-900" : "text-white")}>让 AI 编码助手按规范生成界面</div>
          <p className={clsx("text-sm", isEmerald ? "text-slate-500" : "text-zinc-400")}>
            把对应主题的提示词放进 Claude、Cursor 等工具的系统提示词。
          </p>
        </div>
        <Button variant="flare" withArrow onClick={() => onNavigate("agent-prompt")}>
          获取提示词
        </Button>
      </div>
    </div>
  );
};
