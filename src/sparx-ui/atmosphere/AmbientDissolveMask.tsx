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
            background:
              "linear-gradient(to right, rgba(3,4,6,0) 0%, rgba(3,4,6,0.08) 20%, rgba(3,4,6,0.6) 38%, rgba(3,4,6,0.95) 50%, #030406 58%)",
          }}
        />
      )}
      {(direction === "vertical" || direction === "both") && (
        <div
          aria-hidden="true"
          className={clsx(
            "absolute inset-0 pointer-events-none lg:hidden z-[5]",
            "bg-gradient-to-t from-[#030406] via-[#030406]/85 to-transparent",
            className
          )}
        />
      )}
    </>
  );
};
