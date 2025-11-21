import { Spinner } from "../spinner";
import styles from "./styles.module.css";

export const ErrorMessage = ({
  error,
  onRetry,
  isFetching,
}: {
  error: string | null;
  onRetry: () => void;
  isFetching: boolean;
}) => {
  return (
    <div role="alert" className={styles.wrapper}>
      <div className={styles.errorMessage}>{error}</div>
      <button
        onClick={onRetry}
        className={styles.retryButton}
        disabled={isFetching}
      >
        {isFetching && <Spinner />}
        Retry
      </button>
    </div>
  );
};
