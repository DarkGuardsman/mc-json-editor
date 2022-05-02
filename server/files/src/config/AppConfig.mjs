
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
            id: 0,
            name: "ICBM",
            path: "F:/github/1.12/ICBM-Classic"
        }
    ]
}