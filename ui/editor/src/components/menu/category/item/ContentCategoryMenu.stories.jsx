import {createNewTestClient} from "../../../../tests/ApolloTestSetup";
import {ApolloProvider} from "@apollo/client";
import ContentCategoryMenu from "./ContentCategoryMenu";

export default {
    title: "Menu/ContentCategory/Item",
    component: ContentCategoryMenu
}

const MockTemplate = (args) => {
    const testApollo = createNewTestClient();
    return (
        <ApolloProvider client={testApollo.client} >
            <ContentCategoryMenu projectId={0} categoryId={5} categoryName={"Shape Crafting"} />
        </ApolloProvider>
    )
}

export const Component = MockTemplate.bind({});