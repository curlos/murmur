import React, { useEffect, useRef } from 'react';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import Spinner from './Spinner';

interface InfiniteScrollProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemsPerPage?: number;
  triggerDistance?: number;
  loading?: boolean;
  LoadingComponent?: React.ComponentType;
  className?: string;
  // When given, the list is rendered as an accessible "feed" (https://www.w3.org/WAI/ARIA/apg/patterns/feed/) with this label.
  feedLabel?: string;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * @description - Moves focus to the first focusable element after (or the last one before) the feed. Used by "Ctrl+End" / "Ctrl+Home" so keyboard users can jump out of a long feed.
 */
const focusOutsideFeed = (feed: HTMLElement, where: 'before' | 'after') => {
  const focusables = Array.from(document.querySelectorAll<HTMLElement>(FOCUSABLE))
    .filter((el) => !feed.contains(el) && el.offsetParent !== null);

  const target = where === 'after'
    ? focusables.find((el) => feed.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING)
    : focusables.reverse().find((el) => feed.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_PRECEDING);

  target?.focus();
};

const InfiniteScroll = <T,>({
  items,
  renderItem,
  itemsPerPage = 10,
  triggerDistance = 1000,
  loading = false,
  LoadingComponent,
  className = '',
  feedLabel
}: InfiniteScrollProps<T>) => {
  const {
    displayedItems,
    loadingMore,
    hasMore,
    loadMore
  } = useInfiniteScroll({
    items,
    itemsPerPage,
    triggerDistance
  });

  const feedRef = useRef<HTMLDivElement>(null);
  // Index of the first item added by the "Load more" button, so focus can move to it once it renders.
  const focusIndexAfterLoadRef = useRef<number | null>(null);

  useEffect(() => {
    const index = focusIndexAfterLoadRef.current;
    const article = index !== null && feedRef.current?.querySelectorAll<HTMLElement>(':scope > article')[index];
    if (article) {
      article.focus();
      focusIndexAfterLoadRef.current = null;
    }
  }, [displayedItems.length]);

  const handleLoadMoreClick = () => {
    focusIndexAfterLoadRef.current = displayedItems.length;
    loadMore();
  };

  /**
   * @description - Keyboard support for the feed: "Page Down"/"j" and "Page Up"/"k" move between posts, "Ctrl+End"/"Ctrl+Home" jump out of the feed.
   */
  const handleFeedKeyDown = (e: React.KeyboardEvent) => {
    const feed = feedRef.current;
    const target = e.target as HTMLElement;

    // Ignore keys from portaled children (like the image viewer) and from text fields and open menus.
    if (!feed || !feed.contains(target) || target.closest('input, textarea, [role="menu"]')) return;

    if (e.ctrlKey && (e.key === 'End' || e.key === 'Home')) {
      e.preventDefault();
      focusOutsideFeed(feed, e.key === 'End' ? 'after' : 'before');
      return;
    }

    if (e.ctrlKey || e.metaKey || e.altKey) return;

    const articles = Array.from(feed.querySelectorAll<HTMLElement>(':scope > article'));
    const current = articles.findIndex((article) => article.contains(target));

    let next: number;
    if (e.key === 'PageDown' || e.key === 'j') {
      next = current + 1;
    } else if (e.key === 'PageUp' || e.key === 'k') {
      next = Math.max(current - 1, 0);
    } else {
      return;
    }

    if (articles[next]) {
      e.preventDefault();
      articles[next].focus();
    } else if (next === articles.length && hasMore) {
      // Moving past the last loaded post loads the next batch and focuses its first post, same as the "Load more" button.
      e.preventDefault();
      handleLoadMoreClick();
    }
  };

  if (loading && LoadingComponent) {
    return <LoadingComponent />;
  }

  return (
    <>
      <div
        ref={feedRef}
        className={className}
        {...(feedLabel ? { role: 'feed', 'aria-label': feedLabel, 'aria-busy': loadingMore, onKeyDown: handleFeedKeyDown } : {})}
      >
        {displayedItems.map((item, index) => (
          feedLabel ? (
            <article key={index} tabIndex={-1} aria-posinset={index + 1} aria-setsize={items.length}>
              {renderItem(item, index)}
            </article>
          ) : (
            <React.Fragment key={index}>
              {renderItem(item, index)}
            </React.Fragment>
          )
        ))}
      </div>

      {/* Show loading spinner when loading more items */}
      {!loading && hasMore && loadingMore && (
        <div className="py-4">
          <Spinner />
        </div>
      )}

      {/* Lets keyboard users load more on purpose (scrolling by keyboard doesn't auto-load, so they can still get past the list). */}
      {!loading && hasMore && !loadingMore && (
        <button
          type="button"
          className="w-full py-4 text-lightblue-500 hover:underline"
          onClick={handleLoadMoreClick}
        >
          {feedLabel ? 'Load more posts' : 'Load more'}
        </button>
      )}
    </>
  );
};

export default InfiniteScroll;
