import { defineStore } from 'pinia'

export enum UserType {
    MANAGER = "manager",
    SELLER = "seller",
    LOGIN = "login",
}

interface State {
    type: UserType
}

export const useUserStore = defineStore('UserStore', {
    state: (): State => {
        return {
            type: UserType.LOGIN
        }
    },
})


