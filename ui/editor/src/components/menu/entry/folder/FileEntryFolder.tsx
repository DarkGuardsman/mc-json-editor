import {FileDisplayNest} from "../list/FileListFunction";
import {FiFolder} from "react-icons/fi";
import styles from './FileEntryFolder.module.css'
import FileEntryFolderContents from "./FileEntryFolderContents";
import {useState} from "react";
import ExpandIcon from "../../../general/expand/ExpandIcon";
import ExpandToggle from "../../../general/expand/ExpandToggle";

interface FileEntryFolderProps {
    folderName: string,
    path?: string, //TODO allow right click create file/folder using path
    files?: FileDisplayNest[],
    className?: string,
    projectId: number
}

export default function FileEntryFolder({folderName, files, className, projectId}: FileEntryFolderProps): JSX.Element {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className={className}>
            <div className={styles.header}>
                <ExpandIcon
                    className={styles.button}
                    isExpanded={isExpanded}
                    onClick={() => setIsExpanded(!isExpanded)}
                />
                <FiFolder className={styles.icon}/>
                <h4 className={styles.title}>{folderName}</h4>
            </div>
            <ExpandToggle isExpanded={isExpanded}>
                <FileEntryFolderContents files={files} projectId={projectId}/>
            </ExpandToggle>
        </div>
    )
}