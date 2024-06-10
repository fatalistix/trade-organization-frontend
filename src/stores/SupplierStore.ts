import { defineStore } from "pinia";
import { Supplier } from "../models/supplier";
import { SupplierService } from "../services/supplier/supplier";

interface State {
    suppliers: Supplier[]
}

const service = new SupplierService()

export const useSupplierStore = defineStore("SupplierStore", {
    state: (): State => ({
        suppliers: [],
    }),
    getters: {
        getById: (state) => {
            return (id: number) => state.suppliers.find(supplier => supplier.id === id)
        }
    },
    actions: {
        create(name: string): Promise<number> {
            return service.create(name)
        },
        updateSuppliers(): Promise<void> {
            return new Promise((resolve, reject) => {
                service.list().then(
                    suppliers => {
                        this.suppliers = suppliers
                        resolve()
                    },
                    err => reject(err)
                )
            })
        },
        load(id: number): Promise<Supplier> {
            return service.supplier(id)
        },
        update(supplier: Supplier): Promise<number> {
            return service.update(supplier)
        }
    }
})