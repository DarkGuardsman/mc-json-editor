
let projectList = [];

export function getProjectList() {
    return projectList;
}

export function addProject(projectPath) {

}

export function removeProject(projectId) {

}

export async function loadConfigs() {
    //TODO load from file system
    projectList = [
        {
            id: 0, //Locally generated
            name: "ICBM", //User defined
            type: {
                id: "Minecraft/Forge", //User defined, dropdown menu
                watchFolder: "/src/main/resources", //TODO pull from data server
                version: "1.12.2" //User defined
            },
            projectId: "icbmclassic", //User defined or discovered when added
            path: "F:/github/1.12/ICBM-Classic" //User defined
        }
    ]
}