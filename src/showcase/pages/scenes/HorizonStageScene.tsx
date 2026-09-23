import React, { useState } from "react";
import { StageHeroCard, type StageEntry } from "@/sparx-ui";

const MOCK_STAGE_ENTRIES: StageEntry[] = [
  {
    id: "arch-defense",
    title: "在断裂带重建架构秩序：高可用出版与个人频段",
    summary:
      "当我们谈论个人主权出版时，我们在谈论摆脱公域算法的被动投喂。本文探讨如何基于边缘函数、无界暗房与静态离线回退，搭建永久在线的数字讲台。",
    category: "架构哨所",
    date: "2026-09-18",
    readingMinutes: 7,
    tags: ["架构哲学", "分布式系统", "独立出版", "边缘计算"],
    cover: {
      sourceUrl: "cover-1",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=85",
      title: "高可用出版架构",
    },
  },
  {
    id: "llm-radar",
    title: "智能体环境感知与推理延时边界评测",
    summary:
      "当推理模型进入秒级思维链深水区，交互系统必须从即时响应范式，过渡至具备光学微共鸣与流式阻尼的等待仪式感。",
    category: "大模型前沿",
    date: "2026-09-12",
    readingMinutes: 5,
    tags: ["大模型", "Agent", "推理评测"],
    cover: {
      sourceUrl: "cover-2",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
      title: "智能体环境感知",
    },
  },
  {
    id: "void-design",
    title: "暗房虚空视界：为什么深黑舞台能带来最高信息信噪比",
    summary:
      "拒绝平庸的灰底与千篇一律的卡片堆叠。以纯粹无界的 100dvh 暗室、60% 渐变横向消融与高压激光绯红，构建专属于严肃创作者的展卷剧场。",
    category: "界面美学",
    date: "2026-09-08",
    readingMinutes: 9,
    tags: ["设计系统", "VoidHorizon", "排印美学"],
    cover: {
      sourceUrl: "cover-3",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=85",
      title: "暗房虚空美学",
    },
  },
  {
    id: "signal-frame",
    title: "从单向广播到读者轻共鸣：微反馈的协议化落地",
    summary:
      "摒弃嘈杂廉价的公共评论区，采用匿名凭据与原子计数器的轻共鸣协议，让每一位深度读者的思想回响在虚空留痕。",
    category: "产品论证",
    date: "2026-08-30",
    readingMinutes: 4,
    tags: ["协议设计", "微反馈", "Upstash"],
    cover: {
      sourceUrl: "cover-4",
      imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1600&q=85",
      title: "微反馈协议",
    },
  },
];

export const HorizonStageScene: React.FC<{ onInspectEntry?: (id: string) => void }> = ({
  onInspectEntry,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <StageHeroCard
        entries={MOCK_STAGE_ENTRIES}
        activeIndex={activeIndex}
        onChangeIndex={setActiveIndex}
        onOpenEntry={(entry) => onInspectEntry?.(entry.id)}
        ctaText="展卷阅读"
      />
    </div>
  );
};
