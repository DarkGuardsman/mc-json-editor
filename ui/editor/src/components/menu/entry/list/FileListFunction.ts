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
    key: string,
    /** Path to folder/file */
    path: string,
    /** List of child files/folders */
    files?: FileDisplayNest[]
}

interface FileDisplayEntry {
    fileName: string,
    key: string,
    current?: string,
    strings?: string[]
}


/**
 * Converts list of file paths into nested folders for display
 *
 * @param {{name: String, key: String}[]} rawFileList - raw inputs from API
 * @return {FileDisplayNest[]} nested data to display as elements
 */
export default function splitFileEntries(rawFileList: {name: string, key: string}[]): FileDisplayNest[] {
    if (isArray(rawFileList) && rawFileList.length > 0) {
        return split(mapInputData(rawFileList), "");
    }
    return [];
}

/**
 * Maps API inputs for first round of splitting
 *
 * @param {{name: String, key: String}[]} rawFileList
 * @return {FileDisplayEntry[]} mapped data
 */
function mapInputData(rawFileList: {name: string, key: string}[]): FileDisplayEntry[] {
    return rawFileList.map(entry => {
        //Fix starting with slash
        const name = entry.name.startsWith("/") ? entry.name.substring(1, entry.name.length) : entry.name;

        //Split into file path
        const split = name.split("/");

        //If we have more than 1 split we are a folder
        const isFolder = split.length > 1;
        if (isFolder) {
            return {
                fileName: name,
                key: entry.key,
                current : head(split),
                strings: split.slice(1, split.length)
            }
        }
        return {
            fileName: name,
            key: entry.key,
            current: name
        }
    })
}

function mapSplitData(files: FileDisplayEntry[]): FileDisplayEntry[] {
    return files.map(entry => {
        if (isArray(entry.strings) && entry.strings.length > 1) {
            const strings = entry.strings.slice(1, entry.strings.length);
            return {
                fileName: entry.fileName,
                key: entry.key,
                current : head(entry.strings),
                strings
            }
        }
        return {
            current: head(entry.strings),
            key: entry.key,
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
                key: "undefined",
                path: "undefined",
                isFolder: false,
                file: entry.fileName,
                errored: true,
            }
        }
        return {
            name,
            key: entry.key,
            isFolder: false,
            file: entry.fileName,
            path: `${currentPath}/`
        }
    });
    const folders: FileDisplayNest[] = map(groupEntries(filesIn.filter(entry => !isNil(entry.strings))), (value, key) => {
        return {
            name: key,
            key: key,
            isFolder: true,
            files: split(mapSplitData(value), `${currentPath}/${key}`),
            path: `${currentPath}/`
        }
    });

    return isNil(folders) ? files : folders.concat(files);
}