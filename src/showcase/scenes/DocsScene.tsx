import React, { useRef, useState } from "react";
import { clsx } from "clsx";
import { ExternalLink, Search } from "lucide-react";
import {
  CodeBlock,
  DataTable,
  FeedbackDock,
  PageHeader,
  PillDock,
  Select,
  useActiveSection,
  type DataTableColumn,
} from "@/sparx-ui";

const BASE = "https://channel.mikkoayaka.com";

type Method = "GET" | "POST";
type Lang = "curl" | "javascript" | "python";

interface Param {
  name: string;
  in: "query" | "body";
  type: string;
  required: boolean;
  desc: string;
}

interface ApiError {
  code: number;
  meaning: string;
  fix: string;
}

interface Endpoint {
  id: string;
  group: string;
  title: string;
  method: Method;
  path: string;
  summary: string;
  cache: string;
  params: Param[];
  sample: Record<string, string | number>;
  response: string;
  responseLang: string;
  errors: ApiError[];
}

const RATE_LIMIT_ERROR: ApiError = {
  code: 429,
  meaning: "请求过于频繁",
  fix: "等待响应头 Retry-After 给出的秒数后重试。",
};

const ENDPOINTS: Endpoint[] = [
  {
    id: "feed",
    group: "内容",
    title: "获取文章列表",
    method: "GET",
    path: "/feed.json",
    summary: "按发布时间倒序返回已发布文章的标题、摘要、链接和发布时间，格式为 JSON Feed 1.1。",
    cache: "边缘缓存 60 秒",
    params: [
      { name: "limit", in: "query", type: "integer", required: false, desc: "返回的文章数，默认 20，最大 100。" },
      { name: "before", in: "query", type: "string", required: false, desc: "只返回这一天之前发布的文章，格式 YYYY-MM-DD，用于翻页。" },
    ],
    sample: { limit: 2 },
    responseLang: "json",
    response: `{
  "version": "https://jsonfeed.org/version/1.1",
  "title": "Mikko Ayaka",
  "items": [
    {
      "id": "edge-publishing",
      "url": "${BASE}/posts/edge-publishing",
      "title": "摆脱被动投喂：基于边缘计算的独立出版系统实践",
      "date_published": "2026-09-18T08:00:00Z"
    }
  ]
}`,
    errors: [
      { code: 400, meaning: "参数格式错误", fix: "检查 before 是否为 YYYY-MM-DD，limit 是否在 1 到 100 之间。" },
      RATE_LIMIT_ERROR,
    ],
  },
  {
    id: "rss",
    group: "内容",
    title: "订阅源",
    method: "GET",
    path: "/rss.xml",
    summary: "标准 RSS 2.0 订阅源，可直接填进阅读器。需要 Atom 格式时传 format=atom。",
    cache: "边缘缓存 10 分钟",
    params: [{ name: "format", in: "query", type: '"rss" | "atom"', required: false, desc: "订阅源格式，默认 rss。" }],
    sample: { format: "atom" },
    responseLang: "xml",
    response: `<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Mikko Ayaka</title>
  <entry>
    <title>摆脱被动投喂：基于边缘计算的独立出版系统实践</title>
    <link href="${BASE}/posts/edge-publishing"/>
    <updated>2026-09-18T08:00:00Z</updated>
  </entry>
</feed>`,
    errors: [{ code: 400, meaning: "不支持的格式", fix: "format 只能是 rss 或 atom。" }, RATE_LIMIT_ERROR],
  },
  {
    id: "feedback",
    group: "互动",
    title: "提交读者反馈",
    method: "POST",
    path: "/api/channel-feedback",
    summary: "记录读者对一篇文章的反应。同一凭据改选时，旧选项的计数会减一。服务端只保存凭据的哈希，不保存 IP。",
    cache: "不缓存",
    params: [
      { name: "slug", in: "body", type: "string", required: true, desc: "文章标识，与 feed.json 中的 id 相同。" },
      {
        name: "reactionId",
        in: "body",
        type: '"insightful" | "inspiring" | "arguable" | "aesthetic"',
        required: true,
        desc: "读者选择的反应。",
      },
      { name: "token", in: "body", type: "string", required: true, desc: "匿名凭据，页面首次加载时在浏览器中生成。" },
    ],
    sample: { slug: "edge-publishing", reactionId: "insightful", token: "anon_7f3a9c" },
    responseLang: "json",
    response: `{
  "ok": true,
  "counts": { "insightful": 43, "inspiring": 28, "arguable": 15, "aesthetic": 64 }
}`,
    errors: [
      { code: 400, meaning: "未知的反应类型", fix: "reactionId 使用参数表中列出的四个值之一。" },
      { code: 404, meaning: "文章不存在", fix: "确认 slug 与 feed.json 中的 id 一致。" },
      { code: 429, meaning: "请求过于频繁", fix: "同一凭据每分钟最多提交 60 次，等待 Retry-After 秒后重试。" },
    ],
  },
  {
    id: "stats",
    group: "互动",
    title: "获取文章指标",
    method: "GET",
    path: "/api/channel-stats",
    summary: "返回阅读量、阅读完成率和各类反应的数量。不传 slug 时返回全站汇总。",
    cache: "边缘缓存 5 分钟",
    params: [{ name: "slug", in: "query", type: "string", required: false, desc: "只返回这一篇文章的指标。" }],
    sample: { slug: "edge-publishing" },
    responseLang: "json",
    response: `{
  "slug": "edge-publishing",
  "views": 18240,
  "completionRate": 0.61,
  "reactions": { "insightful": 43, "inspiring": 28, "arguable": 15, "aesthetic": 64 }
}`,
    errors: [{ code: 404, meaning: "文章不存在", fix: "确认 slug 与 feed.json 中的 id 一致。" }, RATE_LIMIT_ERROR],
  },
];

