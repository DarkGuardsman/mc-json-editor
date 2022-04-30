import {createNewTestClient} from "../../../../tests/ApolloTestSetup";
import {ApolloProvider} from "@apollo/client";
import {createErrorParameters, createLoadingParameters} from "../../../../tests/StoryBookHelpers";
import FileEntryList from "./FileEntryList";

export default {
    title: "Menu/FileEntry/List",
    component: FileEntryList
}

const MockTemplate = (args) => {
    const testApollo = createNewTestClient();
    return (
        <ApolloProvider client={testApollo.client} >
            <FileEntryList projectId={0} categoryId={1} />
        </ApolloProvider>
    )
}

export const LoadingState = MockTemplate.bind({});
LoadingState.parameters = createLoadingParameters("ProjectFilesList");

export const SuccessState = MockTemplate.bind({});

export const ErrorState = MockTemplate.bind({});
ErrorState.parameters = createErrorParameters("ProjectFilesList");