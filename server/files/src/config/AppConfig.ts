import ProjectConfig from "../types/ProjectConfig";

let projectList: ProjectConfig[] = [];

export function getProjectList(): ProjectConfig[] {
    return projectList;
}

export async function loadConfigs() {
    //TODO load from file system
    projectList = [
        {
            id: 0, //Locally generated
            name: "ICBM", //User defined
            spec: {
                id: 0,
                name: "Minecraft/Forge", //User defined, dropdown menu
                watchFolder: "/src/main/resources", //TODO pull from data server
                version: "1.12.2" //User defined
            },
            metadata: {
                projectId: "icbmclassic"
            },
            path: "F:/github/1.12/ICBM-Classic" //User defined
        }
    ]
}
