import {head, isArray, isNil, map} from "lodash";
import {ProjectFileEntry} from "../../../../generated/graphql";
import {groupBy, Dictionary} from "lodash";

/**
 * Grouping of files by folder structure
 */
export interface FileDisplayNest {
    /** Display Name */
    name: string,
    /** True if folder */
    isFolder: boolean,
    /** True if something failed */
    errored?: boolean,
    /** Full file path */
    file?: string,
    /** Path to folder/file */
    path?: string,
    /** List of child files/folders */
    files?: FileDisplayNest[]
}

interface FileDisplayEntry {
    fileName: string,
    current?: string,
    strings?: string[]
}


/**
 * Converts list of file paths into nested folders for display
 *
 * @param {ProjectFileEntry[]} rawFileList - raw inputs from API
 * @return {FileDisplayNest[]} nested data to display as elements
 */
export default function splitFileEntries(rawFileList: ProjectFileEntry[]): FileDisplayNest[] {
    if (isArray(rawFileList) && rawFileList.length > 0) {
        return split(mapInputData(rawFileList), "");
    }
    return [];
}

/**
 * Maps API inputs for first round of splitting
 *
 * @param {ProjectFileEntry[]} rawFileList
 * @return {FileDisplayEntry[]} mapped data
 */
function mapInputData(rawFileList: ProjectFileEntry[]): FileDisplayEntry[] {
    return rawFileList.map(entry => {
        const split = entry.name.split("/");
        const isFolder = split.length > 1;
        if (isFolder) {
            return {
                fileName: entry.name,
                current : head(split),
                strings: split.slice(1, split.length)
            }
        }
        return {
            fileName: entry.name,
            current: entry.name
        }
    })
}

function mapSplitData(files: FileDisplayEntry[]): FileDisplayEntry[] {
    return files.map(entry => {
        if (isArray(entry.strings) && entry.strings.length > 1) {
            const strings = entry.strings.slice(1, entry.strings.length);
            return {
                fileName: entry.fileName,
                current : head(entry.strings),
                strings
            }
        }
        return {
            current: head(entry.strings),
            fileName: entry.fileName
        }
    })
}

function groupEntries(files: FileDisplayEntry[]): Dictionary<FileDisplayEntry[]> {
    return groupBy(files, entry => entry.current);
}

function split(filesIn: FileDisplayEntry[], currentPath: string): FileDisplayNest[] {
    const files: FileDisplayNest[] = filesIn.filter(entry => isNil(entry.strings)).map(entry => {
        const name = isNil(entry.current) ? entry.fileName : entry.current;
        if(name.trim() === "") {
            return {
                name: "Malformed Path",
                isFolder: false,
                file: entry.fileName,
                errored: true
            }
        }
        return {
            name,
            isFolder: false,
            file: entry.fileName
        }
    });
    const folders: FileDisplayNest[] = map(groupEntries(filesIn.filter(entry => !isNil(entry.strings))), (value, key) => {
        return {
            name: key,
            isFolder: true,
            files: split(mapSplitData(value), `${currentPath}/${key}`),
            path: `${currentPath}/`
        }
    });

    return isNil(folders) ? files : folders.concat(files);
}