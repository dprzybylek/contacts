import { renderHook, waitFor } from "@testing-library/react";
import { useFetchContacts } from "./useFetchContacts";
import apiData from "../api";
import type { Contact } from "../App";

jest.mock("../api");

const mockApiData = apiData as jest.MockedFunction<typeof apiData>;

describe("useFetchContacts", () => {
  const mockContacts: Contact[] = [
    {
      id: "1",
      firstNameLastName: "John Doe",
      jobTitle: "Developer",
      emailAddress: "john@example.com",
    },
    {
      id: "2",
      firstNameLastName: "Jane Smith",
      jobTitle: "Designer",
      emailAddress: "jane@example.com",
    },
  ];

  const mockMoreContacts: Contact[] = [
    {
      id: "3",
      firstNameLastName: "Bob Johnson",
      jobTitle: "Manager",
      emailAddress: "bob@example.com",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockApiData.mockResolvedValue(mockContacts);
  });

  it("should have initial loading state", () => {
    const { result } = renderHook(() => useFetchContacts());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isLoadingMore).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it("should fetch contacts on mount", async () => {
    const { result } = renderHook(() => useFetchContacts());

    expect(mockApiData).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockContacts);
    expect(result.current.error).toBe(null);
  });

  it("should handle fetch error", async () => {
    const errorMessage = "Failed to fetch";
    mockApiData.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useFetchContacts());

    await waitFor(() => {
      expect(result.current.error).toBe(errorMessage);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isLoadingMore).toBe(false);
    expect(result.current.data).toEqual([]);
  });

  it("should handle generic error when error is not Error instance", async () => {
    mockApiData.mockRejectedValue("String error");

    const { result } = renderHook(() => useFetchContacts());

    await waitFor(() => {
      expect(result.current.error).toBe("Something went wrong");
    });
  });

  it("should append new contacts to existing data", async () => {
    const { result } = renderHook(() => useFetchContacts());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockContacts);

    mockApiData.mockResolvedValue(mockMoreContacts);
    await result.current.fetchContacts();

    await waitFor(() => {
      expect(result.current.data.length).toBe(3);
    });

    expect(result.current.data[0]).toEqual(mockContacts[0]);
    expect(result.current.data[1]).toEqual(mockContacts[1]);
    expect(result.current.data[2]).toEqual(mockMoreContacts[0]);
  });

  it("should clear error on successful fetch after error", async () => {
    mockApiData.mockRejectedValueOnce(new Error("First error"));

    const { result } = renderHook(() => useFetchContacts());

    await waitFor(() => {
      expect(result.current.error).toBe("First error");
    });

    mockApiData.mockResolvedValueOnce(mockContacts);
    await result.current.fetchContacts();

    await waitFor(() => {
      expect(result.current.error).toBe(null);
    });

    expect(result.current.data).toEqual(mockContacts);
  });
});
