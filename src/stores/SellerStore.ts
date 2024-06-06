import { defineStore } from "pinia";
import { Seller } from "../models/seller";

interface State {
    sellers: Seller[]
}

export const useSellerStore = defineStore("SellerStore", {
    state: (): State => ({
        sellers: [],
    }),
    getters: {

    },
    actions: {

    }
})