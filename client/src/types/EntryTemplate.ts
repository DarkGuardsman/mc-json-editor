import ProjectFile from "./ProjectFile";

export default interface EntryTemplate {
    id: Number,
    name: String,
    files: ProjectFile[]
}