import {createNewTestClient} from "../../../tests/ApolloTestSetup";
import {ApolloProvider} from "@apollo/client";
import FileExplorer from "./FileExplorer";
import ProjectEntry from "../project/ProjectEntry";
import {graphql} from "msw";

export default {
    title: "Menu/FileExplorer",
    component: FileExplorer
}

const MockTemplate = (args) => {
    const testApollo = createNewTestClient();
    return (
        <ApolloProvider client={testApollo.client} >
            <FileExplorer />
        </ApolloProvider>
    )
}

export const Loading = MockTemplate.bind({});
Loading.parameters = {
    msw: {
        handlers: [
            graphql.query("ProjectsList", (reg, res, ctx) => {
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
            graphql.query("ProjectsList", (reg, res, ctx) => {
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