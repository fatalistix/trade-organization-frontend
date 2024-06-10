import { defineStore } from "pinia";
import { Order, ProductOrder } from "../models/order";
import { OrderService } from "../services/order/order";

interface State {
    orders: Order[]
}

const service = new OrderService()

export const useOrderStore = defineStore("OrderStore", {
    state: (): State => ({
        orders: [],
    }),
    getters: {
        getById: (state) => {
            return (id: number) => state.orders.find(order => order.id === id)
        }
    },
    actions: {
        create(supplierId: number, products: ProductOrder[], applicationIds: number[]): Promise<number> {
            return service.create(supplierId, products, applicationIds)
        },
        updateOrders(): Promise<void> {
            return new Promise((resolve, reject) => {
                service.list().then(
                    orders => {
                        this.orders = orders
                        resolve()
                    },
                    err => reject(err)
                )
            })
        },
        order(id: number): Promise<Order> {
            return service.order(id)
        },
        update(order: Order): Promise<number> {
            return service.update(order)
        },
        complete(id: number): Promise<number> {
            return service.complete(id)
        },
        cancel(id: number): Promise<number> {
            return service.cancel(id)
        }
    }
})