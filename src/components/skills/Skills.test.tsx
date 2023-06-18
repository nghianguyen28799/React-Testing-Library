import { logRoles, render, screen } from "@testing-library/react";
import { Skills } from "./Skills";

describe("Skills", () => {
  const skills = ["HTML", "CSS", "Javascript"];

  test("render correctly", () => {
    render(<Skills skills={skills} />);
    const listElement = screen.getByRole("list");
    expect(listElement).toBeInTheDocument();
  });

  test("renders a list of skills", () => {
    render(<Skills skills={skills} />);
    const listItemElements = screen.getAllByRole("listitem");
    expect(listItemElements).toHaveLength(3);
  });

  test("Start learning button is not rendered", () => {
    render(<Skills skills={skills} />);
    const learningButton = screen.queryByRole("button", {
      name: "Start learning",
    });
    expect(learningButton).not.toBeInTheDocument();
  });

  test("Start learning button is eventually display", async () => {
    const view = render(<Skills skills={skills} />);
    const learningButton = await screen.findByRole(
      "button",
      {
        name: "Start learning",
      },
      {
        timeout: 2000,
      }
    ); 
    expect(learningButton).toBeInTheDocument();
  });
});
