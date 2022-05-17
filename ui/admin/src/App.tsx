import React from 'react';
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "./ApolloSetup";
import ItemViewer from "./components/items/ItemViewer";

function App() {
    return (
        <div className="App">
            <ApolloProvider client={apolloClient}>
                <ItemViewer/>
            </ApolloProvider>
        </div>
    );
}

export default App;
