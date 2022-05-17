import React from 'react';
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "./ApolloSetup";
import FileMenu from "./components/menu/menu/FileMenu";
import EditorWindow from "./components/editor/window/EditorWindow";

function App() {
    return (
        <div className="App">
            <ApolloProvider client={apolloClient}>
                <FileMenu/>
                <EditorWindow/>
            </ApolloProvider>
        </div>
    );
}

export default App;
