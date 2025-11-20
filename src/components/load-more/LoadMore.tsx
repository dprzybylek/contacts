export const LoadMore = ({isLoadingMore, onLoadMore}: {isLoadingMore: boolean, onLoadMore: () => void}) => {
  return <button onClick={onLoadMore} disabled={isLoadingMore}>
    {isLoadingMore ? "Loading..." : "Load more"}
  </button>
}