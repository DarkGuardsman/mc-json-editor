import {gql, useQuery} from "@apollo/client";
import {isNil, get, isArray} from "lodash";
import ContentCategoryMenu from "./ContentCategoryMenu";
import {ProjectFileSet, Query} from "../../../generated/graphql";

const PROJECTS_QUERY = gql`
    query TemplatesList($id: Int!) {
        project(id: $id) {
            contents {
                category {
                    id
                    name
                }
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
export default function ContentCategoryList({projectId}: ProjectEntryListProps): JSX.Element {
    const {loading, error, data} = useQuery<Query>(PROJECTS_QUERY, {
        variables: {
            id: projectId
        }
    });

    if (loading) {
        return <p>Loading Templates...</p>
    } else if (error || isNil(data)) {
        return <p>Failed to load templates...</p>
    }

    const contents: ProjectFileSet[] = get(data, "project.contents");

    if (!isArray(contents) || contents.length === 0) {
        return (
            <div className="content-category-menu warn">
                <p>No Content Categories</p>
            </div>
        );
    }

    return (
        <div className="content-category-menu">
            <ul className='template-list'>
                {
                    contents.map((template) => {
                        const {id, name} = template.category;
                        return (
                            <li id={`template-${id}`}>
                                <ContentCategoryMenu
                                    projectId={projectId}
                                    categoryId={id}
                                    categoryName={name}
                                />
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}