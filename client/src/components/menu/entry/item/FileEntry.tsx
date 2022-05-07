import {currentFileVar} from "../../../../ApolloSetup";
import styles from './FileEntry.module.css'

interface FileEntryProps {
    displayName: string,
    path: string,
    projectId: number,
    fileKey: string
    className: string
    icon: JSX.Element
}

export default function FileEntry({displayName, fileKey, className, icon, projectId, path}: FileEntryProps): JSX.Element {
    return (
        <div className={className}>
            {icon}
            <button
                className={styles.button}
                onClick={() => {
                    currentFileVar({
                        name: `${path}${displayName}`,
                        key: fileKey,
                        projectId: projectId
                    });
                }}
            >
                {`${displayName}`}
            </button>
        </div>
    )
}