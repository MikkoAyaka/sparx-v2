import React from "react";
import { clsx } from "clsx";
import { Play } from "lucide-react";
import { GridPattern } from "./GridPattern";
import { useSparxTheme } from "../tokens/colors";

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
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  return (
    <div
      className={clsx(
        "absolute inset-0 grid place-items-center select-none transition-colors duration-200",
        isEmerald
          ? "bg-[radial-gradient(circle_at_72%_18%,rgba(5,150,105,0.08),transparent_48%),linear-gradient(145deg,rgb(241,245,249),rgb(255,255,255))] text-slate-800"
          : "bg-[radial-gradient(circle_at_72%_18%,rgba(229,25,45,0.12),transparent_48%),linear-gradient(145deg,rgb(22,22,26),rgb(5,6,8))] text-white",
        className
      )}
    >
      <GridPattern opacity={isEmerald ? 0.2 : 0.35} />

      <div className="relative text-center z-10 group">
        <button
          type="button"
          disabled={!interactive}
          onClick={onPlay}
          className={clsx(
            "mx-auto grid place-items-center rounded-full border transition-all duration-300",
            interactive
              ? isEmerald
                ? "h-16 w-16 sm:h-20 sm:w-20 cursor-pointer backdrop-blur-md bg-white/90 border border-slate-300 hover:opacity-85 hover:border-slate-400 hover:bg-slate-100/90 shadow-[0_1px_2px_rgba(0,0,0,0.03)] active:scale-95"
                : "h-16 w-16 sm:h-20 sm:w-20 cursor-pointer backdrop-blur-md bg-white/[0.06] border-white/20 hover:border-[#E5192D] hover:shadow-[0_0_12px_rgba(229,25,45,0.35)] active:scale-95"
              : "h-10 w-10 cursor-default"
          )}
          aria-label={`Play ${provider} video`}
        >
          <Play
            className={clsx(
              "ml-1 transition-colors",
              isEmerald
                ? "fill-slate-800 text-slate-800 group-hover:fill-slate-900 group-hover:text-slate-900"
                : "fill-white text-white group-hover:fill-[#E5192D]",
              interactive ? "h-6 w-6 sm:h-8 sm:w-8" : "h-4 w-4"
            )}
          />
        </button>

        <span
          className={clsx(
            "mt-3 block font-mono font-bold uppercase tracking-widest text-sm",
            isEmerald ? "text-slate-500" : "text-zinc-400"
          )}
        >
          {provider}
        </span>
      </div>
    </div>
  );
};
