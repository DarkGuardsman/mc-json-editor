import EntryTemplate from "./EntryTemplate";

export default interface Project {
    id: Number,
    name: String,
    templates: EntryTemplate[]
}