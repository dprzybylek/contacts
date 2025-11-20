import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import apiData from "./api";
import PersonInfo from "./PersonInfo";
import { ErrorMessage } from "./components/error-message/ErrorMessage";
import { LoadMore } from "./components/load-more/LoadMore";

type Contact = {
  id: string;
  firstNameLastName: string;
  jobTitle: string;
  emailAddress: string;
};

function App() {
  const [data, setData] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const hasDataRef = useRef(false);
  // Ref used for synchronous race condition protection - prevents concurrent fetch calls.
  // Unlike state, ref updates don't trigger re-renders, allowing immediate blocking.
  // For UI updates, use isLoadingMore state instead.
  const isFetching = useRef(false);

  const fetchContacts = useCallback(async () => {
    if(isFetching.current) {
      console.log('Fetching already in progress');
      return
    }
    
    const isFirstFetch = !hasDataRef.current;
    isFetching.current = true;

    try {
      if (isFirstFetch) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      const contacts = await apiData();

      if (isFirstFetch) {
        setData(contacts);
        setIsLoading(false);
        hasDataRef.current = true;
        setError(null);
      } else {
        setData(prev => {
          return [...prev, ...contacts]
        })
        setIsLoadingMore(false);
        setError(null);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      setError(errorMessage);
      setIsLoading(false);
      setIsLoadingMore(false);
    }
    finally {
      isFetching.current = false;
    }
  }, []);

  useEffect(() => {
    if (hasDataRef.current === false) {
      fetchContacts();
    }
  }, [fetchContacts]);

  const handleSelect = useCallback((id: string) => {
    setSelected((selected) => {
      const newSelected = new Set(selected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  }, []);

  const sortedData = useMemo(() => {
    const selectedContacts: Contact[] = [];
    const unselectedContacts: Contact[] = [];

    data.forEach((contact) => {
      if (selected.has(contact.id)) {
        selectedContacts.push(contact);
      } else {
        unselectedContacts.push(contact);
      }
    });

    return [...selectedContacts, ...unselectedContacts];
  }, [data, selected]);

  if (isLoading) {
    return (
      <div className="App">
        <div role="status" aria-live="polite">
          {/* TODO: add loading spinner */}
          Loading contacts...
        </div>
      </div>
    );
  }

  /* TODO: fix wide items changing the whole list layout */
  return (
    <div className="App">
      {/* TODO: add selected contacts component */}
      {data.length > 0 && (
        <div className="selected" aria-live="polite">
          Selected contacts: {selected.size}
        </div>
      )}
      <div className="list" role="list">
        {sortedData.map((personInfo) => (
          <PersonInfo
            key={personInfo.id}
            data={personInfo}
            isSelected={selected.has(personInfo.id)}
            onSelect={handleSelect}
          />
        ))}
        {error && (
          <ErrorMessage error={error} onRetry={() => fetchContacts()} isFetching={isLoadingMore} />
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
