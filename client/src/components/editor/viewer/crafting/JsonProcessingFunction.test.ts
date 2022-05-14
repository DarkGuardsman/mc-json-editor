import {handleProcessing} from "./JsonProcessingFunction";

describe("handleProcessing", () => {

    describe("input checks", () => {
        it("null steps", () => {
            const result = handleProcessing(
                "SomeRandomThing",
                null,
                {}
            );

            expect(result).toEqual("SomeRandomThing")
        });
        it("undefined steps", () => {
            const result = handleProcessing(
                "SomeRandomThing",
                undefined,
                {}
            );

            expect(result).toEqual("SomeRandomThing")
        });
        it("empty steps", () => {
            const result = handleProcessing(
                "SomeRandomThing",
                [],
                {}
            );

            expect(result).toEqual("SomeRandomThing")
        });
    })


    describe("map", () => {
        it("map -> do nothing", () => {
            const result = handleProcessing(
                ["C", "X", "C"],
                [{
                    action: "map"
                }],
                {}
            );

            expect(result).toEqual(["C", "X", "C"])
        });

        it("map -> character split", () => {
            const result = handleProcessing(
                ["CCC", "C C", "CCC"],
                [{
                    action: "map",
                    processing: [
                        {
                            action: "characters"
                        }
                    ]

                }],
                {}
            );

            expect(result).toEqual([
                ["C", "C", "C"],
                ["C", " ", "C"],
                ["C", "C", "C"]
            ])
        });

        it("map -> character split -> map -> blank to null", () => {
            const result = handleProcessing(
                ["CCC", "C C", "CCC"],
                [{
                    action: "map",
                    processing: [
                        {
                            action: "characters"
                        },
                        {
                            action: "map",
                            processing: [
                                {
                                    action: "replace",
                                    match: " ",
                                    insert: null
                                }
                            ]
                        }
                    ]

                }],
                {}
            );

            expect(result).toEqual([
                ["C", "C", "C"],
                ["C", null, "C"],
                ["C", "C", "C"]
            ])
        })
    });

    describe("lookup:json", () => {
        it("entry", () => {
            const result = handleProcessing(
                "c",
                [{
                    action: "lookup:json",
                    field: "key",
                    arg: "entry"
                }],
                {
                    key: {
                        c: {
                            item: "minecraft:log"
                        }
                    }
                }
            );

            expect(result).toEqual({
                item: "minecraft:log"
            })
        });
    });

    describe("replace", () => {
        it("blank string to null: matched", () => {
            const result = handleProcessing(
                " ",
                [{
                    action: "replace",
                    match: " ",
                    insert: null
                }],
                {}
            );

            expect(result).toEqual(null);
        });

        it("blank string to null: not matched", () => {
            const result = handleProcessing(
                "C",
                [{
                    action: "replace",
                    match: " ",
                    insert: null
                }],
                {}
            );

            expect(result).toEqual("C");
        });
    })

    describe("characters", () => {
        it("split", () => {
            const result = handleProcessing(
                "XYZ",
                [{
                    action: "characters"
                }],
                {}
            );

            expect(result).toEqual(["X", "Y", "Z"])
        });

        it("not string", () => {
            expect(() => {
                    handleProcessing(
                        ["X", "Y", "Z"],
                        [{
                            action: "characters"
                        }],
                        {})
                }
            ).toThrowError(new Error("CurrenData is not a string"))
        })
    });

    describe("format", () => {
        const result = handleProcessing(
            {item: "minecraft:chest", data: 0},
            [{
                action: "format",
                data: [
                    "item",
                    "data"
                ],
                format: "{0}@{1}"
            }],
            {}
        );

        expect(result).toEqual("minecraft:chest@0")
    });

    //TODO not include in coverage
    describe("examples", () => {
        it("item:grid", () => {
            const steps = [
                {
                    action: "map", // ["CXC"] -> [["C", "X", "C"]]
                    processing: [
                        {
                            action: "characters"
                        }
                    ]
                },
                {
                    action: "map", //Input: [["C", "X", "C"]]
                    processing: [
                        {
                            action: "map", //Input: ["C", "X", "C"]
                            processing: [
                                {
                                    action: "lookup:json", //"C" -> { item: "minecraft:chest", data: 0 }
                                    field: "key",
                                    arg: "entry" //"C"
                                },
                                //TODO add switch statement to handle different types (single, multi, tag, ore dictionary, custom)
                                {
                                    action: "format", // { item: "minecraft:chest", data: 0 } -> "minecraft:chest@0"
                                    data: [
                                        "item",
                                        "data"
                                    ],
                                    format: "{0}@{1}"
                                }
                            ]
                        }
                    ]
                }
            ]
            const json = {
                "result": {
                    "item": "minecraft:chest",
                    "data": 0,
                    "count": 1
                },
                "pattern": [
                    "PL",
                    "LP"
                ],
                "type": "minecraft:crafting_shaped",
                "key": {
                    "P": {
                        "item": "minecraft:oak_planks",
                        "data": 0
                    },
                    "L": {
                        "item": "minecraft:oak_log",
                        "data": 0
                    }
                }
            }
            const fieldData = json.pattern;

            const result = handleProcessing(fieldData, steps, json);

            expect(result).toEqual([
                ["minecraft:oak_planks@0", "minecraft:oak_log@0"],
                ["minecraft:oak_log@0", "minecraft:oak_planks@0"]
            ])
        })
    })
})