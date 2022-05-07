import {currentFileVar} from "../../../../ApolloSetup";
import styles from './FileEntry.module.css'

interface FileEntryProps {
    displayName: string,
    fileKey: string
    className: string
    icon: JSX.Element
}

export default function FileEntry({displayName, fileKey, className, icon}: FileEntryProps): JSX.Element {
    return (
        <div className={className}>
            {icon}
            <button
                className={styles.button}
                onClick={() => {
                    console.log("SetFile", fileKey)
                    currentFileVar(fileKey);
                }}
            >
                {`${displayName}`}
            </button>
        </div>
    )
}