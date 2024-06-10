import { defineStore } from "pinia";
import { ProductTradingPoint } from "../models/trading_point";

interface State {
    products: ProductTradingPoint[]
}

export const useProductTradingPointStore = defineStore("ProductTradingPointStore", {
    state: (): State => ({
        products: []
    }),
    getters: {
        getByProductId: (state: State) => {
            return (id: number) => state.products.find(pa => pa.productId === id)
        },
    },
    actions: {
        
    }
})