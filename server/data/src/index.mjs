import {loadTypedefs} from "@graphql-tools/load";
import {GraphQLFileLoader} from "@graphql-tools/graphql-file-loader";
import {mergeTypeDefs} from "@graphql-tools/merge";
import {ApolloServer} from "apollo-server";
import {buildSubgraphSchema} from "@apollo/subgraph";
import FileSystem from 'fs';
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
            id: "Minecraft:Forge",
            version: "1.12.2"
        },
        enabled: true,
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
            id: "Minecraft:Forge",
            version: "1.12.2"
        },
        enabled: true,
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
            id: "Minecraft:Forge",
            version: "1.12.2"
        },
        enabled: true,
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
            id: "Minecraft:Forge",
            version: "1.12.2"
        },
        enabled: false,
        detection: {
            mode: "regex",
            alg: '\\/assets\\/\\w+\\/models\\/item'
        }
    },
    {

        name: "Model/Block",
        folderPrefix: "/assets/#{projectId}/models/block",
        spec: {
            id: "Minecraft:Forge",
            version: "1.12.2"
        },
        enabled: false,
        detection: {
            mode: "regex",
            alg: '\\/assets\\/\\w+\\/models\\/block'
        }
    },
    {
        name: "Model/States",
        folderPrefix: "/assets/#{projectId}/blockstates",
        spec: {
            id: "Minecraft:Forge",
            version: "1.12.2"
        },
        enabled: false,
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
});


const items = {};

const itemListRaw = FileSystem.readFileSync("./static/items/items.json");
const itemListJson = JSON.parse(itemListRaw);

itemListJson.forEach(({key, file}, index) => {
    const rawFile = FileSystem.readFileSync("./static/items/" + file.replace("./", ""));
    const fileData = JSON.parse(rawFile);
    items[key] = {
        id: index,
        key: key,
        name: fileData.name,
        image: {
            url : "http://localhost:4003/minecraft/" + fileData.image + ".png",
            altText: fileData.name + " Item"
        }
    }
});

//Setup resolvers
const resolvers = {
    Query: {
        contentCategories: async () => categories.filter(cat => cat.enabled),
        contentCategory: async (_, {id}) => Lodash.head(categories.filter(cat => cat.id === id)),
        data: async () => {
            return {}
        }
    },
    DataQuery: {
        item: async (_, {key, id}) => {
            console.log("I was here")
            return items[key];
        },
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