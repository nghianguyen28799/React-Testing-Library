import { getByRole, render, screen } from "@testing-library/react";
import { CounterTwo } from "./Counter-two";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("Counter-Two", () => {
  test("renders correctly", () => {
    render(<CounterTwo count={0} />);
    const textElement = screen.getByText("Counter Two");
    expect(textElement).toBeInTheDocument();
  });

  test("handles are called", async () => {
    userEvent.setup();
    const incrementHandler = jest.fn();
    const decrementHandler = jest.fn();
    render(
      <CounterTwo
        count={0}
        handleIncrement={incrementHandler}
        handleDecrement={decrementHandler}
      />
    );
    const incrementButton = screen.getByRole("button", {
      name: "Increment",
    });
    const decrementButton = screen.getByRole("button", {
      name: "Decrement",
    });
    await act(async () => {
      await userEvent.click(incrementButton);
    });
    await act(async () => {
      await userEvent.click(decrementButton);
    });

    expect(incrementHandler).toBeCalledTimes(1);
    expect(decrementHandler).toBeCalledTimes(1);
  });
});
