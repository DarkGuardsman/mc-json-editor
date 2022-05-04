export default interface ProjectSpec {
    /** Unique id of the spec */
    id: number,
    /** Display name of the spec */
    name: string,
    /** Folder to watch based on sepc */
    watchFolder: string,
    /** Version of the sepc */
    version: string,
}