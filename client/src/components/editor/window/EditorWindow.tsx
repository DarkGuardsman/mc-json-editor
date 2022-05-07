import styles from "./EditorWindow.module.css"
import {useState} from "react";
import {currentFileVar} from "../../../ApolloSetup";
import {useReactiveVar} from "@apollo/client";

const TAB_JSON = "json";
const TAB_EDITOR = "editor";

export default function EditorWindow(): JSX.Element {
    const [currentTab, setCurrentTab] = useState(TAB_JSON);
    const currentFile = useReactiveVar(currentFileVar);
    console.log("current file", currentFile);
    return (
        <div className={styles.div}>
            <h1>JSON Editor</h1>
            <h2>{`File: ${currentFile !== undefined ? currentFile: "none"}`}</h2>
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
            <DisplayTab currentTab={currentTab} />
        </div>
    );
}

interface DisplayTabProps {
    currentTab: string
}

function DisplayTab({currentTab}: DisplayTabProps) : JSX.Element | null {
    if(currentTab === TAB_JSON) {
        return (
            <div className={styles.tab}>
                JSON
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