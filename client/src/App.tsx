import React from 'react';
import './App.css';
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "./ApolloSetup";
import FileMenu from "./components/menu/menu/FileMenu";

function App() {
    return (
        <div className="App">
            <ApolloProvider client={apolloClient}>
                <FileMenu/>
            </ApolloProvider>
        </div>
    );
}

export default App;
