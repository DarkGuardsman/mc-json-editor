import {get, isArray} from "lodash";
import ContentCategoryMenu from "../item/ContentCategoryMenu";
import {ProjectFileSet, useProjectContentsListQuery} from "../../../../generated/graphql";
import styles from "./ContentCategoryList.module.css"

interface ProjectEntryListProps {
    projectId: number
}

/**
 * Entry for showing projects with associated files nested in the explorer
 * @param {number} projectId - unique id of the project
 */
export default function ContentCategoryList({projectId}: ProjectEntryListProps): JSX.Element {
    const {loading, error, data} = useProjectContentsListQuery({
        variables: {
            id: projectId
        }
    });

    if (loading) {
        return (
            <div className={styles.div}>
                <p>Loading...</p>
            </div>
        )
    } else if (error) {
        return (
            <div className={styles.div}>
                <p>Unexpected Error...</p>
            </div>
        )
    }

    const contents: ProjectFileSet[] = get(data, "project.contents");

    if (!isArray(contents) || contents.length === 0) {
        return (
            <div className={styles.div}>
                <p>No Content Categories</p>
            </div>
        );
    }

    return (
        <div className={styles.div}>
            {
                contents.map((template) => {
                    const {id, name} = template.category;
                    return (
                        <ContentCategoryMenu
                            projectId={projectId}
                            categoryId={id}
                            categoryName={name}
                        />
                    );
                })
            }
        </div>
    );
}