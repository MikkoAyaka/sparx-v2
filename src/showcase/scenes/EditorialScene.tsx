import React, { useState } from "react";
import { Rss } from "lucide-react";
import { Button, SiteMasthead, StageHeroCard, type StageEntry } from "@/sparx-ui";
import type { RouteId } from "../routes";

export const EDITORIAL_ENTRIES: StageEntry[] = [
  {
    id: "edge-publishing",
    title: "摆脱被动投喂：基于边缘计算的独立出版系统实践",
    summary:
      "在内容平台上，一篇文章能被多少人看到取决于推荐算法。我把博客搬到了自己的边缘函数上：静态 Markdown、无状态缓存、每月不到 5 美元，文章写完就上线，不用等任何人审核。",
    category: "系统工程",
    date: "2026-09-18",
    readingMinutes: 7,
    tags: ["边缘计算", "独立出版", "Markdown"],
    cover: {
      sourceUrl: "cover-1-dark",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=85",
      title: "复古电脑与游戏机",
    },
  },
  {
    id: "llm-reasoning-ux",
    title: "长思考链模型的等待体验：如何用微交互缓解秒级推理延时",
    summary:
      "推理模型一次思考可能持续 5 到 30 秒，一个转圈的加载图标撑不住这么久。把等待拆成几个看得见的阶段，用户就不会以为页面卡死了。",
    category: "交互设计",
    date: "2026-09-12",
    readingMinutes: 5,
    tags: ["推理模型", "交互设计", "微动效"],
    cover: {
      sourceUrl: "cover-2-dark",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
      title: "电路板特写",
    },
  },
  {
    id: "viewport-visual-focus",
    title: "告别无限滚动：用 100dvh 视口锁定重做博客首页",
    summary:
      "无限下拉的首页让人一路往下刷，很难停下来读完一篇。我把首页改成一屏只放一篇文章，用滚轮一篇一篇地翻。这篇文章记录了做法，也记录了它在手机上的代价。",
    category: "界面设计",
    date: "2026-09-08",
    readingMinutes: 9,
    tags: ["首页布局", "排版规范", "视口控制"],
    cover: {
      sourceUrl: "cover-3-dark",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=85",
      title: "绿色代码雨",
    },
  },
  {
    id: "stateless-feedback",
    title: "删掉评论区：基于 Upstash Redis 的无状态点赞方案",
    summary:
      "评论区维护成本高，还容易被垃圾内容淹没。现在读者只能点四种反应之一，计数由 Upstash Redis 原子递增，服务端不保存任何个人数据。",
    category: "产品实践",
    date: "2026-08-30",
    readingMinutes: 4,
    tags: ["Upstash Redis", "读者反馈", "Serverless"],
    cover: {
      sourceUrl: "cover-4-dark",
      imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1600&q=85",
      title: "显示器上的代码",
    },
  },
];

type SiteSection = "posts" | "notes" | "friends" | "about";

/** 场景：独立作者的出版首页（虚空绯红） */
export const EditorialScene: React.FC<{ onNavigate: (id: RouteId) => void }> = ({ onNavigate }) => {
  const [index, setIndex] = useState(0);
  const [section, setSection] = useState<SiteSection>("posts");

  return (
    <div className="h-full">
      <StageHeroCard
        entries={EDITORIAL_ENTRIES}
        activeIndex={index}
        onChangeIndex={setIndex}
        onOpenEntry={() => onNavigate("scene-monograph")}
        header={
          <SiteMasthead<SiteSection>
            brand="Mikko Ayaka"
            tagline="写系统架构，也写被系统影响的人"
            links={[
              { id: "posts", label: "文章" },
              { id: "notes", label: "笔记" },
              { id: "friends", label: "友链" },
              { id: "about", label: "关于" },
            ]}
            activeId={section}
            onSelect={setSection}
            actions={
              <Button variant="outline" size="sm" icon={<Rss className="w-3.5 h-3.5" />}>
                订阅
              </Button>
            }
          />
        }
      />
    </div>
  );
};
