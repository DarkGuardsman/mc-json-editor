import {ApolloClient, InMemoryCache, makeVar} from "@apollo/client";
import {ItemTableRow} from "./types/ItemTableRows";

export const itemTableDataVar = makeVar<ItemTableRow[]>([]);

export const apolloClient = new ApolloClient({
    uri: `${process.env.REACT_APP_GRAPHQL}`,
    cache: new InMemoryCache({
        addTypename: false
    }),
    name: `${process.env.REACT_APP_NAME}`,
    version: `${process.env.REACT_APP_VERSION}`
})