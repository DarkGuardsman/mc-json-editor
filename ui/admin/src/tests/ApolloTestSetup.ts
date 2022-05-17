import {ApolloClient, InMemoryCache} from "@apollo/client";

export function createNewTestClient() {
    const client : ApolloClient<any> = new ApolloClient({
        uri: "www.darkguardsman.com/graphql",
        cache: new InMemoryCache(),
        name: `${process.env.REACT_APP_NAME}-tests`,
        version: `${process.env.REACT_APP_VERSION}`
    })

    return {
        client
    }
}