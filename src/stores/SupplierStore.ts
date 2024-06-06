import { defineStore } from "pinia";
import { Supplier } from "../models/supplier";

interface State {
    suppliers: Supplier[]
}

export const useSupplierStore = defineStore("SupplierStore", {
    state: (): State => ({
        suppliers: [],
    }),
    getters: {

    },
    actions: {

    }
})