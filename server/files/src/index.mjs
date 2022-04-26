import {loadTypedefs} from "@graphql-tools/load";
import {GraphQLFileLoader} from "@graphql-tools/graphql-file-loader";
import {mergeTypeDefs} from "@graphql-tools/merge";
import {ApolloServer} from "apollo-server";
import {buildSubgraphSchema} from "@apollo/subgraph";
import Lodash from 'lodash';

const SERVER_PORT = process.env.PORT;

const sources = await loadTypedefs('./src/graphql/**/*.graphql', {
    loaders: [new GraphQLFileLoader()]
});
const documentNodes = sources.map(source => source.document);
const typeDefs = mergeTypeDefs(documentNodes);

const projects = [
    {
        id: 0,
        name: "ICBM",
        templates: [
            {
                id: 0,
                name: "Shaped Crafting"
            },
            {
                id: 1,
                name: "Ex Crafting"
            }
        ]
    },
    {
        id: 1,
        name: "Minecraft",
        templates: [
            {
                id: 0,
                name: "Shaped Crafting"
            },
            {
                id: 11,
                name: "Furnace"
            }
        ]
    },
    {
        id: 2,
        name: "Winter",
        templates: [
            {
                id: 0,
                name: "Shaped Crafting"
            },
            {
                id: 4,
                name: "Wing Crafting"
            }
        ]
    }
];

const templates = [
    {
        id: 0,
        name: "Shaped Crafting"
    },
    {
        id: 1,
        name: "Ex Crafting"
    },
    {
        id: 4,
        name: "Wing Crafting"
    },
    {
        id: 11,
        name: "Furnace"
    }
];

const files = [
    {
        projectId: 0,
        templateId: 0,
        name: "crafting/iron_rod.json"
    },
    {
        projectId: 0,
        templateId: 1,
        name: "explosives/tnt.json"
    },
    {
        projectId: 0,
        templateId: 1,
        name: "explosives/condensed.json"
    }
]


//Setup resolvers
const resolvers = {
    Query: {
        projects: async (parent, args, {dataSources}, info) => projects.map(project => ({id: project.id, name: project.name})),
        project: async  (parent, {id}, {dataSources}, info) => Lodash.head(projects.filter(project => project.id === id)),
        template: async  (parent, {id}, {dataSources}, info) => Lodash.head(templates.filter(template => template.id === id)),
        files: async  (parent, {templateId, projectId}, {dataSources}, info) => {
            return files
                .filter(file => file.projectId === projectId && file.templateId === templateId)
                .map(file => ({name: file.name}))
        }
    }
};

const server = new ApolloServer({
    schema: buildSubgraphSchema({
        typeDefs,
        resolvers
    }),
    dataSources: () => ({}),
    context: ({req}) => {
        return {
            headers: req.headers
        }
    }
});
server.listen(SERVER_PORT).then(({url}) => {
    console.log(`Server ready at ${url}`);
})