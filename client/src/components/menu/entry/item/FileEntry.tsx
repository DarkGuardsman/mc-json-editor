import {currentFileVar} from "../../../../ApolloSetup";
import styles from './FileEntry.module.css'

interface FileEntryProps {
    displayName: string,
    fileName: string
    className: string
    icon: JSX.Element
}

export default function FileEntry({displayName, fileName, className, icon}: FileEntryProps): JSX.Element {
    return (
        <div className={className}>
            {icon}
            <button
                className={styles.button}
                onClick={() => currentFileVar(fileName)}
            >
                {`${displayName}`}
            </button>
        </div>
    )
}