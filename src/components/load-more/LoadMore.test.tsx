import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoadMore } from "./LoadMore";

describe("LoadMore", () => {
  it("should render button with 'Load more' text when not loading", () => {
    const onLoadMore = jest.fn();
    const { queryByTestId, getByTestId, getByRole } = render(
      <LoadMore isLoadingMore={false} onLoadMore={onLoadMore} />
    );

    const spinner = queryByTestId("spinner");
    expect(spinner).not.toBeInTheDocument();
    
    const textElement = getByTestId("load-more-text");
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent("Load more");

    const button = getByRole("button");
    expect(button).not.toBeDisabled();
  });

  it("should render 'Loading...' text and disable button when loading", () => {
    const onLoadMore = jest.fn();
    const { getByTestId, getByRole } = render(
      <LoadMore isLoadingMore={true} onLoadMore={onLoadMore} />
    );

    const spinner = getByTestId("spinner");
    expect(spinner).toBeInTheDocument();

    const textElement = getByTestId("load-more-text");
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent("Loading...");

    const button = getByRole("button");
    expect(button).toBeDisabled();
  });

  it("should call onLoadMore when button is clicked", async () => {
    const user = userEvent.setup();
    const onLoadMore = jest.fn();
    const { getByRole } = render(
      <LoadMore isLoadingMore={false} onLoadMore={onLoadMore} />
    );

    const button = getByRole("button");
    await user.click(button);

    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it("should not call onLoadMore when button is disabled (loading)", async () => {
    const user = userEvent.setup();
    const onLoadMore = jest.fn();
    const { getByRole } = render(
      <LoadMore isLoadingMore={true} onLoadMore={onLoadMore} />
    );

    const button = getByRole("button");
    await user.click(button);

    expect(onLoadMore).not.toHaveBeenCalled();
  });
});

