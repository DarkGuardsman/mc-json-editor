import {get, isArray, isNil} from "lodash";
import FileEntry from "../item/FileEntry";
import {
    ProjectFileEntry,
    useProjectFilesListQuery
} from "../../../../generated/graphql";

interface TemplateEntryListProps {
    categoryId: number,
    projectId: number
}

export default function FileEntryList({categoryId, projectId}: TemplateEntryListProps): JSX.Element {
    const {loading, error, data} = useProjectFilesListQuery({
        variables: {
            categoryId,
            projectId
        }
    });

    if (loading) {
        return <p>Loading Files...</p>
    } else if (error || isNil(data)) {
        return <p>Failed to load files...</p>
    }

    const files: ProjectFileEntry[] = get(data, "project.content.entries");

    if (!isArray(files) || files.length === 0) {
        return (
            <div className="file-entries-menu warn">
                <p>No Files</p>
            </div>
        );
    }

    return (
        <div className="file-entries-menu">
            {
                files.map(file => {
                    const {name} = file;
                    return (
                        <FileEntry fileName={name}/>
                    );
                })
            }
        </div>
    );
}