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
      <div onClick={handleSelect} className={wrapperClassName} data-testid="person-info">
        <div className={styles.avatar} data-testid="person-info-avatar">{initials}</div>
        <div className={styles.content}>
          <div className={styles.firstNameLastName} data-testid="person-info-first-name-last-name">{firstNameLastName}</div>
          <div className={styles.jobTitle} data-testid="person-info-job-title">{jobTitle}</div>
          <div className={styles.emailAddress} data-testid="person-info-email-address">{emailAddress}</div>
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
