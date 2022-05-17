import splitFileEntries from "./FileListFunction";

describe("bad inputs", () => {
    test("empty array", () => {
        expect(splitFileEntries([])).toEqual([]);
    });
    test("malformed file path", () => {
        const inputData = [
            {
                "name": "folder/",
                "key": ""
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
                        errored: true,
                        key: "undefined"
                    }
                ],
                isFolder: true,
                key: "folder",
                path: "/",
                name: "folder"
            }
        ]);
    });
});


test("single file no nesting", () => {
    const inputData = [
        {
            "name": "cut_log.json",
            "key": "/home/user1/documents/projects/my_project/src/resources/cut_log.json"
        }
    ];

    const outputData = splitFileEntries(inputData);

    expect(outputData).toEqual([
        {
            name: "cut_log.json",
            file: "cut_log.json",
            isFolder: false,
            key: "/home/user1/documents/projects/my_project/src/resources/cut_log.json"
        }
    ]);
});

test("multi file no nesting", () => {
    const inputData = [
        {
            "name": "cut_log1.json",
            "key": "/home/user1/documents/projects/my_project/src/resources/cut_log1.json"
        },
        {
            "name": "cut_log2.json",
            "key": "/home/user1/documents/projects/my_project/src/resources/cut_log2.json"
        },
        {
            "name": "cut_log3.json",
            "key": "/home/user1/documents/projects/my_project/src/resources/cut_log3.json"
        }
    ];

    const outputData = splitFileEntries(inputData);

    expect(outputData).toEqual([
        {
            name: "cut_log1.json",
            file: "cut_log1.json",
            isFolder: false,
            key: "/home/user1/documents/projects/my_project/src/resources/cut_log1.json"
        },
        {
            name: "cut_log2.json",
            file: "cut_log2.json",
            isFolder: false,
            key: "/home/user1/documents/projects/my_project/src/resources/cut_log2.json"
        },
        {
            name: "cut_log3.json",
            file: "cut_log3.json",
            isFolder: false,
            key: "/home/user1/documents/projects/my_project/src/resources/cut_log3.json"
        }
    ]);
});

test("single file with nesting", () => {
    const inputData = [
        {
            name: "turner/cut_log.json",
            key: "/home/user1/documents/projects/my_project/src/resources/cut_log.json"
        }
    ];

    const outputData = splitFileEntries(inputData);

    expect(outputData).toEqual([
        {
            name: "turner",
            isFolder: true,
            path: "/",
            key: "turner",
            files: [
                {
                    name: "cut_log.json",
                    file: "turner/cut_log.json",
                    isFolder: false,
                    key: "/home/user1/documents/projects/my_project/src/resources/cut_log.json"
                }
            ]
        }
    ]);
});

test("multi file with single nesting", () => {
    const inputData = [
        {
            "name": "turner/cut_log0.json",
            key: "/home/user1/documents/projects/my_project/src/resources/cut_log0.json"
        },
        {
            "name": "turner/cut_log1.json",
            key: "/home/user1/documents/projects/my_project/src/resources/cut_log1.json"
        },
        {
            "name": "turner/cut_log2.json",
            key: "/home/user1/documents/projects/my_project/src/resources/cut_log2.json"
        }
    ];

    const outputData = splitFileEntries(inputData);

    expect(outputData).toEqual([
        {
            name: "turner",
            isFolder: true,
            path: "/",
            key: "turner",
            files: [
                {
                    name: "cut_log0.json",
                    file: "turner/cut_log0.json",
                    isFolder: false,
                    key: "/home/user1/documents/projects/my_project/src/resources/cut_log0.json"
                },
                {
                    name: "cut_log1.json",
                    file: "turner/cut_log1.json",
                    isFolder: false,
                    key: "/home/user1/documents/projects/my_project/src/resources/cut_log1.json"
                },
                {
                    name: "cut_log2.json",
                    file: "turner/cut_log2.json",
                    isFolder: false,
                    key: "/home/user1/documents/projects/my_project/src/resources/cut_log2.json"
                }
            ]
        }
    ]);
});

