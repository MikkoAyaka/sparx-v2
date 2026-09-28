import { useCallback, useEffect, useState, type RefObject } from "react";

/**
 * useActiveSection：跟踪滚动容器里当前正在阅读的段落和整体阅读进度。
 * 段落顶部越过容器高度的 anchorRatio（默认 45%）时，视为进入该段落。
 */
export function useActiveSection(
  containerRef: RefObject<HTMLElement | null>,
  sectionIds: string[],
  anchorRatio = 0.45
) {
  const [activeId, setActiveId] = useState<string | undefined>(sectionIds[0]);
  const [progress, setProgress] = useState(0);

  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0);

    const anchor = el.getBoundingClientRect().top + el.clientHeight * anchorRatio;
    let current = sectionIds[0];
    for (const id of sectionIds) {
      const node = el.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
      if (node && node.getBoundingClientRect().top <= anchor) current = id;
    }
    // 滚到底部时，最后一节一定是当前段落
    if (max > 0 && el.scrollTop >= max - 2) current = sectionIds[sectionIds.length - 1];
    setActiveId(current);
  }, [containerRef, sectionIds, anchorRatio]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [containerRef, measure]);

  /** 平滑滚动到指定段落 */
  const scrollTo = useCallback(
    (id: string) => {
      const el = containerRef.current;
      const node = el?.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
      if (!el || !node) return;
      const top = node.getBoundingClientRect().top - el.getBoundingClientRect().top + el.scrollTop - 24;
      el.scrollTo({ top, behavior: "smooth" });
    },
    [containerRef]
  );

  return { activeId, progress, scrollTo };
}
