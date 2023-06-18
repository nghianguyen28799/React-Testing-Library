import { render, screen } from "@testing-library/react";
import { Counter } from "./counter";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("Counter", () => {
  test("renders corectly", () => {
    render(<Counter />);
    const countElement = screen.getByRole("heading");
    expect(countElement).toBeInTheDocument();

    const incrementButtonElement = screen.getByRole("button", {
      name: "Increment",
    });
    expect(incrementButtonElement).toBeInTheDocument();
  });

  test("render a count of 0", () => {
    render(<Counter />);
    const countElement = screen.getByRole("heading");
    expect(countElement).toHaveTextContent("0");
  });

  test("renders a count of 1 after clicking the increment button", async () => {
    userEvent.setup();
    render(<Counter />);
    const incrementButton = screen.getByRole("button", { name: "Increment" });
    await act(async () => {
      await userEvent.click(incrementButton);
    });
    const countElement = screen.getByRole("heading");
    expect(countElement).toHaveTextContent("1");
  });

  test("renders a count of 2 after clicking the increment button twice", async () => {
    userEvent.setup();
    render(<Counter />);
    const incrementButton = screen.getByRole("button", {
      name: "Increment",
    });
    await act(async () => {
      await userEvent.click(incrementButton);
    });
    await act(async () => {
      await userEvent.click(incrementButton);
    });
    const countElement = screen.getByRole("heading");
    expect(countElement).toHaveTextContent("2");
  });

  test("render a count 10 after clicking the increment button", async () => {
    userEvent.setup();
    render(<Counter />);
    const amountInput = screen.getByRole("spinbutton");
    await act(async () => {
      await userEvent.type(amountInput, "10");
    });
    expect(amountInput).toHaveValue(10);
    const setCountButton = screen.getByRole("button", {
      name: "Set"
    })
    await act(async () => {
      await userEvent.click(setCountButton)
    })
    const countElement = screen.getByRole("heading");
    expect(countElement).toHaveTextContent("10")
  });

  test("elements are focused in the right order", async () => {
    userEvent.setup();
    render(<Counter />);
    const amountInput = screen.getByRole("spinbutton");
    const setCountButton = screen.getByRole("button", {
      name: "Set"
    })
    const incrementButton = screen.getByRole("button", { name: "Increment" });
    await act(async () => {
      await userEvent.tab()
    })
    expect(incrementButton).toHaveFocus();

    await act(async () => {
      await userEvent.tab()
    })
    expect(amountInput).toHaveFocus();

    await act(async () => {
      await userEvent.tab()
    })
    expect(setCountButton).toHaveFocus();
  })
});
