import { defineStore } from "pinia";
import { ProductOrder } from "../models/order";

interface State {
    products: ProductOrder[]
    applicationIds: number[]
}

export const useProductOrderStore = defineStore("ProductOrderStore", {
    state: (): State => ({
        products: [],
        applicationIds: []
    }),
    getters: {
        getByProductId: (state: State) => {
            return (id: number) => state.products.find(pa => pa.productId === id)
        }
    },
    actions: {
        add(product: ProductOrder) {
            const savedProduct = this.products.find(p => p.productId === product.productId)
            if (savedProduct) {
                this.products = this.products.map(p => {
                    if (p.productId === savedProduct.productId) {
                        return {
                            productId: p.productId,
                            quantity: p.quantity + product.quantity,
                            price: p.price
                        }
                    } else {
                        return p
                    }
                })
            } else {
                this.products.push(product)
            }
        },
        remove(productId: number, quantity: number) {
            const newProducts: ProductOrder[] = []
            this.products.forEach(p => {
                if (p.productId === productId) {
                    if (p.quantity > quantity) {
                        newProducts.push({
                            productId: p.productId,
                            quantity: p.quantity - quantity,
                            price: p.price
                        })
                    }
                } else {
                    newProducts.push(p)
                }
            })
            this.products = newProducts
        },
        addApplicationId(applicationId: number) {
            this.applicationIds.push(applicationId)
        },
        removeApplicationId(applicationId: number) {
            this.applicationIds = this.applicationIds.filter(id => id !== applicationId)
        }
    }
})