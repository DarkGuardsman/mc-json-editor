import styles from "./EditorWindow.module.css"
import {useState} from "react";
import {currentFileVar} from "../../../ApolloSetup";
import {useReactiveVar} from "@apollo/client";
import {ProjectFileEntry, useProjectFileInfoQuery} from "../../../generated/graphql";
import {isNil} from "lodash";
import JsonFileViewer from "../viewer/JsonFileViewer";

const TAB_JSON = "json";
const TAB_EDITOR = "editor";

export default function EditorWindow(): JSX.Element {
    const [currentTab, setCurrentTab] = useState(TAB_JSON);
    const currentFile = useReactiveVar(currentFileVar);

    const {loading, error, data} = useProjectFileInfoQuery({
        skip: isNil(currentFile),
        variables: {
            fileKey: currentFile === undefined ? "" : currentFile.key,
            projectId: currentFile === undefined ? -1 : currentFile.projectId
        }
    });

    if(loading) {
        return (
            <div className={styles.div}>
                <h1>JSON Editor</h1>
                <h2>{`File: ${currentFile !== undefined ? currentFile.name: "none"}`}</h2>
                <div>
                    Loading file information
                </div>
            </div>
        )
    }
    else if(error) {
        return (
            <div className={styles.div}>
                <h1>JSON Editor</h1>
                <h2>{`File: ${currentFile !== undefined ? currentFile.name: "none"}`}</h2>
                <div>
                    Unexpected error loading file information
                </div>
            </div>
        )
    }
    else if(data === undefined || data === null) {
        return (
            <div className={styles.div}>
                <h1>JSON Editor</h1>
                <h2>{`File: ${currentFile !== undefined ? currentFile.name: "none"}`}</h2>
                <div>
                    Failed to get data from server
                </div>
            </div>
        )
    }
    else if(data.file === undefined || data.file === null) {
        return (
            <div className={styles.div}>
                <h1>JSON Editor</h1>
                <h2>{`File: ${currentFile !== undefined ? currentFile.name: "none"}`}</h2>
                <div>
                    Failed to get file contents from server
                </div>
            </div>
        )
    }

    return (
        <div className={styles.div}>
            <h1>JSON Editor</h1>
            <h2>{`Project: ${currentFile !== undefined ? data?.file?.project?.name: "none"}`}</h2>
            <h2>{`Category: ${currentFile !== undefined ? data?.file?.category?.name: "none"}`}</h2>
            <h2>{`File: ${currentFile !== undefined ? currentFile.name: "none"}`}</h2>
            <div className={styles.tabs}>
                <button
                    className={currentTab === TAB_JSON ? styles.selected : ""}
                    onClick={() => setCurrentTab(TAB_JSON)}
                >
                    JSON
                </button>
                <button
                    className={currentTab === TAB_EDITOR ? styles.selected : ""}
                    onClick={() => setCurrentTab(TAB_EDITOR)}
                >
                    Editor
                </button>
                <div className={styles.tabber}/>
            </div>
            <DisplayTab currentTab={currentTab} json={data.file.fileContents} />
        </div>
    );
}

interface DisplayTabProps {
    currentTab: string,
    json: JSON
}

function DisplayTab({currentTab, json}: DisplayTabProps) : JSX.Element | null {
    if(currentTab === TAB_JSON) {
        return (
            <div className={styles.tab}>
                <JsonFileViewer json={json}/>
            </div>
        )
    }
    else if(currentTab === TAB_EDITOR) {
        return (
            <div className={styles.tab}>
                EDITOR
            </div>
        )
    }
    return null;
}