import { defineStore } from "pinia";
import { Product } from "../models/product";

interface State {
    products: Product[]
}

export const useProductStore = defineStore("ProductStore", {
    state: (): State => ({
        products: []
    }),
    getters: {

    },
    actions: {
        
    }
})