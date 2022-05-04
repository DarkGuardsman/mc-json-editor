import {Stats} from "fs";

export default interface WatchedFile {
    /** File metadata, only updated when added */
    stats: Stats,
    /** Full system path to file */
    fullPath: string,
    /** Project folder root being watched */
    folderRoot: string,
    /** Display path of the file */
    path?: string,
    categoryId?: number
}
