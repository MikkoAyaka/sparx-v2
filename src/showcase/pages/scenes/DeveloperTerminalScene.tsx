import React, { useState } from "react";
import { PillDock, CodeBlock, Badge, StatusDot } from "@/sparx-ui";
import { Terminal, Database, Send, Radio } from "lucide-react";

type LangKey = "curl" | "javascript" | "python" | "go" | "rust";

const ENDPOINTS = [
  {
    method: "GET",
    path: "/feed.json",
    format: "JSON Feed 1.1",
    desc: "全量已出版文章元数据流，具备完整摘要与发布时间线",
    status: "200 OK · 边缘缓存",
    icon: <Database className="w-4 h-4 text-cyan-400" />,
  },
  {
    method: "GET",
    path: "/rss.xml",
    format: "RSS 2.0 / Atom",
    desc: "标准兼容的聚合订阅流，适配各类阅读器与自动化分发",
    status: "200 OK · 边缘可用",
    icon: <Radio className="w-4 h-4 text-emerald-400" />,
  },
  {
    method: "POST",
    path: "/api/channel-feedback",
    format: "REST / JSON",
    desc: "接收读者轻共鸣点赞反馈，Upstash Redis 原子计数与持久化",
    status: "200 OK · 速率限制 60/min",
    icon: <Send className="w-4 h-4 text-[#E5192D]" />,
  },
  {
    method: "GET",
    path: "/api/channel-events",
    format: "REST / JSON",
    desc: "技术情报流多源事件总线与大模型分析快照",
    status: "200 OK · 实时同步",
    icon: <Terminal className="w-4 h-4 text-purple-400" />,
  },
];

const CODE_EXAMPLES: Record<LangKey, string> = {
  curl: `# 1. 抓取最新个人出版 JSON Feed 流
curl -s "https://channel.mikkoayaka.com/feed.json" | jq .items[0]

# 2. 提交读者轻共鸣反馈
curl -X POST "https://channel.mikkoayaka.com/api/channel-feedback" \\
  -H "Content-Type: application/json" \\
  -d '{"slug":"arch-defense","reactionId":"insightful"}'`,

  javascript: `// 使用原生 ESM fetch 消费全量发布源
const response = await fetch("https://channel.mikkoayaka.com/feed.json");
const channel = await response.json();

console.log("频道标题:", channel.title);
for (const item of channel.items) {
  console.log(\`- \${item.title} -> \${item.url}\`);
}`,

  python: `# 纯标准库获取最新个人频道
import json
from urllib.request import urlopen

with urlopen("https://channel.mikkoayaka.com/feed.json") as res:
    feed = json.loads(res.read().decode("utf-8"))

print(f"订阅源: {feed['title']}")
for item in feed.get("items", []):
    print(f"* {item['title']}")`,

  go: `package main

import (
  "encoding/json"
  "fmt"
  "net/http"
)

type ChannelFeed struct {
  Title string \`json:"title"\`
  Items []struct {
    Title string \`json:"title"\`
    URL   string \`json:"url"\`
  } \`json:"items"\`
}

func main() {
  resp, _ := http.Get("https://channel.mikkoayaka.com/feed.json")
  defer resp.Body.Close()
  var feed ChannelFeed
  _ = json.NewDecoder(resp.Body).Decode(&feed)
  fmt.Println("消费频道:", feed.Title)
}`,

  rust: `// Cargo: reqwest = { version = "0.12", features = ["json"] }, tokio = { version = "1", features = ["full"] }
use serde::Deserialize;

#[derive(Deserialize)]
struct Feed {
  title: String,
  items: Vec<Item>,
}

#[derive(Deserialize)]
struct Item {
  title: String,
  url: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
  let feed: Feed = reqwest::get("https://channel.mikkoayaka.com/feed.json")
    .await?
    .json()
    .await?;

  for item in feed.items {
    println!("- {} -> {}", item.title, item.url);
  }
  Ok(())
}`,
};

export const DeveloperTerminalScene: React.FC = () => {
  const [activeLang, setActiveLang] = useState<LangKey>("curl");

  const langNav = [
    { id: "curl" as LangKey, label: "cURL" },
    { id: "javascript" as LangKey, label: "JavaScript" },
    { id: "python" as LangKey, label: "Python" },
    { id: "go" as LangKey, label: "Go" },
    { id: "rust" as LangKey, label: "Rust" },
  ];

  return (
    <div className="w-full h-full rounded-2xl sm:rounded-3xl border border-white/10 bg-[#030406] p-6 sm:p-10 flex flex-col justify-between overflow-y-auto subtle-scroll shadow-2xl">
      <div className="space-y-6">
        {/* 顶部标题 */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#E5192D] font-bold tracking-widest">
              <StatusDot status="live" size="sm" />
              <span>TERMINAL ACCESS · 开放终端</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              频道 API 与订阅端点规范
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="emerald" dot>
              边缘网关正常
            </Badge>
            <Badge variant="flare" mono>
              v2.0 STABLE
            </Badge>
          </div>
        </div>

        {/* 四大开放端点卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ENDPOINTS.map((ep) => (
            <div
              key={ep.path}
              className="p-4 rounded-2xl border border-white/10 bg-[#08090E] hover:border-white/20 transition-all space-y-2 shadow-lg"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-lg bg-white/5 border border-white/10 shrink-0">
                    {ep.icon}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#E5192D]">
                    {ep.method}
                  </span>
                  <span className="font-mono text-xs text-white font-bold">
                    {ep.path}
                  </span>
                </div>
                <span className="text-[12px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                  {ep.format}
                </span>
              </div>
              <p className="text-xs text-zinc-300">{ep.desc}</p>
              <div className="text-[12px] font-mono text-zinc-500 pt-1 border-t border-white/5">
                {ep.status}
              </div>
            </div>
          ))}
        </div>

        {/* 客户端代码切换演练场 */}
        <div className="space-y-3 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-mono text-zinc-400 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5192D]" />
              <span>多语言消费示例：</span>
            </span>

            <PillDock
              items={langNav}
              activeId={activeLang}
              onChange={(id) => setActiveLang(id as LangKey)}
              size="sm"
            />
          </div>

          <CodeBlock
            code={CODE_EXAMPLES[activeLang]}
            language={activeLang}
            status="Ready to execute"
            showLineNumbers
          />
        </div>
      </div>
    </div>
  );
};
