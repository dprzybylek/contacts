import { Spinner } from "../spinner";
import styles from "./styles.module.css";

export const LoadMore = ({
  isLoadingMore,
  onLoadMore,
}: {
  isLoadingMore: boolean;
  onLoadMore: () => void;
}) => {
  return (
    <button
      className={styles.button}
      onClick={onLoadMore}
      disabled={isLoadingMore}
    >
      {isLoadingMore && <Spinner />}
      <span>{isLoadingMore ? "Loading..." : "Load more"}</span>
    </button>
  );
};
