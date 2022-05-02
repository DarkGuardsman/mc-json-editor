import Lodash from "lodash";
import {getContentCategories} from "./ContentCategoryClient.mjs";

const itemModelRegex = /\/assets\/\w+\/models\/item/

export default class FileTracker {

    constructor(project) {
        this.project = project;
        this.fileMap = {};
    }

    addFile(entry) {
        const key = entry.stats.ino;
        const fullPath = entry.fullPath.replaceAll("\\", "/");
        this.fileMap[key] = {
            fullPath,
            path: fullPath.replace(entry.folderRoot, "")
        };
        //console.log(key, this.fileMap[key]);
        this.onFileChanged(key);
    }

    onFileChanged(key) {
        const entry = this.fileMap[key];
        const {path} = entry;

        const possibleCategories = getContentCategories().filter(category => {
            if (!Lodash.isNil(category.detection)) {
                if (category.detection.mode === "Regex") {
                    const regex = new RegExp(category.detection.alg); //TODO optimize
                    return regex.test(path);
                }
            }
        });

        if (possibleCategories.length > 1) {
            console.warn("Detected more than 1 possible category for file entry", entry);
        }

        this.fileMap[key] = {
            ...this.fileMap[key],
            categoryId: Lodash.head(possibleCategories)
        }
    }

    removeFile(fullPath) {
        delete this.fileMap[fullPath];
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
}