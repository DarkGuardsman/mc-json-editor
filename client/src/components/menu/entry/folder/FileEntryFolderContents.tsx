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
       </Fragment>
    )
}