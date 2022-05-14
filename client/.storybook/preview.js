import {graphql} from "msw";
import {initialize, mswDecorator} from 'msw-storybook-addon';
import projectListJson from "./mocks/ProjectsList.json";
import projectFilesListJson from "./mocks/ProjectFilesList.json"
import contentCategoryJson from "./mocks/ProjectContentsList.json"
import itemDisplayInfoJson from "./mocks/ItemDisplayInfo.json"
import '../src/index.css'

// Initialize MSW https://storybook.js.org/addons/msw-storybook-addon
initialize();

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator];

export const parameters = {
    msw: {
        handlers: [
            graphql.query("ProjectsList", (reg, res, ctx) => {
                return res(ctx.data(projectListJson))
            }),
            graphql.query("ProjectContentsList", (reg, res, ctx) => {
                return res(ctx.data(contentCategoryJson))
            }),
            graphql.query("ProjectFilesList", (reg, res, ctx) => {
                return res(ctx.data(projectFilesListJson))
            }),
            graphql.query("ItemDisplayInfo", (reg, res, ctx) => {
                const {itemID} = reg.variables;
                return res(ctx.data(itemDisplayInfoJson[itemID]))
            })
        ]
    }
};