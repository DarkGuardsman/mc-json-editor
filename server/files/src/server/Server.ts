import {loadTypedefs} from "@graphql-tools/load";
import {GraphQLFileLoader} from "@graphql-tools/graphql-file-loader";
import {mergeTypeDefs} from "@graphql-tools/merge";
import Lodash from "lodash";
import {GraphQLJSON} from "graphql-type-json";
import {ApolloServer} from "apollo-server";
import {buildSubgraphSchema} from "@apollo/subgraph";
import {getProjectList} from "../config/AppConfig.js";
import {getFiles, getFileSets} from "../io/FileWatcherLogic.js";
import {Resolvers} from "../../resolvers-types";

function getProjects() {
    return getProjectList().map(project => ({id: project.id, name: project.name}));
}

function getProject(id: number) {
    return Lodash.head(getProjects().filter(project => project.id === id));
}

//Setup resolvers
const resolvers: Resolvers = {
    JSON: GraphQLJSON,
    Project: {
        contents: async (parent) => {
            return getFileSets(parent.id)
                .map(entry => {
                    return {
                        ...entry,
                        parentId: parent.id
                    }
                });
        },
        content: async (parent, {id}, ) => {
            const category = Lodash.head(getFileSets(parent.id).filter(fileSet => fileSet.category.id === id));
            return {
                ...category,
                parentId: parent.id
            }
        },
    },
    ProjectFileSet: {
        entries: async (parent) => {
            const categoryId = parent.category.id;
            const files = getFiles(parent.parentId, categoryId);
            if(!Lodash.isArray(files)) {
                return [];
            }
            return files.map(entry => ({name: entry.path})); //TODO include more metadata about the file
        }
    },
    Query: {
        projects: async () => getProjects(),
        project: async (_, {id}) => getProject(id)
    }
};

export async function createServer() {

    const sources = await loadTypedefs('./src/graphql/**/*.graphql', {
        loaders: [new GraphQLFileLoader()]
    });
    const documentNodes = sources.map(source => source.document);
    const typeDefs = mergeTypeDefs(documentNodes);

    //Create server
    return new ApolloServer({
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
}
