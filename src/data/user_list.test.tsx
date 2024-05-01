import {render, screen} from "@testing-library/react";
import { act } from "@testing-library/react";
import UserList from "./user_list";
import { server } from "../../mocks/server";
import { http, delay, HttpResponse } from "msw";
import { MemoryRouter } from 'react-router-dom';



describe("Render User List component", () => {
    test("Load User List - check the length ", async () => {
        await act(async ()=>{
            render(<MemoryRouter>
            <UserList />
          </MemoryRouter>)
            
        });
        expect(screen.getAllByText("View Profile")).toHaveLength(1);
    });

    test("Userlist - loading state", async ()=>{
        server.use(
            http.get("https://api.github.com/users", async () => {
                await delay (3000)
            })
        )
        await act(async () => {
            render(<MemoryRouter>
                <UserList />
            </MemoryRouter>)
        });
        screen.debug();
        expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    test("Userlist - Renders error state", () => {
        server.use(http.get("https://api.github.com/users", () => {
            return new HttpResponse(null, {status : 401})
        }));
    })
})