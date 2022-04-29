import {gql, useQuery} from "@apollo/client";
import {get, isArray, isNil} from "lodash";
import FileEntry from "./FileEntry";
import {ProjectFileEntry, Query} from "../../../generated/graphql";

const FILES_QUERY = gql`
    query FilesList($categoryId: Int!, $projectId: Int!) {
        project(id: $projectId) {
            content(id: $categoryId) {
                entries {
                    name
                }
            }
        }
    }
`

interface TemplateEntryListProps {
    categoryId: Number,
    projectId: Number
}

export default function FileEntryList({categoryId, projectId}: TemplateEntryListProps): JSX.Element {
    const {loading, error, data} = useQuery<Query>(FILES_QUERY, {
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
            <ul className='file-list'>
                {
                    files.map(file => {
                        const {name} = file;
                        return (
                            <li key={`file-${name}`}>
                                <FileEntry fileName={name}/>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}