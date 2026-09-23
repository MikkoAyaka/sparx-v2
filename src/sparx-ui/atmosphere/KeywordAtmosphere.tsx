import React from "react";
import { clsx } from "clsx";

export interface KeywordAtmosphereWord {
  label: string;
  x: number;      // 0 ~ 100%
  y: number;      // 0 ~ 100%
  size: string;   // e.g. "clamp(1rem, 2.5vw, 2.2rem)"
  opacity: number;// 0.05 ~ 0.45
  rotation: number;// -15 ~ 15 deg
  mono?: boolean;
}

export interface KeywordAtmosphereProps {
  words?: KeywordAtmosphereWord[];
  mode?: "stage" | "spine" | "ambient";
  className?: string;
}

export const DEFAULT_KEYWORD_WORDS: KeywordAtmosphereWord[] = [
  { label: "DISTRIBUTED", x: 18, y: 22, size: "2.2rem", opacity: 0.22, rotation: -6, mono: true },
  { label: "CONSENSUS", x: 75, y: 18, size: "3.4rem", opacity: 0.16, rotation: 4, mono: false },
  { label: "PUBLISHING", x: 38, y: 45, size: "4.8rem", opacity: 0.12, rotation: -2, mono: false },
  { label: "SOVEREIGN", x: 82, y: 55, size: "2.8rem", opacity: 0.18, rotation: 8, mono: true },
  { label: "DARKROOM", x: 22, y: 78, size: "3.2rem", opacity: 0.15, rotation: -4, mono: false },
  { label: "HIGH-SIGNAL", x: 65, y: 82, size: "2.4rem", opacity: 0.25, rotation: 3, mono: true },
  { label: "ATELIER", x: 50, y: 15, size: "1.8rem", opacity: 0.20, rotation: -5, mono: false },
];

export const KeywordAtmosphere: React.FC<KeywordAtmosphereProps> = ({
  words = DEFAULT_KEYWORD_WORDS,
  mode = "stage",
  className,
}) => {
  return (
    <div
      aria-hidden="true"
      data-keyword-atmosphere={mode}
      className={clsx(
        "pointer-events-none absolute inset-0 overflow-hidden bg-neutral-950 select-none",
        className
      )}
    >
      {/* 渐变暗房底色 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_26%,rgba(229,25,45,0.12),transparent_48%),radial-gradient(circle_at_24%_80%,rgba(251,146,60,0.06),transparent_40%),linear-gradient(145deg,rgb(18,18,22),rgb(3,4,6))]" />

      {/* 40px 网格纹理 */}
      <div
        className={clsx(
          "absolute inset-0 bg-grid-pattern",
          mode === "stage" ? "opacity-35" : "opacity-25"
        )}
      />

      {/* 散布字排 */}
      {words.map((word) => (
        <span
          key={word.label}
          data-keyword={word.label}
          className="absolute select-none whitespace-nowrap font-bold uppercase leading-none tracking-tight text-white transition-opacity duration-500"
          style={{
            left: `${word.x}%`,
            top: `${word.y}%`,
            fontFamily: word.mono ? "var(--font-mono)" : "var(--font-sans)",
            fontSize: word.size,
            opacity: word.opacity,
            transform: `translate(-50%, -50%) rotate(${word.rotation}deg)`,
          }}
        >
          {word.label}
        </span>
      ))}

      {/* 前景微渐变暗化 */}
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(2,2,4,0.15),transparent_48%,rgba(2,2,4,0.45))]" />
    </div>
  );
};
