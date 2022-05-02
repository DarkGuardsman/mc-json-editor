import {FileDisplayNest} from "../list/FileListFunction";
import {FiFolder} from "react-icons/fi";
import styles from './FileEntryFolder.module.css'
import FileEntryFolderContents from "./FileEntryFolderContents";

interface FileEntryFolderProps {
    folderName: string,
    path?: string, //TODO allow right click create file/folder using path
    files?: FileDisplayNest[],
    className?: string
}

export default function FileEntryFolder({folderName, files, className}: FileEntryFolderProps) : JSX.Element {
    return (
        <div className={className}>
            <div>
                <FiFolder className={styles.icon}/>
                <h4>{folderName}</h4>
            </div>
            <FileEntryFolderContents files={files} />
        </div>
    )
}