import { screen, render, act } from "@testing-library/react";
import UserList2 from "./user_list02";
import { BrowserRouter as Router } from "react-router-dom";
import { server } from "../../mocks/server";
import { delay, http, HttpResponse } from "msw";

describe("User list", () => {
  test("Renders the component with users", async () => {
    await act(async () => {
      render(
        <Router>
          <UserList2 />
        </Router>
      );
    });
    expect(screen.getAllByRole("user-item")).toHaveLength(1);
  });

  test("Renders loading state", async () => {
    // Update the server response to simulate error state
    server.use(
      http.get("https://api.github.com/users", async () => {
        await delay(3000);
        // return HttpResponse.json([
        //   { id: 1, login: "test" },
        //   { id: 1, login: "test2" },
        // ]);
      })
    );

    await act(async () => {
      render(
        <Router>
          <UserList2 />
        </Router>
      );
    });
    screen.debug();
    const loadingState = await screen.findByText("Loading...");

    expect(loadingState).toBeInTheDocument();
  });

  test("Renders error state when fetch fails", async () => {
    // Update the server response to simulate error state
    server.use(
      http.get("https://api.github.com/users", () => {
        return new HttpResponse(null, { status: 401 });
        //   return new HttpResponse(null, { status: 401 })
      })
    );

    await act(async () => {
      render(<UserList2 />);
    });
    // Assert that the error state is displayed
    expect(screen.getByText("Unable to load users")).toBeInTheDocument();
  });
});
