import ItemGrid from "../../elements/item/grid/ItemGrid";
import ItemSlot from "../../elements/item/slot/ItemSlot";
import styles from "./CraftingViewer.module.css"
import {FiArrowRight} from "react-icons/all";
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
                                    format: "{1}@{2}"
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
                        format: "{1}@{2}"
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