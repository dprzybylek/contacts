import React from "react";
import { Spinner } from "../spinner";
import styles from "./styles.module.css";

type LoadMoreProps = {
  isLoadingMore: boolean;
  onLoadMore: () => void;
};  

export const LoadMore:React.FC<LoadMoreProps> = ({ isLoadingMore, onLoadMore }: LoadMoreProps): React.ReactElement => (
  <button className={styles.button} onClick={onLoadMore} disabled={isLoadingMore}>
    {isLoadingMore && <Spinner />}
    <span>{isLoadingMore ? "Loading..." : "Load more"}</span>
  </button>
);
