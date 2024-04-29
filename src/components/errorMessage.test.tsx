import { render, screen } from "@testing-library/react";
import ErrorMessage from "./errorMessage";

describe("Error message component", () => {
  test("Show Error Message", () => {
    render(<ErrorMessage />);
    const errorMessage = screen.getByText(
      "An error occured while fetching the data"
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
