import {ApolloClient, InMemoryCache, makeVar} from "@apollo/client";

export const currentFileVar = makeVar<String>("");

export const apolloClient = new ApolloClient({
    uri: `${process.env.REACT_APP_GRAPHQL}`,
    cache: new InMemoryCache(),
    name: `${process.env.REACT_APP_NAME}`,
    version: `${process.env.REACT_APP_VERSION}`
})