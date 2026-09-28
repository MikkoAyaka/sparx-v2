import React, { useRef } from "react";
import {
  CodeBlock,
  FeedbackDock,
  SplitMonograph,
  useActiveSection,
  type MonographSection,
  type StageMediaCover,
} from "@/sparx-ui";
import type { RouteId } from "../routes";

const SECTIONS: MonographSection[] = [
  { id: "why", title: "为什么离开平台" },
  { id: "stage", title: "首页一屏只放一篇" },
  { id: "split", title: "左栏固定，右栏滚动" },
  { id: "edge", title: "在边缘节点读文章" },
  { id: "cost", title: "成本与代价" },
];

const COVERS: Record<string, StageMediaCover> = {
  why: {
    sourceUrl: "mono-why",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=85",
    title: "复古电脑与游戏机",
  },
  stage: {
    sourceUrl: "mono-stage",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=85",
    title: "绿色代码雨",
  },
  split: {
    sourceUrl: "mono-split",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85",
    title: "电路板特写",
  },
  edge: {
    sourceUrl: "mono-edge",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85",
    title: "机房里的服务器机柜",
  },
  cost: {
    sourceUrl: "mono-cost",
    imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1400&q=85",
    title: "显示器上的代码",
  },
};

const H2: React.FC<{ id: string; index: number; children: React.ReactNode }> = ({ id, index, children }) => (
  <h2 id={id} className="scroll-mt-10 mt-16 mb-6 flex items-baseline gap-4">
    <span className="font-mono text-sm font-bold text-[#E5192D]">{String(index).padStart(2, "0")}</span>
    <span className="text-2xl sm:text-3xl font-black tracking-tight text-white">{children}</span>
  </h2>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-base leading-[1.85] text-neutral-300 mb-6">{children}</p>
);

const Code: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-sm text-red-200">{children}</code>
);

/** 场景：双栏长文阅读（虚空绯红） */
export const MonographScene: React.FC<{ onNavigate: (id: RouteId) => void }> = ({ onNavigate }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const ids = SECTIONS.map((s) => s.id);
  const { activeId, progress, scrollTo } = useActiveSection(canvasRef, ids);

  return (
    <SplitMonograph
      title="摆脱被动投喂：基于边缘计算的独立出版系统实践"
      summary="我把博客从内容平台搬到了自己的边缘函数上。这篇文章记录了为什么这么做、页面怎么设计、后端怎么搭，以及这样做放弃了什么。"
      category="系统工程"
      date="2026-09-18"
      readingMinutes={7}
      cover={COVERS[activeId ?? "why"]}
      sections={SECTIONS}
      activeSectionId={activeId}
      onSectionSelect={scrollTo}
      progress={progress}
      onBack={() => onNavigate("scene-editorial")}
      backText="返回首页"
      canvasRef={canvasRef}
    >
      <p className="text-lg sm:text-xl leading-relaxed text-zinc-100 font-medium mb-10">
        在内容平台上，一篇文章能被多少人看到，取决于推荐算法；它长什么样，取决于平台的模板。写了三年之后，我决定把文章放回自己手里。</p>

      <H2 id="why" index={1}>为什么离开平台</H2>
      <P>
        平台的信息流鼓励读者不停往下刷。数据很诚实：我的文章平均阅读完成率只有 18%，而同一批文章放在独立站点上，完成率是 61%。读者不是不愿意读长文，只是信息流从来不给他们停下来的理由。</P>
      <P>
        另一个原因是格式。平台不支持代码高亮、不支持脚注，图片会被压缩到看不清电路细节。对一个写技术文章的人来说，这些都是硬伤。</P>

      <blockquote className="my-12 border-l-[3px] border-[#E5192D] pl-6 text-2xl sm:text-3xl font-black leading-snug tracking-tight text-white">
        好的阅读页面像晚上的美术馆：背景都暗下去，灯光只打在展品上。</blockquote>

      <H2 id="stage" index={2}>首页一屏只放一篇</H2>
      <P>
        首页锁定在 <Code>100dvh</Code>，页面本身不滚动。左侧 60% 是封面，向右渐变过渡到背景；右侧是超大编号、标题和摘要。读者用滚轮或方向键一篇一篇地翻，每次只需要决定一件事：读，还是下一篇。</P>
      <P>
        这样做的代价是信息密度。一屏只能放一篇文章，老读者想找某一篇旧文会更麻烦，所以底部保留了一条分段导航，并在“文章”栏目里提供完整列表。</P>

      <H2 id="split" index={3}>左栏固定，右栏滚动</H2>
      <P>
        普通文章页的标题和侧栏会随正文一起滚出屏幕，读到一半就不知道自己在哪。这里的左栏固定不动，显示封面、目录和阅读进度；右栏是唯一的滚动区域。你现在看到的左栏背景，会在读到下一节时切换成对应的图片。</P>
      <P>
        判断“读到哪一节”的规则很简单：某一节的标题越过右栏高度的 45% 时，就算进入这一节。实现只需要一个滚动监听，不依赖任何第三方库。</P>

      <H2 id="edge" index={4}>在边缘节点读文章</H2>
      <P>
        文章以 Markdown 存在仓库里。边缘函数收到请求后先查 KV 缓存，命中直接返回；未命中再读取源文件，渲染后写回缓存，过期时间一小时。</P>
      <div className="my-8">
        <CodeBlock
          filename="get-article.ts"
          status="Edge · 38ms"
          showLineNumbers
          code={`export async function getArticle(slug: string): Promise<Article> {
  const key = \`post:\${slug}\`;
  const cached = await kv.get(key);
  if (cached) return JSON.parse(cached);

  const article = await renderMarkdown(await readSource(slug));
  await kv.set(key, JSON.stringify(article), { ex: 3600 });
  return article;
}`}
        />
      </div>
      <P>
        一小时的过期时间意味着文章更新后最多一小时才会生效。对博客来说这完全可以接受；如果急着修正错别字，可以手动清除这篇文章的缓存键。</P>

      <H2 id="cost" index={5}>成本与代价</H2>
      <div className="grid grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 my-8">
        {[
          { value: "$4.2", label: "每月费用" },
          { value: "38ms", label: "首字节时间" },
          { value: "61%", label: "阅读完成率" },
        ].map((s) => (
          <div key={s.label} className="bg-[#050505] p-4 sm:p-6">
            <div className="font-mono text-2xl sm:text-4xl font-black text-[#E5192D] tracking-tight">{s.value}</div>
            <div className="text-sm text-zinc-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <P>
        钱不是问题，流量才是。离开平台后，前两个月的访问量掉了 70%，之后靠 RSS 订阅和搜索慢慢回升。如果你写作是为了被更多人看到，平台依然是更好的选择；如果你更在意读者能不能安静地读完，自己搭一个站点值得。</P>

      <div className="mt-14">
        <FeedbackDock
          options={[
            { id: "useful", label: "很有启发", emoji: "⚡", count: 42 },
            { id: "thinking", label: "引发思考", emoji: "✦", count: 28 },
            { id: "arguable", label: "值得商榷", emoji: "◈", count: 15 },
            { id: "design", label: "设计很好", emoji: "❖", count: 64 },
          ]}
        />
      </div>
    </SplitMonograph>
  );
};
