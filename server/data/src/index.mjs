import {loadTypedefs} from "@graphql-tools/load";
import {GraphQLFileLoader} from "@graphql-tools/graphql-file-loader";
import {mergeTypeDefs} from "@graphql-tools/merge";
import {ApolloServer} from "apollo-server";
import {buildSubgraphSchema} from "@apollo/subgraph";
import Lodash from "lodash";

const SERVER_PORT = process.env.PORT;

const sources = await loadTypedefs('./src/graphql/**/*.graphql', {
    loaders: [new GraphQLFileLoader()]
});
const documentNodes = sources.map(source => source.document);
const typeDefs = mergeTypeDefs(documentNodes);

const categories = [
    //TODO specify by project type (Forge Mod) and version (1.12.2). As each type-version combo will have different content specs
    {
        id: 0,
        name: "Shaped Crafting",
        folderPrefix: "/assets/#{projectId}/recipes",
        detection: {
            mode: "json_field",
            fields: [
                {
                    id: "type",
                    regex: "minecraft:crafting_shaped"
                }
            ]
        }
    },
    {
        id: 1,
        name: "Shapeless Crafting",
        folderPrefix: "/assets/#{projectId}/recipes",
        detection: {
            mode: "json_field",
            fields: [
                {
                    id: "type",
                    regex: "minecraft:crafting_shapeless"
                }
            ]
        }
    },
    {
        id: 2,
        folderPrefix: "/assets/#{projectId}/models/item",
        name: "Model/Item",
        detection: {
            mode: "regex",
            alg: '\\/assets\\/\\w+\\/models\\/item'
        }
    },
    {
        id: 3,
        folderPrefix: "/assets/#{projectId}/models/block",
        name: "Model/Block",
        detection: {
            mode: "regex",
            alg: '\\/assets\\/\\w+\\/models\\/block'
        }
    },
    {
        id: 3,
        folderPrefix: "/assets/#{projectId}/blockstates",
        name: "Model/States",
        detection: {
            mode: "regex",
            alg: '\\/assets\\/\\w+\\/blockstates'
        }
    }
]

//Setup resolvers
const resolvers = {
    Query: {
        contentCategories: async () => categories,
        contentCategory: async (_, {id}) => Lodash.head(categories.filter(cat => cat.id === id))
    },
    ContentCategory: {
        __resolveReference(category) {
            return Lodash.head(categories.filter(cat => cat.id === category.id));
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
        //console.log("reg", JSON.stringify(req.body, null, 2)); //Debug code for request message
        return {
            headers: req.headers
        }
    }
});
server.listen(SERVER_PORT).then(({url}) => {
    console.log(`Server ready at ${url}`);
})