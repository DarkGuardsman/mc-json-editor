import {gql, useQuery} from "@apollo/client";
import QueryRoot from "../../../types/Query";
import {isNil} from "lodash";
import TemplateEntry from "./TemplateEntry";

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

/**
 * Entry for showing projects with associated files nested in the explorer
 * @param {Number} projectId - unique id of the project
 */
export default function TemplateEntryList({projectId}: ProjectEntryListProps): JSX.Element {
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
                data.project.templates.map(template =>
                {
                    const {id, name} = template;
                    return (
                        <li id={`template-${id}`}>
                            <TemplateEntry
                                projectId={projectId}
                                templateId={id}
                                templateName={name}
                            />
                        </li>
                    );
                })
            }
        </ul>
    );
}