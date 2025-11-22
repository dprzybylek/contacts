import { useState, useCallback, useEffect, useRef } from "react";
import apiData from "../api";
import type { Contact } from "../App";

type FetchContactsState = {
  data: Contact[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
};

type UseFetchContactsReturn = {
  data: Contact[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  fetchContacts: () => Promise<void>;
};

const initialState: FetchContactsState = {
  data: [],
  isLoading: true,
  isLoadingMore: false,
  error: null,
};

export function useFetchContacts(): UseFetchContactsReturn {
  const [state, setState] = useState<FetchContactsState>(initialState);
  const hasDataRef = useRef<boolean>(false);
  // Ref used for synchronous race condition protection - prevents concurrent fetch calls.
  // Unlike state, ref updates don't trigger re-renders, allowing immediate blocking.
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
        setState((prev) => ({ ...prev, isLoading: true }));
      } else {
        setState((prev) => ({ ...prev, isLoadingMore: true }));
      }
      const contacts: Contact[] = await apiData();

      if (isFirstFetch) {
        setState({
          data: contacts,
          isLoading: false,
          isLoadingMore: false,
          error: null,
        });
        hasDataRef.current = true;
      } else {
        setState((prev) => ({
          ...prev,
          data: [...prev.data, ...contacts],
          isLoadingMore: false,
          error: null,
        }));
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
        isLoadingMore: false,
      }));
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
    data: state.data,
    isLoading: state.isLoading,
    isLoadingMore: state.isLoadingMore,
    error: state.error,
    fetchContacts,
  };
}
