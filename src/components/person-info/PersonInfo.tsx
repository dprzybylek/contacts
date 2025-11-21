import type React from "react";
import { memo, useCallback, useMemo } from "react";
import styles from "./styles.module.css";
import { getInitials } from "src/helpers/getInitials";

type PersonInfoProps = {
  data: {
    id: string;
    firstNameLastName: string;
    jobTitle: string;
    emailAddress: string;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
};

export const PersonInfo: React.FC<PersonInfoProps> = memo(
  ({ data, isSelected, onSelect }: PersonInfoProps): React.ReactElement => {
    const { id, firstNameLastName, jobTitle, emailAddress } = data;

    const wrapperClassName = isSelected
      ? `${styles.wrapper} ${styles.wrapperSelected}`
      : styles.wrapper;

    const initials = useMemo(
      () => getInitials(firstNameLastName),
      [firstNameLastName]
    );

    const handleSelect = useCallback(() => onSelect(id), [id, onSelect]);

    return (
      <div onClick={handleSelect} className={wrapperClassName}>
        <div className={styles.avatar}>{initials}</div>
        <div className={styles.content}>
          <div className={styles.firstNameLastName}>{firstNameLastName}</div>
          <div className={styles.jobTitle}>{jobTitle}</div>
          <div className={styles.emailAddress}>{emailAddress}</div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps: PersonInfoProps) => {
    return (
      prevProps.data.id === nextProps.data.id &&
      prevProps.isSelected === nextProps.isSelected
    );
  }
);
