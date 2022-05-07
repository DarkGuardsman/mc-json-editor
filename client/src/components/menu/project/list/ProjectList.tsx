import {isArray, isNil} from "lodash";
import ProjectEntry from "../item/ProjectEntry";
import {useProjectsListQuery} from "../../../../generated/graphql";
import styles from "./ProjectList.module.css"

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
            <div className={styles.div}>
                <p>No Projects</p>
            </div>
        );
    }

    return (
        <div className={styles.div}>
            {
                projects
                    .map(project => {
                        if (isNil(project)) {
                            return <p className="error">null</p>
                        }
                        return (
                            <ProjectEntry projectId={project.id} projectName={project.name}/>
                        )
                    })
            }
        </div>
    );
}