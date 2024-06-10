import { defineStore } from "pinia";
import { Customer } from "../models/customer";
import { CustomerService } from "../services/customer/customer";

interface State {
    customers: Customer[]
}

const service = new CustomerService()

export const useCustomerStore = defineStore("CustomerStore", {
    state: (): State => ({
        customers: [],
    }),
    getters: {
        getById: (state) => {
            return (id: number) => state.customers.find(customer => customer.id === id)
        },
    },
    actions: {
        create(
            firstName: string,
            lastName: string,
            birthDate: Date,
            phoneNumber: string
        ): Promise<number> {
            return service.create(firstName, lastName, birthDate, phoneNumber)
        },
        updateCustomers(): Promise<void> {
            return new Promise((resolve, reject) => {
                service.list().then(
                    customers => {
                        this.customers = customers
                        resolve()
                    },
                    err => reject(err)
                )
            })
        },
        customer(id: number): Promise<Customer> {
            return service.customer(id)
        },
        update(customer: Customer): Promise<number> {
            return service.update(customer)
        },
        delete(id: number): Promise<number> {
            return service.delete(id)
        },
    }
})