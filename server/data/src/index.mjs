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
        name: "Recipe/Crafting/Shaped",
        folderPrefix: "/assets/#{projectId}/recipes",
        spec: {
            style: "Minecraft:Forge",
            version: "1.12.2"
        },
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
        name: "Recipe/Crafting/ICBM Explosive",
        folderPrefix: "/assets/#{projectId}/recipes",
        spec: {
            style: "Minecraft:Forge",
            version: "1.12.2"
        },
        detection: {
            mode: "json_field",
            fields: [
                {
                    id: "type",
                    regex: "icbmclassic:explosive"
                }
            ]
        }
    },
    {
        name: "Recipe/Crafting/Shapeless",
        folderPrefix: "/assets/#{projectId}/recipes",
        spec: {
            style: "Minecraft:Forge",
            version: "1.12.2"
        },
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
        name: "Model/Item",
        folderPrefix: "/assets/#{projectId}/models/item",
        spec: {
            style: "Minecraft:Forge",
            version: "1.12.2"
        },
        detection: {
            mode: "regex",
            alg: '\\/assets\\/\\w+\\/models\\/item'
        }
    },
    {

        name: "Model/Block",
        folderPrefix: "/assets/#{projectId}/models/block",
        spec: {
            style: "Minecraft:Forge",
            version: "1.12.2"
        },
        detection: {
            mode: "regex",
            alg: '\\/assets\\/\\w+\\/models\\/block'
        }
    },
    {
        name: "Model/States",
        folderPrefix: "/assets/#{projectId}/blockstates",
        spec: {
            style: "Minecraft:Forge",
            version: "1.12.2"
        },
        detection: {
            mode: "regex",
            alg: '\\/assets\\/\\w+\\/blockstates'
        }
    }
].map((entry, index) => {
    return {
        ...entry,
        id: index
    }
})

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