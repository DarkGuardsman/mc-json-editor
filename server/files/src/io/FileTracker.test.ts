import FileTracker from "./FileTracker";

describe('addFiles', () => {
    test("single add", () => {
        const fileTracker = new FileTracker({
            id: 0,
            name: "File Tracker Test",
            path: "/some/random/path/"
        });

        expect(fileTracker).toBeDefined();
    })
});