test("single file with multi nesting", () => {
    const inputData = [
        {
            "name": "turner/cutting/log_oak.json",
            key: "/home/user1/documents/projects/my_project/src/resources/log_oak.json"
        }
    ];

    const outputData = splitFileEntries(inputData);

    expect(outputData).toEqual([
        {
            name: "turner",
            isFolder: true,
            path: "/",
            key: "turner",
            files: [
                {
                    name: "cutting",
                    isFolder: true,
                    path: "/turner/",
                    key: "cutting",
                    files: [
                        {
                            name: "log_oak.json",
                            file: "turner/cutting/log_oak.json",
                            isFolder: false,
                            key: "/home/user1/documents/projects/my_project/src/resources/log_oak.json"
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
            "name": "/crafting/iron_rod.json",
            key: "/home/user1/documents/projects/my_project/src/resources/crafting/iron_rod.json"
        },
        {
            "name": "/explosives/tier1/fire.json",
            key: "/home/user1/documents/projects/my_project/src/resources/explosives/tier1/fire.json"
        },
        {
            "name": "/explosives/tier1/condensed.json",
            key: "/home/user1/documents/projects/my_project/src/resources/explosives/tier1/condensed.json"
        },
        {
            "name": "/explosives/tier2/tnt3.json",
            key: "/home/user1/documents/projects/my_project/src/resources/explosives/tier2/tnt3.json"
        },
        {
            "name": "/explosives/tier2/tnt5.json",
            key: "/home/user1/documents/projects/my_project/src/resources/explosives/tier2/tnt5.json"
        },
        {
            "name": "/explosives/tnt_base.json",
            key: "/home/user1/documents/projects/my_project/src/resources/explosives/tnt_base.json"
        },
        {
            "name": "/smelting_iron.json",
            key: "/home/user1/documents/projects/my_project/src/resources/smelting_iron.json"
        },
        {
            "name": "/cut_log.json",
            key: "/home/user1/documents/projects/my_project/src/resources/cut_log.json"
        }
    ];

    const outputData = splitFileEntries(inputData);

    expect(outputData).toEqual([
        {
            "files": [
                {
                    "file": "crafting/iron_rod.json",
                    "isFolder": false,
                    "key": "/home/user1/documents/projects/my_project/src/resources/crafting/iron_rod.json",
                    "name": "iron_rod.json"
                }
            ],
            "isFolder": true,
            "key": "crafting",
            "name": "crafting",
            "path": "/"
        },
        {
            "files": [
                {
                    "files": [
                        {
                            "file": "explosives/tier1/fire.json",
                            "isFolder": false,
                            "key": "/home/user1/documents/projects/my_project/src/resources/explosives/tier1/fire.json",
                            "name": "fire.json"
                        },
                        {
                            "file": "explosives/tier1/condensed.json",
                            "isFolder": false,
                            "key": "/home/user1/documents/projects/my_project/src/resources/explosives/tier1/condensed.json",
                            "name": "condensed.json"
                        }
                    ],
                    "isFolder": true,
                    "key": "tier1",
                    "name": "tier1",
                    "path": "/explosives/"
                },
                {
                    "files": [
                        {
                            "file": "explosives/tier2/tnt3.json",
                            "isFolder": false,
                            "key": "/home/user1/documents/projects/my_project/src/resources/explosives/tier2/tnt3.json",
                            "name": "tnt3.json"
                        },
                        {
                            "file": "explosives/tier2/tnt5.json",
                            "isFolder": false,
                            "key": "/home/user1/documents/projects/my_project/src/resources/explosives/tier2/tnt5.json",
                            "name": "tnt5.json"
                        }
                    ],
                    "isFolder": true,
                    "key": "tier2",
                    "name": "tier2",
                    "path": "/explosives/"
                },
                {
                    "file": "explosives/tnt_base.json",
                    "isFolder": false,
                    "key": "/home/user1/documents/projects/my_project/src/resources/explosives/tnt_base.json",
                    "name": "tnt_base.json"
                }
            ],
            "isFolder": true,
            "key": "explosives",
            "name": "explosives",
            "path": "/"
        },
        {
            "file": "smelting_iron.json",
            "isFolder": false,
            "key": "/home/user1/documents/projects/my_project/src/resources/smelting_iron.json",
            "name": "smelting_iron.json"
        },
        {
            "file": "cut_log.json",
            "isFolder": false,
            "key": "/home/user1/documents/projects/my_project/src/resources/cut_log.json",
            "name": "cut_log.json"
        }
    ])
})