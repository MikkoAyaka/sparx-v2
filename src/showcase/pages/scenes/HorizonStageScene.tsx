import React, { useState } from "react";
import { StageHeroCard, type StageEntry, useSparxTheme } from "@/sparx-ui";

const DARK_STAGE_ENTRIES: StageEntry[] = [
  {
    id: "edge-publishing",
    title: "摆脱被动投喂：基于边缘计算的独立出版系统实践",
    summary:
      "当我们建立独立内容站点时，核心目标是摆脱公域算法的流量分配与格式审查。本文探讨如何基于边缘函数、静态 Markdown 与无状态缓存，构建一个轻量、可靠且永久受控的个人发布系统。",
    category: "系统工程",
    date: "2026-09-18",
    readingMinutes: 7,
    tags: ["边缘计算", "独立出版", "无状态架构", "Markdown"],
    cover: {
      sourceUrl: "cover-1-dark",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=85",
      title: "边缘计算发布架构",
    },
  },
  {
    id: "llm-reasoning-ux",
    title: "长思考链模型的等待体验：如何用微交互缓解秒级推理延时",
    summary:
      "当推理模型进入 5 到 30 秒的深度思考阶段，传统即时响应组件直接失效。本文分享前端界面如何通过状态分段与微动效提供舒适的心理感知，避免用户误判系统卡死。",
    category: "交互设计",
    date: "2026-09-12",
    readingMinutes: 5,
    tags: ["推理模型", "交互设计", "微动效", "前端工程"],
    cover: {
      sourceUrl: "cover-2-dark",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
      title: "推理模型交互设计",
    },
  },
  {
    id: "viewport-visual-focus",
    title: "视口锁定与横向消融：构建高信噪比界面的工程思考",
    summary:
      "摒弃无限垂直长卷的视觉疲劳。通过 100dvh 视口锁定大卡片、60% 渐变横向消融与严格的无衬线排印红线，让读者的注意力重新聚焦于内容本身。",
    category: "界面美学",
    date: "2026-09-08",
    readingMinutes: 9,
    tags: ["设计系统", "视觉焦点", "排印规范", "视口控制"],
    cover: {
      sourceUrl: "cover-3-dark",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=85",
      title: "视口锁定与消融美学",
    },
  },
  {
    id: "stateless-feedback",
    title: "轻量微反馈设计：基于 Upstash Redis 的无状态点赞方案",
    summary:
      "摒弃维护成本高昂且容易滋生垃圾内容的传统评论区，采用匿名凭据与原子计数器的轻共鸣方案，为读者提供无门槛的真实情绪表达通道。",
    category: "产品实践",
    date: "2026-08-30",
    readingMinutes: 4,
    tags: ["协议设计", "Upstash Redis", "微反馈", "Serverless"],
    cover: {
      sourceUrl: "cover-4-dark",
      imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1600&q=85",
      title: "微反馈协议与 Redis 计数",
    },
  },
];

const LIGHT_STAGE_ENTRIES: StageEntry[] = [
  {
    id: "edge-publishing",
    title: "高可用企业出版架构：边缘节点集群与确定性分发",
    summary:
      "当我们构建面向万级并发的中后台发布管线时，核心挑战在于多可用区容灾与一致性缓存。本文深入拆解基于边缘函数、预构建无状态镜像与 Redis 全球复制的高可用出版实践。",
    category: "系统工程",
    date: "2026-09-18",
    readingMinutes: 7,
    tags: ["边缘集群", "高可用架构", "无状态镜像", "分布式缓存"],
    cover: {
      sourceUrl: "cover-1-light",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
      title: "高可用企业出版架构",
    },
  },
  {
    id: "llm-reasoning-ux",
    title: "工业级智能体人机交互：秒级推理过程确定性感知",
    summary:
      "复杂业务决策模型往往具备长思考链路。本文阐述如何通过可量化分阶段阶段指示器、微状态跃迁与防御性超时重试机制，赋予企业用户透明、受控的确定性感官。",
    category: "交互设计",
    date: "2026-09-12",
    readingMinutes: 5,
    tags: ["生产级智能体", "确定性交互", "状态链路", "前端工程"],
    cover: {
      sourceUrl: "cover-2-light",
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
      title: "生产级工程研发生态",
    },
  },
  {
    id: "viewport-visual-focus",
    title: "皓白极翠视口锁定工学：高信噪比生产界面的物理构型",
    summary:
      "摒弃杂乱信息轰炸。通过 100dvh 视口锁定大卡片、阿尔法通道明朗消融与结构化 Outline 分级强调，打造类似 Modrinth 风格的高信噪比企业桌面级工具。",
    category: "界面美学",
    date: "2026-09-08",
    readingMinutes: 9,
    tags: ["设计系统", "企业稳态", "排印规范", "视口控制"],
    cover: {
      sourceUrl: "cover-3-light",
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
      title: "皓白极翠极简工学",
    },
  },
  {
    id: "stateless-feedback",
    title: "轻量微反馈设计：基于 Upstash Redis 的无状态点赞方案",
    summary:
      "摒弃维护成本高昂且容易滋生垃圾内容的传统评论区，采用匿名凭据与原子计数器的轻共鸣方案，为读者提供无门槛的真实情绪表达通道。",
    category: "产品实践",
    date: "2026-08-30",
    readingMinutes: 4,
    tags: ["协议设计", "Upstash Redis", "微反馈", "Serverless"],
    cover: {
      sourceUrl: "cover-4-light",
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=85",
      title: "微反馈协议与 Redis 计数",
    },
  },
];

export const HorizonStageScene: React.FC<{ onInspectEntry?: (id: string) => void }> = ({
  onInspectEntry,
}) => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";
  const [activeIndex, setActiveIndex] = useState(0);

  const entries = isEmerald ? LIGHT_STAGE_ENTRIES : DARK_STAGE_ENTRIES;

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <StageHeroCard
        entries={entries}
        activeIndex={activeIndex}
        onChangeIndex={setActiveIndex}
        onOpenEntry={(entry) => onInspectEntry?.(entry.id)}
        ctaText="展卷阅读"
      />
    </div>
  );
};
