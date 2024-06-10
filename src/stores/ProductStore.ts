import { defineStore } from "pinia";
import { Product } from "../models/product";
import { ProductService } from "../services/product/product";

interface State {
    products: Product[]
}

const service = new ProductService()

export const useProductStore = defineStore("ProductStore", {
    state: (): State => ({
        products: []
    }),
    getters: {
        getById: (state: State) => {
            return (id: number) => state.products.find(product => product.id === id)
        },
    },
    actions: {
        create(name: string, description: string): Promise<number> {
            return service.create(name, description)
        },
        updateProducts(): Promise<void> {
            return new Promise((resolve, reject) => {
                service.list().then(
                    products => {
                        this.products = products
                        resolve()
                    },
                    err => reject(err)
                )
            })
        },
        product(id: number): Promise<Product> {
            return service.product(id)
        },
        update(
            id: number,
            name: string,
            description: string,
        ): Promise<number> {
            return service.update(id, name, description)
        }
    }
})