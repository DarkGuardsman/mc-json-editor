import {graphql} from "msw";
import {initialize, mswDecorator} from 'msw-storybook-addon';
import '../src/index.css'

// Initialize MSW https://storybook.js.org/addons/msw-storybook-addon
initialize();

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator];

export const parameters = {
    msw: {
        handlers: [
            /*graphql.query("ProjectsList", (reg, res, ctx) => {
                return res(ctx.data(projectListJson))
            }),*/
    }
};