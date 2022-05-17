import {createNewTestClient} from "../../../../tests/ApolloTestSetup";
import {ApolloProvider} from "@apollo/client";
import ProjectList from "./ProjectList";
import {createErrorParameters, createLoadingParameters} from "../../../../tests/StoryBookHelpers";

export default {
    title: "Menu/Project/List",
    component: ProjectList
}

const MockTemplate = (args) => {
    const testApollo = createNewTestClient();
    return (
        <ApolloProvider client={testApollo.client} >
            <ProjectList />
        </ApolloProvider>
    )
}

export const Loading = MockTemplate.bind({});
Loading.parameters =createLoadingParameters("ProjectsList")

export const Success = MockTemplate.bind({});

export const Error = MockTemplate.bind({});
Error.parameters = createErrorParameters("ProjectsList")