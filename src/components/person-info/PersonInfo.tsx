import styles from './styles.module.css'

type Props = {
  data: {
    id: string;
    firstNameLastName: string;
    jobTitle: string;
    emailAddress: string;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
};

export function PersonInfo(props: Props) {
  const { data, isSelected, onSelect } = props;
  const { id, firstNameLastName, jobTitle, emailAddress } = data;
  //TODO: add default photo for each contact
  const wrapperClassName = isSelected
    ? `${styles.wrapper} ${styles.wrapperSelected}`
    : styles.wrapper;

  return (
    <div onClick={() => onSelect(id)} className={wrapperClassName}>
      <span>ID: {id} </span>
      <div className={styles.firstNameLastName}>{firstNameLastName}</div>
      <div className={styles.jobTitle}>{jobTitle}</div>
      <div className={styles.emailAddress}>{emailAddress}</div>
    </div>
  );
}