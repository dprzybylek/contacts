import { getInitials } from "./getInitials";

describe("getInitials", () => {
  it("should return initials from first and last name", () => {
    expect(getInitials("John Doe")).toBe("JD");
  });

  it("should return uppercase initials", () => {
    expect(getInitials("john doe")).toBe("JD");
    expect(getInitials("JOHN DOE")).toBe("JD");
    expect(getInitials("JoHn DoE")).toBe("JD");
  });

  it("should return only first two letters for names with more than two words", () => {
    expect(getInitials("John Michael Doe")).toBe("JM");
    expect(getInitials("Mary Jane Watson Parker")).toBe("MJ");
  });

  it("should return first letter for single word", () => {
    expect(getInitials("John")).toBe("J");
    expect(getInitials("Madonna")).toBe("M");
  });

  it("should return empty string for empty input", () => {
    expect(getInitials("")).toBe("");
  });

  it("should handle single character", () => {
    expect(getInitials("A")).toBe("A");
  });

  it("should handle names with special characters", () => {
    expect(getInitials("Jean-Pierre")).toBe("J");
    expect(getInitials("O'Brien")).toBe("O");
  });
});

