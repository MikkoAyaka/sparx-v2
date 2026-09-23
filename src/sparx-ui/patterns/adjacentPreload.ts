/**
 * Sparx UI v2 - Adjacent Card Preload Utility
 * 
 * Preloads adjacent cards during browser idle times to eliminate image loading stutter
 * when users step through the carousel rail (addresses Issue #3 / Item 24).
 */

const preloadedUrlCache = new Set<string>();

export function getAdjacentIndices(currentIndex: number, total: number, radius = 1): number[] {
  if (total <= 1 || radius < 1) return [];

  const indices = new Set<number>();

  for (let r = 1; r <= radius; r++) {
    const nextIndex = (currentIndex + r) % total;
    if (nextIndex !== currentIndex) indices.add(nextIndex);

    const prevIndex = (currentIndex - r + total) % total;
    if (prevIndex !== currentIndex) indices.add(prevIndex);
  }

  return Array.from(indices);
}

export interface AdjacentPreloadOptions {
  currentIndex: number;
  total: number;
  radius?: number;
  getUrl: (index: number) => string | undefined;
  onPreloaded?: (url: string) => void;
}

export function scheduleAdjacentPreload(options: AdjacentPreloadOptions): () => void {
  const { currentIndex, total, radius = 1, getUrl, onPreloaded } = options;
  const adjacentIndices = getAdjacentIndices(currentIndex, total, radius);

  if (adjacentIndices.length === 0) return () => {};

  const targetUrls = adjacentIndices
    .map((idx) => getUrl(idx))
    .filter((url): url is string => Boolean(url && !preloadedUrlCache.has(url)));

  if (targetUrls.length === 0) return () => {};

  let cancelled = false;

  const executePreload = () => {
    if (cancelled) return;

    for (const url of targetUrls) {
      if (preloadedUrlCache.has(url)) continue;
      preloadedUrlCache.add(url);

      if (typeof window !== "undefined" && typeof Image !== "undefined") {
        try {
          const img = new Image();
          img.src = url;
          img.onload = () => onPreloaded?.(url);
        } catch {
          // ignore
        }
      }
    }
  };

  let idleHandle: number | null = null;
  let timeoutHandle: ReturnType<typeof setTimeout> | null = null;

  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    idleHandle = (window as any).requestIdleCallback(executePreload, { timeout: 1200 });
  } else {
    timeoutHandle = setTimeout(executePreload, 200);
  }

  return () => {
    cancelled = true;
    if (idleHandle !== null && typeof window !== "undefined" && "cancelIdleCallback" in window) {
      (window as any).cancelIdleCallback(idleHandle);
    }
    if (timeoutHandle !== null) {
      clearTimeout(timeoutHandle);
    }
  };
}
