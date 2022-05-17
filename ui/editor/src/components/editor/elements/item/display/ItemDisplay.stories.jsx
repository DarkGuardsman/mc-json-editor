import {createNewTestClient} from "../../../../../tests/ApolloTestSetup";
import {ApolloProvider} from "@apollo/client";
import {createErrorParameters, createLoadingParameters} from "../../../../../tests/StoryBookHelpers";
import ItemDisplay from "./ItemDisplay";

export default {
    title: "Editor/Item/Display",
    component: ItemDisplay
}

const MockTemplate = (args) => {
    const testApollo = createNewTestClient();
    return (
        <ApolloProvider client={testApollo.client} >
            <ItemDisplay itemID={"minecraft:oak_log"} />
        </ApolloProvider>
    )
}

export const LoadingState = MockTemplate.bind({});
LoadingState.parameters = createLoadingParameters("ItemDisplayInfo");

export const SuccessState = MockTemplate.bind({});

export const ErrorState = MockTemplate.bind({});
ErrorState.parameters = createErrorParameters("ItemDisplayInfo");