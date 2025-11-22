import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { useFetchContacts } from "./hooks/useFetchContacts";
import type { Contact } from "./App";

jest.mock("./hooks/useFetchContacts");

const mockUseFetchContacts = useFetchContacts as jest.MockedFunction<
  typeof useFetchContacts
>;

describe("App", () => {
  const mockFetchContacts = jest.fn();

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render Loader when isLoading is true", () => {
    mockUseFetchContacts.mockReturnValue({
      data: [],
      isLoading: true,
      isLoadingMore: false,
      error: null,
      fetchContacts: mockFetchContacts,
    });

    const { getByTestId } = render(<App />);
    expect(getByTestId("loader")).toBeInTheDocument();
  });

  it("should render error message when error exists", () => {
    mockUseFetchContacts.mockReturnValue({
      data: [],
      isLoading: false,
      isLoadingMore: false,
      error: "Failed to load contacts",
      fetchContacts: mockFetchContacts,
    });

    const { getByTestId } = render(<App />);
    expect(getByTestId("error-message")).toBeInTheDocument();
    expect(getByTestId("error-message")).toHaveTextContent(
      "Failed to load contacts"
    );
  });

  it("should render list of contacts", () => {
    mockUseFetchContacts.mockReturnValue({
      data: mockContacts,
      isLoading: false,
      isLoadingMore: false,
      error: null,
      fetchContacts: mockFetchContacts,
    });

    const { getAllByTestId, getByTestId } = render(<App />);
    const counter = getByTestId("counter");
    expect(counter).toHaveTextContent("Selected contacts");
    const counterValue = getByTestId("counter-value");
    expect(counterValue).toHaveTextContent("0");
    
    const contactCards = getAllByTestId("person-info");
    expect(contactCards.length).toBe(2)
    expect(contactCards[0]).toHaveTextContent("John Doe");
    expect(contactCards[1]).toHaveTextContent("Jane Smith");
  });

  it("should call fetchContacts when Retry button is clicked", async () => {
    const user = userEvent.setup();
    mockUseFetchContacts.mockReturnValue({
      data: [],
      isLoading: false,
      isLoadingMore: false,
      error: "Error occurred",
      fetchContacts: mockFetchContacts,
    });

    const { getByRole } = render(<App />);
    const retryButton = getByRole("button", { name: /retry/i });
    await user.click(retryButton);

    expect(mockFetchContacts).toHaveBeenCalledTimes(1);
  });

  it("should call fetchContacts when Load More button is clicked", async () => {
    const user = userEvent.setup();
    mockUseFetchContacts.mockReturnValue({
      data: mockContacts,
      isLoading: false,
      isLoadingMore: false,
      error: null,
      fetchContacts: mockFetchContacts,
    });

    const { getByRole } = render(<App />);
    const loadMoreButton = getByRole("button", { name: /load more/i });
    await user.click(loadMoreButton);

    expect(mockFetchContacts).toHaveBeenCalledTimes(1);
  });

  it("should toggle contact selection when contact card is clicked", async () => {
    const user = userEvent.setup();
    mockUseFetchContacts.mockReturnValue({
      data: mockContacts,
      isLoading: false,
      isLoadingMore: false,
      error: null,
      fetchContacts: mockFetchContacts,
    });

    const { getAllByTestId, getByTestId } = render(<App />);
    const contactCards = getAllByTestId("person-info");

    await user.click(contactCards[0]);
    const counterValue = getByTestId("counter-value");

    expect(contactCards[0].className).toContain("wrapperSelected");
    expect(counterValue).toHaveTextContent("1");

    await user.click(contactCards[0]);
    expect(contactCards[0].className).not.toContain("wrapperSelected");
    expect(counterValue).toHaveTextContent("0");
  });

  it("should render Counter when contacts are visible", async () => {
    const user = userEvent.setup();
    mockUseFetchContacts.mockReturnValue({
      data: mockContacts,
      isLoading: false,
      isLoadingMore: false,
      error: null,
      fetchContacts: mockFetchContacts,
    });

    const { getAllByTestId, getByTestId } = render(<App />);
    const contactCards = getAllByTestId("person-info");
    const counterValue = getByTestId("counter-value");
    expect(counterValue).toHaveTextContent("0");

    // Click to select first contact
    await user.click(contactCards[0]);
    expect(counterValue).toHaveTextContent("1");

    // Click to select second contact
    await user.click(contactCards[1]);
    expect(counterValue).toHaveTextContent("2");
  });
});
