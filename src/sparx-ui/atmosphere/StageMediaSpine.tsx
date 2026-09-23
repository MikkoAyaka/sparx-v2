import React, { useState, useEffect } from "react";
import { clsx } from "clsx";

export interface StageMediaCover {
  sourceUrl: string;
  imageUrl?: string;
  videoUrl?: string;
  kind?: "image" | "video";
  title?: string;
  provider?: string;
}

export interface StageMediaSpineProps {
  cover?: StageMediaCover;
  title?: string;
  autoPlay?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const StageMediaSpine: React.FC<StageMediaSpineProps> = ({
  cover,
  title,
  autoPlay = true,
  className,
  children,
}) => {
  const [currentCover, setCurrentCover] = useState<StageMediaCover | undefined>(cover);
  const [prevCover, setPrevCover] = useState<StageMediaCover | undefined>(undefined);

  useEffect(() => {
    if (!cover) return;
    if (cover.sourceUrl !== currentCover?.sourceUrl) {
      setPrevCover(currentCover);
      setCurrentCover(cover);

      const timer = setTimeout(() => {
        setPrevCover(undefined);
      }, 750);

      return () => clearTimeout(timer);
    }
  }, [cover, currentCover]);

  const renderCover = (item?: StageMediaCover, isFadeIn?: boolean) => {
    if (!item) return null;
    const isVideo = item.kind === "video" || Boolean(item.videoUrl) || /\.(?:mp4|webm|ogg|mov)$/i.test(item.sourceUrl);
    const videoSrc = item.videoUrl || item.sourceUrl;

    return (
      <div
        key={item.sourceUrl}
        className={clsx(
          "absolute inset-0 overflow-hidden bg-[#030406]",
          isFadeIn ? "animate-spine-fade-in" : "opacity-100"
        )}
      >
        {isVideo ? (
          <video
            src={videoSrc}
            poster={item.imageUrl}
            autoPlay={autoPlay}
            muted
            loop
            playsInline
            className="w-full h-full object-cover saturate-[0.85] brightness-[0.92]"
          />
        ) : item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={title || item.title || "Stage cover"}
            className="w-full h-full object-cover saturate-[0.85] brightness-[0.92]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-[#08090E] to-[#020204]" />
        )}
        {children}
      </div>
    );
  };

  return (
    <div className={clsx("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* 底部老图层：过渡期间持续垫底，避免黑屏与硬切突兀感 */}
      {prevCover && renderCover(prevCover, false)}

      {/* 顶部新图层：执行 700ms 丝滑渐变淡入 */}
      {currentCover && renderCover(currentCover, Boolean(prevCover))}
    </div>
  );
};
