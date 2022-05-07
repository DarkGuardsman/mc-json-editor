import {get} from "lodash";
import {
    ProjectFileEntry,
    useProjectFilesListQuery
} from "../../../../generated/graphql";
import styles from './FileEntryList.module.css'
import {useMemo} from "react";
import splitFileEntries, {FileDisplayNest} from "./FileListFunction";
import FileEntryFolderContents from "../folder/FileEntryFolderContents";

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
            <FileEntryFolderContents files={files} projectId={projectId} />
        </div>
    );
}

