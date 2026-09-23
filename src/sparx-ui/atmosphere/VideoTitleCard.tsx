import React from "react";
import { clsx } from "clsx";
import { Play } from "lucide-react";
import { GridPattern } from "./GridPattern";

export interface VideoTitleCardProps {
  provider?: string;
  interactive?: boolean;
  onPlay?: () => void;
  className?: string;
}

export const VideoTitleCard: React.FC<VideoTitleCardProps> = ({
  provider = "VIDEO",
  interactive = true,
  onPlay,
  className,
}) => {
  return (
    <div
      className={clsx(
        "absolute inset-0 grid place-items-center select-none bg-[radial-gradient(circle_at_72%_18%,rgba(229,25,45,0.15),transparent_48%),linear-gradient(145deg,rgb(22,22,26),rgb(5,6,8))]",
        className
      )}
    >
      <GridPattern opacity={0.35} />

      <div className="relative text-center z-10">
        <button
          type="button"
          disabled={!interactive}
          onClick={onPlay}
          className={clsx(
            "mx-auto grid place-items-center rounded-full border border-white/20 bg-white/[0.06] transition-all duration-300",
            interactive
              ? "h-16 w-16 sm:h-20 sm:w-20 cursor-pointer backdrop-blur-md hover:scale-105 hover:border-[#E5192D] hover:shadow-[0_0_30px_rgba(229,25,45,0.5)] active:scale-95"
              : "h-10 w-10 cursor-default"
          )}
          aria-label={`Play ${provider} video`}
        >
          <Play
            className={clsx(
              "ml-1 fill-white text-white transition-colors",
              interactive ? "h-6 w-6 sm:h-8 sm:w-8 group-hover:fill-[#E5192D]" : "h-4 w-4"
            )}
          />
        </button>

        <span
          className={clsx(
            "mt-3 block font-mono font-bold uppercase tracking-widest text-zinc-400",
            interactive ? "text-xs" : "text-xs"
          )}
        >
          {provider}
        </span>
      </div>
    </div>
  );
};
