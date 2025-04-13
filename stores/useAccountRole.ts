

export const useAccountRole = defineStore('accountRole',{
    state: () => ({
        role : ''
    }),
    actions:{
        setRole(accountRole :string){
            this.role = accountRole;
        }
    }
})