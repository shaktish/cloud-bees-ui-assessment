import { render, screen } from "@testing-library/react";
import Greet from "./greet";

describe("Greet", () => {
  test("Title", () => {
    render(<Greet />);
    expect(
      screen.getByRole("heading", {
        name: "Good Morning, User",
      })
    ).toBeInTheDocument();
  });

  test("with user name", () => {
    render(<Greet name={"shaktish"} />);
    const foo = screen.getByRole("heading", {
      name: "Good Morning, shaktish",
    });
    expect(foo).toBeInTheDocument();
  });
});
