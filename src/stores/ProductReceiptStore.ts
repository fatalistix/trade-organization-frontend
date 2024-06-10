import { defineStore } from "pinia";
import { ProductReceipt } from "../models/receipt";

interface State {
    products: ProductReceipt[]
}

export const useProductReceiptStore = defineStore("ProductReceiptStore", {
    state: (): State => ({
        products: []
    }),
    getters: {
        getByProductId: (state: State) => {
            return (id: number) => state.products.find(pa => pa.productId === id)
        },
        selected: (state: State) => {
            return (id: number) => state.products.some(pa => pa.productId === id)
        },
    },
    actions: {
        add(product: ProductReceipt) {
            this.products.push(product)
        },
        remove(productId: number) {
            this.products = this.products.filter(product => product.productId !== productId)
        },
        updateQuantity(productId: number, newQuantity: number) {
            const product = this.getByProductId(productId)
            if (product) {
                product.quantity = newQuantity
            }
        }
    }
})