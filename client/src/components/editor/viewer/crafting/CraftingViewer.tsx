import ItemGrid from "../../elements/item/grid/ItemGrid";
import ItemSlot from "../../elements/item/slot/ItemSlot";
import styles from "./CraftingViewer.module.css"
import {FiArrowRight} from "react-icons/fi";
import {get} from 'lodash';
import {ComponentSchema, ItemGridSchema, ItemResultSchema, ProcessingSchema} from "./CraftingTypes";
import {handleProcessing} from "./JsonProcessingFunction";
import {ItemKey} from "../../../../type/ItemKey";

interface CraftingViewerProps {
    json: object
}

const PROCESSING_SCHEMA : ProcessingSchema = {
    components: [
        {
            key: "item:grid",
            field: "pattern",
            processing: [
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
                            action: "map", //Input: ["C", "X", "C"]$S
                            processing: [
                                {
                                    action: "replace",
                                    match: " ",
                                    insert: null
                                },
                                {
                                    run: "definedOnly",
                                    action: "lookup:json", //"C" -> { item: "minecraft:chest", data: 0 }
                                    field: "key",
                                    arg: "entry" //"C"
                                },
                                {
                                    action: "switch",
                                    paths: [
                                        {
                                            condition: "contains",
                                            field: "data",
                                            processing: [{
                                                run: "definedOnly",
                                                action: "format", // { item: "minecraft:chest", data: 0 } -> "minecraft:chest@0"
                                                data: [
                                                    "item",
                                                    "data"
                                                ],
                                                format: "{0}@{1}"
                                            }]
                                        },
                                        //TODO add tag support
                                        //TODO add list support
                                        //TODO add ore-dict support
                                        //TODO add custom entry support
                                        {
                                            condition: "default",
                                            field: "item",
                                            processing: [{
                                                run: "definedOnly",
                                                action: "format",
                                                data: [
                                                    "item"
                                                ],
                                                format: "{0}"
                                            }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            key: "arrow:right"
        },
        {
            key: "item:result",
            item: {
                field: "result",
                processing: [
                    {
                        action: "format", // { item: "minecraft:chest", data: 0 } -> "minecraft:chest@0"
                        data: [
                            "item",
                            "data"
                        ],
                        format: "{0}@{1}"
                    }
                ]
            },
            count: {
                field: "result.count"
            }
        }
    ]
}

export default function CraftingViewer({json}: CraftingViewerProps): JSX.Element {
    if (json === undefined) {
        return (
            <div className={styles.container}>
                No Json to convert to view
            </div>
        );
    }

    const processingSchema = PROCESSING_SCHEMA; //TODO pull schema from server based on JSON category

    return (
        <div className={styles.container}>

            {
                processingSchema.components.map(component => {
                    if(component.key === "item:grid") {
                        return BuildGrid(component as ItemGridSchema, json);
                    }
                    else  if(component.key === "item:result") {
                        return BuildResult(component as ItemResultSchema, json);
                    }
                    else if(component.key === "arrow:right") {
                        return BuildArrow(component, json);
                    }
                    return null;
                })
            }

        </div>
    );
}

function BuildGrid(processing: ItemGridSchema, json: object) {
    const data = get(json, processing.field);
    const items = handleProcessing(data, processing.processing, json) as unknown as ItemKey[][];
    console.log("buildGrid", items);
    return <ItemGrid items={items}/>;
}

function BuildArrow(processing: ComponentSchema, json: object) {
    return (
        <div className={styles.arrow}>
            <FiArrowRight size={64}/>
        </div>
    )
}

function BuildResult(processing: ItemResultSchema, json: object) {
    const item = handleProcessing(get(json, processing.item.field), processing.item.processing, json) as unknown as ItemKey;
    return (
        <div className={styles.result}>
            <ItemSlot itemID={item}/>
        </div>
    )
}