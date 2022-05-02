import splitFileEntries from "./FileListFunction";

describe("bad inputs", () => {
    test("empty array", () => {
        expect(splitFileEntries([])).toEqual([]);
    });
    test("malformed file path", () => {
        const inputData = [
            {
                "name": "folder/"
            }
        ];

        const outputData = splitFileEntries(inputData);

        expect(outputData).toEqual([
            {
                files: [
                    {
                        file: "folder/",
                        isFolder: false,
                        name: "Malformed Path",
                        errored: true
                    }
                ],
                isFolder: true,
                path: "/",
                name: "folder"
            }
        ]);
    });
});


test("single file no nesting", () => {
    const inputData = [
        {
            "name": "cut_log.json"
        }
    ];

    const outputData = splitFileEntries(inputData);

    expect(outputData).toEqual([
        {
            name: "cut_log.json",
            file: "cut_log.json",
            isFolder: false,
        }
    ]);
});

test("multi file no nesting", () => {
    const inputData = [
        {
            "name": "cut_log1.json"
        },
        {
            "name": "cut_log2.json"
        },
        {
            "name": "cut_log3.json"
        }
    ];

    const outputData = splitFileEntries(inputData);

    expect(outputData).toEqual([
        {
            name: "cut_log1.json",
            file: "cut_log1.json",
            isFolder: false,
        },
        {
            name: "cut_log2.json",
            file: "cut_log2.json",
            isFolder: false,
        },
        {
            name: "cut_log3.json",
            file: "cut_log3.json",
            isFolder: false,
        }
    ]);
});

test("single file with nesting", () => {
    const inputData = [
        {
            "name": "turner/cut_log.json"
        }
    ];

    const outputData = splitFileEntries(inputData);

    expect(outputData).toEqual([
        {
            name: "turner",
            isFolder: true,
            path: "/",
            files: [
                {
                    name: "cut_log.json",
                    file: "turner/cut_log.json",
                    isFolder: false,
                }
            ]
        }
    ]);
});

test("multi file with single nesting", () => {
    const inputData = [
        {
            "name": "turner/cut_log0.json"
        },
        {
            "name": "turner/cut_log1.json"
        },
        {
            "name": "turner/cut_log2.json"
        }
    ];

    const outputData = splitFileEntries(inputData);

    expect(outputData).toEqual([
        {
            name: "turner",
            isFolder: true,
            path: "/",
            files: [
                {
                    name: "cut_log0.json",
                    file: "turner/cut_log0.json",
                    isFolder: false,
                },
                {
                    name: "cut_log1.json",
                    file: "turner/cut_log1.json",
                    isFolder: false,
                },
                {
                    name: "cut_log2.json",
                    file: "turner/cut_log2.json",
                    isFolder: false,
                }
            ]
        }
    ]);
});

test("single file with multi nesting", () => {
    const inputData = [
        {
            "name": "turner/cutting/log_oak.json"
        }
    ];

    const outputData = splitFileEntries(inputData);

    expect(outputData).toEqual([
        {
            name: "turner",
            isFolder: true,
            path: "/",
            files: [
                {
                    name: "cutting",
                    isFolder: true,
                    path: "/turner/",
                    files: [
                        {
                            name: "log_oak.json",
                            file: "turner/cutting/log_oak.json",
                            isFolder: false,
                        }
                    ]
                }
            ]
        }
    ]);
});

test("maps files", () => {
    const inputData = [
        {
            "name": "/crafting/iron_rod.json"
        },
        {
            "name": "/explosives/tier1/fire.json"
        },
        {
            "name": "/explosives/tier1/condensed.json"
        },
        {
            "name": "/explosives/tier2/tnt3.json"
        },
        {
            "name": "/explosives/tier2/tnt5.json"
        },
        {
            "name": "/explosives/tnt_base.json"
        },
        {
            "name": "/smelting_iron.json"
        },
        {
            "name": "/cut_log.json"
        }
    ];

    const outputData = splitFileEntries(inputData);

    expect(outputData).toEqual([
        {
            name: "crafting",
            isFolder: true,
            path : "/",
            files: [
                {
                    name: "iron_rod.json",
                    file: "crafting/iron_rod.json",
                    isFolder: false
                }
            ]
        },
        {
            name: "explosives",
            isFolder: true,
            path : "/",
            files: [
                {
                    name: "tier1",
                    isFolder: true,
                    path : "/explosives/",
                    files: [
                        {
                            name: "fire.json",
                            file: "explosives/tier1/fire.json",
                            isFolder: false
                        },
                        {
                            name: "condensed.json",
                            file: "explosives/tier1/condensed.json",
                            isFolder: false
                        }
                    ]
                },
                {
                    name: "tier2",
                    isFolder: true,
                    path : "/explosives/",
                    files: [
                        {
                            name: "tnt3.json",
                            file: "explosives/tier2/tnt3.json",
                            isFolder: false
                        },
                        {
                            name: "tnt5.json",
                            file: "explosives/tier2/tnt5.json",
                            isFolder: false
                        }
                    ]
                },
                {
                    name: "tnt_base.json",
                    file: "explosives/tnt_base.json",
                    isFolder: false
                }
            ]
        },
        {
            name: "smelting_iron.json",
            file: "smelting_iron.json",
            isFolder: false
        },
        {
            name: "cut_log.json",
            file: "cut_log.json",
            isFolder: false
        }
    ])
})