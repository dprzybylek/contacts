import React from "react";
import { Spinner } from "../spinner";
import styles from "./styles.module.css";

type ErrorMessageProps = {
  error: string | null;
  onRetry: () => void;
  isFetching: boolean;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  onRetry,
  isFetching,
}: ErrorMessageProps): React.ReactElement => (
  <div role="alert" className={styles.wrapper}>
    <div className={styles.errorMessage}>{error}</div>
    <button onClick={onRetry} className={styles.retryButton} disabled={isFetching}>
      {isFetching && <Spinner />}
      Retry
    </button>
  </div>
);
