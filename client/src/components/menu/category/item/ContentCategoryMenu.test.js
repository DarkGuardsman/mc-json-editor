import {getServer} from "../../../../tests/MswSetup";
import {Component} from "./ContentCategoryMenu.stories";
import {render, screen} from "@testing-library/react";
import {mockErrorConsole, unmockErrorConsole, validateNoConsoleErrors} from "../../../../tests/ConsoleMocks";
import {parameters} from "../../../../../.storybook/preview";

const server = getServer();

describe('render states', () => {
    beforeEach(mockErrorConsole);
    afterEach(unmockErrorConsole);

    test("component", async () => {
        server.use(...parameters.msw.handlers);
        await render(<Component />);

        //Check that header shows
        const header = await screen.findByText("Shape Crafting");
        expect(header).toBeInTheDocument();

        //Expect to show loading while we wait for API
        expect(screen.getByText(/Loading/)).toHaveTextContent("Loading Files...");

        //Validate console outputs no errors during rendering
        validateNoConsoleErrors();
    });
});