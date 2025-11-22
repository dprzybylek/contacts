import React from "react";
import styles from "./styles.module.css";

type CounterProps = {
  size: number;
};

export const Counter: React.FC<CounterProps> = ({
  size,
}): React.ReactElement => (
  <div className={styles.wrapper} data-testid="counter">
    <div className={styles.label}>Selected contacts</div>
    <div className={styles.value} data-testid="counter-value">{size}</div>
  </div>
);
