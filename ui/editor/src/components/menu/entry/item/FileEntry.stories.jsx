import {createNewTestClient} from "../../../../tests/ApolloTestSetup";
import {ApolloProvider} from "@apollo/client";
import FileEntry from "./FileEntry";
import {FiFile} from "react-icons/fi";

export default {
    title: "Menu/FileEntry/Item",
    component: FileEntry
}

const MockTemplate = (args) => {
    const testApollo = createNewTestClient();
    return (
        <ApolloProvider client={testApollo.client} >
            <FileEntry fileName={"some/path/to/file.json"} icon={<FiFile/>} />
        </ApolloProvider>
    )
}

export const Component = MockTemplate.bind({});