import { defineStore } from "pinia"
import { ProductApplication } from "../models/application"

interface State {
    products: ProductApplication[]
}

export const useApplicationCreateStore = defineStore("ApplicationCreateStore", {
    state: (): State => ({
        products: []
    }),
    getters: {

    },
    actions: {
        
    }
})