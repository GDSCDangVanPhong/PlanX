import {defineStore} from "pinia";

export const useProjectId = defineStore('projectID',{
    state: () =>({
        projectId : ''
    }),
    actions : {
        setProjectId(projectID : string){
            this.projectId = projectID;
        }
    }




})