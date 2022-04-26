import Project from "./Project";
import EntryTemplate from "./EntryTemplate";
import ProjectFile from "./ProjectFile";

export default interface QueryRoot {
    projects: Project[],
    project: Project,
    template: EntryTemplate,
    files: ProjectFile[]
}