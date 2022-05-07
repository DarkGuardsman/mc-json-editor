import {FileDisplayNest} from "../list/FileListFunction";
import {FiFile, FiFolder} from "react-icons/fi";
import FileEntry from "../item/FileEntry";
import {isNil} from "lodash";
import styles from './FileEntryFolder.module.css'
import {Fragment} from "react";
import FileEntryFolder from "./FileEntryFolder";

interface FileEntryFolderContentsProps {
    files?: FileDisplayNest[]
}

/**
 * Component to display contents of a folder
 * @param {FileDisplayNest[]} files
 */
export default function FileEntryFolderContents({files}: FileEntryFolderContentsProps) : JSX.Element {
    return (
       <Fragment>
           {
               isNil(files) ? "No Files" :
                   files.map(({name, key, path, isFolder, files}) => {
                       if(isFolder) {
                           return (
                               <FileEntryFolder
                                   key={`folder-${path}`}
                                   className={styles.file}
                                   folderName={name}
                                   path={path}
                                   files={files}
                               />
                           )
                       }
                       else if(isNil(key)) {
                           return `Invalid File Entry: ${name}`
                       }
                       return (
                           <FileEntry
                               key={`file-${name}`}
                               displayName={name}
                               fileKey={key}
                               className={styles.file}
                               icon={isFolder ? <FiFolder className={styles.icon}/> : <FiFile className={styles.icon}/>}
                           />
                       );
                   })
           }
       </Fragment>
    )
}