import Lodash from "lodash";
import fileSystem from 'fs';
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

        const rawFile = fileSystem.readFileSync(entry.fullPath, 'utf8');
        const jsonFile = JSON.parse(rawFile);

        const possibleCategories = getContentCategories().filter(category => {
            if (!Lodash.isNil(category.detection)) {
                const {mode, fields} = category.detection
                switch(mode) {
                    case "regex" : {
                        const regex = new RegExp(category.detection.alg); //TODO optimize
                        return regex.test(path);
                    }
                    case "json_field": {
                        if(Lodash.isArray(fields)) {
                            //Return true if all fields return false (with false meaning not failed)
                            return !fields.some(field => {
                                const {id, regex} = field;
                                const fieldValue = jsonFile[id];
                                return !new RegExp(regex).test(fieldValue);//TODO optimize
                            });
                        }
                        return false;
                    }
                    default: return false;
                }
            }
        });

        const category = Lodash.head(possibleCategories);

        if(!Lodash.isNil(category)) {
            console.log(path, category);
        }

        this.fileMap[key] = {
            ...this.fileMap[key],
            categoryId: category?.id
        }
    }

    removeFile(fullPath) {
        delete this.fileMap[fullPath];
    }

    getFiles(categoryId) {
        return Lodash.values(this.fileMap).filter(entry => entry.categoryId === categoryId) //TODO store in map better for faster lookups
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