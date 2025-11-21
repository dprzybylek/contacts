import React from "react";
import styles from "./styles.module.css";

type CounterProps = {
  size: number;
};

export const Counter: React.FC<CounterProps> = ({
  size,
}): React.ReactElement => (
  <div className={styles.wrapper}>
    <div className={styles.label}>Selected contacts</div>
    <div className={styles.value}>{size}</div>
  </div>
);
