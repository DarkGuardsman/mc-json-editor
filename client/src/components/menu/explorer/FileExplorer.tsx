import {useQuery, gql} from "@apollo/client";
import {isArray, isNil} from "lodash";
import ProjectEntry from "../project/ProjectEntry";
import {Maybe, Project, Query} from "../../../generated/graphql";

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
export default function FileExplorer(): JSX.Element {
    const {loading, error, data} = useQuery<Query>(PROJECTS_QUERY);

    if (loading) {
        return <p>Loading Projects...</p>
    } else if (error || isNil(data)) {
        return <p>Failed to load projects...</p>
    }

    const {projects} = data;

    if (!isArray(projects) || projects.length === 0) {
        return (
            <div className="projects-menu warn">
                <p>No Projects</p>
            </div>
        );
    }

    return (
        <div className="projects-menu warn">
            <ul className='projects-list'>
                {
                    projects
                        .map(project => {
                            if(isNil(project)) {
                                return <p className="error">null</p>
                            }
                            return <ProjectEntry projectId={project.id} projectName={project.name}/>
                        })
                }
            </ul>
        </div>
    );
}