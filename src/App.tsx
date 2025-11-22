import { useState, useCallback } from "react";

import { ErrorMessage } from "./components/error-message";
import { LoadMore } from "./components/load-more";
import { PersonInfo } from "./components/person-info";
import { Loader } from "./components/loader";
import { Counter } from "./components/counter";
import { useFetchContacts } from "./hooks/useFetchContacts";
import { getSortedData } from "./helpers/getSortedData";
import styles from "./App.module.css";

export type Contact = {
  id: string;
  firstNameLastName: string;
  jobTitle: string;
  emailAddress: string;
};

function App() {
  const { data, isLoading, isLoadingMore, error, fetchContacts } =
    useFetchContacts();
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const toggleSelectContact = useCallback((id: string): void => {
    setSelectedContacts((selected: Set<string>) => {
      const newSelected = new Set(selected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  }, []);

  if (isLoading) {
    return (
      <div className={styles.app}>
        <Loader />
      </div>
    );
  }

  const sortedContacts: Contact[] = getSortedData(data, selectedContacts);

  return (
    <div className={styles.app}>
      {data.length > 0 && <Counter size={selectedContacts.size} />}
      <div>
        {sortedContacts.map((contact: Contact) => (
          <PersonInfo
            key={contact.id}
            data={contact}
            isSelected={selectedContacts.has(contact.id)}
            onSelect={() => toggleSelectContact(contact.id)}
          />
        ))}
        {error && (
          <ErrorMessage
            error={error}
            onRetry={fetchContacts}
            isFetching={isLoadingMore || isLoading}
          />
        )}
        {!error && (
          <LoadMore
            isLoadingMore={isLoadingMore}
            onLoadMore={fetchContacts}
            aria-label={`Load more contacts. Currently showing ${data.length} contacts`}
          />
        )}
      </div>
    </div>
  );
}

export default App;
