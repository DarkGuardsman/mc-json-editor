import {getConsoleErrors, mockErrorConsole, unmockErrorConsole, validateNoConsoleErrors} from "./ConsoleMocks";

const consoleError = console.error;

describe("error console", () => {

    afterEach(() => {
        //Force reset back to default console
        console.error = consoleError;
    });

    test("console is clean", () => {
        expect(consoleError.toString()).toEqual("function () { [native code] }");
    });

    test("basic mock path", () => {

        //Test we can mock
        mockErrorConsole();
        expect(console.error._isMockFunction).toBeTruthy();

        //Test we can capture error
        console.error("Test message");
        expect(console.error.mock.calls).toEqual([["Test message"]])

        //Test we can unmock
        unmockErrorConsole();
        expect(console.error).toBe(consoleError);
    });

    describe("validateNoConsoleErrors", () => {
        beforeEach(mockErrorConsole);
        afterEach(unmockErrorConsole);

        test("nothing in console", () => {
            validateNoConsoleErrors();
        });

        test("no error on info", () => {
            console.info("Shouldn't error on me")
            validateNoConsoleErrors();
        });

        test("no error on warn", () => {
            console.warn("Shouldn't error on me")
            validateNoConsoleErrors();
        });

        test("no error on debug", () => {
            console.debug("Shouldn't error on me")
            validateNoConsoleErrors();
        });

        test("should error on errors", () => {
            console.error("Should error on me");

            let failed = false;
            try {
                validateNoConsoleErrors();
                failed = true;
            }catch (ex) {
                expect(ex.constructor.name).toEqual("JestAssertionError");
            }

            expect(failed).toBeFalsy();
        });
    });

    describe("validateNoConsoleErrors", () => {
        afterEach(unmockErrorConsole);

        test("get no errors", () => {
            mockErrorConsole();
            expect(getConsoleErrors()).toEqual([]);
        });

        test("get errors", () => {
            mockErrorConsole();
            console.error("Thing1");
            console.error("Thing2");
            expect(getConsoleErrors()).toEqual([["Thing1"], ["Thing2"]]);
        });

        test("failed to setup", () => {
            let failed = false;
            try {
                getConsoleErrors();
                failed = true;
            }catch (ex) {
                expect(ex).toEqual(new Error("Forgot to mock console errors"));
            }
            expect(failed).toBeFalsy();
        });
    });
});