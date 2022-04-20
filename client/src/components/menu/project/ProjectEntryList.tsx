import {gql, useQuery} from "@apollo/client";
import QueryRoot from "../../../types/Query";
import {isNil} from "lodash";
import TemplateEntry from "../template/TemplateEntry";

const PROJECTS_QUERY = gql`
    query TemplatesList($id: Int!) {
        project(id: $id) {
            templates {
                id
                name                
            }
        }
    }
`

interface ProjectEntryListProps {
    projectId: Number
}

export default function ProjectEntryList({projectId}: ProjectEntryListProps): JSX.Element {
    const {loading, error, data} = useQuery<QueryRoot>(PROJECTS_QUERY, {
        variables: {
            id: projectId
        }
    });

    if (loading) {
        return <p>Loading Templates...</p>
    } else if (error || isNil(data)) {
        return <p>Failed to load templates...</p>
    }

    return (
        <ul className='template-list'>
            {
                data.project.templates.map(template => <TemplateEntry templateId={template.id} templateName={template.name}/>)
            }
        </ul>
    );
}