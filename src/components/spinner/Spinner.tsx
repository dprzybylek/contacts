import styles from "./styles.module.css";

export const Spinner: React.FC = (): React.ReactElement => (
  <span className={styles.spinner} data-testid="spinner" />
);
