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
        name: "ICBM"
    }
];

const projectFileSets = [
    {
        projectId: 0,
        category: {
            id: 0
        }
    },
    {
        projectId: 0,
        category: {
            id: 1
        }
    }
];



const files = [
    {
        projectId: 0,
        categoryId: 0,
        name: "crafting/iron_rod.json"
    },
    {
        projectId: 0,
        categoryId: 1,
        name: "explosives/tnt.json"
    },
    {
        projectId: 0,
        categoryId: 1,
        name: "explosives/condensed.json"
    }
]

function getProjects() {
    return projects.map(project => ({id: project.id, name: project.name}));
}

function getProject(id) {
    return Lodash.head(getProjects().filter(project => project.id === id));
}


//Setup resolvers
const resolvers = {
    Project: {
        contents: async (parent, args, {dataSources}, info) => {
            return projectFileSets.filter(set => set.projectId === parent.id)
        },
    },
    ProjectFileSet : {
        entries: async  (parent) => {
            const data = files
                .filter(file => file.categoryId === parent.category.id && file.projectId === parent.projectId)
                .map(file => ({name: file.name}));
            return data;
        }
    },
    Query: {
        projects: async (parent, args, {dataSources}, info) => getProjects(),
        project: async  (parent, {id}, {dataSources}, info) => getProject(id)
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