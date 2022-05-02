import Lodash from "lodash";

export default class FileTracker {

    constructor(project) {
        this.project = project;
        this.fileMap = {};
        this.fileScanSet = new Set();
    }

    addFile(fullPath, stats) {
        this.fileMap[fullPath] = {
            fullPath,
            stats
        }
        this.onFileChanged(fullPath);
    }

    onFileChanged(fullPath) {
        this.fileScanSet.add(fullPath);
    }

    removeFile(fullPath) {
        this.fileMap.set(fullPath, undefined);
    }

    getFiles(categoryId) {
        return Lodash.values(this.fileMap) //TODO return only for a specific category
    }

    getFileSets() {
        //TODO ask the data server for a list of specifications and matching categories.
        //  We need a way to ID files based on location and contents.
        //  This needs to be driven by the data server and not the file server
        return [
            {
                category: {
                    id: 0 //Default to unspecified
                }
            }
        ]
    }

    getFilesToScan() {
        return this.fileScanSet;
    }
}