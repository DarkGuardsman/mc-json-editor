const {ApolloServer} = require('apollo-server');
const {ApolloGateway, RemoteGraphQLDataSource} = require('@apollo/gateway');
const {readFileSync} = require('fs');

const SERVER_PORT = process.env.PORT;

const supergraphSdl = readFileSync('./supergraph.graphql').toString();

class AuthenticationDataSource extends RemoteGraphQLDataSource {
    willSendRequest({request, context}) {
        request.http.headers.set("Authorization", context.headers.authorization);
    }
}

const gateway = new ApolloGateway({
    supergraphSdl,
    buildService({name, url}) {
        return new AuthenticationDataSource({url});
    }
});

const server = new ApolloServer({
    gateway,
    context: ({req}) => {
        return {
            headers: req.headers
        }
    },
    subscriptions: false
});

server.listen(SERVER_PORT).then(({url}) => {
    console.log(`Gateway ready at ${url}`);
}).catch(err => {
    console.error(err);
});