import ProjectSpec from "./ProjectSpec";
import ProjectMetadata from "./ProjectMetadata";

export default interface ProjectConfig {
    /** Unique id, generated locally */
    id: number,
    /** User defined display name */
    name: string,
    /** User defined root path */
    path: string,
    /** Project specification (also known as type) */
    spec: ProjectSpec,
    /** Spec driven metadata */
    metadata: ProjectMetadata
}
