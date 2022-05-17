import {graphql} from "msw";

export function createLoadingParameters(operationName) {
    return {
        msw: {
            handlers: [
                graphql.query(operationName, (reg, res, ctx) => {
                    return res(
                        ctx.delay("infinite")
                    )
                }),
            ]
        }
    }
}

export function createErrorParameters(operationName) {
    return {
        msw: {
            handlers: [
                graphql.query(operationName, (reg, res, ctx) => {
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
}