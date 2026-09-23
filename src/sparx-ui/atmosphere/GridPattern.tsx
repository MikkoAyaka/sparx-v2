import React from "react";
import { clsx } from "clsx";

export interface GridPatternProps {
  opacity?: number;
  className?: string;
}

export const GridPattern: React.FC<GridPatternProps> = ({
  opacity = 0.35,
  className,
}) => {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        "pointer-events-none absolute inset-0 bg-grid-pattern",
        className
      )}
      style={{ opacity }}
    />
  );
};
