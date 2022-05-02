import FileEntryList from "../../entry/list/FileEntryList";
import styles from "./ContentCategoryMenu.module.css"
import ExpandIcon from "../../../general/expand/ExpandIcon";
import {useState} from "react";
import ExpandToggle from "../../../general/expand/ExpandToggle";


interface TemplateEntryProps {
    projectId: number,
    categoryId: number,
    categoryName: string
}

export default function ContentCategoryMenu({categoryId, projectId, categoryName}: TemplateEntryProps): JSX.Element {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className={styles.div} key={`content-category-${categoryId}`}>
            <div className={styles.header}>
                <ExpandIcon
                    className={styles.button}
                    isExpanded={isExpanded}
                    onClick={() => setIsExpanded(!isExpanded)}
                />
                <h3 className={styles.title}>{categoryName}</h3>
            </div>
            <ExpandToggle isExpanded={isExpanded} >
                <FileEntryList categoryId={categoryId} projectId={projectId}/>
            </ExpandToggle>
        </div>
    );
}