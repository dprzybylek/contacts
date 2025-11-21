import { useState, useCallback } from "react";

import { ErrorMessage } from "./components/error-message";
import { LoadMore } from "./components/load-more";
import { PersonInfo } from "./components/person-info";
import { Loader } from "./components/loader";
import { Counter } from "./components/counter";
import { useFetchContacts } from "./hooks/useFetchContacts";
import { getSortedData } from "./helpers/getSortedData";

export type Contact = {
  id: string;
  firstNameLastName: string;
  jobTitle: string;
  emailAddress: string;
};

function App() {
  const { data, isLoading, isLoadingMore, error, fetchContacts } =
    useFetchContacts();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const handleSelect = useCallback((id: string): void => {
    setSelected((selected: Set<string>) => {
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
      <div className="App">
        <Loader />
      </div>
    );
  }

  const sortedData: Contact[] = getSortedData(data, selected);

  return (
    <div className="App">
      {data.length > 0 && <Counter size={selected.size} />}
      <div className="list" role="list">
        {sortedData.map((personInfo: Contact) => (
          <PersonInfo
            key={personInfo.id}
            data={personInfo}
            isSelected={selected.has(personInfo.id)}
            onSelect={handleSelect}
          />
        ))}
        {error && (
          <ErrorMessage
            error={error}
            onRetry={() => fetchContacts()}
            isFetching={isLoadingMore || isLoading}
          />
        )}
        {!error && (
          <LoadMore
            isLoadingMore={isLoadingMore}
            onLoadMore={() => fetchContacts()}
            aria-label={`Load more contacts. Currently showing ${data.length} contacts`}
          />
        )}
      </div>
    </div>
  );
}

export default App;
