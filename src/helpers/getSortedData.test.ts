import { getSortedData } from "./getSortedData";
import type { Contact } from "../App";

describe("getSortedData", () => {
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
    {
      id: "3",
      firstNameLastName: "Bob Johnson",
      jobTitle: "Manager",
      emailAddress: "bob@example.com",
    },
    {
      id: "4",
      firstNameLastName: "Alice Brown",
      jobTitle: "Analyst",
      emailAddress: "alice@example.com",
    },
  ];

  it("should return selected contacts first, then unselected", () => {
    const selected = new Set<string>(["2", "4"]);
    const result = getSortedData(mockContacts, selected);

    expect(result[0].id).toBe("2");
    expect(result[1].id).toBe("4");
    expect(result[2].id).toBe("1");
    expect(result[3].id).toBe("3");
  });

  it("should maintain original order within unselected contacts", () => {
    const selected = new Set<string>(["2"]);
    const result = getSortedData(mockContacts, selected);

    expect(result[0].id).toBe("2");
    expect(result[1].id).toBe("1");
    expect(result[2].id).toBe("3");
    expect(result[3].id).toBe("4");
  });

  it("should return all contacts in original order when none are selected", () => {
    const selected = new Set<string>();
    const result = getSortedData(mockContacts, selected);

    expect(result).toEqual(mockContacts);
    expect(result.length).toBe(mockContacts.length);
  });

  it("should handle empty data array", () => {
    const selected = new Set<string>(["1"]);
    const result = getSortedData([], selected);

    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });

  it("should handle single contact", () => {
    const selected = new Set<string>(["1"]);
    const result = getSortedData(mockContacts, selected);

    expect(result[0].id).toBe("1");
    expect(result.length).toBe(mockContacts.length);
  });

  it("should ignore selected IDs that don't exist in data", () => {
    const selected = new Set<string>(["999", "1"]);
    const result = getSortedData(mockContacts, selected);

    expect(result[0].id).toBe("1");
    expect(result.length).toBe(mockContacts.length);
  });

  it("should handle multiple selections in different order", () => {
    const selected = new Set<string>(["4", "1", "3"]);
    const result = getSortedData(mockContacts, selected);

    expect(result[0].id).toBe("4");
    expect(result[1].id).toBe("1");
    expect(result[2].id).toBe("3");
    expect(result[3].id).toBe("2");
  });
});

