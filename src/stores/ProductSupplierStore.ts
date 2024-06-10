import { defineStore } from "pinia";
import { ProductSupplier } from "../models/supplier";

interface State {
    products: ProductSupplier[]
}

export const useProductSupplierStore = defineStore("ProductSupplierStore", {
    state: (): State => ({
        products: []
    }),
    getters: {
        getByProductId: (state: State) => {
            return (id: number) => state.products.find(product => product.productId === id)
        },
        selected: (state: State) => {
            return (id: number) => state.products.some(product => product.productId === id)
        }
    },
    actions: {
        add(product: ProductSupplier) {
            this.products.push(product)
        },
        remove(productId: number) {
            this.products = this.products.filter(p => p.productId !== productId)
        },
        updateRubles(productId: number, newRubles: number) {
            const product = this.getByProductId(productId)
            if (product) {
                product.price.rubles = newRubles
            }
        },
        updatePennies(productId: number, newPennies: number) {
            const product = this.getByProductId(productId)
            if (product) {
                product.price.pennies = newPennies
            }
        }
    }
})