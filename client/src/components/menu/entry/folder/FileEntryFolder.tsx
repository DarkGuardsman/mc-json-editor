import {FileDisplayNest} from "../list/FileListFunction";
import {FiFile, FiFolder} from "react-icons/fi";
import FileEntry from "../item/FileEntry";
import {isNil} from "lodash";
import styles from './FileEntryFolder.module.css'

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
            {
                isNil(files) ? "No Files" :
                files.map(({name, path, isFolder, files, file}) => {
                    if(isFolder) {
                        return (
                            <FileEntryFolder className={styles.file} folderName={name} path={path} files={files}/>
                        )
                    }
                    else if(isNil(file)) {
                        return `Invalid File Entry: ${name}`
                    }
                    return (
                        <FileEntry
                            displayName={name}
                            fileName={file}
                            className={styles.file}
                            icon={isFolder ? <FiFolder className={styles.icon}/> : <FiFile className={styles.icon}/>}
                        />
                    );
                })
            }
        </div>
    )
}