import Lodash from "lodash";
import fileSystem from 'fs';
import {getContentCategories} from "./ContentCategoryClient.js";
import ProjectConfig from "../types/ProjectConfig";
import WatchedFile from "../types/WatchedFile";

export default class FileTracker {

    private readonly fileMap: Map<String, WatchedFile> = new Map<String, WatchedFile>();
    private project: ProjectConfig;
    private categories: number[] = [];

    /**
     * @param {Project} project
     */
    constructor(project) {
        this.project = project;
    }

    /**
     * @param {WatchedFile} entry
     */
    addFile(entry: WatchedFile) {
        const fullPath = entry.fullPath.replaceAll("\\", "/");
        this.fileMap.set(fullPath, {
            ...entry,
            fullPath,
            path: fullPath.replace(entry.folderRoot, "")
        });
        //console.log(key, this.fileMap[key]);
        this.onFileChanged(fullPath);
    }

    /**
     * Notifies the tracker that a file has changed. This will cause the tracker to rescan the file.
     */
    onFileChanged(key: String) {
        const entry = this.fileMap.get(key);

        if(Lodash.isNil(entry)) {
            console.error("Received a file change event for a key with no file data", key);
            return;
        }

        const {path} = entry;

        const rawFile = fileSystem.readFileSync(entry.fullPath, 'utf8');
        const jsonFile = JSON.parse(rawFile);

        const possibleCategories = getContentCategories().filter(category => {
            if (!Lodash.isNil(category.detection)) {
                const {mode, fields} = category.detection
                switch (mode) {
                    case "regex" : {
                        const regex = new RegExp(category.detection.alg); //TODO optimize
                        return regex.test(path);
                    }
                    case "json_field": {
                        if (Lodash.isArray(fields)) {
                            //Return true if all fields return false (with false meaning not failed)
                            return !fields.some(field => {
                                const {id, regex} = field;
                                const fieldValue = jsonFile[id];
                                return !new RegExp(regex).test(fieldValue);//TODO optimize
                            });
                        }
                        return false;
                    }
                    default:
                        return false;
                }
            }
            return false;
        });

        const category = Lodash.head(possibleCategories);

        if(category !== null && category !== undefined && this.categories.indexOf(category.id) === -1) {
            this.categories.push(category.id);
        }

        if (category !== null && category !== undefined) {
            const folderPrefix = category.folderPrefix.replace(`#{projectId}`, this.project.metadata.projectId);
            this.fileMap.set(key, {
                ...entry,
                path: path.replace(folderPrefix, ""),
                categoryId: category?.id
            });
        }
    }

    /**
     * Notifies the tracker that a file has been removed
     */
    removeFile(key: string) {
        this.fileMap.delete(key);
    }

    /**
     * Accessor for files by category
     * @param {number} categoryId - category unique id
     * @returns {Array.<WatchedFile>} files matching the category
     */
    getFiles(categoryId: number) {
        const results = [];
        this.fileMap.forEach((value) => {
            if(value.categoryId === categoryId) {
                results.push(value)
            }
        })
        return results;
    }

    /**
     * Gets file sets
     */
    getFileSets(): { category: { id: number } }[] {
        return this.categories.map(id => {
            return {
                category: {
                    id
                }
            }
        });
    }
}
