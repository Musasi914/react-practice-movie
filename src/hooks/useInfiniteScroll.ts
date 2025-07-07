import { useEffect, useCallback } from "react";

interface UseInfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

export function useInfiniteScroll({ onLoadMore, hasMore, isLoading }: UseInfiniteScrollProps) {
  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // スクロールが下部に近づいたら次のページを読み込み
    if (scrollTop + windowHeight >= documentHeight - 100) {
      onLoadMore();
    }
  }, [onLoadMore, hasMore, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
}
