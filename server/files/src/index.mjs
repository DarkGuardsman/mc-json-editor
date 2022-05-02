import {stopFileWatcher, startFileWatcher} from "./io/FileWatcherLogic.mjs";
import {createServer} from "./server/Server.mjs";
import {createTerminus} from "@godaddy/terminus";
import {SERVER_PORT} from "./EnvVars.mjs";
import {getProjectList, loadConfigs} from "./config/AppConfig.mjs";
import {
    getContentCategories,
    queryForContentData,
    startWatchingContentCategoryData
} from "./io/ContentCategoryClient.mjs";

await loadConfigs();

//Setup server
const server = await createServer();

//Get content categories to define files
await queryForContentData();
if(getContentCategories() === undefined) {
    console.error("Failed get content categories, exiting as file watcher can't run without data");
    process.exit(1);
}
startWatchingContentCategoryData();

//Start file watcher
startFileWatcher(getProjectList());

//Setup health check and termination handling
createTerminus(server.httpServer, {
    signal: 'SIGINT',
    healthChecks: {
        '/healthcheck': () => {
            return Promise.resolve();
        }
    },
    onSignal: () => {
        return Promise.all([
            stopFileWatcher
        ]);
    }
});

//Start server
server.listen(SERVER_PORT).then(({url}) => {
    console.log(`Server ready at ${url}`);
});