import ContentCategoryList from "../../category/list/ContentCategoryList";
import styles from './ProjectEntry.module.css'
import {useState} from "react";
import ExpandIcon from "../../../general/expand/ExpandIcon";
import ExpandToggle from "../../../general/expand/ExpandToggle";

interface ProjectEntryProps {
    projectId: number,
    projectName: string
}

export default function ProjectEntry({projectId, projectName}: ProjectEntryProps): JSX.Element {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className={styles.div} id={`project-${projectId}`}>
            <div className={styles.header}>
                <ExpandIcon
                    className={styles.button}
                    isExpanded={isExpanded}
                    onClick={() => setIsExpanded(!isExpanded)}
                />
                <h3 className={styles.header}>{projectName}</h3>
            </div>
            <ExpandToggle isExpanded={isExpanded}>
                <ContentCategoryList projectId={projectId}/>
            </ExpandToggle>
        </div>
    );
}