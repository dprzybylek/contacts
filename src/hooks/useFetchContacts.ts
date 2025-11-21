import { useState, useCallback, useEffect, useRef } from "react";
import apiData from "../api";
import type { Contact } from "../App";

type UseFetchContactsReturn = {
  data: Contact[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  fetchContacts: () => Promise<void>;
};

export function useFetchContacts(): UseFetchContactsReturn {
  const [data, setData] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasDataRef = useRef<boolean>(false);
  // Ref used for synchronous race condition protection - prevents concurrent fetch calls.
  // Unlike state, ref updates don't trigger re-renders, allowing immediate blocking.
  // For UI updates, use isLoadingMore state instead.
  const isFetching = useRef<boolean>(false);

  const fetchContacts = useCallback(async () => {
    if (isFetching.current) {
      console.log("Fetching already in progress");
      return;
    }

    const isFirstFetch = !hasDataRef.current;
    isFetching.current = true;

    try {
      if (isFirstFetch) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      const contacts: Contact[] = await apiData();

      if (isFirstFetch) {
        setData(contacts);
        setIsLoading(false);
        hasDataRef.current = true;
        setError(null);
      } else {
        setData((prev) => {
          return [...prev, ...contacts];
        });
        setIsLoadingMore(false);
        setError(null);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      setError(errorMessage);
      setIsLoading(false);
      setIsLoadingMore(false);
    } finally {
      isFetching.current = false;
    }
  }, []);

  useEffect(() => {
    if (hasDataRef.current === false) {
      fetchContacts();
    }
  }, [fetchContacts]);

  return {
    data,
    isLoading,
    isLoadingMore,
    error,
    fetchContacts,
  };
}

