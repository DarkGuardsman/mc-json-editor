import {createNewTestClient} from "../../../../tests/ApolloTestSetup";
import {ApolloProvider} from "@apollo/client";
import {createErrorParameters, createLoadingParameters} from "../../../../tests/StoryBookHelpers";
import ContentCategoryList from "./ContentCategoryList";

export default {
    title: "Menu/ContentCategory/List",
    component: ContentCategoryList
}

const MockTemplate = (args) => {
    const testApollo = createNewTestClient();
    return (
        <ApolloProvider client={testApollo.client} >
            <ContentCategoryList projectId={0} />
        </ApolloProvider>
    )
}

export const LoadingState = MockTemplate.bind({});
LoadingState.parameters = createLoadingParameters("ProjectContentsList");

export const SuccessState = MockTemplate.bind({});

export const ErrorState = MockTemplate.bind({});
ErrorState.parameters = createErrorParameters("ProjectContentsList");