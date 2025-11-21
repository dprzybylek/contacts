import { Spinner } from "../spinner";
import styles from "./styles.module.css";

export const Loader: React.FC = (): React.ReactElement => (
  <div className={styles.wrapper}>
    <Spinner />
    Loading contacts...
  </div>
);
