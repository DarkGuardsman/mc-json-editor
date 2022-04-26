import {gql, useQuery} from "@apollo/client";
import QueryRoot from "../../../types/Query";
import {isNil} from "lodash";
import FileEntry from "./FileEntry";

const FILES_QUERY = gql`
    query FilesList($templateId: Int!, $projectId: Int!) {
        files(templateId: $templateId, projectId: $projectId) {
            name
        }
    }
`

interface TemplateEntryListProps {
    templateId: Number,
    projectId: Number
}

export default function FileEntryList({templateId, projectId}: TemplateEntryListProps): JSX.Element {
    const {loading, error, data} = useQuery<QueryRoot>(FILES_QUERY, {
        variables: {
            templateId: templateId,
            projectId: projectId
        }
    });

    if (loading) {
        return <p>Loading Files...</p>
    } else if (error || isNil(data)) {
        return <p>Failed to load files...</p>
    }

    return (
        <ul className='file-list'>
            {
                data.template.files.map(file => {
                    const {name} = file;
                    return (
                        <li key={`file-${name}`}>
                            <FileEntry fileName={name}/>
                        </li>
                    );
                })
            }
        </ul>
    );
}