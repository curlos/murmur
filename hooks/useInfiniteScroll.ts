import { useState, useEffect, useRef } from 'react';

interface UseInfiniteScrollProps<T> {
  items: T[];
  itemsPerPage?: number;
  triggerDistance?: number;
}

interface UseInfiniteScrollReturn<T> {
  displayedItems: T[];
  loadingMore: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

export const useInfiniteScroll = <T>({
  items,
  itemsPerPage = 10,
  triggerDistance = 1000
}: UseInfiniteScrollProps<T>): UseInfiniteScrollReturn<T> => {
  const [displayedItems, setDisplayedItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  // Tabbing through the list scrolls the page, so auto-loading on scroll would keep adding items and keyboard users could never get past the list. While the keyboard is in use, more items load through the "Load more" button instead.
  const usingKeyboardRef = useRef(false);

  useEffect(() => {
    const onKeyDown = () => { usingKeyboardRef.current = true; };
    const onPointer = () => { usingKeyboardRef.current = false; };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointerdown', onPointer);
    window.addEventListener('wheel', onPointer);
    window.addEventListener('touchstart', onPointer);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('wheel', onPointer);
      window.removeEventListener('touchstart', onPointer);
    };
  }, []);

  // Update displayed items when items or page changes
  useEffect(() => {
    const endIndex = page * itemsPerPage;
    setDisplayedItems(items.slice(0, endIndex));
    setLoadingMore(false);
  }, [items, page, itemsPerPage]);

  // Reset pagination only when items length significantly changes
  useEffect(() => {
    const currentLength = items.length;
    const displayedLength = displayedItems.length;

    // Only reset if we have significantly fewer items than displayed
    // This handles cases like filtering/sorting but not minor updates
    if (displayedLength > currentLength) {
      setPage(1);
    }
  }, [items.length]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (usingKeyboardRef.current) return;

      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - triggerDistance) {
        if (displayedItems.length < items.length && !loadingMore) {
          setLoadingMore(true);
          setPage(prevPage => prevPage + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayedItems.length, items.length, loadingMore, triggerDistance]);

  const hasMore = displayedItems.length < items.length;

  const loadMore = () => setPage(prevPage => prevPage + 1);

  return {
    displayedItems,
    loadingMore,
    hasMore,
    loadMore,
  };
};