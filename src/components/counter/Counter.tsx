import styles from "./styles.module.css";

type CounterProps = {
  size: number;
};

export const Counter = ({ size }: CounterProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>Selected contacts</div>
      <div className={styles.value}>{size}</div>
    </div>
  );
};
