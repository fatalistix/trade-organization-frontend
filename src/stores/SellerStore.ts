import { defineStore } from "pinia";
import { NewWorksAt, Seller, SellerFilter } from "../models/seller";
import { SellerService } from "../services/seller/seller";
import { Money } from "../models/core";

interface State {
    sellers: Seller[]
}

const service = new SellerService()

export const useSellerStore = defineStore("SellerStore", {
    state: (): State => ({
        sellers: [],
    }),
    getters: {
        getById: (state) => {
            return (id: number) => state.sellers.find(seller => seller.id === id)
        },
    },
    actions: {
        create(
            firstName: string,
            lastName: string,
            middleName: string,
            birthDate: Date,
            salary: Money,
            phoneNumber: string,
        ): Promise<number> {
            return service.create(
                firstName, lastName, middleName, birthDate, salary, phoneNumber
            )
        },
        updateSellers(filter: SellerFilter): Promise<void> {
            return new Promise((resolve, reject) => {
                service.list(filter).then(
                    sellers => {
                        this.sellers = sellers
                        resolve()
                    },
                    err => reject(err)
                )
            })
        },
        seller(id: number): Promise<Seller> {
            return service.seller(id)
        },
        patch(
            id: number,
            firstName: string | null,
            lastName: string | null,
            middleName: string | null,
            birthDate: Date | null,
            salary: Money | null,
            phoneNumber: string | null,
            newWorksAt: NewWorksAt | null
        ): Promise<number> {
            return service.patch(
                id, firstName, lastName, middleName, birthDate, salary, phoneNumber, newWorksAt
            )
        },
    }
})