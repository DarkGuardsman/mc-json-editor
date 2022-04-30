import {isArray, isNil} from "lodash";
import ProjectEntry from "../item/ProjectEntry";
import {useProjectsListQuery} from "../../../../generated/graphql";

/**
 * Generates a list of projects for the menu
 */
export default function ProjectList(): JSX.Element {
    const {loading, error, data} = useProjectsListQuery();

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
                            if (isNil(project)) {
                                return <p className="error">null</p>
                            }
                            return (
                                <li id={`project-${project.id}`}>
                                    <ProjectEntry projectId={project.id} projectName={project.name}/>
                                </li>
                            )
                        })
                }
            </ul>
        </div>
    );
}