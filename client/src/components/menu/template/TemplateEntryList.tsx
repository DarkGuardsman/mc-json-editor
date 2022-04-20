import {gql, useQuery} from "@apollo/client";
import QueryRoot from "../../../types/Query";
import {isNil} from "lodash";
import TemplateEntry from "./TemplateEntry";
import FileEntry from "../entry/FileEntry";

const FILES_QUERY = gql`
    query FilesList($id: Int!) {
        template(id: $id) {
            files {
                name
            }
        }
    }
`

interface TemplateEntryListProps {
    templateId: Number
}

export default function TemplateEntryList({templateId}: TemplateEntryListProps): JSX.Element {
    const {loading, error, data} = useQuery<QueryRoot>(FILES_QUERY, {
        variables: {
            id: templateId
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
                data.template.files.map(file => <FileEntry fileName={file.name} />)
            }
        </ul>
    );
}