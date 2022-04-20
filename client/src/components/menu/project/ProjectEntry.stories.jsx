import {createNewTestClient} from "../../../tests/ApolloTestSetup";
import {ApolloProvider} from "@apollo/client";
import ProjectEntry from "./ProjectEntry";
import TemplateEntry from "../template/TemplateEntry";
import {graphql} from "msw";

export default {
    title: "Menu/ProjectEntry",
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

export const Loading = MockTemplate.bind({});
Loading.parameters = {
    msw: {
        handlers: [
            graphql.query("TemplatesList", (reg, res, ctx) => {
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
            graphql.query("TemplatesList", (reg, res, ctx) => {
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