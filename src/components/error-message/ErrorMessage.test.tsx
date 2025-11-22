import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorMessage } from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("should render error message", () => {
    const error = "Something went wrong";
    const onRetry = jest.fn();
    const { getByTestId } = render(
      <ErrorMessage error={error} onRetry={onRetry} isFetching={false} />
    );

    const errorMessage = getByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(error);
  });


  it("should render Retry button", () => {
    const error = "Failed to load";
    const onRetry = jest.fn();
    const { getByRole } = render(
      <ErrorMessage error={error} onRetry={onRetry} isFetching={false} />
    );

    const button = getByRole("button", { name: /retry/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("should call onRetry when Retry button is clicked", async () => {
    const user = userEvent.setup();
    const error = "Error occurred";
    const onRetry = jest.fn();
    const { getByRole } = render(
      <ErrorMessage error={error} onRetry={onRetry} isFetching={false} />
    );

    const button = getByRole("button", { name: /retry/i });
    await user.click(button);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("should disable Retry button when isFetching is true", () => {
    const error = "Loading error";
    const onRetry = jest.fn();
    const { getByRole } = render(
      <ErrorMessage error={error} onRetry={onRetry} isFetching={true} />
    );

    const button = getByRole("button", { name: /retry/i });
    expect(button).toBeDisabled();
  });

  it("should not call onRetry when button is disabled and clicked", async () => {
    const user = userEvent.setup();
    const error = "Error message";
    const onRetry = jest.fn();
    const { getByRole } = render(
      <ErrorMessage error={error} onRetry={onRetry} isFetching={true} />
    );

    const button = getByRole("button", { name: /retry/i });
    await user.click(button);

    expect(onRetry).not.toHaveBeenCalled();
  });

  it("should render Spinner when isFetching is true", () => {
    const error = "Fetching error";
    const onRetry = jest.fn();
    const { getByTestId } = render(
      <ErrorMessage error={error} onRetry={onRetry} isFetching={true} />
    );

    const spinner = getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("should not render Spinner when isFetching is false", () => {
    const error = "Error occurred";
    const onRetry = jest.fn();
    const { queryByTestId } = render(
      <ErrorMessage error={error} onRetry={onRetry} isFetching={false} />
    );

    const spinner = queryByTestId("spinner");
    expect(spinner).not.toBeInTheDocument();
  });

  it("should handle null error", () => {
    const onRetry = jest.fn();
    const { getByTestId } = render(
      <ErrorMessage error={null} onRetry={onRetry} isFetching={false} />
    );

    const errorMessage = getByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("");
  });
});

