import ContentCategoryList from "../../category/list/ContentCategoryList";
import styles from './ProjectEntry.module.css'

interface ProjectEntryProps {
    projectId: number,
    projectName: string
}

export default function ProjectEntry({projectId, projectName}: ProjectEntryProps): JSX.Element {
    return (
        <div className={styles.div} id={`project-${projectId}`}>
            <h3 className={styles.header}>{projectName}</h3>
            <ContentCategoryList projectId={projectId}/>
        </div>
    );
}