const example = (ep: Endpoint, lang: Lang): string => {
  const qs = new URLSearchParams(Object.entries(ep.sample).map(([k, v]) => [k, String(v)])).toString();
  const url = ep.method === "GET" ? `${BASE}${ep.path}${qs ? `?${qs}` : ""}` : `${BASE}${ep.path}`;
  const body = JSON.stringify(ep.sample);
  if (lang === "curl") {
    return ep.method === "GET"
      ? `curl -s "${url}"`
      : `curl -X POST "${url}" \\\n  -H "Content-Type: application/json" \\\n  -d '${body}'`;
  }
  if (lang === "javascript") {
    return ep.method === "GET"
      ? `const res = await fetch("${url}");\nif (!res.ok) throw new Error(\`请求失败：\${res.status}\`);\nconst data = await res.${ep.responseLang === "xml" ? "text" : "json"}();`
      : `const res = await fetch("${url}", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify(${body}),\n});\nconst data = await res.json();`;
  }
  return ep.method === "GET"
    ? `from urllib.request import urlopen\n\nwith urlopen("${url}") as res:\n    data = res.read().decode("utf-8")`
    : `import json\nfrom urllib.request import Request, urlopen\n\nreq = Request(\n    "${url}",\n    data=json.dumps(${body}).encode(),\n    headers={"Content-Type": "application/json"},\n)\nwith urlopen(req) as res:\n    data = json.load(res)`;
};

const MethodTag: React.FC<{ method: Method; size?: "sm" | "md" }> = ({ method, size = "md" }) => (
  <span
    className={clsx(
      "font-mono font-bold rounded border shrink-0",
      size === "sm" ? "text-xs px-1.5" : "text-sm px-2 py-0.5",
      method === "GET" ? "bg-teal-50 border-teal-200 text-teal-700" : "bg-amber-50 border-amber-200 text-amber-700"
    )}
  >
    {method}
  </span>
);

const SECTION_IDS = ["request", "examples", "response", "errors"];
const SECTION_TITLES: Record<string, string> = { request: "请求参数", examples: "调用示例", response: "响应示例", errors: "错误码" };

