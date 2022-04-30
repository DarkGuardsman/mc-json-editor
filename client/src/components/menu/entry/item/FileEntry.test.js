import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {mockErrorConsole, unmockErrorConsole, validateNoConsoleErrors} from "../../../../tests/ConsoleMocks";
import {Component} from "./FileEntry.stories";
import {currentFileVar} from "../../../../ApolloSetup";

describe('render states', () => {
    beforeEach(mockErrorConsole);
    afterEach(unmockErrorConsole);

    test("component", async () => {
        await render(<Component />);

        const button = screen.getByRole("button");
        expect(button).toHaveTextContent(/^some\/path\/to\/file.json$/);

        //Validate console outputs no errors during rendering
        validateNoConsoleErrors();
    });
});

describe('interaction', () => {
    test("click button", async () => {
        await render(<Component />);

        fireEvent.click(screen.getByRole("button"));

        expect(currentFileVar()).toEqual("some/path/to/file.json");
    });
})