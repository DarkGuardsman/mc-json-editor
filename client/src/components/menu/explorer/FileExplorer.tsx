import {useQuery, gql} from "@apollo/client";
import {isNil} from "lodash";
import QueryRoot from "../../../types/Query";
import ProjectEntry from "../project/ProjectEntry";

const PROJECTS_QUERY = gql`
    query ProjectsList {
        projects {
            id
            name
        }
    }
`

/**
 *
 */
export default function FileExplorer() : JSX.Element {
    const {loading, error, data} = useQuery<QueryRoot>(PROJECTS_QUERY);

    if(loading) {
        return <p>Loading Projects...</p>
    }
    else if(error || isNil(data)) {
        return <p>Failed to load projects...</p>
    }

    return (
        <ul className='projects-list'>
            {
                data.projects.map(project => <ProjectEntry projectId={project.id} projectName={project.name}/>)
            }
        </ul>
    );
}