import ProjectFileSet from "./ContentCategoryMenu";
import {createNewTestClient} from "../../../tests/ApolloTestSetup";
import {ApolloProvider} from "@apollo/client";
import {graphql} from "msw";

export default {
    title: "Menu/TemplateEntry",
    component: ProjectFileSet
}

const MockTemplate = (args) => {
    const testApollo = createNewTestClient();
    return (
        <ApolloProvider client={testApollo.client} >
            <ProjectFileSet templateId={5} templateName={"Shape Crafting"} />
        </ApolloProvider>
    )
}

export const Loading = MockTemplate.bind({});
Loading.parameters = {
    msw: {
        handlers: [
            graphql.query("FilesList", (reg, res, ctx) => {
                return res(
                    ctx.delay("infinite")
                )
            }),
        ]
    }
}

export const Success = MockTemplate.bind({});

export const Error = MockTemplate.bind({});
Error.parameters = {
    msw: {
        handlers: [
            graphql.query("FilesList", (reg, res, ctx) => {
                return res(
                    ctx.errors([
                        {
                            message: "Test Error"
                        }
                    ])
                )
            }),
        ]
    }
}