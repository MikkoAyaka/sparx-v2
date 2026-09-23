import React from "react";
import { clsx } from "clsx";

export interface AmbientDissolveMaskProps {
  direction?: "horizontal" | "vertical" | "both";
  className?: string;
}

export const AmbientDissolveMask: React.FC<AmbientDissolveMaskProps> = ({
  direction = "both",
  className,
}) => {
  return (
    <>
      {(direction === "horizontal" || direction === "both") && (
        <div
          aria-hidden="true"
          className={clsx(
            "absolute inset-0 pointer-events-none hidden lg:block z-[5]",
            className
          )}
          style={{
            background: "var(--sparx-mask-horizontal)",
          }}
        />
      )}
      {(direction === "vertical" || direction === "both") && (
        <div
          aria-hidden="true"
          className={clsx(
            "absolute inset-0 pointer-events-none lg:hidden z-[5]",
            className
          )}
          style={{
            background: "var(--sparx-mask-vertical)",
          }}
        />
      )}
    </>
  );
};
