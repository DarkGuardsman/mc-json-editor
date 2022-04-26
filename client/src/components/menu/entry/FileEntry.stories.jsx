import {createNewTestClient} from "../../../tests/ApolloTestSetup";
import {ApolloProvider} from "@apollo/client";
import FileEntry from "./FileEntry";

export default {
    title: "Menu/FileEntry",
    component: FileEntry
}

const MockTemplate = (args) => {
    const testApollo = createNewTestClient();
    return (
        <ApolloProvider client={testApollo.client} >
            <FileEntry fileName={"some/path/to/file.json"} />
        </ApolloProvider>
    )
}

export const Success = MockTemplate.bind({});