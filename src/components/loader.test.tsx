import { render, screen } from "@testing-library/react";
import Loader from "./loader";

describe("Loader", () => {
  test("Loader w/o params", () => {
    render(<Loader />);
    const loader = screen.getByRole("progressbar");
    expect(loader).toBeInTheDocument();
  });
});
