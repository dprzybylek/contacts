import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PersonInfo } from "./PersonInfo";

describe("PersonInfo", () => {
  const mockData = {
    id: "1",
    firstNameLastName: "John Doe",
    jobTitle: "Software Developer",
    emailAddress: "john.doe@example.com",
  };

  it("should render person information", () => {
    const onSelect = jest.fn();
    const { getByTestId } = render(
      <PersonInfo data={mockData} isSelected={false} onSelect={onSelect} />
    );

    expect(getByTestId("person-info-first-name-last-name")).toHaveTextContent(
      "John Doe"
    );
    expect(getByTestId("person-info-job-title")).toHaveTextContent(
      "Software Developer"
    );
    expect(getByTestId("person-info-email-address")).toHaveTextContent(
      "john.doe@example.com"
    );
  });

  it("should render initials in avatar", () => {
    const onSelect = jest.fn();
    const { getByTestId } = render(
      <PersonInfo data={mockData} isSelected={false} onSelect={onSelect} />
    );

    expect(getByTestId("person-info-avatar")).toHaveTextContent("JD");
  });

  it("should call onSelect with correct id when clicked", async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    const { getByTestId } = render(
      <PersonInfo data={mockData} isSelected={false} onSelect={onSelect} />
    );

    const card = getByTestId("person-info");
    await user.click(card);

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith("1");
  });

  it("should apply selected class when isSelected is true", () => {
    const onSelect = jest.fn();
    const { getByTestId } = render(
      <PersonInfo data={mockData} isSelected={true} onSelect={onSelect} />
    );

    const card = getByTestId("person-info");
    expect(card.className).toContain("wrapperSelected");
  });

  it("should not apply selected class when isSelected is false", () => {
    const onSelect = jest.fn();
    const { getByTestId } = render(
      <PersonInfo data={mockData} isSelected={false} onSelect={onSelect} />
    );

    const card = getByTestId("person-info");
    expect(card.className).not.toContain("wrapperSelected");
    expect(card.className).toContain("wrapper");
  });

  it("should update when isSelected changes", () => {
    const onSelect = jest.fn();
    const { getByTestId, rerender } = render(
      <PersonInfo data={mockData} isSelected={false} onSelect={onSelect} />
    );

    let card = getByTestId("person-info");
    expect(card.className).not.toContain("wrapperSelected");

    rerender(
      <PersonInfo data={mockData} isSelected={true} onSelect={onSelect} />
    );

    card = getByTestId("person-info");
    expect(card.className).toContain("wrapperSelected");
  });

  it("should not re-render when props do not change", () => {
    const onSelect = jest.fn();
    const { getByTestId, rerender } = render(
      <PersonInfo data={mockData} isSelected={false} onSelect={onSelect} />
    );

    const initialAvatar = getByTestId("person-info-avatar");

    rerender(
      <PersonInfo data={mockData} isSelected={false} onSelect={onSelect} />
    );

    const finalAvatar = getByTestId("person-info-avatar");
    expect(finalAvatar).toBe(initialAvatar);
  });
});
