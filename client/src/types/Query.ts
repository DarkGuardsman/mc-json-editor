import Project from "./Project";
import EntryTemplate from "./EntryTemplate";

export default interface QueryRoot {
    projects: Project[],
    project: Project,
    template: EntryTemplate
}