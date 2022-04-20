import { graphql } from "msw";
import { initialize, mswDecorator } from 'msw-storybook-addon';

// Initialize MSW https://storybook.js.org/addons/msw-storybook-addon
initialize();

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator];

export const parameters = {
    msw: {
        handlers: [
            graphql.query("ProjectsList", (reg, res, ctx) => {
                return res(
                    ctx.data({
                        projects: [
                            {
                                id: 1239,
                                name: "My Project"
                            },
                            {
                                id: 1240,
                                name: "ICBM-Classic"
                            }
                        ]
                    })
                )
            }),
            graphql.query("TemplatesList", (reg, res, ctx) => {
                return res(
                    ctx.data({
                        project: {
                            templates: [
                                {
                                    id: 4,
                                    name: "Shaped Crafting"
                                },
                                {
                                    id: 5,
                                    name: "Shapeless Crafting"
                                }
                            ]
                        }
                    })
                )
            }),
            graphql.query("FilesList", (reg, res, ctx) => {
                return res(
                    ctx.data({
                        template: {
                            files: [
                                {
                                    name: "explosives/grenade.json"
                                },
                                {
                                    name: "explosives/tree.json"
                                }
                            ]
                        }
                    })
                )
            })
        ]
    }
};