const H2: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => (
  <h2 id={id} className="scroll-mt-6 text-lg font-bold text-slate-900 pt-10 pb-4">
    {children}
  </h2>
);

/** 场景：开发者文档（皓白极翠） */
export const DocsScene: React.FC = () => {
  const [epId, setEpId] = useState(ENDPOINTS[0].id);
  const [lang, setLang] = useState<Lang>("curl");
  const [version, setVersion] = useState("v2");
  const contentRef = useRef<HTMLDivElement>(null);
  const { activeId, scrollTo } = useActiveSection(contentRef, SECTION_IDS, 0.3);

  const ep = ENDPOINTS.find((e) => e.id === epId)!;

  const open = (id: string) => {
    setEpId(id);
    contentRef.current?.scrollTo({ top: 0 });
  };

  const paramColumns: DataTableColumn<Param & { id: string }>[] = [
    {
      key: "name",
      header: "参数",
      render: (p) => (
        <div className="space-y-0.5">
          <div className="font-mono font-semibold text-slate-900 whitespace-nowrap">{p.name}</div>
          <div className="text-sm text-slate-400 whitespace-nowrap">{p.in === "query" ? "查询参数" : "请求体"}</div>
        </div>
      ),
    },
    { key: "type", header: "类型", render: (p) => <span className="font-mono text-sm text-slate-600 whitespace-nowrap">{p.type}</span> },
    {
      key: "required",
      header: "必填",
      align: "center",
      render: (p) => (p.required ? <span className="text-sm font-semibold text-[#E11D48] whitespace-nowrap">必填</span> : <span className="text-sm text-slate-400 whitespace-nowrap">可选</span>),
    },
    { key: "desc", header: "说明", render: (p) => <span className="block min-w-48 text-sm text-slate-600">{p.desc}</span> },
  ];

  const errorColumns: DataTableColumn<ApiError & { id: string }>[] = [
    { key: "code", header: "状态码", width: "90px", render: (e) => <span className="font-mono font-semibold text-slate-900">{e.code}</span> },
    { key: "meaning", header: "含义", width: "140px", render: (e) => <span className="text-sm text-slate-700">{e.meaning}</span> },
    { key: "fix", header: "处理方式", render: (e) => <span className="text-sm text-slate-600">{e.fix}</span> },
  ];

  const groups = Array.from(new Set(ENDPOINTS.map((e) => e.group)));

  return (
    <div className="h-full flex flex-col bg-white text-slate-900">
      {/* 文档顶栏 */}
      <header className="h-14 shrink-0 border-b border-slate-200 px-4 sm:px-6 flex items-center gap-4">
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="w-7 h-7 rounded-lg bg-[#059669] text-white flex items-center justify-center font-black text-sm">C</span>
          <span className="font-bold text-sm">Channel 开放接口</span>
        </div>
        <Select
          size="sm"
          value={version}
          onChange={setVersion}
          options={[
            { value: "v2", label: "v2（当前）" },
            { value: "v1", label: "v1（2026-12 停用）" },
          ]}
          className="hidden sm:block"
        />
        <div className="relative flex-1 max-w-md ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="search"
            aria-label="搜索文档"
            placeholder="例如：限流、feed.json"
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 bg-slate-50 text-sm placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#059669] focus:ring-2 focus:ring-emerald-100"
          />
        </div>
        <a
          href="https://channel.mikkoayaka.com"
          target="_blank"
          rel="noreferrer"
          className="hidden md:flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 shrink-0"
        >
          访问 Channel
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </header>

      <div className="flex-1 min-h-0 flex">
        {/* 左侧接口目录 */}
        <nav className="hidden md:block w-64 shrink-0 border-r border-slate-200 bg-slate-50/60 overflow-y-auto subtle-scroll p-4 space-y-5" aria-label="接口目录">
          {groups.map((g) => (
            <div key={g} className="space-y-0.5">
              <div className="px-2.5 pb-1 text-sm font-medium text-slate-400">{g}</div>
              {ENDPOINTS.filter((e) => e.group === g).map((e) => {
                const active = e.id === epId;
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => open(e.id)}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-sm text-left cursor-pointer transition-colors",
                      active ? "bg-white border border-slate-200 text-slate-900 font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.03)]" : "border border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    )}
                  >
                    <span className="truncate">{e.title}</span>
                    <MethodTag method={e.method} size="sm" />
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* 正文 */}
        <div ref={contentRef} className="flex-1 min-w-0 overflow-y-auto subtle-scroll">
          <div className="max-w-3xl mx-auto px-5 sm:px-10 py-8 sm:py-10">
            {/* 窄屏接口选择 */}
            <div className="md:hidden mb-6">
              <Select
                label="接口"
                value={epId}
                onChange={open}
                options={ENDPOINTS.map((e) => ({ value: e.id, label: `${e.method} ${e.title}` }))}
              />
            </div>

            <div key={ep.id} className="animate-rise">
              <PageHeader
                breadcrumbs={[{ label: "接口参考" }, { label: ep.group }]}
                title={ep.title}
                description={ep.summary}
              />
              <div className="mt-5 flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
                <MethodTag method={ep.method} />
                <code className="font-mono text-sm text-slate-900 break-all">
                  {BASE}
                  <strong>{ep.path}</strong>
                </code>
                <span className="ml-auto text-sm text-slate-500">{ep.cache}</span>
              </div>

              <H2 id="request">{SECTION_TITLES.request}</H2>
              <DataTable columns={paramColumns} data={ep.params.map((p) => ({ ...p, id: p.name }))} keyField="id" />

              <H2 id="examples">{SECTION_TITLES.examples}</H2>
              <div className="space-y-3">
                <PillDock<Lang>
                  size="sm"
                  items={[
                    { id: "curl", label: "cURL" },
                    { id: "javascript", label: "JavaScript" },
                    { id: "python", label: "Python" },
                  ]}
                  activeId={lang}
                  onChange={setLang}
                />
                <CodeBlock code={example(ep, lang)} language={lang === "curl" ? "bash" : lang} />
              </div>

              <H2 id="response">{SECTION_TITLES.response}</H2>
              <CodeBlock code={ep.response} language={ep.responseLang} status="200 OK" />

              <H2 id="errors">{SECTION_TITLES.errors}</H2>
              <DataTable columns={errorColumns} data={ep.errors.map((e) => ({ ...e, id: String(e.code) }))} keyField="id" />

              <div className="mt-12">
                <FeedbackDock
                  key={ep.id}
                  title="这篇文档对你有帮助吗？"
                  statusText="已收到，我们会参考你的反馈改进文档"
                  showCounts={false}
                  options={[
                    { id: "yes", label: "有帮助", count: 0 },
                    { id: "no", label: "没解决我的问题", count: 0 },
                    { id: "wrong", label: "内容有误", count: 0 },
                  ]}
                />
              </div>
              <p className="mt-6 text-sm text-slate-400">最后更新：2026-09-20</p>
            </div>
          </div>
        </div>

        {/* 右侧本页目录 */}
        <aside className="hidden xl:block w-56 shrink-0 border-l border-slate-200 p-6 overflow-y-auto">
          <div className="text-sm font-semibold text-slate-900 mb-3">本页目录</div>
          <ul className="space-y-0.5">
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => scrollTo(id)}
                  aria-current={activeId === id ? "location" : undefined}
                  className={clsx(
                    "w-full text-left text-sm py-1.5 pl-3 border-l-2 cursor-pointer transition-colors",
                    activeId === id ? "border-[#059669] text-slate-900 font-semibold" : "border-slate-200 text-slate-500 hover:text-slate-900"
                  )}
                >
                  {SECTION_TITLES[id]}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-6 border-t border-slate-200 space-y-2 text-sm">
            <div className="text-slate-500">限流</div>
            <div className="text-slate-900">每个 IP 每分钟 120 次</div>
            <div className="text-slate-500 pt-2">认证</div>
            <div className="text-slate-900">公开接口，无需密钥</div>
          </div>
        </aside>
      </div>
    </div>
  );
};
