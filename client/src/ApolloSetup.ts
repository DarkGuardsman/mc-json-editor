import {ApolloClient, InMemoryCache, makeVar} from "@apollo/client";
import CurrentFile from "./types/CurrentFile";

export const currentFileVar = makeVar<CurrentFile | undefined>(undefined);

export const apolloClient = new ApolloClient({
    uri: `${process.env.REACT_APP_GRAPHQL}`,
    cache: new InMemoryCache({
        addTypename: false
    }),
    name: `${process.env.REACT_APP_NAME}`,
    version: `${process.env.REACT_APP_VERSION}`
})