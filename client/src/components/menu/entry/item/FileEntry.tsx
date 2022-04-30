import {currentFileVar} from "../../../../ApolloSetup";
import styles from './FileEntry.module.css'

interface FileEntryProps {
    fileName: string
    className: string
    icon: JSX.Element
}

export default function FileEntry({fileName, className, icon}: FileEntryProps): JSX.Element {
    return (
        <div className={className}>
            {icon}
            <button
                className={styles.button}
                onClick={() => currentFileVar(fileName)}
            >
                {`${fileName}`}
            </button>
        </div>
    )
}