import {graphql} from "msw";
import {initialize, mswDecorator} from 'msw-storybook-addon';
import '../src/index.css'
import itemTableJson from './mocks/ItemTable.json'

// Initialize MSW https://storybook.js.org/addons/msw-storybook-addon
initialize();

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator];

export const parameters = {
    msw: {
        handlers: [
            graphql.query("ItemTable", (reg, res, ctx) => {
                return res(ctx.data(itemTableJson))
            }),
    ]
    }
};