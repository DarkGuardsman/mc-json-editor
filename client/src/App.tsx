import React from 'react';
import './App.css';
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "./ApolloSetup";
import FileExplorer from "./components/menu/explorer/FileExplorer";

function App() {
    return (
        <div className="App">
            <ApolloProvider client={apolloClient}>
                <FileExplorer/>
            </ApolloProvider>
        </div>
    );
}

export default App;
