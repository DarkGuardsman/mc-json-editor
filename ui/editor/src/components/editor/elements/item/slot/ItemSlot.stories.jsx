import {createNewTestClient} from "../../../../../tests/ApolloTestSetup";
import {ApolloProvider} from "@apollo/client";
import {createErrorParameters, createLoadingParameters} from "../../../../../tests/StoryBookHelpers";
import ItemSlot from "./ItemSlot";

export default {
    title: "Editor/Item/Slot",
    component: ItemSlot
}

const MockTemplate = (args) => {
    const testApollo = createNewTestClient();
    const backgroundStyle = {
        maxWidth: '100px',
        maxHeight: `100px`,
        background: `#d3d3d3`,
        padding: `13px`,
        display: 'inline-block'
    };
    return (
        <ApolloProvider client={testApollo.client} >
            <div style={backgroundStyle}>
                <ItemSlot itemID={"minecraft:oak_log"} />
            </div>
            <hr/>
            <div style={backgroundStyle}>
                <ItemSlot itemID={"minecraft:oak_planks"} />
            </div>
            <hr/>
            <div style={backgroundStyle}>
                <ItemSlot itemID={"minecraft:oak_sapling"} />
            </div>
        </ApolloProvider>
    )
}

export const LoadingState = MockTemplate.bind({});
LoadingState.parameters = createLoadingParameters("ItemDisplayInfo");

export const SuccessState = MockTemplate.bind({});

export const ErrorState = MockTemplate.bind({});
ErrorState.parameters = createErrorParameters("ItemDisplayInfo");