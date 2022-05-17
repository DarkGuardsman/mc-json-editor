import {createNewTestClient} from "../../../../../tests/ApolloTestSetup";
import {ApolloProvider} from "@apollo/client";
import {createErrorParameters, createLoadingParameters} from "../../../../../tests/StoryBookHelpers";
import ItemGrid from "./ItemGrid";

export default {
    title: "Editor/Item/Grid",
    component: ItemGrid
}

const MockTemplate = (args) => {
    const testApollo = createNewTestClient();
    const backgroundStyle = {
        background: `#d3d3d3`,
        padding: `13px`,
        display: 'inline-block'
    };

    const items = [
        ["minecraft:oak_planks", "minecraft:oak_planks", "minecraft:oak_planks"],
        ["minecraft:oak_planks", null, "minecraft:oak_planks"],
        ["minecraft:oak_planks", "minecraft:oak_planks", "minecraft:oak_planks"]
    ]
    return (
        <ApolloProvider client={testApollo.client} >
            <div style={backgroundStyle}>
                <ItemGrid items={items} />
            </div>
        </ApolloProvider>
    )
}

export const LoadingState = MockTemplate.bind({});
LoadingState.parameters = createLoadingParameters("ItemDisplayInfo");

export const SuccessState = MockTemplate.bind({});

export const ErrorState = MockTemplate.bind({});
ErrorState.parameters = createErrorParameters("ItemDisplayInfo");