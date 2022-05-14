import {createNewTestClient} from "../../../../tests/ApolloTestSetup";
import {ApolloProvider} from "@apollo/client";
import CraftingViewer from "./CraftingViewer";

export default {
    title: "Editor/Views/Crafting",
    component: CraftingViewer
}

const MockTemplate = (args) => {
    const testApollo = createNewTestClient();
    return (
        <ApolloProvider client={testApollo.client}>
            <CraftingViewer {...args}/>
        </ApolloProvider>
    )
}

export const NoJson = MockTemplate.bind({});

export const TwoByTwo = MockTemplate.bind({});
TwoByTwo.args = {
    json: {
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
};