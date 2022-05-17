const errorConsole = console.error;

/**
 * Mocks error console
 */
export function mockErrorConsole() {
    console.error = jest.fn();
}

/**
 * Unmocks error console
 */
export function unmockErrorConsole() {
    console.error = errorConsole;
}

/**
 * Checks that console has no errors
 *
 * @param {Function} [filter] - optional filter to clear out errors that were expected
 */
export function validateNoConsoleErrors(filter = () => true) {
    const errors = getConsoleErrors().filter(filter);
    expect(errors).toEqual([]);
}

/**
 * Gets all errors on the console
 *
 * @returns {Array.<Array.<*>>} mock entries from error console
 */
export function getConsoleErrors() {
    if(console.error.mock === undefined) {
        throw new Error("Forgot to mock console errors");
    }
    return console.error.mock.calls;
}