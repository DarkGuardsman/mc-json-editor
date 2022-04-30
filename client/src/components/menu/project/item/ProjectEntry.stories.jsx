import {createNewTestClient} from "../../../../tests/ApolloTestSetup";
import {ApolloProvider} from "@apollo/client";
import ProjectEntry from "./ProjectEntry";

export default {
    title: "Menu/Project/Item",
    component: ProjectEntry
}

const MockTemplate = (args) => {
    const testApollo = createNewTestClient();
    return (
        <ApolloProvider client={testApollo.client} >
            <ProjectEntry projectId={1234} projectName={"ICBM"} />
        </ApolloProvider>
    )
}

export const Component = MockTemplate.bind({});