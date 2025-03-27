import {defineStore} from "pinia";

export const useTabState = defineStore('tab',{
    state: ()=>({
        tab : 'Home',
        onFetching : false
    }),
    actions: {
         changingState(newTab : string){
                   this.tab = newTab;
                    this.onFetching = true;
         }
    }
    })

