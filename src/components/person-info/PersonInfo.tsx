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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div onClick={() => onSelect(id)} className={wrapperClassName}>
      <div className={styles.avatar}>{getInitials(firstNameLastName)}</div>
      <div className={styles.content}>
        <div className={styles.firstNameLastName}>{firstNameLastName}</div>
        <div className={styles.jobTitle}>{jobTitle}</div>
        <div className={styles.emailAddress}>{emailAddress}</div>
      </div>
    </div>
  );
}