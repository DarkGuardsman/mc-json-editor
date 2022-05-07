import ProjectList from "../project/list/ProjectList";
import styles from "./FileMenu.module.css"

export default function FileMenu() {
    return (
        <div className={styles.div} data-testid='explorer'>
            <h2 className={styles.header}>Projects</h2>
            <ProjectList/>
        </div>
    )
}