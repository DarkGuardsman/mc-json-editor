import {getServer} from "../../../tests/MswSetup";
import {Error, Loading, Success} from "./ContentCategoryMenu.stories";
import {render, screen, waitFor} from "@testing-library/react";
import {mockErrorConsole, unmockErrorConsole, validateNoConsoleErrors} from "../../../tests/ConsoleMocks";
import {parameters} from "../../../../.storybook/preview";

const server = getServer();

describe('render states', () => {
    beforeEach(mockErrorConsole);
    afterEach(unmockErrorConsole);

    test("loading", async () => {
        server.use(...Loading.parameters.msw.handlers);
        await render(<Loading />);

        //Check that header shows
        const header = await screen.findByText("Shape Crafting");
        expect(header).toBeInTheDocument();

        //Expect to show loading while we wait for API
        expect(screen.getByText(/Loading/)).toHaveTextContent("Loading Files...");

        //Validate console outputs no errors during rendering
        validateNoConsoleErrors();
    });

    test("success", async () => {
        server.use(...parameters.msw.handlers);
        await render(<Success />);

        //Check that header shows
        const header = await screen.findByText("Shape Crafting");
        expect(header).toBeInTheDocument();

        await waitFor(() => screen.getByRole("list"));

        //Wait for list to generate from API call
        const list = screen.getByRole("list");
        expect(list).toBeInTheDocument();

        //Check for entries
        const nodes = document.getElementsByTagName("li");
        expect(nodes.length).toEqual(2);

        //Validate console outputs no errors during rendering
        validateNoConsoleErrors();
    });

    test("errored", async () => {
        server.use(...Error.parameters.msw.handlers);
        await render(<Error />);

        //Check that header shows
        const header = await screen.findByText("Shape Crafting");
        expect(header).toBeInTheDocument();


        //Expect to show error when the API returns an error
        const message = await screen.findByText("Failed to load files...");
        expect(message).toBeInTheDocument();

        //Validate console outputs no errors during rendering
        validateNoConsoleErrors();
    });
});