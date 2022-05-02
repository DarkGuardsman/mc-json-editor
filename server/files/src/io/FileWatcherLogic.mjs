import chokidar from "chokidar";
import FileTracker from "./FileTracker.mjs";
import Lodash from "lodash";

//All open watchers
const watchers = [];

//All open file trackers
const fileTrackers = new Map();


export function getFiles(projectId, categoryId) {
    const fileTracker = fileTrackers.get(projectId);
    if(Lodash.isNil(fileTracker)) {
        throw new Error(`Unknown project with id ${projectId}`);
    }
    return fileTracker.getFiles(categoryId);
}

export function getFileSets(projectId) {
    const fileTracker = fileTrackers.get(projectId);
    if(Lodash.isNil(fileTracker)) {
        throw new Error(`Unknown project with id ${projectId}`);
    }
    return fileTracker.getFileSets();
}

/**
 *
 * @param projects
 */
export function startFileWatcher(projects) {
    projects.forEach(project => startWatchingProject(project));
}

function startWatchingProject(project) {
    const rootPath = `${project.path}/src/main/resources/**/*.json`;

    //Setup tracker
    const fileTracker = new FileTracker(project);
    fileTrackers.set(project.id, fileTracker);

    //Setup Watcher
    const watcher = chokidar.watch(rootPath, {
        ignoreInitial: false
    })
        //File discovered or created
        .on('add', (fullPath, stats) => {
            //const path = fullPath.replace(rootPath, "");
            //const fileId = stats.ino;
            //const contentChangedTime = stats.ctimeMs;
            //const fileChangeTime = stats.mtimeMs;
            //console.log('Add', path);

            fileTracker.addFile(fullPath, stats);
        })
        .on('change', (fullPath, stats) => {
            const path = fullPath.replace(rootPath, "");
            const fileId = stats.ino;
            //console.log('Change', path, `ID: ${fileId}`);
            fileTracker.onFileChanged(fullPath);
        })
        //File moved or deleted
        .on('unlink', (fullPath) => {
            fileTracker.removeFile(fullPath);
        });
    watchers.push(watcher);
}

export async function stopFileWatcher() {
    return watchers.forEach(watcher => watcher.close());
}

//Library being used https://www.npmjs.com/package/chokidar
//Notes for stats
//atime -> accessed time, when file is opened
//mtime -> modified time, when stats of the file are changed
//ctime -> changed time, when contents of the file are changed
// Stats https://www.howtogeek.com/517098/linux-file-timestamps-explained-atime-mtime-and-ctime/
//       https://www.ibm.com/docs/en/i/7.3?topic=ssw_ibm_i_73/apis/stat.htm