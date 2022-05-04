import {stopFileWatcher, startFileWatcher} from "./io/FileWatcherLogic.js";
import {createServer} from "./server/Server.js";
import {createTerminus} from "@godaddy/terminus";
import {SERVER_PORT} from "./EnvVars.js";
import {getProjectList, loadConfigs} from "./config/AppConfig.js";
import {
    getContentCategories,
    queryForContentData,
    startWatchingContentCategoryData
} from "./io/ContentCategoryClient.js";
import {ServerInfo} from "apollo-server";


//https://www.howtographql.com/typescript-apollo/1-getting-started/
//https://github.com/jsynowiec/node-typescript-boilerplate/blob/main/package.json

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

//Start server
const serverInfo: ServerInfo = await server.listen(SERVER_PORT);
console.log(`Server ready at ${serverInfo.url}`);

//Setup health check and termination handling
createTerminus(serverInfo.server, {
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

