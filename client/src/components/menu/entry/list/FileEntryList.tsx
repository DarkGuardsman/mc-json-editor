import {get, isArray, isNil} from "lodash";
import FileEntry from "../item/FileEntry";
import {
    ProjectFileEntry,
    useProjectFilesListQuery
} from "../../../../generated/graphql";
import {FiFolder, FiFile} from 'react-icons/fi'
import styles from './FileEntryList.module.css'
import {useMemo} from "react";
import splitFileEntries, {FileDisplayNest} from "./FileListFunction";

interface FileEntryListProps {
    categoryId: number,
    projectId: number
}



export default function FileEntryList({categoryId, projectId}: FileEntryListProps): JSX.Element {
    const {loading, error, data} = useProjectFilesListQuery({
        variables: {
            categoryId,
            projectId
        }
    });

    const rawFileList: ProjectFileEntry[] = get(data, "project.content.entries");

    //Convert file paths into nested data
    const files : FileDisplayNest[] = useMemo(() => splitFileEntries(rawFileList), [rawFileList])

    //Loading state
    if (loading) {
        return (
            <div className={styles.container}>
                <p>Loading Files...</p>
            </div>
        )
    }
    //Error state
    else if (error) {
        return (
            <div className={styles.container}>
                <p>Failed to load files...</p>
            </div>
        )
    }
    //Missing data state
    else if (files.length === 0) {
        return (
            <div className={styles.container}>
                <p>No Files</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {
                files.map(file => {
                    const {name, isFolder} = file;
                    return (
                        <FileEntry
                            fileName={name}
                            className={styles.file}
                            icon={isFolder ? <FiFolder className={styles.icon}/> : <FiFile className={styles.icon}/>}
                        />
                    );
                })
            }
        </div>
    );
}